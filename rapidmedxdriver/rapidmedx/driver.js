const loginForm = document.getElementById('login-form');
const bookingSection = document.getElementById('booking-section');
const mapSection = document.getElementById('map-section');
const locationSection = document.getElementById('location-section');
const bookingList = document.getElementById('booking-list');

let driverLat = 34.0522;
let driverLng = -118.2437;

const bookings = [
  {
    patientName: "Alice Smith",
    pickupLocation: {
      latitude: 34.0622,
      longitude: -118.2337,
      address: "456 Elm St, Los Angeles, CA"
    },
    dropoffLocation: {
      latitude: 34.1111,
      longitude: -118.3000,
      address: "789 Oak Ave, Los Angeles, CA"
    },
    urgency: "Medium",
    bookingId: "BOOK54321"
  },
  {
    patientName: "Bob Johnson",
    pickupLocation: {
      latitude: 34.0888,
      longitude: -118.2666,
      address: "101 Pine Ln, Los Angeles, CA"
    },
    dropoffLocation: {
      latitude: 34.1333,
      longitude: -118.3666,
      address: "112 Maple Dr, Los Angeles, CA"
    },
    urgency: "High",
    bookingId: "BOOK98765"
  }
];

function populateBookings() {
  bookingList.innerHTML = ''; 

  bookings.forEach(booking => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${booking.patientName} - ${booking.pickupLocation.address} (${booking.urgency})</span>
      <button onclick="acceptBooking('${booking.bookingId}')">Accept</button>
    `;
    bookingList.appendChild(li);
  });
}

function acceptBooking(bookingId) {
  alert(`Booking ${bookingId} Accepted!  Navigation starting...`);
  mapSection.classList.remove('hidden');
  locationSection.classList.remove('hidden');
  initializeMap(driverLat, driverLng,
                 bookings.find(booking => booking.bookingId === bookingId).pickupLocation.latitude,
                 bookings.find(booking => booking.bookingId === bookingId).pickupLocation.longitude,
                 bookings.find(booking => booking.bookingId === bookingId).dropoffLocation.latitude,
                 bookings.find(booking => booking.bookingId === bookingId).dropoffLocation.longitude);
}

loginForm.addEventListener('submit', function(event) {
  event.preventDefault();
  alert("Login Successful!");
  document.getElementById('login-section').classList.add('hidden');
  bookingSection.classList.remove('hidden');
  populateBookings();

  document.getElementById('latitude').textContent = driverLat.toFixed(4);
  document.getElementById('longitude').textContent = driverLng.toFixed(4);

  locationSection.classList.remove('hidden');
});

let map;
let routingControl;

function initializeMap(driverLat, driverLng, pickupLat, pickupLng, dropoffLat, dropoffLng) {
    if (map) {
        map.remove(); 
    }

    map = L.map('map-container').setView([driverLat, driverLng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const driverMarker = L.marker([driverLat, driverLng]).addTo(map).bindPopup('Your Location (Ambulance)');
    const pickupMarker = L.marker([pickupLat, pickupLng]).addTo(map).bindPopup('Pickup Location');
    const dropoffMarker = L.marker([dropoffLat, dropoffLng]).addTo(map).bindPopup('Dropoff Location');


    routingControl = L.Routing.control({
        waypoints: [
            L.latLng(driverLat, driverLng),
            L.latLng(pickupLat, pickupLng),
            L.latLng(dropoffLat, dropoffLng)
        ],
        routeWhileDragging: false,
        showAlternatives: false,
         createMarker: function(i, waypoint, numberOfWaypoints) { 
            if (i === 0) {
                return driverMarker;
            } else if (i === 1) {
                return pickupMarker;
            } else {
                return dropoffMarker;
            }
        }

    }).addTo(map);


    routingControl.on('routesfound', function (e) {
      const routes = e.routes;
      const summary = routes[0].summary;
      console.log('Total distance: ' + summary.totalDistance / 1000 + ' km');
      console.log('Total time: ' + Math.round(summary.totalTime / 60) + ' minutes');

      const instructions = routes[0].instructions;
      const instructionsList = document.getElementById('instructions-list');
      instructionsList.innerHTML = ''; 

      instructions.forEach(instruction => {
        const li = document.createElement('li');
        li.textContent = instruction.text;
        instructionsList.appendChild(li);
      });
    });


    routingControl.on('routingerror', function(e) {
        console.error("Routing error:", e);
        alert("Could not find a route.  Please check the locations.");
    });

}