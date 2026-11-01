/**
 * Animation Engine & Scroll Architecture
 * Coordinates Lenis Smooth Scroll with GSAP ScrollTrigger for pinned horizontal card sequence.
 * Features mobile touch-scroll fallback, HUD progress updates, and reduced-motion safety.
 */

"use strict";

(function () {
  let lenisInstance = null;
  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 1. Lenis Smooth Scrolling Initialization
  function initLenis() {
    if (isReducedMotion || typeof Lenis === "undefined") return;

    try {
      lenisInstance = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.5,
      });

      // Synchronize Lenis with GSAP ScrollTrigger (No competing scroll systems!)
      if (typeof ScrollTrigger !== "undefined" && typeof gsap !== "undefined") {
        lenisInstance.on("scroll", ScrollTrigger.update);

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
      console.warn("Lenis initialization error:", err);
    }
  }

  // 2. GSAP Pinned Horizontal Project Showcase
  function initHorizontalShowcase() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      console.warn("GSAP / ScrollTrigger not loaded. Using fallback.");
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const section = document.getElementById("projects");
    const track = document.getElementById("projectHorizontalTrack");
    const hudCounter = document.getElementById("hudCounter");
    const hudFill = document.getElementById("hudProgressFill");

    if (!section || !track) return;

    // Use gsap.matchMedia for clean desktop pinning vs mobile touch scroll
    const mm = gsap.matchMedia();

    // DESKTOP: >= 901px
    mm.add("(min-width: 901px)", () => {
      if (isReducedMotion) return;

      // Dynamically calculate horizontal distance based on actual card widths + gaps
      const getScrollDistance = () => {
        return Math.max(0, track.scrollWidth - window.innerWidth + 120);
      };

      const horizontalTween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.8,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress; // 0 to 1
            if (hudFill) {
              hudFill.style.width = `${Math.min(100, Math.max(15, progress * 100))}%`;
            }

            // Update current active project index in HUD
            const total = (portfolioData && portfolioData.projects) ? portfolioData.projects.length : 5;
            const currentIndex = Math.min(total, Math.max(1, Math.floor(progress * total) + 1));
            if (hudCounter) {
              hudCounter.textContent = `0${currentIndex} / 0${total}`;
            }
          },
        },
      });

      return () => {
        horizontalTween.kill();
      };
    });

    // MOBILE / TABLET: <= 900px
    // Natural touch-based horizontal scrolling with CSS scroll snap (No desktop pinning forced!)
    mm.add("(max-width: 900px)", () => {
      const scrollWrapper = document.querySelector(".project-horizontal-wrapper");
      if (scrollWrapper && hudFill && hudCounter) {
        scrollWrapper.addEventListener("scroll", () => {
          const maxScroll = scrollWrapper.scrollWidth - scrollWrapper.clientWidth;
          if (maxScroll <= 0) return;
          const progress = scrollWrapper.scrollLeft / maxScroll;
          hudFill.style.width = `${Math.min(100, Math.max(15, progress * 100))}%`;

          const total = (portfolioData && portfolioData.projects) ? portfolioData.projects.length : 5;
          const currentIndex = Math.min(total, Math.max(1, Math.round(progress * (total - 1)) + 1));
          hudCounter.textContent = `0${currentIndex} / 0${total}`;
        }, { passive: true });
      }
    });

    // Refresh ScrollTrigger after all assets and fonts finish loading
    window.addEventListener("load", () => {
      ScrollTrigger.refresh();
    });

    // Debounced window resize handler
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 250);
    });
  }

  // 3. Header Scroll States & Back-To-Top Button
  function initHeaderAndFloatingActions() {
    const header = document.querySelector(".site-header");
    const backToTopBtn = document.getElementById("backToTopBtn");

    window.addEventListener("scroll", () => {
      const y = window.scrollY;

      if (header) {
        if (y > 40) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }
      }

      if (backToTopBtn) {
        if (y > 600) {
          backToTopBtn.classList.add("visible");
        } else {
          backToTopBtn.classList.remove("visible");
        }
      }
    }, { passive: true });

    if (backToTopBtn) {
      backToTopBtn.addEventListener("click", () => {
        if (lenisInstance) {
          lenisInstance.scrollTo(0, { duration: 1.2 });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
    }

    // Smooth Anchor Link Handling with Lenis Integration
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

          if (lenisInstance) {
            lenisInstance.scrollTo(target, { offset: -70 });
          } else {
            const top = target.getBoundingClientRect().top + window.scrollY - 70;
            window.scrollTo({ top, behavior: "smooth" });
          }
        }
      });
    });
  }

  // 4. Mobile Menu Toggle
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

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (menu.classList.contains("open") && !menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove("open");
        toggle.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Initialize all after DOM is ready
  document.addEventListener("DOMContentLoaded", () => {
    initLenis();
    // Allow projects to render into DOM first, then initialize GSAP pin
    setTimeout(() => {
      initHorizontalShowcase();
    }, 100);
    initHeaderAndFloatingActions();
    initMobileMenu();
  });
})();
