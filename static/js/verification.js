// Verify evidence immutability
function verifyEvidence(evidenceId) {
    fetch(`/verify_immutability/${evidenceId}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(`Evidence is immutable. Details: ${JSON.stringify(data.details)}`);
            } else {
                alert(`Evidence has been tampered with or an error occurred.`);
            }
        })
        .catch(error => console.error('Error:', error));
}

document.querySelectorAll('.verify-evidence-button').forEach(button => {
    button.addEventListener('click', function () {
        const evidenceId = this.dataset.evidenceId;
        verifyEvidence(evidenceId);
    });
});
