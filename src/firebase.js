import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Verificar la clave de entorno
console.log("Firebase API Key:", process.env.REACT_APP_FIREBASE_KEY);

// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "zazil-daa11.firebaseapp.com",
  databaseURL: "https://zazil-daa11-default-rtdb.firebaseio.com",
  projectId: "zazil-daa11",
  storageBucket: "zazil-daa11.appspot.com",
  messagingSenderId: "107009042079",
  appId: "1:107009042079:web:21a6cf88e62d716317e4aa"
};

// Inicialización de Firebase con manejo de errores
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log("Firebase initialized:", app);
} catch (error) {
  console.error("Error initializing Firebase:", error);
}

// Initialize Firebase
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
