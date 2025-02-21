// Function to handle form submission
document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get the new username and password entered by the user
    var newUsername = document.getElementById("newUsername").value;
    var newPassword = parseInt(document.getElementById("newPassword").value);

    // Add the new user to the users array in the parent window (login page)
    window.opener.users.push({ username: newUsername, password: newPassword });

    // Close the registration window
    window.close();
});
