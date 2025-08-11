// script.js

// Get teacher name from URL
const urlParams = new URLSearchParams(window.location.search);
const teacherName = urlParams.get('name') || "Dear Teacher";
document.getElementById("teacherName").textContent = teacherName;

// Random quotes
const quotes = [
  "It is the supreme art of the teacher to awaken joy in creative expression and knowledge. – Albert Einstein",
  "Teaching is the one profession that creates all other professions.",
  "A teacher takes a hand, opens a mind, and touches a heart.",
  "The influence of a good teacher can never be erased."
];

document.getElementById("quote").textContent = quotes[Math.floor(Math.random() * quotes.length)];

// Confetti animation
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetti = [];

function ConfettiParticle() {
  this.x = Math.random() * canvas.width;
  this.y = Math.random() * canvas.height - canvas.height;
  this.r = Math.random() * 6 + 4;
  this.d = Math.random() * 50 + 50;
  this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
  this.tilt = Math.random() * 10 - 10;
  this.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
  this.tiltAngle = 0;

  this.draw = () => {
    ctx.beginPath();
    ctx.lineWidth = this.r / 2;
    ctx.strokeStyle = this.color;
    ctx.moveTo(this.x + this.tilt + this.r / 4, this.y);
    ctx.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 4);
    ctx.stroke();
  };
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach((c, i) => {
    c.tiltAngle += c.tiltAngleIncrement;
    c.y += (Math.cos(c.d) + 3 + c.r / 2) / 2;
    c.x += Math.sin(c.d);
    c.tilt = Math.sin(c.tiltAngle) * 15;

    if (c.y > canvas.height) {
      confetti[i] = new ConfettiParticle();
      confetti[i].y = -10;
    }
    c.draw();
  });
  requestAnimationFrame(drawConfetti);
}

for (let i = 0; i < 150; i++) {
  confetti.push(new ConfettiParticle());
}
drawConfetti();
