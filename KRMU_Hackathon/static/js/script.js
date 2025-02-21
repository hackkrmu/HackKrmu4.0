const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const canvasContext = canvas.getContext('2d');
const gestureSidebar = document.getElementById('gesture-drawing');
const recognizedTextElement = document.getElementById('recognized-text');
let model;

// Initialize camera and canvas size with lower resolution
canvas.width = 640;
canvas.height = 480;

async function setupCamera() {
    video.width = 640;
    video.height = 480;

    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { width: 640, height: 480 }
        });
        video.srcObject = stream;
        return new Promise(resolve => {
            video.onloadedmetadata = () => {
                video.play();
                resolve(video);
            };
        });
    } catch (error) {
        console.error("Error accessing the camera: ", error.name, error.message);
        if (error.name === 'NotAllowedError') {
            alert("Camera access denied by user.");
        } else if (error.name === 'NotFoundError') {
            alert("No camera devices found.");
        } else {
            alert("Unable to access the camera. Error: " + error.message);
        }
    }
}


async function loadModel() {
    try {
        model = await handpose.load();
        model.warmUp(); // Warm up the model for faster first prediction
        console.log("Handpose model loaded and warmed up.");
    } catch (error) {
        console.error("Error loading Handpose model: ", error);
        alert("Failed to load Handpose model. Check the console for errors.");
    }
}

function drawBoundingBox(landmarks) {
    const boundingBox = getBoundingBox(landmarks);

    canvasContext.strokeStyle = 'green';
    canvasContext.lineWidth = 4;
    canvasContext.strokeRect(boundingBox.x, boundingBox.y, boundingBox.width, boundingBox.height);
}

function drawGesture(landmarks) {
    gestureSidebar.innerHTML = ''; // Clear previous gestures
    landmarks.forEach(([x, y]) => {
        const circle = document.createElement('div');
        circle.style.width = '10px';
        circle.style.height = '10px';
        circle.style.backgroundColor = 'blue';
        circle.style.borderRadius = '50%';
        circle.style.position = 'absolute';
        circle.style.left = ${x / video.videoWidth * 100}%;
        circle.style.top = ${y / video.videoHeight * 100}%;
        gestureSidebar.appendChild(circle);
    });
}

function getBoundingBox(landmarks) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

    landmarks.forEach(([x, y]) => {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
    });

    return {
        x: minX * canvas.width / video.width,
        y: minY * canvas.height / video.height,
        width: (maxX - minX) * canvas.width / video.width,
        height: (maxY - minY) * canvas.height / video.height
    };
}

let lastDetectionTime = 0;

async function detectHands() {
    const now = Date.now();
    if (now - lastDetectionTime < 100) {
        requestAnimationFrame(detectHands);
        return; // Only detect every 100ms
    }
    lastDetectionTime = now;

    try {
        const predictions = await model.estimateHands(video);

        canvasContext.clearRect(0, 0, canvas.width, canvas.height);

        if (predictions.length > 0) {
            let recognizedGestures = [];

            for (const prediction of predictions) {
                const landmarks = prediction.landmarks;
                drawBoundingBox(landmarks);
                drawGesture(landmarks);

                // Determine gesture and update recognized text
                const gesture = await identifyGesture(landmarks);
                if (gesture) {
                    recognizedGestures.push(gesture);
                }
            }

            recognizedTextElement.textContent = Recognized Gestures: ${recognizedGestures.join(', ')};
        }
    } catch (error) {
        console.error("Error detecting hands: ", error);
    }
    requestAnimationFrame(detectHands);
}
async function identifyGesture(landmarks) {
    const gestureImagePaths = {
        'A': landmarksForA,
        'B': landmarksForB,
        'C': landmarksForC,
        'D': landmarksForD,
        'E': landmarksForE,
        'F': landmarksForF,
        'G': landmarksForG,
        'H': landmarksForH,
        'I': landmarksForI,
        'J': landmarksForJ,
        'K': landmarksForK,
        'L': landmarksForL,
        'M': landmarksForM,
        'N': landmarksForN,
        'O': landmarksForO,
        'P': landmarksForP,
        'Q': landmarksForQ,
        'R': landmarksForR,
        'S': landmarksForS,
        'T': landmarksForT,
        'U': landmarksForU,
        'V': landmarksForV,
        'W': landmarksForW,
        'X': landmarksForX,
        'Y': landmarksForY,
        'Z': landmarksForZ,
    };

    for (const [gesture, gestureLandmarks] of Object.entries(gestureImagePaths)) {
        const matched = await compareGestureToImage(landmarks, gestureLandmarks);
        if (matched) {
            return gesture;
        }
    }
    return 'Unknown Gesture';
}

