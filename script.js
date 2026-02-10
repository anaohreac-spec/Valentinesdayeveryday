// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

let noActivated = false;

// -----------------------------
// Open Envelope
// -----------------------------
envelope.addEventListener("click", () => {
  envelope.style.display = "none";
  letter.style.display = "flex";

  // RESET NO button so it starts next to YES every time
  noActivated = false;
  noBtn.classList.remove("escape");
  noBtn.style.left = "";
  noBtn.style.top = "";
  noBtn.style.transform = "";

  setTimeout(() => {
    document.querySelector(".letter-window").classList.add("open");
  }, 50);
});

// -----------------------------
// NO button: activates ONLY when hovered
// -----------------------------
function moveNoButton() {
  const padding = 20;
  const rect = noBtn.getBoundingClientRect();

  const maxX = window.innerWidth - rect.width - padding;
  const maxY = window.innerHeight - rect.height - padding;

  const x = Math.max(padding, Math.random() * Math.max(maxX, padding));
  const y = Math.max(padding, Math.random() * Math.max(maxY, padding));

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

noBtn.addEventListener("mouseenter", () => {
  if (!noActivated) {
    noActivated = true;

    // switch to fixed positioning BUT keep it where it was first
    const rect = noBtn.getBoundingClientRect();
    noBtn.classList.add("escape");
    noBtn.style.left = `${rect.left}px`;
    noBtn.style.top = `${rect.top}px`;
  }

  moveNoButton();
});

// dodge if cursor gets close (after activation)
document.addEventListener(
  "mousemove",
  (e) => {
    if (!noActivated) return;

    const r = noBtn.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;

    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);

    if (dist < 140) moveNoButton();
  },
  { passive: true }
);

// never allow clicking
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  if (noActivated) moveNoButton();
});

// keep it on-screen if resizing
window.addEventListener("resize", () => {
  if (noActivated) moveNoButton();
});

// -----------------------------
// YES is clicked
// -----------------------------
yesBtn.addEventListener("click", () => {
  title.textContent = "Yippeeee!";
  catImg.src = "cat_dance.gif";

  document.querySelector(".letter-window").classList.add("final");
  buttons.style.display = "none";

  finalText.innerHTML =
    "<strong>Important:</strong> You need to leave your house this friday until 18, dress casual";
  finalText.style.display = "block";
});
