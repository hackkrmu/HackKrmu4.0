// login.js
document.addEventListener('DOMContentLoaded', function() {

    const categoryBoxes = document.querySelectorAll('.category-box');
    const loginForm = document.getElementById('loginForm');

    // *******************  XLSX File Paths (Update these!) *******************
    const studentXLSX = 'js/data/students.xlsx';  //  Create this directory and file
    const teacherXLSX = 'js/data/teachers.xlsx';    //  Create this directory and file
    const utilitiesXLSX = 'js/data/utilities.xlsx'; //  Create this directory and file

    // ******************* Global Variables *******************
    let studentData = [];
    let teacherData = [];
    let utilitiesData = [];


    // *******************  Helper Functions *******************

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
                alert('Error reading data file.  Check console.');
            });
    }


    function authenticate(category, loginId, password) {
        let data = [];
        switch (category) {
            case 'student':
                data = studentData;
                break;
            case 'teacher':
                data = teacherData;
                break;
            case 'utilities':
                data = utilitiesData;
                break;
            default:
                return false; // Invalid category
        }

        for (const user of data) {
            if (user.loginId == loginId && user.password == password) {
                return true; // Authentication successful
            }
        }

        return false; // Authentication failed
    }


    function redirectToPage(category) {
        switch (category) {
            case 'student':
                window.location.href = 'students.html';
                break;
            case 'teacher':
                window.location.href = 'teachers.html';
                break;
            case 'utilities':
                window.location.href = 'utilities.html';
                break;
            default:
                alert('Invalid category.  Could not redirect.');
        }
    }


    // *******************  Initialization *******************

    // Load data from XLSX files when the page loads
    readXLSX(studentXLSX, (data) => { studentData = data; });
    readXLSX(teacherXLSX, (data) => { teacherData = data; });
    readXLSX(utilitiesXLSX, (data) => { utilitiesData = data; });
    // Reading Data from Xlsx file



    // *******************  Event Handlers *******************

    // Category Box Click Handlers
    categoryBoxes.forEach(box => {
        box.addEventListener('click', function() {
            categoryBoxes.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Login Form Submission
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const loginId = document.getElementById('loginId').value;
        const password = document.getElementById('password').value;
        const selectedCategory = document.querySelector('.category-box.active').dataset.category;

        if (loginId.trim() === '' || password.trim() === '') {
            alert('Please enter your Login ID and Password.');
            return;
        }

        // Authentication
        if (authenticate(selectedCategory, loginId, password)) {
            // Store loginId in localStorage
            if(selectedCategory == "student"){
                localStorage.setItem('loginId', loginId);
            }
            // Successful login, redirect
            redirectToPage(selectedCategory);
        } else {
            // Failed login
            alert('Invalid Login ID or Password.');
        }


    });

    // "Forgot Password" Link
    const forgotPasswordLink = document.querySelector('.forgot-password');
    forgotPasswordLink.addEventListener('click', function(event) {
        event.preventDefault();
        alert('Forgot Password functionality not yet implemented.');
    });

    // "Sign Up" Link
    const signUpLink = document.querySelector('.sign-up');
    signUpLink.addEventListener('click', function(event) {
        window.open("https://forms.gle/uo7H9cZUVVn2ReWw9", "_blank")
    });
});