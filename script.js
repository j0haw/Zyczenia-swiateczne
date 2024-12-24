function adjustCardSize() {
  const card = document.querySelector(".card");

  if (window.matchMedia("(orientation: landscape)").matches) {
    card.style.width = "420px";
    card.style.height = "680px";
  } else {
    card.style.width = "210px";
    card.style.height = "340px";
  }
}
window.addEventListener("load", adjustCardSize);
window.addEventListener("resize", adjustCardSize);

const card = document.getElementById("flip-card");
card.addEventListener("click", () => {
  card.classList.toggle("flipped");
});

const duration = 150 * 1000; // 15 sekund
const animationEnd = Date.now() + duration;
let skew = 0.002;

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function frame() {
  const timeLeft = animationEnd - Date.now();
  const ticks = Math.max(20, 100 * (timeLeft / duration));

  skew = Math.max(0.2, skew - 0.01);

  confetti({
    particleCount: 1,
    startVelocity: 0,
    ticks: ticks,
    origin: {
      x: Math.random(),
      y: Math.random() * skew - 0.2, // przesunięcie cząsteczek
      origin: { z: -1 },
    },
    colors: ["#ffffff"],
    shapes: ["circle"],
    gravity: randomInRange(0.9, 2),
    scalar: randomInRange(0.4, 20),
    drift: randomInRange(-0.4, 0.7),
  });

  if (timeLeft > 0) {
    requestAnimationFrame(frame);
  }
}

// Automatyczny start po załadowaniu strony
window.addEventListener("load", () => {
  frame();
});
