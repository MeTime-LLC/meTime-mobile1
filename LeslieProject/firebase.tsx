// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getStorage, ref } from "firebase/storage"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcHWS5V6Lbf_Kb0ZudHsWOO_Um-dkUBJg",
  authDomain: "leslie-fb600.firebaseapp.com",
  projectId: "leslie-fb600",
  storageBucket: "leslie-fb600.appspot.com",
  messagingSenderId: "890240387296",
  appId: "1:890240387296:web:a8ea027f5d44657f272885",
  measurementId: "G-86QGPZPTE5",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app, "gs://leslie-fb600.appspot.com")

// const analytics = getAnalytics(app);
