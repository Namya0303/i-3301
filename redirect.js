import { auth } from "./init.js";
import { onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Block access if user is NOT logged in
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // Hard redirect – cannot be bypassed
    window.location.replace("/login.html");
  }
});
