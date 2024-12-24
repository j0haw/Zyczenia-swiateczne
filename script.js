const card = document.getElementById("flip-card");
card.addEventListener("click", () => {
  card.classList.toggle("flipped");
});

const duration = 360 * 1000;
const animationEnd = Date.now() + duration;
let skew = 1;

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function frame() {
  const timeLeft = animationEnd - Date.now();
  const ticks = Math.max(1, 16 * (timeLeft / duration));

  skew = Math.max(0.2, skew - 0.01);

  confetti({
    particleCount: 1,
    startVelocity: 0,
    ticks: ticks,
    origin: {
      x: Math.random(),
      y: Math.random() * skew - 0.2,
      colors: ["#ffffff"],
      shapes: ["circle"],
      gravity: randomInRange(10, 80),
      scalar: randomInRange(0.4, 0.6),
      drift: randomInRange(-0.2, 0.2),
      zIndex: -1,
    },
  });

  confetti({
    particleCount: 1,
    startVelocity: 0,
    ticks: ticks,
    origin: {
      x: Math.random(),
      y: Math.random() * skew - 0.1,
    },
    colors: ["#ffffff"],
    shapes: ["circle"],
    gravity: randomInRange(10, 80),
    scalar: randomInRange(0.01, 0.1),
    drift: randomInRange(-0.2, 0.2),
    zIndex: 2,
  });

  if (timeLeft > 0) {
    requestAnimationFrame(frame);
  }
}

window.addEventListener("load", () => {
  const cardElement = document.querySelector(".card");
  const shakeAnimationDuration =
    getComputedStyle(cardElement).animationDuration;
  const delay = parseFloat(shakeAnimationDuration) * 800;

  setTimeout(() => {
    frame();
  }, delay);
});
