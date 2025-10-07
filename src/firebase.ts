// // src/firebase.ts
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAAM-NdI-WEtlgGvsM0DVjdlslXVd7g_E8",
//   authDomain: "usman-portfolio-467ba.firebaseapp.com",
//   projectId: "usman-portfolio-467ba",
//   storageBucket: "usman-portfolio-467ba.appspot.com",
//   messagingSenderId: "150652140033",
//   appId: "1:150652140033:web:3f2b5d8b2a2d5c44a71e00"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Firestore (database)
// export const db = getFirestore(app);

// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;
