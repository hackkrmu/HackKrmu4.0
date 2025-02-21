// Smooth Scrolling for Navigation Links  
document.querySelectorAll('a[href^="#"]').forEach(anchor => {  
    anchor.addEventListener('click', function (e) {  
        e.preventDefault();  

        document.querySelector(this.getAttribute('href')).scrollIntoView({  
            behavior: 'smooth'  
        });  
    });  
});  

// Dark Mode Toggle  
const toggleDarkMode = document.getElementById('darkModeToggle');  
if (toggleDarkMode) {  
    toggleDarkMode.addEventListener('click', () => {  
        document.body.classList.toggle('dark-mode');  
        if (document.body.classList.contains('dark-mode')) {  
            toggleDarkMode.textContent = 'Switch to Light Mode';  
        } else {  
            toggleDarkMode.textContent = 'Switch to Dark Mode';  
        }  
    });  
}  

// Button Click Alert  
const alertButtons = document.querySelectorAll('.alert-button');  
alertButtons.forEach(button => {  
    button.addEventListener('click', () => {  
        alert('Button clicked: ' + button.textContent);  
    });  
});