import { auth, db } from "./init.js";
import { onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// AUTH + EMAIL VERIFICATION GUARD
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.replace("login.html");
    return;
  }

  // Fetch user data from Firestore
  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    alert("User record missing. Contact admin.");
    return;
  }

  const data = snap.data();

  // Inject into DOM
  document.getElementById("username").textContent = data.username;
  document.getElementById("level").textContent = data.currentLevel;
  document.getElementById("points").textContent = data.score;

  // Reveal page once data is ready
  document.getElementById("load").style.display = "none";
  document.getElementById("mainBod").style.display = "block";
});
