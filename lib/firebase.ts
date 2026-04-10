/**
 * Firebase JS SDK — singleton for Match4Marriage web frontend.
 * Used for phone OTP verification during onboarding.
 */
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDlNJijDptCW2PsFSJ1553dkqm_Ch4VgZA",
  authDomain: "match4marriage-48d01.firebaseapp.com",
  projectId: "match4marriage-48d01",
  storageBucket: "match4marriage-48d01.firebasestorage.app",
  messagingSenderId: "418004024095",
  appId: "1:418004024095:web:33d8c2ccc54762a157ce2a",
  measurementId: "G-YY16WFBZB1",
} as const;

function getFirebaseApp(): FirebaseApp {
  if (getApps().length > 0) {
    return getApp();
  }
  return initializeApp(FIREBASE_CONFIG);
}

const firebaseApp: FirebaseApp = getFirebaseApp();
const firebaseAuth: Auth = getAuth(firebaseApp);

export { firebaseApp, firebaseAuth };
