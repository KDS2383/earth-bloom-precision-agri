// src/firebase/firebase.tsx

// Import the necessary functions from Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCE5qftP4rCNjBNS8efaIMaOUmVDJtlfu0",
  authDomain: "sujal-firebase-auth.firebaseapp.com",
  projectId: "sujal-firebase-auth",
  storageBucket: "sujal-firebase-auth.firebasestorage.app",
  messagingSenderId: "574639121807",
  appId: "1:574639121807:web:d5eab9201a78a0e0de97fa",
  measurementId: "G-0FM82N24K6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Google Auth Provider (for Google Sign-In)
const provider = new GoogleAuthProvider();

// Optional: Initialize Firebase Analytics (only if in production)
let analytics = null;
if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
  analytics = getAnalytics(app);
}

// Export Firebase services you need
export { app, auth, db, provider, analytics };

// Comment out the alternative implementation
// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";

// // Firebase config
// const firebaseConfig = {
//     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//     authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//     projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//     storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//     appId: import.meta.env.VITE_FIREBASE_APP_ID,
//     measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
//   };
  
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();

// // Optional: Analytics (only if browser & production)
// let analytics: any = null;

// if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
//   import("firebase/analytics").then((analyticsModule) => {
//     analytics = analyticsModule.getAnalytics(app);
//   }).catch((err) => {
//     console.warn("Analytics not initialized:", err);
//   });
// }

// export { app, auth, provider, analytics };
