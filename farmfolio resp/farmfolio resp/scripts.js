
// login
document.getElementById("login").addEventListener("click", function() {
    window.open("login/login.html", "_blank");});


// bio artical

document.getElementById("bioFert").addEventListener("click", function() {
    window.open("orgFet/index.html", "_blank");});


function toggleMenuLayout() {
    const navLinks = document.getElementById("navLinks");
    const burgerMenu = document.querySelector(".threeLine");

    
    
    if (window.innerWidth <= 768) {
        navLinks.classList.add("column-layout"); 
        burgerMenu.style.display = "flex"; 
        navLinks.style.display = "none"; 
    } else {
        navLinks.classList.remove("column-layout"); 
        burgerMenu.style.display = "none"; 
        navLinks.style.display = "flex"; 
    }
}


function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    const burgerMenu = document.querySelector(".threeLine");

    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
        navLinks.style.display = "flex"; 
        burgerMenu.classList.add("active"); 
    } else {
        navLinks.style.display = "none"; 
    }
}


window.addEventListener("load", toggleMenuLayout);
window.addEventListener("resize", toggleMenuLayout);


function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    const burgerMenu = document.querySelector(".threeLine");

    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
        navLinks.style.display = "flex"; 
        burgerMenu.classList.add("active"); 
    } else {
        navLinks.style.display = "none"; 
        burgerMenu.classList.remove("active"); 
    }
}
document.getElementById("login").addEventListener("click", function() {
    window.location.href = "login/index.html";
});


// image sliding
function slideImages() {
    const slider = document.querySelector('.slider');
    let slides = document.querySelectorAll('.slider img');
    let currentIndex = 0;
    const slideWidth = 600; 
    const intervalDuration = 3000; 


    function nextSlide() {
        currentIndex++;
        if (currentIndex === slides.length) {
            currentIndex = 0; 

            slider.style.transition = "none";
            slider.style.transform = `translateX(0)`;

            setTimeout(() => {
                slider.style.transition = "transform 2s ease-in-out"; 
                slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
            }, 100);
        } else {
            slider.style.transition = "transform 2s ease-in-out"; 
            slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        }
    }

    setTimeout(() => {
        nextSlide();
        setInterval(nextSlide, intervalDuration); 
    }, intervalDuration); 
}

window.addEventListener('load', slideImages);

