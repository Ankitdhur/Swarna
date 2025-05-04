// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import auth ->Step1
import { getAuth } from "firebase/auth";
//import FireStore DataBase ->Step-1
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDy-iyXEVLUSjWnkjTvbrLAJzlMc8SDd9I",
  authDomain: "swarna-61885.firebaseapp.com",
  projectId: "swarna-61885",
  storageBucket: "swarna-61885.firebasestorage.app",
  messagingSenderId: "480943522950",
  appId: "1:480943522950:web:c53425ffa6b36325a07d07",
  measurementId: "G-K9WZ264KXT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//auth-Step2
const auth=getAuth(app);
//DB-Step2
const DB=getFirestore();
export {auth,DB}