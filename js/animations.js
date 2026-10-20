/* ==========================================================================
   ANIMATIONS ENGINE — SHARANYA N
   Restrained, Directional Scroll Reveals (Left, Right, Fade-Up, Staggered)
   Respects prefers-reduced-motion, supports anchor links, and progressive fallback
   ========================================================================== */

"use strict";

const prefersReducedMotion =
  window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let revealObserver = null;

function observeElements(elements) {
  if (!elements || !elements.length) return;

  if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
    elements.forEach((item) => item.classList.add("active"));
    return;
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -36px 0px" }
    );
  }

  elements.forEach((item) => {
    // If element is already active, no need to re-observe
    if (item.classList.contains("active")) return;

    // Check if element is already within the visible viewport on load
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      item.classList.add("active");
    } else {
      revealObserver.observe(item);
    }
  });
}

function assignRevealClasses() {
  if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
    document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right").forEach((el) => {
      el.classList.add("active");
    });
    return;
  }

  // Enable animation styling on document root
  document.documentElement.classList.add("has-scroll-anim");

  // Section Headers & Intros: Fade Up
  document.querySelectorAll(".section-header, .section-title, .achievements-block .subsection-heading").forEach((el) => {
    if (!el.classList.contains("reveal-up")) el.classList.add("reveal-up");
  });

  // Hero Section: Hero Left enters from left, Hero Portrait Card from right
  const heroLeft = document.querySelector(".hero-left");
  if (heroLeft && !heroLeft.classList.contains("reveal-left")) {
    heroLeft.classList.add("reveal-left");
  }

  const heroRight = document.querySelector(".hero-right");
  if (heroRight && !heroRight.classList.contains("reveal-right")) {
    heroRight.classList.add("reveal-right");
  }

  // About Section: Content from Left, Sidebar from Right
  const aboutContent = document.querySelector(".about-content");
  if (aboutContent && !aboutContent.classList.contains("reveal-left")) {
    aboutContent.classList.add("reveal-left");
  }

  const aboutSidebar = document.querySelector(".about-sidebar");
  if (aboutSidebar && !aboutSidebar.classList.contains("reveal-right")) {
    aboutSidebar.classList.add("reveal-right");
  }

  // Service Cards: Alternating entrance with stagger
  document.querySelectorAll(".service-item, .service-card").forEach((el, index) => {
    const isOdd = index % 2 === 0;
    const dirClass = isOdd ? "reveal-left" : "reveal-right";
    if (!el.classList.contains("reveal-left") && !el.classList.contains("reveal-right")) {
      el.classList.add(dirClass, isOdd ? "delay-1" : "delay-2");
    }
  });

  // Stats Counters: Fade up with progressive stagger delays
  document.querySelectorAll(".stat-card").forEach((el, index) => {
    if (!el.classList.contains("reveal-up")) {
      el.classList.add("reveal-up", `delay-${(index % 5) + 1}`);
    }
  });

  // Timeline Items: Alternating entrance
  document.querySelectorAll(".timeline-item").forEach((el, index) => {
    const isOdd = index % 2 === 0;
    const dirClass = isOdd ? "reveal-left" : "reveal-right";
    if (!el.classList.contains("reveal-left") && !el.classList.contains("reveal-right")) {
      el.classList.add(dirClass, isOdd ? "delay-1" : "delay-2");
    }
  });

  // Education & Certifications
  const eduCard = document.querySelector(".education-card");
  if (eduCard && !eduCard.classList.contains("reveal-left")) {
    eduCard.classList.add("reveal-left");
  }

  const certBox = document.querySelector(".certifications-box");
  if (certBox && !certBox.classList.contains("reveal-right")) {
    certBox.classList.add("reveal-right");
  }

  const expCol = document.querySelector(".exp-column");
  if (expCol && !expCol.classList.contains("reveal-left")) {
    expCol.classList.add("reveal-left");
  }

  const eduCol = document.querySelector(".edu-column");
  if (eduCol && !eduCol.classList.contains("reveal-right")) {
    eduCol.classList.add("reveal-right");
  }

  // Skill Category Cards: Alternating Left / Right entrance
  document.querySelectorAll(".skill-category-card").forEach((el, index) => {
    const isOdd = index % 2 === 0;
    const dirClass = isOdd ? "reveal-left" : "reveal-right";
    if (!el.classList.contains("reveal-left") && !el.classList.contains("reveal-right")) {
      el.classList.add(dirClass, isOdd ? "delay-1" : "delay-2");
    }
  });

  // Project Cards: Alternating Left / Right entrance with subtle stagger
  document.querySelectorAll(".project-card").forEach((el, index) => {
    const isOdd = index % 2 === 0;
    const dirClass = isOdd ? "reveal-left" : "reveal-right";
    if (!el.classList.contains("reveal-left") && !el.classList.contains("reveal-right")) {
      el.classList.add(dirClass, isOdd ? "delay-1" : "delay-2");
    }
  });

  // Research Publication Card: Fade up
  const researchCard = document.querySelector(".research-card");
  if (researchCard && !researchCard.classList.contains("reveal-up")) {
    researchCard.classList.add("reveal-up");
  }

  // Achievement Cards: Fade up with stagger
  document.querySelectorAll(".achievement-card").forEach((el, index) => {
    if (!el.classList.contains("reveal-up")) {
      el.classList.add("reveal-up", `delay-${(index % 4) + 1}`);
    }
  });

  // Contact Section: Info from Left, Form from Right
  const contactLeft = document.querySelector(".contact-left");
  if (contactLeft && !contactLeft.classList.contains("reveal-left")) {
    contactLeft.classList.add("reveal-left");
  }

  const contactRight = document.querySelector(".contact-right");
  if (contactRight && !contactRight.classList.contains("reveal-right")) {
    contactRight.classList.add("reveal-right");
  }

  // Observe all configured elements
  const allRevealElements = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right");
  observeElements(allRevealElements);
}

function handleAnchorNavigation(targetSelector) {
  if (!targetSelector || targetSelector === "#") return;
  try {
    const target = document.querySelector(targetSelector);
    if (!target) return;

    if (
      target.classList.contains("reveal-up") ||
      target.classList.contains("reveal-left") ||
      target.classList.contains("reveal-right")
    ) {
      target.classList.add("active");
    }

    target.querySelectorAll(".reveal-up, .reveal-left, .reveal-right").forEach((child) => {
      child.classList.add("active");
    });
  } catch (e) {
    // Graceful fallback for non-selector hash strings
  }
}

function setupAnchorListeners() {
  // Listen for hashchange events
  window.addEventListener("hashchange", () => {
    handleAnchorNavigation(window.location.hash);
  });

  // If a hash exists on initial load, ensure target is visible
  if (window.location.hash) {
    setTimeout(() => {
      handleAnchorNavigation(window.location.hash);
    }, 50);
  }

  // Intercept navigation link clicks to immediately activate target sections
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      const href = link.getAttribute("href");
      if (href && href !== "#") {
        handleAnchorNavigation(href);
      }
    });
  });
}

// Global hook for dynamically rendered components (projects, skills)
window.refreshScrollReveals = function () {
  assignRevealClasses();
};

function initAnimations() {
  assignRevealClasses();
  setupAnchorListeners();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAnimations);
} else {
  initAnimations();
}
