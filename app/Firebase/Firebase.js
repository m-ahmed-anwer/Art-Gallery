// Import the functions you need from the SDKs you need

import firebase from "firebase/compat";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { get, getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVQ3jRUwAkuxOKYAadkTOozTUekwcpzC4",
  authDomain: "arts-ae3f6.firebaseapp.com",
  projectId: "arts-ae3f6",
  storageBucket: "arts-ae3f6.appspot.com",
  messagingSenderId: "207964209076",
  appId: "1:207964209076:web:a7ed8a03ac33d954b7bce1",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

if (!firebase.apps.length) {
  app;
}

const db = getDatabase(app);

export { firebase, db };
