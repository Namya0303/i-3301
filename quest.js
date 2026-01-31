import { auth, db } from "./init.js";
import { onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  doc,
  getDoc,
  updateDoc,
  increment,
  serverTimestamp,
  addDoc,
  collection
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const loader = document.getElementById("loader");
const container = document.getElementById("quest-container");
const questionArea = document.getElementById("question-area");
const levelNumberEl = document.getElementById("level-number");
const answerForm = document.getElementById("answer-form");
const answerInput = document.getElementById("answer-input");
const feedback = document.getElementById("feedback");

let currentUser;
let userData;
let levelData;

// 🔑 Normalization (DO NOT CHANGE)
function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "");
}

// 🔐 SHA-256 hashing
async function hashAnswer(ans) {
  const buffer = new TextEncoder().encode(ans);
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.replace("/login.html");
    return;
  }

  currentUser = user;

  // 1️⃣ Fetch user
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);
  userData = userSnap.data();

  const currentLevel = userData.currentLevel;
  levelNumberEl.textContent = currentLevel;

  // 2️⃣ Fetch level using DOCUMENT ID = level number
  const levelRef = doc(db, "Levels", String(currentLevel));
  const levelSnap = await getDoc(levelRef);

  if (!levelSnap.exists()) {
    questionArea.innerHTML = "<p>No more levels. Hunt completed 🎉</p>";
    answerForm.style.display = "none";
    return;
  }

  levelData = levelSnap.data();

  if (!levelData.isActive) {
    questionArea.innerHTML = "<p>This level is currently disabled.</p>";
    answerForm.style.display = "none";
    return;
  }

  // 3️⃣ Render question
  if (levelData.Qtype === "text") {
    questionArea.innerHTML = `<p style="color:white;">${levelData.Q}</p>`;
  }

  if (levelData.Qtype === "img") {
    questionArea.innerHTML = `
      <img src="${levelData.imgurl}" style="max-width:100%; border-radius:8px;" />
    `;
  }

  loader.style.display = "none";
  container.style.display = "block";
});

// 4️⃣ Handle answer submission
answerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const raw = answerInput.value.trim();
  if (!raw) return;

  const normalized = normalize(raw);
  let isCorrect = false;

  // 🔁 Validation logic based on Atype
  if (levelData.Atype === "username") {
    isCorrect = normalized === normalize(userData.username);
  }

  if (levelData.Atype === "hash") {
    const hashed = await hashAnswer(normalized);
    isCorrect = hashed === levelData.Ahash;
  }

  // 5️⃣ Log attempt
  await addDoc(collection(db, "attempts"), {
    userId: currentUser.uid,
    level: userData.currentLevel,
    answer: normalized,
    isCorrect,
    timestamp: serverTimestamp()
  });

  if (!isCorrect) {
    feedback.textContent = "❌ Incorrect. Try again.";
    feedback.style.color = "red";
    answerInput.value = "";
    return;
  }

  // ✅ Correct answer
  feedback.textContent = "✅ Correct!";
  feedback.style.color = "green";

  // 6️⃣ Advance level
  await updateDoc(doc(db, "users", currentUser.uid), {
    currentLevel: increment(1),
    score: increment(1),
    lastSolvedAt: serverTimestamp()
  });

  setTimeout(() => {
    window.location.reload();
  }, 1000);
});
    