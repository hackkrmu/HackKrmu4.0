document.getElementById('uploadButton').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default form submission

    const fileInput = document.getElementById('docUpload');
    const file = fileInput.files[0];
    
    if (file) {
        const formData = new FormData();
        formData.append('file', file);

        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Update the evidence repository with the new file
                const evidenceRepo = document.querySelector('.evidence-repository ul');
                const newEvidence = document.createElement('li');
                newEvidence.textContent = `${data.file_name} - Size: ${data.size} - Type: ${data.type}`;
                evidenceRepo.appendChild(newEvidence);
                
                // Also update metadata section if needed
                const metadataList = document.querySelector('.metadata ul');
                const newMetadata = document.createElement('li');
                newMetadata.textContent = `${data.file_name}: Created on ${data.created_on}, Last accessed on ${data.last_accessed}`;
                metadataList.appendChild(newMetadata);
            } else {
                alert('File upload failed: ' + data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert('Please select a file to upload.');
    }
});
document.getElementById('resetButton').addEventListener('click', function () {
    if (confirm('Are you sure you want to reset all uploaded data? This action cannot be undone.')) {
        fetch('/reset_data', {
            method: 'POST',
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Clear the evidence repository list
                const evidenceRepo = document.querySelector('.evidence-repository ul');
                while (evidenceRepo.firstChild) {
                    evidenceRepo.removeChild(evidenceRepo.firstChild);
                }
                
                // Clear the metadata list
                const metadataList = document.querySelector('.metadata ul');
                while (metadataList.firstChild) {
                    metadataList.removeChild(metadataList.firstChild);
                }
                
                // Optionally reset other sections

                alert('Data has been reset successfully.');
            } else {
                alert('Failed to reset data: ' + data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    }
});
