const card = document.getElementById("flip-card");
card.addEventListener("click", () => {
  card.classList.toggle("flipped");
});

const duration = 600 * 1000; 
const animationEnd = Date.now() + duration;
let skew = 1;

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function frame() {
  const timeLeft = animationEnd - Date.now();
  const ticks = Math.max(1, 16 * (timeLeft / duration));

  skew = Math.max(0.2, skew - 0.01);

  // First confetti effect
  confetti({
    particleCount: 1,
    startVelocity: 0,
    ticks: ticks,
    origin: {
      x: Math.random(),
      y: Math.random() * skew - 0.2, // przesunięcie cząsteczek
    },
    colors: ["#ffffff"], // White color for snow
    shapes: ["circle"], // Circle shape for snowflakes
    gravity: randomInRange(10, 60),
    scalar: randomInRange(0.4, 0.6),
    drift: randomInRange(-0.6, 0.6),
    zIndex: -1,
  });

  // Second confetti effect with different scalar and higher z-index
  confetti({
    particleCount: 1,
    startVelocity: 0,
    ticks: ticks,
    origin: {
      x: Math.random(),
      y: Math.random() * skew - 0.1, // przesunięcie cząsteczek
    },
    colors: ["#ffffff"], // White color for snow
    shapes: ["circle"], // Circle shape for snowflakes
    gravity: randomInRange(10, 80),
    scalar: randomInRange(0.01, 0.02),
    drift: randomInRange(-0.4, 0.4),
    zIndex: -2, // Ensure confetti is in front of the card
  });

  if (timeLeft > 0) {
    requestAnimationFrame(frame);
  }
}

// Automatyczny start po załadowaniu strony
window.addEventListener("load", () => {
  const cardElement = document.querySelector(".card");
  const shakeAnimationDuration =
    getComputedStyle(cardElement).animationDuration;
  const delay = parseFloat(shakeAnimationDuration) * 800; // Convert to milliseconds

  setTimeout(() => {
    frame();
  }, delay); // Start frame function after the shake animation duration
});
