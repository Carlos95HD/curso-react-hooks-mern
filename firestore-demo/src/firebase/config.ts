import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseApp = initializeApp({
  apiKey: "AIzaSyBJFwV5rlcRoBawmFfOGePrDkMvqcTF8-8",
  authDomain: "sql-practica-af359.firebaseapp.com",
  projectId: "sql-practica-af359",
  storageBucket: "sql-practica-af359.appspot.com",
  messagingSenderId: "556835417145",
  appId: "1:556835417145:web:2b830e24ba58c433db31e8"
});
// Initialize Firebase
const db = getFirestore();

export default db;