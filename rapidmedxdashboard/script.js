let firebaseApp;
try {
    firebaseApp = firebase.initializeApp(firebaseConfig);
} catch (e) {
    console.error("Firebase initialization error:", e.message);
    alert("Firebase initialization failed. Check your configuration.");
}

let auth;
let db;
if (firebaseApp) {
    auth = firebase.auth();
    db = firebase.firestore(); 
}

let currentUser = null;  
let map; 
let ambulanceMarkers = {}; 

const loginSignupContainer = document.getElementById('loginSignup');
const dashboardContainer = document.getElementById('dashboard');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const showSignupLink = document.getElementById('showSignup');
const showLoginLink = document.getElementById('showLogin');

const loginError = document.getElementById('loginError');
const signupError = document.getElementById('signupError');

function show(elementId) {
    document.getElementById(elementId).style.display = 'block';
}

function hide(elementId) {
    document.getElementById(elementId).style.display = 'none';
}

showSignupLink.addEventListener('click', (e) => {
    e.preventDefault();
    hide('loginForm');
    show('signupForm');
    loginError.textContent = ''; 
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    hide('signupForm');
    show('loginForm');
    signupError.textContent = ''; 
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    loginError.textContent = ''; 

    if (!auth) {
        loginError.textContent = "Firebase not initialized. Check config.";
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            currentUser = userCredential.user; // Store the user
            updateUI(currentUser);
        })
        .catch((error) => {
            console.error("Login error:", error.code, error.message);  // Log to console for debugging
            loginError.textContent = error.message; // Display to user
        });
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    signupError.textContent = ''; 

    if (!auth) {
        signupError.textContent = "Firebase not initialized. Check config.";
        return;
    }

    if (!email || !password) {
        signupError.textContent = "Email and password are required.";
        return;
    }

    console.log("Attempting signup with:", email, password); // Debugging
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            currentUser = userCredential.user;
            console.log("Signup successful!", currentUser);
            updateUI(currentUser);
        })
        .catch((error) => {
            console.error("Signup error:", error.code, error.message);
            signupError.textContent = error.message;
        });
});

const logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', () => {
    if (!auth) return; 

    auth.signOut()
        .then(() => {
            currentUser = null;
            updateUI(null);
        })
        .catch(error => {
            console.error("Logout error:", error);
        });
});

function updateUI(user) {
    if (user) {
        hide('loginSignup');
        show('dashboard');
        initializeMap(); 

        loadAmbulanceData();
    } else {
        show('loginSignup');
        hide('dashboard');
        if (map) {
            map.remove(); 
            map = null;
        }
    }
}

// --- Ambulance Data (PLACEHOLDER) ---
const totalAmbulancesEl = document.getElementById('totalAmbulances');
const activeAmbulancesEl = document.getElementById('activeAmbulances');
const inactiveAmbulancesEl = document.getElementById('inactiveAmbulances');
const ambulanceDetailsSection = document.getElementById('ambulanceDetailsSection');
const ambulanceIdEl = document.getElementById('ambulanceId');
const ambulanceStatusEl = document.getElementById('ambulanceStatus');
const ambulanceDriverEl = document.getElementById('ambulanceDriver');
const patientNameEl = document.getElementById('patientName');
const pickupLocationEl = document.getElementById('pickupLocation');
const dropoffLocationEl = document.getElementById('dropoffLocation');
const ambulanceHistoryEl = document.getElementById('ambulanceHistory');
const stopRouteButton = document.getElementById('stopRouteButton');

let ambulanceData = [
    { id: '1', ambulanceId: 'A001', status: 'active', location: { lat: 34.0522, lng: -118.2437 }, driver: 'John Doe', patient: 'Alice Smith', pickup: 'Hospital A', dropoff: 'Home' },
    { id: '2', ambulanceId: 'A002', status: 'inactive', location: { lat: 37.7749, lng: -122.4194 }, driver: 'Jane Smith', patient: null, pickup: null, dropoff: null },
    { id: '3', ambulanceId: 'A003', status: 'active', location: { lat: 40.7128, lng: -74.0060 }, driver: 'Mike Brown', patient: 'Bob Johnson', pickup: 'Accident Site', dropoff: 'Hospital B' },
    { id: '4', ambulanceId: 'A004', status: 'inactive', location: { lat: 41.8781, lng: -87.6298 }, driver: 'Emily Davis', patient: null, pickup: null, dropoff: null },
];

