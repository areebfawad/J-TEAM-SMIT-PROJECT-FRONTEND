//firebase configuration
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-IZfadKM5wTGZUyyrVAKdKT2Z4uDvsbg",
  authDomain: "j--team-smit-project.firebaseapp.com",
  projectId: "j--team-smit-project",
  storageBucket: "j--team-smit-project.firebasestorage.app",
  messagingSenderId: "283650391879",
  appId: "1:283650391879:web:239655a59ff34215771662",
  measurementId: "G-FPGJSMCMR6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
export { auth, app};