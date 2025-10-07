// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAM-NdI-WEtlgGvsM0DVjdlslXVd7g_E8",
  authDomain: "usman-portfolio-467ba.firebaseapp.com",
  projectId: "usman-portfolio-467ba",
  storageBucket: "usman-portfolio-467ba.appspot.com",
  messagingSenderId: "150652140033",
  appId: "1:150652140033:web:3f2b5d8b2a2d5c44a71e00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore (database)
export const db = getFirestore(app);