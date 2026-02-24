// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBh0oGZG7a8rhWPwViZHUYJH4Z7P6weznk",
  authDomain: "jawarantau-55902.firebaseapp.com",
  projectId: "jawarantau-55902",
  storageBucket: "jawarantau-55902.firebasestorage.app",
  messagingSenderId: "605293193500",
  appId: "1:605293193500:web:bd7c01e959c6fa3c3bf2d9",
  measurementId: "G-PX5HH63GZE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
