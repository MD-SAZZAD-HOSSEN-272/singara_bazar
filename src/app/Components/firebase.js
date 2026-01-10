// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6c2kpd3Cj1Qul-BvTIAKnamVfZ6i6cJs",
  authDomain: "singara-bazar.firebaseapp.com",
  projectId: "singara-bazar",
  storageBucket: "singara-bazar.firebasestorage.app",
  messagingSenderId: "315465867782",
  appId: "1:315465867782:web:bd56a7abce353d0e39d987",
  measurementId: "G-JHSWG53EFN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);