/**
 * Theme Controller — Tailored Linen (Light) × Obsidian Rose & Ochre (Dark)
 * Zero-FOUC, localStorage persistence, and system preference synchronization
 */

"use strict";

(function () {
  const STORAGE_KEY = "portfolio-theme";
  const root = document.documentElement;

  // Determine current theme
  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") {
      return saved;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  // Apply theme to document element
  function setTheme(theme) {
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }

    localStorage.setItem(STORAGE_KEY, theme);
    updateThemeToggleUI(theme);
  }

  // Update theme toggle button icon & accessible aria-label
  function updateThemeToggleUI(theme) {
    const toggleBtns = document.querySelectorAll(".theme-toggle-btn");
    toggleBtns.forEach((btn) => {
      btn.setAttribute("aria-label", theme === "dark" ? "Switch to Tailored Linen light theme" : "Switch to Obsidian Rose dark theme");
      btn.innerHTML =
        theme === "dark"
          ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
          : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    });
  }

  // Initialize theme on DOM ready
  document.addEventListener("DOMContentLoaded", () => {
    const activeTheme = root.classList.contains("dark") ? "dark" : "light";
    updateThemeToggleUI(activeTheme);

    const toggleBtns = document.querySelectorAll(".theme-toggle-btn");
    toggleBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const nextTheme = root.classList.contains("dark") ? "light" : "dark";
        setTheme(nextTheme);
      });
    });

    // Listen for OS system theme changes if user hasn't explicitly set preference
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setTheme(e.matches ? "dark" : "light");
      }
    });
  });

  // Export helper
  window.PortfolioTheme = {
    get: () => (root.classList.contains("dark") ? "dark" : "light"),
    set: setTheme,
  };
})();
