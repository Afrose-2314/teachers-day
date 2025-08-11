// Get teacher name from URL (?name=...)
const urlParams = new URLSearchParams(window.location.search);
const teacherName = urlParams.get('name') || "Respected Teacher";

// Quotes for Teachers' Day
const quotes = [
  "A teacher takes a hand, opens a mind, and touches a heart.",
  "Teaching is the one profession that creates all other professions.",
  "Good teachers know how to bring out the best in students.",
  "The influence of a good teacher can never be erased.",
  "Teachers plant the seeds of knowledge that grow forever."
];

// Display name & random quote
document.getElementById("teacherName").textContent = teacherName;
document.getElementById("quote").textContent = quotes[Math.floor(Math.random() * quotes.length)];

// Simple confetti animation
const confettiCanvas = document.getElementById("confetti");
const ctx = confettiCanvas.getContext("2d");
let confettiPieces = [];

function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createConfetti() {
  return {
    x: Math.random() * confettiCanvas.width,
    y: Math.random() * confettiCanvas.height - confettiCanvas.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * 0.5 + 0.5,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    tilt: Math.random() * 10 - 10
  };
}

function drawConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiPieces.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, false);
    ctx.fillStyle = p.color;
    ctx.fill();
  });
  updateConfetti();
}

function updateConfetti() {
  confettiPieces.forEach(p => {
    p.y += p.d;
    p.x += Math.sin(p.tilt);
    if (p.y > confettiCanvas.height) {
      p.x = Math.random() * confettiCanvas.width;
      p.y = -10;
    }
  });
}

function initConfetti() {
  confettiPieces = [];
  for (let i = 0; i < 150; i++) {
    confettiPieces.push(createConfetti());
  }
  setInterval(drawConfetti, 20);
}

initConfetti();
