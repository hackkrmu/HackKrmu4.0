// app/page.js (or components/UploadForm.js)
"use client";
import { useState } from 'react';

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/testML', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ error: error.message });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container">
      <h1>Upload Video</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="file-input"
        />
        <button
          type="submit"
          disabled={isUploading}
          className="upload-button text-gray-100"
        >
          {isUploading ? 'Uploading...' : 'Upload Video'}
        </button>
      </form>
      
      {response && (
        <div className="response">
          <h2>Server Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}