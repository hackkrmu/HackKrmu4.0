// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCafSPq3aWUIsbnEpCILfk5yMwq6GssIyg",
  authDomain: "rapidmedxdash123.firebaseapp.com",
  databaseURL: "https://rapidmedxdash123-default-rtdb.firebaseio.com",
  projectId: "rapidmedxdash123",
  storageBucket: "rapidmedxdash123.firebasestorage.app",
  messagingSenderId: "911953243493",
  appId: "1:911953243493:web:f6bdeb2240c5962293058c",
  measurementId: "G-045HBMXKTZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);