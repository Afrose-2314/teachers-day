// script.js
// Read ?name= from URL and show invitation
(function(){
  // Safe access to DOM after load
  function ready(fn){
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function(){
    // Get name parameter (works when opened locally or from server)
    const params = new URLSearchParams(location.search);
    const rawName = params.get('name') || '';
    const name = decodeURIComponent(rawName).trim();
    const displayName = name ? `Dear ${name}, You are warmly invited!` : 'Dear Respected Teacher, You are warmly invited!';

    document.getElementById('teacherName').innerText = displayName;

    // quotes
    const quotes = [
      "It is the supreme art of the teacher to awaken joy in creative expression and knowledge. – Albert Einstein",
      "A teacher affects eternity; he can never tell where his influence stops. – Henry Adams",
      "Teaching is the profession that teaches all other professions. – Unknown",
      "The best teachers teach from the heart, not from the book. – Unknown",
      "Education is not the filling of a pail, but the lighting of a fire. – William Butler Yeats"
    ];
    document.getElementById('quote').innerText = quotes[Math.floor(Math.random()*quotes.length)];

    // Confetti simple
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    function resize(){ canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    window.addEventListener('resize', resize);
    resize();

    const pieces = [];
    for(let i=0;i<120;i++){
      pieces.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height - canvas.height,
        w: Math.random()*8 + 6,
        h: Math.random()*4 + 3,
        color: `hsl(${Math.random()*360}, 80%, 55%)`,
        velY: Math.random()*1.5 + 0.5,
        velX: (Math.random()-0.5)*1.2,
        rot: Math.random()*Math.PI
      });
    }

    function draw(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      for(const p of pieces){
        ctx.save();
        ctx.translate(p.x,p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
        ctx.restore();

        p.x += p.velX;
        p.y += p.velY;
        p.rot += 0.05;

        if(p.y > canvas.height + 20){ p.y = -20; p.x = Math.random()*canvas.width; }
        if(p.x < -50) p.x = canvas.width + 50;
        if(p.x > canvas.width + 50) p.x = -50;
      }
      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
  });
})();
