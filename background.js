// ==============================
// Relaxing Floating Circles
// ==============================
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

let width, height;
let circles = [];

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  initCircles();
}

function initCircles() {
  circles = [];
  for (let i = 0; i < 30; i++) {
    circles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 40 + 20,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      color: `rgba(139, 94, 52, ${Math.random() * 0.2 + 0.05})`
    });
  }
}

function drawCircles() {
  ctx.clearRect(0, 0, width, height);

  circles.forEach(c => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2, false);
    ctx.fillStyle = c.color;
    ctx.fill();

    c.x += c.dx;
    c.y += c.dy;

    if (c.x - c.r > width) c.x = -c.r;
    if (c.x + c.r < 0) c.x = width + c.r;
    if (c.y - c.r > height) c.y = -c.r;
    if (c.y + c.r < 0) c.y = height + c.r;
  });

  requestAnimationFrame(drawCircles);
}

resizeCanvas();
drawCircles();
window.addEventListener("resize", resizeCanvas);

// ==============================
// Smooth Scroll Navigation (Up + Down)
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const links = ["index.html", "portfolio.html", "about.html"];
  const current = window.location.pathname.split("/").pop() || "index.html";
  const index = links.indexOf(current);

  // Fade-in on page load
  document.body.classList.add("fade-in");

  let scrolling = false;

  window.addEventListener("wheel", e => {
    if (!scrolling) {
      scrolling = true;

      let nextPage;
      if (e.deltaY > 0) {
        // Scroll down → next page
        nextPage = links[(index + 1) % links.length];
      } else if (e.deltaY < 0) {
        // Scroll up → previous page
        nextPage = links[(index - 1 + links.length) % links.length];
      }

      if (nextPage) {
        document.body.classList.remove("fade-in");
        document.body.classList.add("fade-out");
        setTimeout(() => {
          window.location.href = nextPage;
        }, 600); // matches CSS transition time
      }

      // debounce
      setTimeout(() => (scrolling = false), 800);
    }
  }, { passive: true });
});
