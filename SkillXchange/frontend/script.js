
document.addEventListener('DOMContentLoaded', function() {

    const signupButton = document.getElementById('signup-btn');
    const signupModal = document.getElementById('signup-popup');
    const closeButton = document.querySelector('.close-btn');


    signupButton.addEventListener('click', function() {
        signupModal.style.display = 'block';
    });

    closeButton.addEventListener('click', function() {
        signupModal.style.display = 'none';
    });


    window.addEventListener('click', function(event) {
        if (event.target === signupModal) {
            signupModal.style.display = 'none';
        }
    });
});

