import { auth } from "./init.js";
import { signOut } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Force logout immediately
(async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error("Logout error:", err);
  } finally {
    // Hard redirect (cannot be cancelled)
    window.location.replace("/login.html");
  }
})();
