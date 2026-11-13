
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/13.2.0/firebase-auth.js";

import {
    getDatabase,
    ref,
    onValue,
    runTransaction,
    push,
    set
} from "https://www.gstatic.com/firebasejs/13.2.0/firebase-database.js";

// Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyD-K8y2iMoakA3GArOMq0jR9M5fJuO9kGA",
    authDomain: "aspireyouth.firebaseapp.com",
    databaseURL: "https://aspireyouth-default-rtdb.firebaseio.com",
    projectId: "aspireyouth",
    storageBucket: "aspireyouth.firebasestorage.app",
    messagingSenderId: "970336757316",
    appId: "1:970336757316:web:b15ea636210378d262fe11",
    measurementId: "G-N4SB40R0EW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Realtime Database
export const firebaseDb = getDatabase(app);

// IMPORTANT: Your index.html uses dataRef as the root
// reference for the Aspire Youth Initiative data.
export const dataRef = ref(firebaseDb, "ayi");

// Export the functions used by index.html
export {
    ref,
    onValue,
    runTransaction,
    push,
    set,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
};
