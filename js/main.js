/* ==========================================================
   PORTFOLIO MAIN ENGINE — SHARANYA N
   Accessible navigation, smooth scrolling, and contact form handling
========================================================== */

"use strict";

/*==========================================================
  LENIS SMOOTH SCROLL (Respects prefers-reduced-motion)
==========================================================*/

let lenisInstance = null;
window.lenisInstance = null;

function closeMobileMenu() {
  const nav = document.getElementById("primary-navigation") || document.querySelector(".nav-links");
  const menu = document.getElementById("menu-btn");
  if (nav && nav.classList.contains("show")) {
    nav.classList.remove("show");
  }
  if (menu) {
    menu.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-label", "Open navigation menu");
  }
}

function initLenis() {
  const prefersReducedMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (typeof Lenis !== "undefined" && !prefersReducedMotion) {
    if (lenisInstance) {
      lenisInstance.destroy();
    }

    lenisInstance = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    });

    window.lenisInstance = lenisInstance;

    function raf(time) {
      if (lenisInstance) {
        lenisInstance.raf(time);
      }
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // Smooth anchor navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      closeMobileMenu();

      if (lenisInstance) {
        lenisInstance.scrollTo(target, { offset: -84 });
      } else {
        target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
      }
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLenis);
} else {
  initLenis();
}

/*==========================================================
  OPTIMIZED SCROLL HANDLER (THROTTLED VIA RAF)
==========================================================*/

const progressBar = document.getElementById("progress-bar");
const navbar = document.querySelector(".navbar");
const backBtn = document.getElementById("backToTop");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

let isTicking = false;

function onScrollThrottled() {
  const scrollY = window.pageYOffset || document.documentElement.scrollTop;

  // 1. Progress Bar
  if (progressBar) {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  }

  // 2. Navbar Styling (Managed via CSS class so responsive padding is preserved)
  if (navbar) {
    navbar.classList.toggle("scrolled", scrollY > 40);
  }

  // 3. Back to Top Visibility
  if (backBtn) {
    const isVisible = scrollY > 400;
    backBtn.classList.toggle("visible", isVisible);
  }

  // 4. Active Section Highlighting
  let currentSection = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 160;
    const sectionHeight = section.offsetHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    const isMatch = Boolean(currentSection && link.getAttribute("href") === `#${currentSection}`);
    link.classList.toggle("active", isMatch);
    if (isMatch) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  isTicking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (!isTicking) {
      requestAnimationFrame(onScrollThrottled);
      isTicking = true;
    }
  },
  { passive: true }
);

// Run once on load to set initial state
onScrollThrottled();

// Back to Top Click
if (backBtn) {
  backBtn.addEventListener("click", () => {
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { duration: 0.9 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
}

/*==========================================================
  MOBILE MENU (Accessible Button + Escape & Outside Click)
==========================================================*/

const mobileMenuBtn = document.getElementById("menu-btn");
const mobileNavLinks = document.getElementById("primary-navigation") || document.querySelector(".nav-links");

if (mobileMenuBtn && mobileNavLinks) {
  mobileMenuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = mobileNavLinks.classList.toggle("show");
    mobileMenuBtn.classList.toggle("open", isOpen);
    mobileMenuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    mobileMenuBtn.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  });

  document.addEventListener("click", (e) => {
    if (
      mobileNavLinks.classList.contains("show") &&
      !mobileNavLinks.contains(e.target) &&
      !mobileMenuBtn.contains(e.target)
    ) {
      closeMobileMenu();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileNavLinks.classList.contains("show")) {
      closeMobileMenu();
      mobileMenuBtn.focus();
    }
  });
}

/*==========================================================
  CONTACT FORM (Accessible Validation + FormSubmit AJAX)
==========================================================*/

const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const formStatus = document.getElementById("formStatus");

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (contactForm) {
  const inputs = contactForm.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      input.removeAttribute("aria-invalid");
    });
  });

  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const nameInput = document.getElementById("senderName");
    const emailInput = document.getElementById("senderEmail");
    const subjectInput = document.getElementById("messageSubject");
    const messageInput = document.getElementById("messageBody");

    const name = nameInput ? nameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";
    const subject =
      subjectInput && subjectInput.value.trim()
        ? subjectInput.value.trim()
        : "Portfolio Project Inquiry";
    const message = messageInput ? messageInput.value.trim() : "";

    let hasError = false;
    if (!name && nameInput) {
      nameInput.setAttribute("aria-invalid", "true");
      hasError = true;
    }
    if ((!email || !isValidEmail(email)) && emailInput) {
      emailInput.setAttribute("aria-invalid", "true");
      hasError = true;
    }
    if (!message && messageInput) {
      messageInput.setAttribute("aria-invalid", "true");
      hasError = true;
    }

    if (hasError) {
      const errMsg = !email || !isValidEmail(email)
        ? "Please enter your name, a valid email address, and your project details."
        : "Please fill in all required fields (Name, Email, and Project Details).";
      if (formStatus) {
        formStatus.className = "form-status error";
        formStatus.textContent = errMsg;
      }
      showNotification(errMsg, "error");
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML =
        '<i class="fa-solid fa-circle-notch fa-spin" aria-hidden="true"></i> Sending inquiry...';
    }
    if (formStatus) {
      formStatus.className = "form-status sending";
      formStatus.textContent = "Sending your message...";
    }

    try {
      const response = await fetch("https://formsubmit.co/ajax/sharureddy13@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          _subject: `Portfolio Inquiry: ${subject} (from ${name})`,
          message: message,
        }),
      });

      const result = await response.json();

      if (response.ok || (result && result.success === "true")) {
        showNotification(
          "Thank you! Your message has been sent to Sharanya's inbox.",
          "success"
        );
        if (formStatus) {
          formStatus.className = "form-status success";
          formStatus.innerHTML =
            '<i class="fa-solid fa-circle-check" aria-hidden="true"></i> Message sent to <strong>sharureddy13@gmail.com</strong>. I will respond within 24 hours.';
        }
        contactForm.reset();
      } else {
        throw new Error((result && result.message) || "Unable to complete form request.");
      }
    } catch (err) {
      console.warn("Form submission fallback triggered:", err);
      const mailtoUrl = `mailto:sharureddy13@gmail.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(
        `Hi Sharanya,\n\nName: ${name}\nEmail: ${email}\n\nProject Details:\n${message}`
      )}`;

      showNotification(
        "Direct submission unavailable right now. Use the email link below to send via your mail app.",
        "error"
      );
      if (formStatus) {
        formStatus.className = "form-status error";
        formStatus.innerHTML = `Could not reach the form service right now. <a href="${mailtoUrl}" class="fallback-mail-link"><i class="fa-solid fa-envelope" aria-hidden="true"></i> Click here to send directly via your email client</a>.`;
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML =
          '<span class="btn-text">Send Project Inquiry</span> <i class="fa-solid fa-paper-plane btn-icon" aria-hidden="true"></i>';
      }
    }
  });
}

/*==========================================================
  TOAST NOTIFICATION SYSTEM
==========================================================*/

function showNotification(message, type = "info") {
  const existingToasts = document.querySelectorAll(".toast");
  existingToasts.forEach((t) => t.remove());

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 350);
  }, 4500);
}

/*==========================================================
  DYNAMIC FOOTER YEAR
==========================================================*/

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
