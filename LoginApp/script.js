document.getElementById('cta-button').addEventListener('click', function() {
  alert('Button clicked! Implement your functionality here.');
});
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});
// Login Form Handling
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Add your authentication logic here
  console.log('Login attempted with:', { username, password });
  
  // Temporary success message
  alert('Login successful! Redirecting...');
  // window.location.href = 'dashboard.html'; // Uncomment for actual redirect
});