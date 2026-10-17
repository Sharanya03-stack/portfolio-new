/*=========================================================
  ANIMATIONS ENGINE — SHARANYA N
  Restrained, high-performance scroll reveals (respects prefers-reduced-motion)
=========================================================*/

"use strict";

const prefersReducedMotion =
  window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function observeRevealElements() {
  const elements = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right");
  if (!elements.length) return;

  if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
    elements.forEach((item) => item.classList.add("active"));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
  );

  elements.forEach((item) => {
    revealObserver.observe(item);
  });
}

function initScrollRevealForSelector(selector) {
  document.querySelectorAll(selector).forEach((el) => {
    if (prefersReducedMotion) {
      el.classList.add("active");
      return;
    }
    el.classList.add("reveal-up");
  });
  observeRevealElements();
}

function initScrollReveal() {
  const selectors = [
    ".section-header-block",
    ".service-card",
    ".stat-card",
    ".cred-card",
    ".research-card",
    ".achievement-card",
    ".contact-left",
    ".contact-right",
  ];

  selectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      if (prefersReducedMotion) {
        el.classList.add("active");
        return;
      }
      el.classList.add("reveal-up");
    });
  });

  observeRevealElements();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initScrollReveal);
} else {
  initScrollReveal();
}
