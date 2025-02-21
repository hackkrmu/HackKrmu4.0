function showContent(sectionId) {
    // Hide all content boxes
    let contentBoxes = document.querySelectorAll('.content-box');
    contentBoxes.forEach(box => {
        box.classList.remove('active');
        box.style.display = 'none'; // Ensure display is also set to none
    });

    // Show the selected content
    let selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
        selectedSection.style.display = 'block'; // Ensure display is set to block
    }
}

document.addEventListener('DOMContentLoaded', () => {
    showContent('personalInfo'); // Initially show personal info

    const studentXLSX = 'js/data/students.xlsx'; // Path to your students.xlsx file
    let studentData = [];

    // Helper function to read XLSX data (same as in login.js - you can reuse if you have a common utility file)
    function readXLSX(filePath, callback) {
        fetch(filePath)
            .then(response => response.arrayBuffer())
            .then(data => {
                const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
                const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);
                callback(jsonData);
            })
            .catch(error => {
                console.error('Error reading XLSX file:', error);
                alert('Error reading student data file. Check console.');
            });
    }

    // Function to display student personal information
    function displayPersonalInfo(studentInfo) {
        if (!studentInfo) {
            console.error("No student information found.");
            alert("Student information not found."); // Or handle no data scenario gracefully
            return;
        }
    
        document.getElementById('studentNamePlaceholder').textContent = `Hi, ${studentInfo.Name}`; // Column name: Name
        document.getElementById('studentClass').textContent = studentInfo.Class || 'N/A'; // Column name: Class
        document.getElementById('studentRollNo').textContent = studentInfo['Roll No.'] || 'N/A'; // Column name: Roll No. (with space and dot)
        document.getElementById('studentSchoolName').textContent = studentInfo['School Name'] || 'N/A'; // Column name: School Name (with space)
        document.getElementById('studentFatherName').textContent = studentInfo["Father's Name"] || 'N/A'; // Column name: Father's Name (with apostrophe and space)
        document.getElementById('studentMotherName').textContent = studentInfo["Mother's Name"] || 'N/A'; // Column name: Mother's Name (with apostrophe and space)
        document.getElementById('studentContact').textContent = studentInfo['Phone No.'] || 'N/A'; // Column name: Phone No. (with space and dot)
        document.getElementById('studentEmailId').textContent = studentInfo['Email Id'] || 'N/A'; // Column name: Email Id (with space and dot)
    
        // Optional: If you have an 'image' column in your Excel for image URLs or filenames
        // if (studentInfo.image) {
        //     document.getElementById('studentImage').src = studentInfo.image; // Assuming 'image' column contains image URL
        // }
    }


    // Fetch student data from XLSX and then display personal info
    readXLSX(studentXLSX, (data) => {
        studentData = data;
        const loginId = localStorage.getItem('loginId'); // Get loginId from localStorage
        if (loginId) {
            const loggedInStudent = studentData.find(student => student.loginId == loginId); // Find student by loginId
            if (loggedInStudent) {
                displayPersonalInfo(loggedInStudent);
            } else {
                console.warn(`No student found with loginId: ${loginId}`);
                alert("Student data not found for your login ID."); // Or handle no data scenario
            }
        } else {
            console.warn("loginId not found in localStorage.  Are you logged in as a student?");
            alert("Not logged in as a student or login information missing."); // Handle no loginId case
        }
    });
});