import confetti from "canvas-confetti";

export const triggerConfetti = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ["#0085CA", "#38BDF8", "#22D3EE"],
  });
  fire(0.2, {
    spread: 60,
    colors: ["#6366F1", "#38BDF8", "#ffffff"],
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ["#0085CA", "#22D3EE", "#60A5FA"],
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    colors: ["#0284c7", "#38bdf8", "#818cf8"],
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ["#ffffff", "#0085CA"],
  });
};
