import { initializeApp } from "firebase/app";
import { initializeFirestore, persistentLocalCache, CACHE_SIZE_UNLIMITED } from "firebase/firestore";

// Tu configuración de Firebase
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIRESTORE_API_KEY,
    authDomain: "todo-5a5bb.firebaseapp.com",
    projectId: "todo-5a5bb",
    storageBucket: "todo-5a5bb.appspot.com",
    messagingSenderId: "67514266474",
    appId: "1:67514266474:web:dab94cb5f1d4932ef22b13"
};

const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
  localCache: persistentLocalCache({size: CACHE_SIZE_UNLIMITED})
});

export { db };
