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

const duration = 360 * 1000; // 15 sekund
const animationEnd = Date.now() + duration;
let skew = 1;

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function frame() {
  const timeLeft = animationEnd - Date.now();
  const ticks = Math.max(90, 100 * (timeLeft / duration));

  skew = Math.max(0.2, skew - 0.01);

  confetti({
    particleCount: 1,
    startVelocity: 0,
    ticks: ticks,
    origin: {
      x: Math.random(),
      y: Math.random() * skew - 0.2, // przesunięcie cząsteczek
    },
    colors: ["#ffffff"],
    shapes: ["circle"],
    gravity: randomInRange(10, 120),
    scalar: randomInRange(0.1, 1),
    drift: randomInRange(-1, 1),
  });

  if (timeLeft > 0) {
    requestAnimationFrame(frame);
  }
}

// Automatyczny start po załadowaniu strony
window.addEventListener("load", () => {
  setTimeout(() => {
    frame();
  }, 2000); // Start frame function after 2 seconds
});
