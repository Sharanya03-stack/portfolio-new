/* ==========================================================================
   AMBIENT.JS — Restrained, Theme-Aware Ambient Canvas Background
   Adapts particle contrast automatically for Dark and Light themes
   ========================================================================== */

"use strict";

(function () {
  const canvas = document.getElementById("ambient-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const DARK_PALETTE = [
    { r: 255, g: 255, b: 255 },  // Soft White Starlight
    { r: 215, g: 220, b: 230 },  // Subtle Neutral
    { r: 190, g: 200, b: 215 },  // Soft Silver Dust
  ];

  const LIGHT_PALETTE = [
    { r: 15, g: 118, b: 110 },  // Deep Teal
    { r: 37, g: 99, b: 235 },   // Royal Blue
    { r: 71, g: 85, b: 105 },   // Slate
  ];

  const CONFIG = {
    desktopCount: 38,
    mobileCount: 18,
    connectionDistance: 88,
    mobileConnectionDist: 58,
  };

  let width = 0;
  let height = 0;
  let dpr = 1;
  let particles = [];
  let animId = null;
  let isPaused = false;
  let isReducedMotion = false;
  let isLightMode = false;

  function checkLightMode() {
    isLightMode = document.documentElement.getAttribute("data-theme") !== "dark";
  }

  class Particle {
    constructor(index) {
      this.colorIndex = index % 3;
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : Math.random() < 0.5 ? -10 : height + 10;

      const speed = 0.14 + Math.random() * 0.22;
      const angle = Math.random() * Math.PI * 2;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;

      this.radius = 1.0 + Math.random() * 1.1;
      this.baseAlpha = 0.12 + Math.random() * 0.18;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < -20) this.x = width + 20;
      if (this.x > width + 20) this.x = -20;
      if (this.y < -20) this.y = height + 20;
      if (this.y > height + 20) this.y = -20;
    }

    getColor() {
      const palette = isLightMode ? LIGHT_PALETTE : DARK_PALETTE;
      return palette[this.colorIndex % palette.length];
    }

    draw(context) {
      const c = this.getColor();
      const alpha = isLightMode ? this.baseAlpha * 0.65 : this.baseAlpha;
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      context.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${alpha})`;
      context.fill();
    }
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    initParticles();
  }

  function initParticles() {
    const isMobile = width < 768;
    const targetCount = isMobile ? CONFIG.mobileCount : CONFIG.desktopCount;

    particles = [];
    for (let i = 0; i < targetCount; i++) {
      particles.push(new Particle(i));
    }
  }

  function drawConnections() {
    const isMobile = width < 768;
    const maxDist = isMobile ? CONFIG.mobileConnectionDist : CONFIG.connectionDistance;
    const maxDistSq = maxDist * maxDist;
    const count = particles.length;
    const baseLineAlpha = isLightMode ? 0.05 : 0.08;

    for (let i = 0; i < count; i++) {
      const p1 = particles[i];
      const c1 = p1.getColor();
      for (let j = i + 1; j < count; j++) {
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < maxDistSq) {
          const dist = Math.sqrt(distSq);
          const alpha = (1 - dist / maxDist) * baseLineAlpha;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${c1.r}, ${c1.g}, ${c1.b}, ${alpha})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }
  }

  function render() {
    if (isPaused) return;

    ctx.clearRect(0, 0, width, height);

    if (!isReducedMotion) {
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
      }
    }

    drawConnections();

    for (let i = 0; i < particles.length; i++) {
      particles[i].draw(ctx);
    }

    if (!isReducedMotion) {
      animId = requestAnimationFrame(render);
    }
  }

  function bindEvents() {
    let resizeTimeout;
    window.addEventListener(
      "resize",
      () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resize, 120);
      },
      { passive: true }
    );

    window.addEventListener("portfolio:themechange", () => {
      checkLightMode();
      if (isReducedMotion) {
        render();
      }
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        isPaused = true;
        if (animId) {
          cancelAnimationFrame(animId);
          animId = null;
        }
      } else {
        isPaused = false;
        if (!animId && !isReducedMotion) {
          animId = requestAnimationFrame(render);
        }
      }
    });

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    isReducedMotion = motionQuery.matches;
    motionQuery.addEventListener("change", (e) => {
      isReducedMotion = e.matches;
      if (!isReducedMotion && !animId && !isPaused) {
        animId = requestAnimationFrame(render);
      }
    });
  }

  function init() {
    checkLightMode();
    bindEvents();
    resize();
    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
