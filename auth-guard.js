import { auth } from "./init.js";
import { onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// utility delay function
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

onAuthStateChanged(auth, async (user) => {
  // ⏳ wait 3 seconds before acting
  await delay(3000);

  if (user) {
    // logged in → go to dashboard
    window.location.replace("dashboard.html");
  } 
});
console.log("auth guard loaded");