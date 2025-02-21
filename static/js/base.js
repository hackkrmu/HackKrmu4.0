// base.js

document.addEventListener('DOMContentLoaded', () => {
    const flashMessages = document.querySelectorAll('.flash-message');
    flashMessages.forEach(message => {
        const type = message.dataset.type || 'info';
        showNotification(message.innerText, type);
    });
});


// Function to toggle the user profile dropdown menu    
function toggleDropdown() {
    var dropdown = document.getElementById('user-dropdown');
    dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block';
}

// Function to toggle the notification menu
function toggleNotificationMenu() {
    var menu = document.getElementById('notification-menu');
    menu.classList.toggle('active');
}

// Close dropdowns and menus if the user clicks outside of them
window.onclick = function(event) {
    var dropdown = document.getElementById('user-dropdown');
    var notificationMenu = document.getElementById('notification-menu');
    
    // Close the user profile dropdown if clicked outside
    if (!event.target.matches('.user-icon') && !event.target.closest('.user-profile')) {
        if (dropdown.style.display === 'block') {
            dropdown.style.display = 'none';
        }
    }
    
    // Close the notification menu if clicked outside
    if (!event.target.matches('.fas.fa-bell') && !event.target.closest('.notification')) {
        if (notificationMenu.classList.contains('active')) {
            notificationMenu.classList.remove('active');
        }
    }
}

// Function to automatically hide notifications after a delay
function autoHideNotifications() {
    const notifications = document.querySelectorAll('.notification');
    notifications.forEach(notification => {
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.remove();
            }, 600); // Match the fade-out duration in CSS
        }, 3000); // Show for 3 seconds
    });
}

// Initialize auto-hide functionality
document.addEventListener('DOMContentLoaded', autoHideNotifications);
