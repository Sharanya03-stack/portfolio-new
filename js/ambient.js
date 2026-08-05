/* ==========================================================================
   AMBIENT.JS — Minimal, Light & Elegant Ambient Motion Background
   Author: Sharanya N Portfolio
   ========================================================================== */

"use strict";

(function () {
  const canvas = document.getElementById("ambient-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Configuration
  const CONFIG = {
    desktopCount: 60,
    mobileCount: 28,
    connectionDistance: 95,
    mobileConnectionDist: 65,
    colors: [
      { r: 0, g: 229, b: 255 },     // Cyan
      { r: 168, g: 85, b: 247 },    // Soft Violet
      { r: 59, g: 130, b: 246 },    // Soft Blue
      { r: 124, g: 58, b: 237 }     // Purple
    ],
    mouseRadius: 130
  };

  let width = 0;
  let height = 0;
  let dpr = 1;
  let particles = [];
  let animId = null;
  let isPaused = false;
  let isReducedMotion = false;
  let mouse = { x: -1000, y: -1000, active: false };

  // Particle Class
  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : (Math.random() < 0.5 ? -10 : height + 10);
      
      // Gentle, smooth drift velocities
      const speed = 0.2 + Math.random() * 0.35;
      const angle = Math.random() * Math.PI * 2;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      
      this.baseRadius = 1.0 + Math.random() * 1.4;
      this.radius = this.baseRadius;
      
      // Color & Opacity
      this.color = CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)];
      this.baseAlpha = 0.15 + Math.random() * 0.35;
      this.alpha = this.baseAlpha;
      
      // Subtle organic breathing oscillation
      this.pulseSpeed = 0.01 + Math.random() * 0.02;
      this.pulsePhase = Math.random() * Math.PI * 2;
    }

    update() {
      // Breathing pulse
      this.pulsePhase += this.pulseSpeed;
      this.alpha = this.baseAlpha + Math.sin(this.pulsePhase) * 0.12;

      // Position update
      this.x += this.vx;
      this.y += this.vy;

      // Gentle mouse interaction
      if (mouse.active) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < CONFIG.mouseRadius && dist > 0) {
          const force = (1 - dist / CONFIG.mouseRadius) * 0.8;
          this.x += (dx / dist) * force;
          this.y += (dy / dist) * force;
        }
      }

      // Wrap around edges smoothly
      if (this.x < -20) this.x = width + 20;
      if (this.x > width + 20) this.x = -20;
      if (this.y < -20) this.y = height + 20;
      if (this.y > height + 20) this.y = -20;
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${Math.max(0.05, this.alpha)})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha * 0.8})`;
      ctx.fill();
      ctx.shadowBlur = 0; // reset for performance
    }
  }

  // Setup & Sizing
  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    ctx.scale(dpr, dpr);

    initParticles();
  }

  function initParticles() {
    const isMobile = width < 768;
    const targetCount = isMobile ? CONFIG.mobileCount : CONFIG.desktopCount;

    particles = [];
    for (let i = 0; i < targetCount; i++) {
      particles.push(new Particle());
    }
  }

  // Draw Faint Proximity Constellation Lines
  function drawConnections() {
    const isMobile = width < 768;
    const maxDist = isMobile ? CONFIG.mobileConnectionDist : CONFIG.connectionDistance;
    const maxDistSq = maxDist * maxDist;
    const count = particles.length;

    for (let i = 0; i < count; i++) {
      const p1 = particles[i];
      for (let j = i + 1; j < count; j++) {
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < maxDistSq) {
          const dist = Math.sqrt(distSq);
          const alpha = (1 - dist / maxDist) * 0.12; // Ultra light, gossamer connection

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          
          // Gradient between particle colors
          const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
          grad.addColorStop(0, `rgba(${p1.color.r}, ${p1.color.g}, ${p1.color.b}, ${alpha})`);
          grad.addColorStop(1, `rgba(${p2.color.r}, ${p2.color.g}, ${p2.color.b}, ${alpha})`);
          
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
    }
  }

  // Main Animation Loop
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

    animId = requestAnimationFrame(render);
  }

  // Event Listeners
  function bindEvents() {
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 100);
    }, { passive: true });

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    }, { passive: true });

    window.addEventListener("mouseleave", () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
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
        if (!animId) {
          animId = requestAnimationFrame(render);
        }
      }
    });

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    isReducedMotion = motionQuery.matches;
    motionQuery.addEventListener("change", (e) => {
      isReducedMotion = e.matches;
    });
  }

  // Init
  function init() {
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
