import { writeFile } from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Read video file from request
    const data = await req.arrayBuffer();
    const buffer = Buffer.from(data);

    // Define path to save the file
    const videoPath = join(process.cwd(), "public", "uploads", `recorded-video-${Date.now()}.webm`);

    // Save the file locally
    await writeFile(videoPath, buffer);

    return NextResponse.json({ message: "Video uploaded successfully!", path: videoPath });
  } catch (error) {
    console.error("Error saving video:", error);
    return NextResponse.json({ error: "Failed to save video" }, { status: 500 });
  }
}
