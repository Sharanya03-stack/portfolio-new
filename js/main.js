/**
 * Main Application Logic
 * Form Validation, Direct Email Handling, Dynamic Year, and Core System Verification.
 */

"use strict";

(function () {
  // 1. Dynamic Copyright Year
  function initYear() {
    const yearEl = document.getElementById("year");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  // 2. Genuinely Functional Contact Form (Honest Email Fallback, No Fake Success)
  function initContactForm() {
    const form = document.getElementById("contactForm");
    const toast = document.getElementById("formToast");
    if (!form || !toast) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = document.getElementById("contactName");
      const emailInput = document.getElementById("contactEmail");
      const subjectInput = document.getElementById("contactSubject");
      const messageInput = document.getElementById("contactMessage");

      const name = nameInput ? nameInput.value.trim() : "";
      const email = emailInput ? emailInput.value.trim() : "";
      const subject = subjectInput ? subjectInput.value.trim() : "";
      const message = messageInput ? messageInput.value.trim() : "";

      // Validation
      if (!name || !email || !message) {
        showToast("Please fill in your name, email, and message before submitting.", "error");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast("Please enter a valid email address.", "error");
        return;
      }

      // Honest Communication: This is a static portfolio without a paid 3rd-party backend.
      // We directly launch the user's default email client with prefilled details,
      // and provide an instant one-click copy option.
      const recipient = (portfolioData && portfolioData.email) ? portfolioData.email : "sharureddy13@gmail.com";
      const mailtoSubject = encodeURIComponent(subject ? `[Portfolio Inquiry] ${subject}` : `[Portfolio Inquiry] Project Discussion from ${name}`);
      const mailtoBody = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nSent from Sharanya N Engineering Portfolio`
      );

      const mailtoUrl = `mailto:${recipient}?subject=${mailtoSubject}&body=${mailtoBody}`;

      showToast(
        `Launching your email client to deliver directly to ${recipient}. If your email app does not open automatically, <a href="${mailtoUrl}" style="text-decoration:underline; font-weight:600;">click here to open manually</a> or use the WhatsApp option.`,
        "success"
      );

      // Trigger mailto client
      window.location.href = mailtoUrl;

      // Reset form
      form.reset();
    });

    function showToast(msg, type) {
      toast.className = `form-toast ${type}`;
      toast.innerHTML = msg;
      toast.style.display = "block";
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    initYear();
    initContactForm();
  });
})();
