// app/api/upload/route.js
import { NextResponse } from 'next/server';
import formidable from 'formidable';
import { createReadStream } from 'fs';
import FormData from 'form-data';
import axios from 'axios';
import { unlink } from 'fs/promises';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  try {
    const formData = await new Promise((resolve, reject) => {
      const form = new formidable.IncomingForm();
      form.parse(request, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const file = formData.files.file?.[0];
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    const forwardFormData = new FormData();
    const fileStream = createReadStream(file.filepath);
    forwardFormData.append('file', fileStream, file.originalFilename);

    const response = await axios.post(
      'http://127.0.0.1:8000/upload_video',
      forwardFormData,
      {
        headers: {
          ...forwardFormData.getHeaders(),
        },
      }
    );

    // Clean up temporary file
    await unlink(file.filepath);

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to upload video' },
      { status: 500 }
    );
  }
}