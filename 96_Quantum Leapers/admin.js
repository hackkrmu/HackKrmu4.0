document.addEventListener("DOMContentLoaded", () => {
  checkAdmin();
});

function adminLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "admin" && password === "password") {
    alert("Admin Logged in Successfully");
    window.location.href = "adminPanel.html";
  } else {
    alert("Incorrect Password");
  }
}

function checkAdmin() {
  fetch("http://localhost:5000/check-admin", { credentials: "include" })
    .then((res) => res.json())
    .then((data) => {
      if (data.loggedIn) {
        document.getElementById("login-section").classList.add("d-none");
        document.getElementById("admin-panel").classList.remove("d-none");
        loadTutors();
      }
    })
    .catch((error) => console.error("Error checking admin session:", error));
}

function loadTutors() {
  fetch("http://localhost:5000/tutors-pending", { credentials: "include" })
    .then((res) => res.json())
    .then((tutors) => {
      let html = "";
      tutors.forEach((tutor) => {
        html += `<tr>
                    <td>${tutor.name}</td>
                    <td>${tutor.subjects}</td>
                    <td>
                        <button class="btn success" onclick="verifyTutor(${tutor.id})">Verify</button>
                        <button class="btn danger" onclick="deleteTutor(${tutor.id})">Delete</button>
                    </td>
                </tr>`;
      });
      document.getElementById("pending-tutors").innerHTML = html;
    });

  fetch("http://localhost:5000/tutors", { credentials: "include" })
    .then((res) => res.json())
    .then((tutors) => {
      let html = "";
      tutors.forEach((tutor) => {
        html += `<tr>
                    <td>${tutor.name}</td>
                    <td>${tutor.subjects}</td>
                </tr>`;
      });
      document.getElementById("verified-tutors").innerHTML = html;
    });
}

function verifyTutor(id) {
  fetch(`http://localhost:5000/verify/${id}`, {
    method: "POST",
    credentials: "include",
  })
    .then((res) => res.json())
    .then(() => loadTutors())
    .catch((error) => console.error("Error verifying tutor:", error));
}

function deleteTutor(id) {
  fetch(`http://localhost:5000/delete/${id}`, {
    method: "DELETE",
    credentials: "include",
  })
    .then((res) => res.json())
    .then(() => loadTutors())
    .catch((error) => console.error("Error deleting tutor:", error));
}

function logout() {
  fetch("http://localhost:5000/logout", {
    method: "POST",
    credentials: "include",
  })
    .then(() => {
      document.getElementById("login-section").classList.remove("d-none");
      document.getElementById("admin-panel").classList.add("d-none");
    })
    .catch((error) => console.error("Error logging out:", error));
}
