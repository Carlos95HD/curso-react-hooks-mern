import 'firebase/firestore';
import 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInWithPopup ,GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APP_ID,
};

// const firebaseConfigTesting = {
//   apiKey: "AIzaSyBJFwV5rlcRoBawmFfOGePrDkMvqcTF8-8",
//   authDomain: "sql-practica-af359.firebaseapp.com",
//   projectId: "sql-practica-af359",
//   storageBucket: "sql-practica-af359.appspot.com",
//   messagingSenderId: "556835417145",
//   appId: "1:556835417145:web:ae3c6e9e62352eb0db31e8"
// };

// let app;

// if (process.env.NODE_ENV === "test") {
  // app = initializeApp(firebaseConfigTesting);
// } else {
  
// }

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const googleAuthProvider = new GoogleAuthProvider();

export {
  db,
  googleAuthProvider,
  signInWithPopup,
  getAuth
}