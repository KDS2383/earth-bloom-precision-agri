// src/firebase.tsx (or wherever your file is located)

// Import the necessary functions from Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // *** Make sure these are imported ***
import { getAnalytics } from "firebase/analytics"; // Import if you use Analytics

// Firebase configuration object using Vite environment variables
const firebaseConfig = {
  // These names MUST match the variables in your .env file
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID // Optional
};

// --- Environment Variable Validation (Recommended) ---
if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId) {
  console.error(
    "Firebase configuration is missing essential values. " +
    "Make sure you have a .env file in your project root with " +
    "VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, and VITE_FIREBASE_PROJECT_ID defined."
  );
  // Consider throwing an error or handling this case appropriately
  // throw new Error("Firebase configuration is incomplete.");
}
// --- End Validation ---


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// *** Initialize Firebase Authentication (Needed for Login/Signup) ***
const auth = getAuth(app);

// *** Initialize Google Auth Provider (Needed for Google Sign-In) ***
const provider = new GoogleAuthProvider();

// Optional: Initialize Firebase Analytics (only if needed and in production)
let analytics = null;
if (typeof window !== "undefined" && import.meta.env.PROD && firebaseConfig.measurementId) {
  try {
     analytics = getAnalytics(app);
     console.log("Firebase Analytics initialized.");
  } catch (error) {
      console.warn("Firebase Analytics could not be initialized:", error);
  }
}

// Export Firebase services you need for your app
export { app, auth, provider, analytics }; // Make sure auth and provider are exported