/**
 * Animation Engine & Reliable Native Scroll Architecture
 * Native vertical scrolling with CSS smooth behavior and gentle GSAP ScrollTrigger reveals.
 * Zero scroll-jacking, zero wheel/touch blocking, fully accessible.
 */

"use strict";

(function () {
  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 1. Top Scroll Progress Indicator & Header Scroll State
  function initScrollTracking() {
    const progressBar = document.getElementById("scrollProgressBar");
    const header = document.querySelector(".site-header");
    const backToTopBtn = document.getElementById("backToTopBtn");

    function onScrollUpdate() {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      // Update progress bar
      if (progressBar && docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
        progressBar.style.width = `${progress}%`;
      }

      // Header blur styling
      if (header) {
        if (scrollY > 30) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }
      }

      // Back to top button visibility
      if (backToTopBtn) {
        if (scrollY > 400) {
          backToTopBtn.classList.add("visible");
        } else {
          backToTopBtn.classList.remove("visible");
        }
      }
    }

    window.addEventListener("scroll", onScrollUpdate, { passive: true });
    onScrollUpdate(); // Initial check

    // Back to Top trigger
    if (backToTopBtn) {
      backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    // Native Smooth Anchor Navigation with Header Offset
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const href = anchor.getAttribute("href");
        if (!href || href === "#") return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();

          // Close mobile menu if open
          const mobileMenu = document.getElementById("navMenu");
          const menuToggle = document.getElementById("mobileMenuToggle");
          if (mobileMenu && mobileMenu.classList.contains("open")) {
            mobileMenu.classList.remove("open");
            if (menuToggle) menuToggle.classList.remove("active");
          }

          const headerOffset = 68;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: isReducedMotion ? "auto" : "smooth",
          });
        }
      });
    });
  }

  // 2. Gentle Section Entrance Reveals (GSAP ScrollTrigger, No Pinning, No Hijacking)
  function initSectionReveals() {
    if (isReducedMotion || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const sections = document.querySelectorAll(".reveal-section");
    sections.forEach((sec) => {
      gsap.fromTo(
        sec,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sec,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Refresh after DOM content & images stabilize
    window.addEventListener("load", () => {
      ScrollTrigger.refresh();
    });
  }

  // 3. Mobile Menu Navigation
  function initMobileMenu() {
    const toggle = document.getElementById("mobileMenuToggle");
    const menu = document.getElementById("navMenu");
    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.contains("open");
      if (isOpen) {
        menu.classList.remove("open");
        toggle.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
      } else {
        menu.classList.add("open");
        toggle.classList.add("active");
        toggle.setAttribute("aria-expanded", "true");
      }
    });

    document.addEventListener("click", (e) => {
      if (menu.classList.contains("open") && !menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove("open");
        toggle.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initScrollTracking();
    setTimeout(initSectionReveals, 100);
    initMobileMenu();
  });
})();
