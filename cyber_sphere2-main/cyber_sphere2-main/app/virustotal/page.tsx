import { useState, useRef } from 'react';
import formidable from 'formidable';
export default function HomePage() {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const file = fileInputRef.current.files[0];

    if (!file) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setIsLoading(true);
    setResponse(null);

    try {
      // Step 1: Submit the file to VirusTotal
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();

      setResponse(`File submitted. Analysis ID: ${result.id}`);

      // Step 2: Periodically check the status of the analysis
      const interval = setInterval(async () => {
        const statusResponse = await fetch(`/api/status/${result.id}`);
        const statusResult = await statusResponse.json();

        setResponse(JSON.stringify(statusResult, null, 2));

        if (statusResult.status === 'completed') {
          clearInterval(interval);
          setResponse(`Analysis Complete:\n${JSON.stringify(statusResult, null, 2)}`);
        }
      }, 5000);
    } catch (error) {
      console.error('Error:', error);
      setResponse('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>VirusTotal File Scanner</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="file">Choose a file to scan:</label>
        <input type="file" id="file" name="file" ref={fileInputRef} required />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Scanning...' : 'Scan File'}
        </button>
      </form>
      <div id="response">
        {response && <pre>{response}</pre>}
      </div>
    </div>
  );
}
