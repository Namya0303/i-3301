import { db } from "./init.js";
import {
  collection,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const tbody = document.querySelector("#leaderboard tbody");

// 🔥 Core leaderboard query
const leaderboardQuery = query(
  collection(db, "users"),
  orderBy("currentLevel", "desc"),
  orderBy("lastSolvedAt", "asc")
);

// Real-time updates
onSnapshot(leaderboardQuery, (snapshot) => {
  tbody.innerHTML = "";

  let rank = 1;

  snapshot.forEach((doc) => {
    const data = doc.data();

    // Optional: hide users who haven't started
    if (!data.username || data.currentLevel === 0) return;

    const tr = document.createElement("tr");

    const time = data.lastSolvedAt
      ? new Date(data.lastSolvedAt.seconds * 1000).toLocaleTimeString()
      : "-";

    tr.innerHTML = `
      <td>${rank}</td>
      <td>${data.username}</td>
      <td>${data.currentLevel}</td>
      <td>${time}</td>
    `;

    tbody.appendChild(tr);
    rank++;
  });
});
