// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoxVqrygoKEeq4Unr2BX1N8XIi4TsB4sI",
  authDomain: "hopwood-top-trumps.firebaseapp.com",
  projectId: "hopwood-top-trumps",
  storageBucket: "hopwood-top-trumps.firebasestorage.app", // Corrected from .firebasestorage.app to .appspot.com
  messagingSenderId: "32711001149",
  appId: "1:32711001149:web:ea14830d44a70463385654",
  measurementId: "G-W5M02P4E40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
const auth = getAuth(app)
const firestore = getFirestore(app)
const storage = getStorage(app)
// const functions = getFunctions(app) // Uncomment if you plan to call functions from the client

export { app, auth, firestore, storage /*, functions */ }
