function preloadImages(images) {
  let loadedCount = 0;

  images.forEach((src) => {
    const img = new Image();
    img.src = src;
    img.loading = "lazy"; // Add loading attribute

    img.onload = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        console.log("Zdjęcia załadowane");
      }
    };

    img.onerror = () => {
      console.error(`Nie udało się załadować obrazu: ${src}`);
    };
  });
}

// Preload obrazków kartki
preloadImages(["kartkaŚwiateczna-01.png", "kartkaŚwiateczna-02.png"]);

const card = document.getElementById("flip-card");
card.addEventListener("click", () => {
  card.classList.toggle("flipped");
});

const duration = 360 * 1000; // 36 sekund
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
      y: Math.random() * skew - 0.2, // przesunięcie cząsteczek
    },
    colors: ["#ffffff"], // White color for snow
    shapes: ["circle"], // Circle shape for snowflakes
    gravity: randomInRange(10, 120),
    scalar: randomInRange(0.1, 1),
    drift: randomInRange(-1, 1),
    zIndex: -1, // Ensure confetti is behind the card
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
  const delay = parseFloat(shakeAnimationDuration) * 1000; // Convert to milliseconds

  setTimeout(() => {
    frame();
  }, delay); // Start frame function after the shake animation duration
});
