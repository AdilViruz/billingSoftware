// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDK33Io1hfKdxsxViJhQE4cBLnAyZBKSes",
  authDomain: "ksn-otp.firebaseapp.com",
  projectId: "ksn-otp",
  storageBucket: "ksn-otp.appspot.com",
  messagingSenderId: "535635150525",
  appId: "1:535635150525:web:490a05bf750f41937699d4",
  measurementId: "G-SFGEH73HG3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
