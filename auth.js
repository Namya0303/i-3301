import { auth, db } from "./init.js";
import {
  createUserWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


document.getElementById("sign-up").addEventListener("submit", async (e) => {
  e.preventDefault();
console.log("submit intercepted");

  const p1name = document.getElementById("name1").value.trim();
  const p2name = document.getElementById("name2").value.trim();
  const college = document.getElementById("college").value.trim();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("pass").value;
    const passc = document.getElementById("passc").value;
    
  if (password !== passc) {
    alert("Passwords do not match- be more careful bruh");
    return;
  }
  try {
  console.log("Starting signup");

  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  console.log("Firebase signup done");

  const uid = userCred.user.uid;

  await setDoc(doc(db, "users", uid), {
    username,
    email,
    college,

    participant1: { name: p1name },
    participant2: { name: p2name },

    score: 0,
    currentLevel: 1,
    lastSolvedAt: null,

    createdAt: serverTimestamp(),
    isAdmin: false
  });

  console.log("User doc written");


} 
    catch (err) {
  console.error(err);

  if (err.code === "auth/email-already-in-use") {
    alert("An account with this email already exists. Please log in.");
  } else if (err.code === "auth/weak-password") {
    alert("Password must be at least 6 characters- dont be lazy bruh");
  } else if (err.code === "auth/invalid-email") {
    alert("Enter a valid email address.- ayo dont fool us");
  } else {
    alert(err.message);
  }
}
  } 
);
