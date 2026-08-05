/* ==========================================================
   PORTFOLIO MAIN ENGINE — SHARANYA N
   High-performance scrolling, contact dispatch & interactions
========================================================== */

"use strict";

/*==========================================================
  LENIS SMOOTH SCROLL (60fps Accelerated Physics)
==========================================================*/

let lenisInstance = null;

function initLenis() {
  if (typeof Lenis === "undefined") return;

  // Destroy previous instance if any
  if (lenisInstance) {
    lenisInstance.destroy();
  }

  lenisInstance = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.5,
  });

  function raf(time) {
    lenisInstance.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Smooth anchor navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      if (lenisInstance) {
        lenisInstance.scrollTo(target, { offset: -85 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }

      // Close mobile menu if open
      const nav = document.querySelector(".nav-links");
      const menu = document.getElementById("menu-btn");
      if (nav && nav.classList.contains("show")) {
        nav.classList.remove("show");
        if (menu) menu.classList.remove("open");
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
  PRELOADER
==========================================================*/

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;

  setTimeout(() => {
    preloader.classList.add("fade");
    setTimeout(() => {
      preloader.style.display = "none";
    }, 600);
  }, 600);
});

/*==========================================================
  OPTIMIZED SCROLL HANDLER (THROTTLED VIA RAF)
==========================================================*/

const progressBar = document.getElementById("progress-bar");
const header = document.querySelector("header");
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
    progressBar.style.width = `${progress}%`;
  }

  // 2. Navbar Styling
  if (header && navbar) {
    if (scrollY > 60) {
      header.style.padding = "12px 7%";
      navbar.classList.add("scrolled");
    } else {
      header.style.padding = "18px 7%";
      navbar.classList.remove("scrolled");
    }
  }

  // 3. Back to Top Visibility
  if (backBtn) {
    if (scrollY > 500) {
      backBtn.classList.add("visible");
    } else {
      backBtn.classList.remove("visible");
    }
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
    link.classList.remove("active");
    if (currentSection && link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });

  isTicking = false;
}

window.addEventListener("scroll", () => {
  if (!isTicking) {
    requestAnimationFrame(onScrollThrottled);
    isTicking = true;
  }
}, { passive: true });

// Back to Top Click
if (backBtn) {
  backBtn.addEventListener("click", () => {
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { duration: 1 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
}

/*==========================================================
  TYPING EFFECT (HERO)
==========================================================*/

const typingWords = [
  "Full Stack Developer",
  "UI / UX Designer",
  "IoT & Cybersecurity Enthusiast",
  "AI & Python Engineer",
  "Creative Problem Solver"
];

let wordIdx = 0;
let charIdx = 0;
let isDeleting = false;
const typingElement = document.getElementById("typing");

function runTypingEffect() {
  if (!typingElement) return;

  const currentWord = typingWords[wordIdx];

  if (!isDeleting) {
    typingElement.textContent = currentWord.substring(0, charIdx++);
    if (charIdx > currentWord.length) {
      isDeleting = true;
      setTimeout(runTypingEffect, 1700);
      return;
    }
  } else {
    typingElement.textContent = currentWord.substring(0, charIdx--);
    if (charIdx === 0) {
      isDeleting = false;
      wordIdx = (wordIdx + 1) % typingWords.length;
    }
  }

  setTimeout(runTypingEffect, isDeleting ? 35 : 85);
}

if (typingElement) {
  runTypingEffect();
}

/*==========================================================
  BUTTON RIPPLE EFFECT
==========================================================*/

document.querySelectorAll("button, .primary-btn, .secondary-btn, .proj-link-btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    ripple.className = "ripple";

    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

/*==========================================================
  MOBILE MENU
==========================================================*/

const mobileMenuBtn = document.getElementById("menu-btn");
const mobileNavLinks = document.querySelector(".nav-links");

if (mobileMenuBtn && mobileNavLinks) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileNavLinks.classList.toggle("show");
    mobileMenuBtn.classList.toggle("open");
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNavLinks.classList.remove("show");
      mobileMenuBtn.classList.remove("open");
    });
  });
}

/*==========================================================
  REAL EMAIL CONTACT FORM (FormSubmit AJAX + Fallback)
==========================================================*/

const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const nameInput = document.getElementById("senderName");
    const emailInput = document.getElementById("senderEmail");
    const subjectInput = document.getElementById("messageSubject");
    const messageInput = document.getElementById("messageBody");

    const name = nameInput ? nameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";
    const subject = subjectInput ? subjectInput.value.trim() : "Portfolio Contact Form Message";
    const message = messageInput ? messageInput.value.trim() : "";

    if (!name || !email || !message) {
      showNotification("⚠️ Please fill in all required fields.", "error");
      return;
    }

    // Set loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending message...';
    }
    if (formStatus) {
      formStatus.className = "form-status sending";
      formStatus.textContent = "Connecting to mail server...";
    }

    try {
      const response = await fetch("https://formsubmit.co/ajax/sharureddy13@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          _subject: `Portfolio Contact: ${subject} (from ${name})`,
          message: message,
        }),
      });

      const result = await response.json();

      if (response.ok || (result && result.success === "true")) {
        showNotification("🎉 Thank you! Your message has been delivered to Sharanya's inbox.", "success");
        if (formStatus) {
          formStatus.className = "form-status success";
          formStatus.innerHTML = '<i class="fa-solid fa-check-circle"></i> Message sent successfully to <strong>sharureddy13@gmail.com</strong>!';
        }
        contactForm.reset();
      } else {
        throw new Error(result.message || "Failed to deliver message via API");
      }
    } catch (err) {
      console.warn("Direct form submission error:", err);
      // Offer direct mailto fallback
      const mailtoUrl = `mailto:sharureddy13@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi Sharanya,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      
      showNotification("⚠️ Message sending timed out. Opening email client fallback...", "error");
      if (formStatus) {
        formStatus.className = "form-status error";
        formStatus.innerHTML = `⚠️ Could not reach endpoint directly. <a href="${mailtoUrl}" class="fallback-mail-link"><i class="fa-solid fa-envelope-open"></i> Click here to send via your email client directly</a>.`;
      }
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 1500);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span class="btn-text">Send Message</span> <i class="fa-solid fa-paper-plane btn-icon"></i>';
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
  toast.innerHTML = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

/*==========================================================
  IMAGE FALLBACK ERROR HANDLER
==========================================================*/

const IMG_FALLBACK = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop";
const PROFILE_FALLBACK = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop";

document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("error", function () {
    if (this.dataset.fallbackApplied) return;
    this.dataset.fallbackApplied = "true";
    const isProfile = this.closest(".profile-circle, .about-image, .contact-left");
    this.src = isProfile ? PROFILE_FALLBACK : IMG_FALLBACK;
  });
});

/*==========================================================
  DYNAMIC FOOTER YEAR
==========================================================*/

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

console.log(
  "%cSharanya N | Premium Portfolio v2.0 Loaded 🚀",
  "color:#00E5FF;font-size:16px;font-weight:bold;background:#050816;padding:4px 8px;border-radius:4px;"
);
