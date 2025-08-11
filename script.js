// Get teacher name from URL (?name=...)
const urlParams = new URLSearchParams(window.location.search);
const teacherName = urlParams.get('name') || "Dear Teacher";

// Quotes for Teachers' Day
const quotes = [
  "A teacher takes a hand, opens a mind, and touches a heart.",
  "Teaching is the profession that teaches all the other professions.",
  "The influence of a good teacher can never be erased.",
  "Teachers plant seeds of knowledge that grow forever."
];

// Pick a random quote
const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

// Set name & quote in HTML
document.getElementById('teacherName').textContent = teacherName;
document.getElementById('quote').textContent = randomQuote;

// Confetti Animation
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confettiPieces = [];
const colors = ['#f39c12', '#d35400', '#e74c3c', '#2ecc71', '#3498db'];

function ConfettiPiece() {
  this.x = Math.random() * canvas.width;
  this.y = Math.random() * canvas.height - canvas.height;
  this.size = Math.random() * 8 + 4;
  this.color = colors[Math.floor(Math.random() * colors.length)];
  this.speed = Math.random() * 3 + 2;
  this.rotation = Math.random() * 360;
}

ConfettiPiece.prototype.update = function() {
  this.y += this.speed;
  if (this.y > canvas.height) {
    this.y = -10;
    this.x = Math.random() * canvas.width;
  }
};

ConfettiPiece.prototype.draw = function() {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  ctx.fill();
};

for (let i = 0; i < 150; i++) {
  confettiPieces.push(new ConfettiPiece());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confettiPieces.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

animate();
