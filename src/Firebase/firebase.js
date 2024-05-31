// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIRESTORE_API_KEY,
    authDomain: "todo-5a5bb.firebaseapp.com",
    projectId: "todo-5a5bb",
    storageBucket: "todo-5a5bb.appspot.com",
    messagingSenderId: "67514266474",
    appId: "1:67514266474:web:dab94cb5f1d4932ef22b13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);