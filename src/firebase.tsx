// src/firebase.tsx

import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// The real configuration object using Vite environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// A dummy configuration to use as a fallback if env vars are missing
// This prevents the app from crashing during development.
const dummyConfig = {
  apiKey: "dummy",
  authDomain: "dummy.firebaseapp.com",
  projectId: "dummy",
  storageBucket: "dummy.appspot.com",
  messagingSenderId: "dummy",
  appId: "dummy",
};

// Check if the required environment variables are set.
// We use apiKey as a proxy for all of them.
const areKeysPresent = !!firebaseConfig.apiKey;

// Initialize Firebase with either the real or dummy config
const app: FirebaseApp = initializeApp(areKeysPresent ? firebaseConfig : dummyConfig);

// Log the status to the console for easy debugging
if (areKeysPresent) {
  console.log("Using real Firebase configuration.");
} else {
  console.warn(
    "Firebase environment variables are missing. Using dummy configuration. " +
    "Authentication and database features will not work."
  );
}

// Initialize and export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();

// Conditionally initialize and export Analytics
// This function self-contains the logic for initializing analytics
const initializeAnalytics = (app: FirebaseApp): Analytics | null => {
  if (typeof window !== 'undefined' && areKeysPresent && firebaseConfig.measurementId) {
    try {
      return getAnalytics(app);
    } catch (error) {
      console.warn("Firebase Analytics could not be initialized:", error);
      return null;
    }
  }
  return null;
};

export const analytics = initializeAnalytics(app);