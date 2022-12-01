// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDvuCcnjCADteyqPJqEWJ6PCpQJM6dsgs",
  authDomain: "fable-ecom.firebaseapp.com",
  projectId: "fable-ecom",
  storageBucket: "fable-ecom.appspot.com",
  messagingSenderId: "992114831588",
  appId: "1:992114831588:web:ad1153e2bdb6f39cd37cf1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;