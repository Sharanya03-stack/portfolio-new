/* ==========================================================
   THEME.JS — Accessible Light / Dark Theme Controller
   Respects system preference by default, persists user override,
   syncs <meta name="color-scheme"> and body.light without FOUC
========================================================== */

"use strict";

(function () {
  const STORAGE_KEY = "portfolio-theme";
  const toggleBtn = document.getElementById("themeToggle");
  const schemeMeta = document.querySelector('meta[name="color-scheme"]');
  const prefersLightQuery = window.matchMedia
    ? window.matchMedia("(prefers-color-scheme: light)")
    : null;

  function getSystemScheme() {
    return prefersLightQuery && prefersLightQuery.matches ? "light" : "dark";
  }

  function getStoredScheme() {
    try {
      const val = localStorage.getItem(STORAGE_KEY);
      return val === "light" || val === "dark" ? val : null;
    } catch (_) {
      return null;
    }
  }

  function getResolvedScheme() {
    return getStoredScheme() || getSystemScheme();
  }

  function applyThemeState() {
    const stored = getStoredScheme();
    const resolved = stored || getSystemScheme();
    const isLight = resolved === "light";

    document.body.classList.toggle("light", isLight);
    document.documentElement.setAttribute("data-theme", resolved);

    if (schemeMeta) {
      schemeMeta.content = stored ? stored : "light dark";
    }

    if (toggleBtn) {
      toggleBtn.innerHTML = isLight
        ? '<i class="fas fa-moon" aria-hidden="true"></i>'
        : '<i class="fas fa-sun" aria-hidden="true"></i>';
      const nextThemeLabel = isLight ? "Switch to dark theme" : "Switch to light theme";
      toggleBtn.setAttribute("aria-label", nextThemeLabel);
      toggleBtn.setAttribute("title", nextThemeLabel);
      toggleBtn.setAttribute("aria-pressed", isLight ? "true" : "false");
    }

    window.dispatchEvent(new CustomEvent("portfolio:themechange", { detail: { theme: resolved } }));
  }

  applyThemeState();

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const currentResolved = getResolvedScheme();
      const target = currentResolved === "light" ? "dark" : "light";
      const system = getSystemScheme();

      try {
        if (target === system) {
          localStorage.removeItem(STORAGE_KEY);
        } else {
          localStorage.setItem(STORAGE_KEY, target);
        }
      } catch (_) {
        // Ignore storage errors in restricted environments
      }

      applyThemeState();
    });
  }

  if (prefersLightQuery && typeof prefersLightQuery.addEventListener === "function") {
    prefersLightQuery.addEventListener("change", () => {
      // Never delete a stored value retroactively when OS changes; only re-apply
      applyThemeState();
    });
  }

  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY) {
      applyThemeState();
    }
  });
})();