// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABrvoy8l2P0DK7h2mJZ1GOCyLboA4v-88",
  authDomain: "email-login-password.firebaseapp.com",
  projectId: "email-login-password",
  storageBucket: "email-login-password.appspot.com",
  messagingSenderId: "441028402274",
  appId: "1:441028402274:web:d60182ee824701a456053b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth =getAuth(app)
export default auth