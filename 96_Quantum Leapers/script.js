var map = L.map('map').setView([28.3720518, 77.3321204], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

var marker = L.marker([28.3720518, 77.3321204]).addTo(map)
    .bindPopup("Default Location: Faridabad")
    .openPopup();

function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                
                document.getElementById("location").value = `${lat}, ${lon}`;

                map.setView([lat, lon], 14);
                marker.setLatLng([lat, lon]).bindPopup("You are here!").openPopup();
            },
            (error) => {
                alert("Could not fetch location. Please enter manually.");
                console.error("Error getting location:", error);
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function submitTeacherInfo() {
    let formData = new FormData(document.getElementById("teacher-form"));

    fetch("http://localhost:5000/register", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error("Error:", error));
}

function findTutors() {
    let locationInput = document.getElementById("location").value.trim();
    let preferredTime = document.getElementById("preferred-time").value;
    let tutorList = document.getElementById("tutor-list");

    if (!locationInput) {
        alert("Please enter your location to find tutors!");
        tutorList.style.display = "none";
        return;
    }

    tutorList.style.display = "block";

    let tutors = [
        {
            name: "Ms. Rema Sharma",
            photo: "teacher1.jpeg",
            experience: "5 years",
            subjects: "Math, Physics",
            location: "1119 Sector 9, Faridabad",
            mapLink: "https://maps.app.goo.gl/8AneUtqsP5vkHMQ37",
            contact: "mailto:emily@example.com",
            rating: 4.5,
            reviews: 12,
            verified: true,
            moreInfoLink: "teacher1.html"
        },
        {
            name: "Ms. Shalu Pandey",
            photo: "teacher2.jpg",
            experience: "7 years",
            subjects: "Python",
            location: "1856 Sector 9, Faridabad",
            mapLink: "https://maps.app.goo.gl/zkzXtVfeWQAh1juG6",
            contact: "mailto:james@example.com",
            rating: 4.8,
            reviews: 20,
            verified: false,
            moreInfoLink: "teacher2.html"
        }
    ];

    let filterSubject = document.getElementById("subject-filter")?.value.toLowerCase();
    let filteredTutors = tutors.filter((tutor) =>
        tutor.subjects.toLowerCase().includes(filterSubject || "")
    );

    if (filteredTutors.length === 0) {
        tutorList.innerHTML = "<p>No tutors found for this subject.</p>";
        return;
    }

    tutorList.innerHTML =
        "<h3>Nearby Tutors:</h3>" +
        filteredTutors
            .map(
                (tutor) => `
            <div class='tutor-card'>
                <div class='tutor-info'>
                    <div class='tutor-photo'>
                        <img src="${tutor.photo}" alt="${tutor.name}">
                        <h4>${tutor.name} ${tutor.verified ? '✔️' : ''}</h4>
                    </div>
                    <div class='tutor-details'>
                        <p><strong>Experience:</strong> ${tutor.experience}</p>
                        <p><strong>Subjects:</strong> ${tutor.subjects}</p>
                        <p><strong>Location:</strong> <a href="${tutor.mapLink}" target="_blank">${tutor.location}</a></p>
                        <p><strong>Rating:</strong> ⭐${tutor.rating} (${tutor.reviews} reviews)</p>
                        <p class='hidden'><strong>Contact:</strong> <a href="${tutor.contact}" target="_blank">Email Tutor</a></p>
                        <button class="btn pay-now" onclick="processPayment('${tutor.name}')">💳 Book & Pay</button>
                    </div>
                </div>
                <button class="btn more-info" onclick="window.location.href='${tutor.moreInfoLink}'">More Info</button> 
            </div>
        `
            )
            .join("");
}

function processPayment(tutorName) {
    alert(`Redirecting to payment gateway for ${tutorName}...`);
}

function approveTutor(button) {
    const row = button.parentElement.parentElement;
    const name = row.cells[0].textContent;
    const subjects = row.cells[1].textContent;

    document.getElementById("verified-tutors").innerHTML += `
        <tr>
            <td>${name}</td>
            <td>${subjects}</td>
        </tr>
    `;
    row.remove();
}

function ignoreTutor(button) {
    const row = button.parentElement.parentElement;
    row.remove();
}

function logout() {
    alert("Logged out");
}

function goBack() {
    window.history.back();
}


function previewPhoto(event) {
    const reader = new FileReader();
    reader.onload = function () {
        const img = document.getElementById("preview-img");
        img.src = reader.result;
        img.style.width = "150px";
        img.style.height = "150px";
    };
    reader.readAsDataURL(event.target.files[0]);
}