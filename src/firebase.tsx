
// src/firebase.tsx

// Import the necessary functions from Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Use dummy values as fallbacks to prevent initialization errors
// These values are for development only and won't work for actual Firebase features
const DUMMY_API_KEY = "AIzaSyDummyKeyForDevPurposesOnly123456";
const DUMMY_AUTH_DOMAIN = "dummy-project.firebaseapp.com";
const DUMMY_PROJECT_ID = "dummy-project-id";
const DUMMY_STORAGE_BUCKET = "dummy-project.appspot.com";
const DUMMY_MESSAGING_SENDER_ID = "123456789012";
const DUMMY_APP_ID = "1:123456789012:web:abc123def456";

// Firebase configuration object using Vite environment variables with fallbacks
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || DUMMY_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || DUMMY_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || DUMMY_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || DUMMY_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || DUMMY_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || DUMMY_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase in a way that prevents crashes
let app;
let auth;
let provider;
let analytics = null;
let db = null;

try {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);
  
  // Initialize Firestore
  db = getFirestore(app);
  
  // Initialize Firebase Authentication
  auth = getAuth(app);
  
  // Initialize Google Auth Provider
  provider = new GoogleAuthProvider();
  
  // Optional: Initialize Firebase Analytics (only if needed and in production)
  if (typeof window !== "undefined" && import.meta.env.PROD && firebaseConfig.measurementId) {
    try {
      analytics = getAnalytics(app);
      console.log("Firebase Analytics initialized.");
    } catch (error) {
      console.warn("Firebase Analytics could not be initialized:", error);
    }
  }
} catch (error) {
  console.error("Firebase initialization error:", error);
  
  // Still need to define these variables to prevent import errors
  app = null;
  auth = null;
  provider = null;
}

// Log whether we're using real or dummy Firebase config
if (import.meta.env.VITE_FIREBASE_API_KEY) {
  console.log("Using real Firebase configuration from environment variables");
} else {
  console.warn(
    "Using dummy Firebase configuration. Authentication and database operations will not work. " +
    "To enable Firebase features, add the required environment variables to your .env file."
  );
}

// Export Firebase services
export { app, auth, provider, analytics, db };
