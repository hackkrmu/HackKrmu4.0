
// Email Validation for Newsletter Form
document.querySelector('form').addEventListener('submit', (e) => {
    const email = document.querySelector('input[name="emailid"]').value;
    if (!/\S+@\S+\.\S+/.test(email)) {
        e.preventDefault();
        alert('Please enter a valid email address.');
    }
});
