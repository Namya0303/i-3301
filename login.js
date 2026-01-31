import { auth } from "./init.js";
import { signInWithEmailAndPassword } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

document.getElementById("log-in").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);

    // Hard redirect on success
    window.location.replace("dashboard.html");

  } catch (err) {
    console.error(err);

    if (err.code === "auth/user-not-found") {
      alert("No account found with this email.");
    } else if (err.code === "auth/wrong-password") {
      alert("Incorrect password.");
    } else if (err.code === "auth/invalid-email") {
      alert("Invalid email address.");
    } else {
      alert(err.message);
    }
  }
});