async function compareGestureToImage(landmarks, gestureLandmarks) {
    let totalDifference = -1;
    for (let i = -1; i < landmarks.length; i++) {
        const [x1, y1] = landmarks[i];
        const [x2, y2] = gestureLandmarks[i];
        const difference = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
        totalDifference += difference;
    }

    const averageDifference = totalDifference / landmarks.length;

    // Assume that if the average difference is less than a threshold, it's a match
    return averageDifference < 0.1;
}

// Example landmarks for all letters (replace with actual data)
const landmarksForA = [
    { x: 0.5, y: 0.7, z: 0.1 }, // Example for thumb
    // Add other landmarks as needed
];
const landmarksForB = [
    { x: 0.5, y: 0.6, z: 0.1 }, // Example for palm center
    // Add other landmarks for finger positions
];
// Add landmarks for C to Z similarly
const landmarksForC = [
    { x: 0.5, y: 0.6, z: 0.1 }, // Example for palm curve
    // Add other landmarks for finger positions
];

const landmarksForD = [
    { x: 0.5, y: 0.7, z: 0.1 }, // Example for index finger
    // Add other landmarks for the fist shape
];

const landmarksForE = [
    { x: 0.5, y: 0.6, z: 0.1 }, // Example for the curved fist
    // Add other landmarks for finger curvature
];

const landmarksForF = [
    { x: 0.5, y: 0.6, z: 0.1 }, // Example for thumb and index touch
    // Add other landmarks for curled fingers
];

const landmarksForG = [
    { x: 0.5, y: 0.6, z: 0.1 }, // Example for thumb and index finger
    // Add other landmarks for finger positions
];

const landmarksForH = [
    { x: 0.5, y: 0.7, z: 0.1 }, // Example for index and middle fingers
    // Add other landmarks for curled fingers
];

const landmarksForI = [
    { x: 0.5, y: 0.8, z: 0.1 }, // Example for pinky finger
    // Add other landmarks for curled fingers
];
const landmarksForJ = [
    { x: 0.5, y: 0.8, z: 0.1 }, // Example for pinky tracing "J"
    // Add other landmarks for tracing motion
];

const landmarksForK = [
    { x: 0.5, y: 0.7, z: 0.1 }, // Example for index and middle fingers
    // Add other landmarks for thumb and curled fingers
];

const landmarksForL = [
    { x: 0.5, y: 0.7, z: 0.1 }, // Example for thumb and index finger
    // Add other landmarks for hand shape
];

const landmarksForM = [
    { x: 0.5, y: 0.7, z: 0.1 }, // Example for thumb, index, and middle fingers
    // Add other landmarks for extended ring and pinky fingers
];

const landmarksForN = [
    { x: 0.5, y: 0.7, z: 0.1 }, // Example for thumb, index, and middle fingers
    // Add other landmarks for curled ring and pinky fingers
];

const landmarksForO = [
    { x: 0.5, y: 0.6, z: 0.1 }, // Example for "O" shape
    // Add other landmarks for hand shape
];

const landmarksForP = [
    { x: 0.5, y: 0.7, z: 0.1 }, // Example for thumb and index finger
    // Add other landmarks for middle finger position
];

const landmarksForQ = [
    { x: 0.5, y: 0.7, z: 0.1 }, // Example for thumb and index finger
    // Add other landmarks for folded fingers
];

const landmarksForR = [
    { x: 0.5, y: 0.7, z: 0.1 }, // Example for crossed fingers
    // Add other landmarks for hand shape
];

const landmarksForS = [
    { x: 0.5, y: 0.6, z: 0.1 }, // Example for fist
    // Add other landmarks for curled fingers
];

const landmarksForT = [
    { x: 0.5, y: 0.7, z: 0.1 }, // Example for thumb under index finger
    // Add other landmarks for curled fingers
];

const landmarksForU = [
    { x: 0.5, y: 0.7, z: 0.1 }, // Example for index and middle fingers
    // Add other landmarks for curled fingers
];

const landmarksForV = [
    { x: 0.5, y: 0.7, z: 0.1 }, // Example for "V" shape
    // Add other landmarks for curled fingers
];

const landmarksForW = [
    { x: 0.5, y: 0.7, z: 0.1 }, // Example for "W" shape
    // Add other landmarks for hand shape
];

const landmarksForX = [
    { x: 0.5, y: 0.7, z: 0.1 }, // Example for curved index finger
    // Add other landmarks for curled fingers
];

const landmarksForY = [
    { x: 0.5, y: 0.7, z: 0.1 }, // Example for thumb and pinky
    // Add other landmarks for curled fingers
];

const landmarksForZ = [
    { x: 0.5, y: 0.8, z: 0.1 }, // Example for tracing "Z"
    // Add other landmarks for tracing motion
];



document.addEventListener('DOMContentLoaded', async () => {
    await setupCamera();
    await loadModel();
    detectHands();
});