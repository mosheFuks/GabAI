// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOaUlEqcmsu6rfuDPKGGughUm3Y-ojOF8",
  authDomain: "gabai-e7a42.firebaseapp.com",
  projectId: "gabai-e7a42",
  storageBucket: "gabai-e7a42.firebasestorage.app",
  messagingSenderId: "476442187182",
  appId: "1:476442187182:web:ce30784db204609b14643f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);