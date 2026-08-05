/*=========================================================
  ANIMATIONS ENGINE — SHARANYA N
  Hardware-accelerated reveals, micro-interactions & tilt
=========================================================*/

"use strict";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/*=========================================================
  SCROLL REVEAL (IntersectionObserver based)
=========================================================*/

function observeRevealElements() {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  document.querySelectorAll(".reveal-left, .reveal-right, .reveal-up").forEach((item) => {
    if (!prefersReducedMotion) {
      revealObserver.observe(item);
    } else {
      item.classList.add("active");
    }
  });
}

function initScrollRevealForSelector(selector, oddClass, evenClass) {
  document.querySelectorAll(selector).forEach((el, index) => {
    if (prefersReducedMotion) {
      el.classList.add("active");
      return;
    }
    el.classList.add(index % 2 === 0 ? oddClass : evenClass);
  });
  observeRevealElements();
}

function initScrollReveal() {
  const revealConfigs = [
    { selector: ".timeline-item", odd: "reveal-left", even: "reveal-right" },
    { selector: ".achievement-card", odd: "reveal-left", even: "reveal-right" },
    { selector: ".about-image", classes: ["reveal-left"] },
    { selector: ".about-content", classes: ["reveal-right"] },
    { selector: ".research-card", classes: ["reveal-up"] },
    { selector: ".education-card", classes: ["reveal-up"] },
    { selector: ".stat-card", odd: "reveal-up", even: "reveal-up" },
    { selector: ".section-title", classes: ["reveal-up"] },
    { selector: ".info-card", odd: "reveal-up", even: "reveal-up" },
    { selector: ".contact-left", classes: ["reveal-left"] },
    { selector: ".contact-right", classes: ["reveal-right"] },
  ];

  revealConfigs.forEach((config) => {
    document.querySelectorAll(config.selector).forEach((el, index) => {
      if (prefersReducedMotion) {
        el.classList.add("active");
        return;
      }
      if (config.classes) {
        el.classList.add(...config.classes);
      } else if (config.odd && config.even) {
        el.classList.add(index % 2 === 0 ? config.odd : config.even);
      }
    });
  });

  observeRevealElements();
}

initScrollReveal();

/*=========================================================
  HERO PROFILE SUBTLE PARALLAX
=========================================================*/

if (!prefersReducedMotion) {
  const heroSection = document.querySelector(".hero");
  const profileWrapper = document.querySelector(".profile-wrapper");

  if (heroSection && profileWrapper) {
    let heroTicking = false;

    heroSection.addEventListener("mousemove", (e) => {
      if (!heroTicking) {
        requestAnimationFrame(() => {
          const x = (window.innerWidth / 2 - e.clientX) / 50;
          const y = (window.innerHeight / 2 - e.clientY) / 50;
          profileWrapper.style.transform = `translate3d(${x * 0.4}px, ${y * 0.4}px, 0)`;
          heroTicking = false;
        });
        heroTicking = true;
      }
    });

    heroSection.addEventListener("mouseleave", () => {
      profileWrapper.style.transform = "translate3d(0, 0, 0)";
    });
  }
}

/*=========================================================
  FLOATING CARDS STAGGER
=========================================================*/

document.querySelectorAll(".floating-card").forEach((card, index) => {
  card.style.animationDelay = `${index * 0.45}s`;
});

/*=========================================================
  MAGNETIC BUTTONS
=========================================================*/

if (!prefersReducedMotion) {
  document.querySelectorAll(".primary-btn, .secondary-btn").forEach((button) => {
    button.addEventListener("mousemove", (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      button.style.transform = `translate3d(${x * 0.15}px, ${y * 0.15}px, 0)`;
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "translate3d(0, 0, 0)";
    });
  });
}

/*=========================================================
  OPTIMIZED CARD TILT (BOUND PER HOVERED CARD)
=========================================================*/

if (!prefersReducedMotion && window.innerWidth > 992) {
  document.querySelectorAll(".glass-card, .project-card, .research-card").forEach((card) => {
    let tiltTicking = false;

    card.addEventListener("mousemove", (e) => {
      if (!tiltTicking) {
        requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const rotateX = (y / rect.height - 0.5) * -8;
          const rotateY = (x / rect.width - 0.5) * 8;
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
          tiltTicking = false;
        });
        tiltTicking = true;
      }
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });
  });
}

/*=========================================================
  STATISTICS COUNTER
=========================================================*/

const counterElements = document.querySelectorAll(".counter");
if (counterElements.length > 0) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const counter = entry.target;
        const target = +counter.dataset.target;
        let count = 0;
        const step = Math.max(target / 60, 1);
        const updateCount = () => {
          count += step;
          if (count < target) {
            counter.innerText = Math.floor(count);
            requestAnimationFrame(updateCount);
          } else {
            counter.innerText = target;
          }
        };
        updateCount();
        counterObserver.unobserve(counter);
      });
    },
    { threshold: 0.4 }
  );

  counterElements.forEach((counter) => counterObserver.observe(counter));
}

console.log("Smooth Animations Ready ✨");
