import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { initializeFirestore } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyBP7zH28ogap1IyfC0B6QOGsrKVggFVF7U",
    authDomain: "i-3301.firebaseapp.com",
    projectId: "i-3301",
    storageBucket: "i-3301.firebasestorage.app",
    messagingSenderId: "809709895338",
    appId: "1:809709895338:web:28debca2aa13d54c119ad3",
    measurementId: "G-R4RFH0PGBY"
  };

const app = initializeApp(firebaseConfig);

// 🔥 IMPORTANT: auth AFTER app init
const auth = getAuth(app);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true
});

console.log("Firebase initialized");

export { auth, db };


