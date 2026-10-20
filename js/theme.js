/* ==========================================================
   THEME.JS — Accessible Light / Dark Theme Controller
   Defaults to Light Theme for all first-time visitors regardless of OS setting.
   Preserves explicit user preference in localStorage.
   Prevents flash of dark mode (FOUC).
========================================================== */

"use strict";

(function () {
  const STORAGE_KEY = "portfolio-theme";
  const toggleBtn = document.getElementById("themeToggle");
  const schemeMeta = document.querySelector('meta[name="color-scheme"]');

  function getStoredScheme() {
    try {
      const val = localStorage.getItem(STORAGE_KEY);
      return val === "light" || val === "dark" ? val : null;
    } catch (_) {
      return null;
    }
  }

  function getResolvedScheme() {
    const stored = getStoredScheme();
    // Default to Light mode on first visit regardless of OS preference
    return stored === "dark" || stored === "light" ? stored : "light";
  }

  function applyThemeState() {
    const resolved = getResolvedScheme();
    const isLight = resolved === "light";

    document.body.classList.toggle("light", isLight);
    document.body.classList.toggle("dark", !isLight);
    document.documentElement.setAttribute("data-theme", resolved);

    if (schemeMeta) {
      schemeMeta.content = resolved;
    }

    if (toggleBtn) {
      toggleBtn.innerHTML = isLight
        ? '<i class="fas fa-moon" aria-hidden="true"></i>'
        : '<i class="fas fa-sun" aria-hidden="true"></i>';
      const nextThemeLabel = isLight ? "Switch to dark theme" : "Switch to light theme";
      toggleBtn.setAttribute("aria-label", nextThemeLabel);
      toggleBtn.setAttribute("title", nextThemeLabel);
      toggleBtn.setAttribute("aria-pressed", isLight ? "false" : "true");
    }

    window.dispatchEvent(new CustomEvent("portfolio:themechange", { detail: { theme: resolved } }));
  }

  applyThemeState();

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const currentResolved = getResolvedScheme();
      const target = currentResolved === "light" ? "dark" : "light";

      try {
        localStorage.setItem(STORAGE_KEY, target);
      } catch (_) {
        // Storage unavailable
      }

      applyThemeState();
    });
  }

  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY) {
      applyThemeState();
    }
  });
})();