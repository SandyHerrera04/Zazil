import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

/*
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "tutorial-5a2cf.firebaseapp.com",
  projectId: "tutorial-5a2cf",
  storageBucket: "tutorial-5a2cf.appspot.com",
  messagingSenderId: "585126334212",
  appId: "1:585126334212:web:8539eafc56885e1b4c4a51"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
*/

// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "zazil-daa11.firebaseapp.com",
  projectId: "zazil-daa11",
  storageBucket: "zazil-daa11.appspot.com",
  messagingSenderId: "107009042079",
  appId: "1:107009042079:web:21a6cf88e62d716317e4aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);