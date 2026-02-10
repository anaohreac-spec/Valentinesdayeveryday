// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

// -----------------------------
// Open Envelope
// -----------------------------
envelope.addEventListener("click", () => {
  envelope.style.display = "none";
  letter.style.display = "flex";

  setTimeout(() => {
    document.querySelector(".letter-window").classList.add("open");
    moveNoButton(); // move once when it appears
  }, 50);
});

// -----------------------------
// NO button: move anywhere on full screen
// -----------------------------
function moveNoButton() {
  const padding = 20;

  // Force layout update to get correct size
  const rect = noBtn.getBoundingClientRect();

  const maxX = window.innerWidth - rect.width - padding;
  const maxY = window.innerHeight - rect.height - padding;

  // Prevent negative values on tiny screens
  const x = Math.max(padding, Math.random() * Math.max(maxX, padding));
  const y = Math.max(padding, Math.random() * Math.max(maxY, padding));

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

// Make it dodge whenever you get close (desktop + mobile)
function handlePointerMove(e) {
  const r = noBtn.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;

  const px = e.clientX ?? (e.touches && e.touches[0]?.clientX);
  const py = e.clientY ?? (e.touches && e.touches[0]?.clientY);

  if (px == null || py == null) return;

  const dx = px - cx;
  const dy = py - cy;
  const dist = Math.hypot(dx, dy);

  // If pointer gets close, move it
  if (dist < 140) moveNoButton();
}

// Extra: also move immediately if it’s hovered/entered
noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("pointerenter", moveNoButton);

// Prevent any click from doing anything (just in case)
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  moveNoButton();
});

// Track pointer/finger movement
document.addEventListener("mousemove", handlePointerMove, { passive: true });
document.addEventListener("touchmove", handlePointerMove, { passive: true });
document.addEventListener("pointermove", handlePointerMove, { passive: true });

// If user resizes the screen, keep it in-bounds
window.addEventListener("resize", moveNoButton);

// -----------------------------
// YES is clicked
// -----------------------------
yesBtn.addEventListener("click", () => {
  title.textContent = "Yippeeee!";
  catImg.src = "cat_dance.gif";

  document.querySelector(".letter-window").classList.add("final");
  buttons.style.display = "none";

  // Updated final text
  finalText.innerHTML =
    "<strong>Important:</strong> You need to leave your house this friday until 18, dress casual";
  finalText.style.display = "block";
});
