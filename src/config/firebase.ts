// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";

// getFirestore will help us connect to the fireStore db
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBq6CUDFZpgszguiPC-gMDhZEuLZ69lrl8",
  authDomain: "react-firebase-app-343c4.firebaseapp.com",
  projectId: "react-firebase-app-343c4",
  storageBucket: "react-firebase-app-343c4.appspot.com",
  messagingSenderId: "137980940952",
  appId: "1:137980940952:web:f747efa1a86af147a076ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// firestore starts from here
export const db = getFirestore(app);