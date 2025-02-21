// Form submit handler
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your authentication logic here
});

// Toggle password visibility
document.getElementById('toggle-password').addEventListener('click', () => {
    const passwordField = document.getElementById('password');
    passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
});