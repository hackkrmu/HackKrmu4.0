document.addEventListener("DOMContentLoaded", function() {
    initializeCharts();
    
    document.getElementById('filter-btn')?.addEventListener('click', function() {
        applyFilters();
    });

    document.querySelectorAll('.custom-view-btn').forEach(button => {
        button.addEventListener('click', function() {
            applyCustomView(this.textContent);
        });
    });

    document.querySelector('.report-builder button')?.addEventListener('click', function() {
        createReport();
    });

    document.querySelectorAll('.data-export button').forEach(button => {
        button.addEventListener('click', function() {
            const format = this.textContent.split(' ')[1].toLowerCase();
            exportData(format);
        });
    });
});

function initializeCharts() {
    const ctxIncidentType = document.getElementById('incident-type-chart')?.getContext('2d');
    const ctxSeverity = document.getElementById('severity-chart')?.getContext('2d');
    const ctxFrequency = document.getElementById('frequency-chart')?.getContext('2d');

    if (!ctxIncidentType || !ctxSeverity || !ctxFrequency) return;

    // Example data, replace with actual data from the server or other sources
    const incidentTypeData = {
        labels: ['Type1', 'Type2', 'Type3'],
        datasets: [{
            label: 'Incident Types',
            data: [10, 20, 30],
            backgroundColor: 'rgba(0, 71, 171, 0.6)',
            borderColor: 'rgba(0, 71, 171, 1)',
            borderWidth: 1
        }]
    };

    const severityData = {
        labels: ['Low', 'Medium', 'High'],
        datasets: [{
            label: 'Severity Levels',
            data: [15, 25, 10],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
    };

    const frequencyData = {
        labels: ['Jan', 'Feb', 'Mar'],
        datasets: [{
            label: 'Incident Frequency',
            data: [5, 10, 7],
            borderColor: '#FF6384',
            backgroundColor: 'rgba(255, 99, 132, 0.2)'
        }]
    };

    new Chart(ctxIncidentType, {
        type: 'bar',
        data: incidentTypeData,
        options: { responsive: true, scales: { y: { beginAtZero: true } } }
    });

    new Chart(ctxSeverity, {
        type: 'pie',
        data: severityData,
        options: { responsive: true }
    });

    new Chart(ctxFrequency, {
        type: 'line',
        data: frequencyData,
        options: { responsive: true, scales: { y: { beginAtZero: true } } }
    });
}

function applyFilters() {
    const keyword = document.getElementById('incident-search')?.value.toLowerCase();
    const startDate = document.getElementById('start-date')?.value;
    const endDate = document.getElementById('end-date')?.value;

    document.querySelectorAll('.incident-table tbody tr').forEach(row => {
        const incidentDate = row.cells[1]?.textContent;
        const incidentID = row.cells[0]?.textContent.toLowerCase();

        const showRow = (keyword === '' || incidentID.includes(keyword)) &&
                        (startDate === '' || new Date(incidentDate) >= new Date(startDate)) &&
                        (endDate === '' || new Date(incidentDate) <= new Date(endDate));

        row.style.display = showRow ? '' : 'none';
    });
}

function applyCustomView(view) {
    alert(`Custom view: ${view} applied!`);
    // Implement view-specific logic here
}

function createReport() {
    alert("Report creation functionality will be implemented here.");
    // Implement report creation logic
}

function exportData(format) {
    fetch(`/export/${format}`, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `report.${format}`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        })
        .catch(error => {
            console.error('Export failed:', error);
            alert('Failed to export data');
        });
}
