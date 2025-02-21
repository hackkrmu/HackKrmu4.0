import { useEffect } from 'react';

const FileUpload = () => {
  useEffect(() => {
    // This ensures the code runs only on the client side (after component mounts)
    const form = document.getElementById('file-upload-form');
    const responseElement = document.getElementById('response');

    form.addEventListener('submit', async function(event) {
      event.preventDefault();

      const fileInput = document.getElementById('file');
      const file = fileInput.files[0];

      if (!file) {
        alert('Please select a file.');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'x-apikey': 'YOUR_API_KEY_HERE',
        },
        body: formData,
      };

      try {
        // Step 1: Submit the file
        const response = await fetch('https://www.virustotal.com/api/v3/files', options);
        const result = await response.json();

        // Display initial response
        responseElement.textContent = `File submitted. Analysis ID: ${result.data.id}`;

        // Step 2: Extract analysis ID and periodically check the status
        const analysisId = result.data.id;

        const interval = setInterval(async () => {
          try {
            const statusResponse = await fetch(`https://www.virustotal.com/api/v3/analyses/${analysisId}`, {
              method: 'GET',
              headers: {
                accept: 'application/json',
                'x-apikey': 'YOUR_API_KEY_HERE',
              },
            });

            const statusResult = await statusResponse.json();

            // Display status in the response div
            responseElement.textContent = JSON.stringify(statusResult, null, 2);

            // If the analysis is complete, stop checking
            if (statusResult.data.attributes.status === 'completed') {
              clearInterval(interval);
              responseElement.textContent = `Analysis Complete:\n${JSON.stringify(statusResult, null, 2)}`;
            }
          } catch (error) {
            console.error('Error checking status:', error);
          }
        }, 5000); // Check every 5 seconds
      } catch (error) {
        console.error('Error:', error);
        responseElement.textContent = 'An error occurred. Please try again.';
      }
    });

    // Cleanup listener when the component is unmounted
    return () => {
      form.removeEventListener('submit', null);
    };
  }, []);

  return (
    <div>
      <form id="file-upload-form">
        <input type="file" id="file" />
        <button type="submit">Upload File</button>
      </form>
      <pre id="response"></pre>
    </div>
  );
};

export default FileUpload;