let ambulanceHistoryData = {
  'A001': [
    { timestamp: '2024-01-26 10:00', event: 'Dispatched to Hospital A' },
    { timestamp: '2024-01-26 10:30', event: 'Arrived at Hospital A' },
    { timestamp: '2024-01-26 11:00', event: 'En route to Home' },
  ],
  'A002': [],
  'A003': [
    { timestamp: '2024-01-26 14:00', event: 'Dispatched to Accident Site' },
    { timestamp: '2024-01-26 14:45', event: 'Arrived at Accident Site' },
    { timestamp: '2024-01-26 15:30', event: 'En route to Hospital B' },
  ],
  'A004': [],
};

function initializeMap() {
    if (!document.getElementById('map')) {
        console.error("Map container not found.");
        return;
    }

    map = L.map('map').setView([0, 0], 2); // Default view

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    updateAmbulanceMarkers();
}
function updateAmbulanceMarkers() {
    if (!map) return;

    ambulanceData.forEach(ambulance => {
        if (!ambulance.location) return;

        const ambulanceId = ambulance.ambulanceId;
        if (ambulanceMarkers[ambulanceId]) {
            ambulanceMarkers[ambulanceId].setLatLng([ambulance.location.lat, ambulance.location.lng]);
        } else {
            // Create a marker if it doesn't exist
            const marker = L.marker([ambulance.location.lat, ambulance.location.lng]).addTo(map);
            marker.bindPopup(`<b>${ambulanceId}</b><br>Status: ${ambulance.status}<br><button data-ambulance-id="${ambulanceId}" class="show-details-btn">Show Details</button>`);
            ambulanceMarkers[ambulanceId] = marker;
        }
    });
    addClickHandlers();
}

function loadAmbulanceData() {
    if (!db) {
        console.warn("Firestore not initialized. Cannot load ambulance data.");
        return;
    }

    totalAmbulancesEl.textContent = ambulanceData.length;
    activeAmbulancesEl.textContent = ambulanceData.filter(a => a.status === 'active').length;
    inactiveAmbulancesEl.textContent = ambulanceData.filter(a => a.status === 'inactive').length;
}
// Event listener for the dynamically created button
function addClickHandlers() {
    document.querySelectorAll('.show-details-btn').forEach(button => {
        button.addEventListener('click', function() {
            const ambulanceId = this.dataset.ambulanceId;
            showAmbulanceDetails(ambulanceId);
        });
    });
}
function showAmbulanceDetails(ambulanceId) {
    console.log('Showing details for ambulance:', ambulanceId);
    const ambulance = ambulanceData.find(a => a.ambulanceId === ambulanceId);

    if (ambulance) {
        ambulanceIdEl.textContent = ambulance.ambulanceId;
        ambulanceStatusEl.textContent = ambulance.status;
        ambulanceDriverEl.textContent = ambulance.driver || "N/A";
        patientNameEl.textContent = ambulance.patient || "N/A";
        pickupLocationEl.textContent = ambulance.pickup || "N/A";
        dropoffLocationEl.textContent = ambulance.dropoff || "N/A";
        renderAmbulanceHistory(ambulanceId);

        show('ambulanceDetailsSection'); // Show the ambulance details section
        // Center the map on ambulance location
        if (ambulance.location && map) {
             map.setView([ambulance.location.lat, ambulance.location.lng], 13);
        }
    } else {
        console.warn("Ambulance not found:", ambulanceId);
    }
}

function renderAmbulanceHistory(ambulanceId) {
    ambulanceHistoryEl.innerHTML = ''; // Clear previous history

    const history = ambulanceHistoryData[ambulanceId] || [];

    history.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.timestamp}: ${item.event}`;
        ambulanceHistoryEl.appendChild(li);
    });
}

stopRouteButton.addEventListener('click', () => {
  //Implement logic to stop the route
  console.log('Stop route button clicked!');
  alert('Route stopped!');
});

// Initial check for logged-in user on page load
if (auth) {
    auth.onAuthStateChanged(user => {
        currentUser = user;
        updateUI(user);
    });
} else {
    console.warn("Authentication is not initialized.  The page might not function correctly");
}