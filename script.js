// Get teacher's name from URL
const params = new URLSearchParams(window.location.search);
const teacherName = params.get("name") || "Respected Teacher";
document.getElementById("teacherName").innerText = `Dear ${teacherName}, You are warmly invited!`;

// Random Teacher's Day quotes
const quotes = [
    "It is the supreme art of the teacher to awaken joy in creative expression and knowledge. – Albert Einstein",
    "A teacher affects eternity; he can never tell where his influence stops. – Henry Adams",
    "Teaching is the profession that teaches all other professions. – Unknown",
    "The best teachers teach from the heart, not from the book. – Unknown",
    "Education is not the filling of a pail, but the lighting of a fire. – William Butler Yeats"
];
document.getElementById("quote").innerText = quotes[Math.floor(Math.random() * quotes.length)];

// Confetti Animation
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confettiPieces = [];
for (let i = 0; i < 150; i++) {
    confettiPieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 6 + 4,
        d: Math.random() * 50 + 50,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        tilt: Math.random() * 10 - 10,
        tiltAngle: Math.random() * Math.PI
    });
}

function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiPieces.forEach(p => {
        ctx.beginPath();
        ctx.lineWidth = p.r / 2;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
        ctx.stroke();
    });
    updateConfetti();
}

function updateConfetti() {
    confettiPieces.forEach(p => {
        p.y += Math.cos(p.d) + 1 + p.r / 2;
        p.x += Math.sin(p.d);
        p.tiltAngle += 0.1;
        p.tilt = Math.sin(p.tiltAngle) * 15;
        if (p.y > canvas.height) {
            p.y = -10;
            p.x = Math.random() * canvas.width;
        }
    });
}

setInterval(drawConfetti, 20);
