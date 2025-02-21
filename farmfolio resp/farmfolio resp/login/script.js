var users = [];

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    // Get the username and password entered by the user
    var username = document.getElementById("username").value;
    var password = parseInt(document.getElementById("password").value);

    // Check if the entered username and password match any user-password pair
    var isAuthenticated = users.some(function(user) {
        return user.username === username && user.password === password;
    });

    // If authentication succeeds, redirect the user to another page
    if (isAuthenticated) {
        // Redirect the user to the home page
        window.location.href = "../homePage/index.html"; 
    } else {
        // If authentication fails, display an error message
        alert("Incorrect username or password. Please try again.");
    }
});

// Function to handle new account creation
document.getElementById("createAccount").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default link behavior

    // Prompt the user to create a new account
    var newUsername = prompt("Enter a new username:");
    var newPassword = parseInt(prompt("Enter a numeric password:"));

    // Add the new user to the users array
    users.push({ username: newUsername, password: newPassword });

    // Log a message to the console indicating that the account has been created
    console.log("New account created:", newUsername);
});
