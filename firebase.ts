import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDSM2GbXfA_oENZTDc9lZMpigRUeTrUucM",
    authDomain: "afternoon-reset.firebaseapp.com",
    projectId: "afternoon-reset",
    storageBucket: "afternoon-reset.firebasestorage.app",
    messagingSenderId: "244484765403",
    appId: "1:244484765403:web:14b2d47fdf97e1ab6bbefe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
