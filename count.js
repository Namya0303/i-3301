// 🔴 SET EVENT END TIME HERE (UTC recommended)
const EVENT_END_TIME = new Date("2026-02-01T04:00:00").getTime();

const hoursEl = document.getElementById("hours");
const minsEl = document.getElementById("mins");
const secsEl = document.getElementById("secs");

function updateCountdown() {
  const now = Date.now();
  const diff = EVENT_END_TIME - now;

  // ⛔ Event over
  if (diff <= 0) {
    hoursEl.textContent = "00";
    minsEl.textContent = "00";
    secsEl.textContent = "00";

    const playBtn = document.querySelector(".button[href='game.html']");
    if (playBtn) {
      playBtn.textContent = "Event Ended";
      playBtn.classList.add("disabled");
      playBtn.onclick = (e) => e.preventDefault();
    }

    clearInterval(timer);
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const hours = Math.floor(totalSeconds / 3600);        // ⬅ cumulative hours
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  hoursEl.textContent = String(hours).padStart(2, "0");
  minsEl.textContent = String(minutes).padStart(2, "0");
  secsEl.textContent = String(seconds).padStart(2, "0");
}

// Initial call
updateCountdown();

// Update every second
const timer = setInterval(updateCountdown, 1000);
