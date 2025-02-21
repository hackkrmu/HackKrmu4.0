// teacher_dashboard.js
document.addEventListener('DOMContentLoaded', function() {

    // Function to hide all slides
    function hideAllSlides() {
        const slides = document.querySelectorAll('.slide');
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
    }

    // Function to activate a slide
    function showSlide(slideId) {
        hideAllSlides();
        const slide = document.getElementById(slideId);
        if (slide) {
            slide.classList.add('active');
        }
    }

    // Function to update the active side menu link
    function updateActiveSideMenuLink(slideId) {
        const sideMenuLinks = document.querySelectorAll('.side-menu-link');
        sideMenuLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + slideId) {
                link.classList.add('active');
            }
        });
    }


    // Side Menu Link Clicks (Slide Switching)
    const sideMenuLinks = document.querySelectorAll('.side-menu-link');

    sideMenuLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const slideId = this.getAttribute('href').substring(1); // Get ID from href
            showSlide(slideId);
            updateActiveSideMenuLink(slideId);
        });
    });

    // Initially Show the Dashboard section
    showSlide('dashboard');
    updateActiveSideMenuLink('dashboard');

    //  --- Placeholder Data & Interactions (Replace with your API calls) ---

    // Example of getting classes
    function loadClassList() {
        //Replace with an API request to fetch the data
        setTimeout(() => {
            const classListElement = document.getElementById('class-list');
            classListElement.innerHTML = `
                <ul>
                  <li><a href="#">Class 10A</a></li>
                  <li><a href="#">Class 11B</a></li>
                  <li><a href="#">Class 9C</a></li>
                </ul>
              `;
            // Set event listeners to each of the class options
        }, 500); // simulate delay
    }
    // Simulate Announcements
    function loadAnnouncements() {
        setTimeout(() => {
            const announcementsElement = document.getElementById('announcements');
            announcementsElement.innerHTML = `
                <ul>
                    <li><strong>Important:</strong> Reminder about the parent-teacher meeting on Friday.</li>
                    <li><strong>New:</strong> The syllabus for the upcoming exam is now available.</li>
                </ul>
            `;
        }, 700); // simulate delay
    }
    // Function to populate class dropdowns (Attendance & Grades)
    function populateClassDropdowns() {
      //  Replace with API Call to fetch classes
      const classSelects = document.querySelectorAll('#attendance-controls #class-select, #grades-controls #grades-class-select');
      classSelects.forEach(select => {
          setTimeout(() => { // Simulate API call
              select.innerHTML = `
                <option value="">Select Class</option>
                <option value="class1">Class 10A</option>
                <option value="class2">Class 11B</option>
                <option value="class3">Class 9C</option>
              `;
          }, 600); // Simulate delay
      });
    }

    // Function to populate subjects (Grades)
    function populateSubjectDropdowns() {
        //  Replace with API Call to fetch subjects for the selected class
        const subjectSelect = document.getElementById('grades-subject-select');
        setTimeout(() => { // Simulate delay
            subjectSelect.innerHTML = `
                <option value="">Select Subject</option>
                <option value="math">Math</option>
                <option value="science">Science</option>
                <option value="english">English</option>
              `;
        }, 800); // Simulate delay
    }

     //Event listeners for buttons (these actions need to be customized)
     document.getElementById('take-attendance-button').addEventListener('click', () => {
         alert('Taking attendance for the selected class. To Be Added in future production.');
         //This will navigate to the student page
     });

    document.getElementById('post-announcement-button').addEventListener('click', () => {
         alert('Posting an announcement.To Be Added in future production.');
         //Open a modal, form or similar to create and post announcement
     });

     document.getElementById('send-message-button').addEventListener('click', () => {
         alert('Sending a message.To Be Added in future production.');
         //This will open a messaging interface.
     });

     document.getElementById('generate-attendance-report').addEventListener('click', () => {
         alert('Generating attendance report.To Be Added in future production.');
         //This will start the download of the report
     });
     document.getElementById('generate-performance-report').addEventListener('click', () => {
         alert('Generating the performance report.To Be Added in future production.');
         //This will start the download of the report
     });

    // Load initial data
    loadClassList();
    loadAnnouncements();
    populateClassDropdowns();
    populateSubjectDropdowns();
});