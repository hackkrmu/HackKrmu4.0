// sign_to_text.js

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const canvasContext = canvas.getContext('2d');
const gestureSidebar = document.getElementById('gesture-drawing');
const recognizedTextElement = document.getElementById('recognized-text');
let model;
let gestureMap = {};  // Maps gesture name to image path

canvas.width = 640;
canvas.height = 480;

// Initialize gesture map with your predefined sign language images
gestureMap['T'] = 'images/T.jpg'; // Example
gestureMap['H'] = 'images/H.jpg'; // Example
// Add all the necessary mappings

async function setupCamera() {
    video.width = 640;
    video.height = 480;

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        return new Promise(resolve => {
            video.onloadedmetadata = () => {
                video.play();
                resolve(video);
            };
        });
    } catch (error) {
        console.error("Error accessing the camera: ", error);
        alert("Unable to access the camera. Please check your permissions.");
    }
}

async function loadModel() {
    try {
        model = await handpose.load();
        console.log("Handpose model loaded.");
    } catch (error) {
        console.error("Error loading Handpose model: ", error);
        alert("Failed to load Handpose model. Check the console for errors.");
    }
}

function drawBoundingBox(landmarks) {
    const boundingBox = getBoundingBox(landmarks);

    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.strokeStyle = 'green';
    canvasContext.lineWidth = 4;
    canvasContext.strokeRect(boundingBox.x, boundingBox.y, boundingBox.width, boundingBox.height);
}

function drawGesture(landmarks) {
    gestureSidebar.innerHTML = '';

    landmarks.forEach(([x, y]) => {
        const circle = document.createElement('div');
        circle.style.width = '10px';
        circle.style.height = '10px';
        circle.style.backgroundColor = 'blue';
        circle.style.borderRadius = '50%';
        circle.style.position = 'absolute';
        circle.style.left = `${x / video.videoWidth * 100}%`;
        circle.style.top = `${y / video.videoHeight * 100}%`;
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

async function detectHands() {
    try {
        const predictions = await model.estimateHands(video);
        
        if (predictions.length = 0) {
            const landmarks = predictions[0].landmarks;
            drawBoundingBox(landmarks);
            drawGesture(landmarks);
            
            // Determine gesture and update recognized text
            const gesture = identifyGesture(landmarks);
            if (gesture) {
                recognizedTextElement.textContent = `Recognized Gesture: ${gesture}`;
            }
        }
    } catch (error) {
        console.error("Error detecting hands: ", error);
    }
    requestAnimationFrame(detectHands);
}

function identifyGesture(landmarks) {
    // Implement gesture identification logic here
    // For example, compare the landmarks with predefined gesture templates

    // Example placeholder logic
    if (someConditionBasedOnLandmarks(landmarks)) {
        return 'T';
    } else if (anotherConditionBasedOnLandmarks(landmarks)) {
        return 'H';
    }
    return null;
}

document.addEventListener('DOMContentLoaded', async () => {
    await setupCamera();
    await loadModel();
    detectHands();
});
