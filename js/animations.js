/**
 * Animation Engine & Smooth Vertical Scroll Architecture (Refined)
 * Lenis Smooth Scroll synchronized with GSAP ScrollTrigger for gentle section reveals.
 * Zero horizontal pinning, smooth anchor navigation, and top scroll progress indicator.
 */

"use strict";

(function () {
  let lenisInstance = null;
  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 1. Lenis Smooth Scroll Setup
  function initLenis() {
    if (isReducedMotion || typeof Lenis === "undefined") return;

    try {
      lenisInstance = new Lenis({
        duration: 1.05,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.2,
      });

      // Synchronize Lenis with GSAP ScrollTrigger (Single Unified Ticker)
      if (typeof ScrollTrigger !== "undefined" && typeof gsap !== "undefined") {
        lenisInstance.on("scroll", () => {
          ScrollTrigger.update();
        });

        gsap.ticker.add((time) => {
          lenisInstance.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
      } else {
        function raf(time) {
          lenisInstance.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      }
    } catch (err) {
      console.warn("Lenis initialization notice:", err);
    }
  }

  // 2. Top Scroll Progress Indicator & Header Scroll State
  function initScrollTracking() {
    const progressBar = document.getElementById("scrollProgressBar");
    const header = document.querySelector(".site-header");
    const backToTopBtn = document.getElementById("backToTopBtn");

    function onScrollUpdate() {
      const scrollY = window.scrollY;
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
        if (scrollY > 500) {
          backToTopBtn.classList.add("visible");
        } else {
          backToTopBtn.classList.remove("visible");
        }
      }
    }

    window.addEventListener("scroll", onScrollUpdate, { passive: true });
    onScrollUpdate(); // Initial check

    if (backToTopBtn) {
      backToTopBtn.addEventListener("click", () => {
        if (lenisInstance) {
          lenisInstance.scrollTo(0, { duration: 1.1 });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
    }

    // Smooth Anchor Navigation
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const href = anchor.getAttribute("href");
        if (!href || href === "#") return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();

          // Close mobile drawer if open
          const mobileMenu = document.getElementById("navMenu");
          const menuToggle = document.getElementById("mobileMenuToggle");
          if (mobileMenu && mobileMenu.classList.contains("open")) {
            mobileMenu.classList.remove("open");
            if (menuToggle) menuToggle.classList.remove("active");
          }

          if (lenisInstance) {
            lenisInstance.scrollTo(target, { offset: -65, duration: 1.1 });
          } else {
            const top = target.getBoundingClientRect().top + window.scrollY - 65;
            window.scrollTo({ top, behavior: "smooth" });
          }
        }
      });
    });
  }

  // 3. Gentle Section Entrance Reveals (GSAP ScrollTrigger, No Pinning)
  function initSectionReveals() {
    if (isReducedMotion || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const sections = document.querySelectorAll(".reveal-section");
    sections.forEach((sec) => {
      gsap.fromTo(
        sec,
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
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

  // 4. Mobile Menu Navigation
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
    initLenis();
    initScrollTracking();
    setTimeout(initSectionReveals, 120);
    initMobileMenu();
  });
})();
