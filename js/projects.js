/**
 * Projects Renderer & Accessible Specs Modal (Refined 2-Col Vertical Grid)
 * Verified project mappings, correct screenshots, and honest Live Demo / Source Code actions.
 */

"use strict";

(function () {
  let previouslyFocusedElement = null;

  function renderProjects() {
    const grid = document.getElementById("projectsGrid");
    if (!grid || typeof portfolioData === "undefined" || !portfolioData.projects) return;

    grid.innerHTML = portfolioData.projects
      .map((project, index) => {
        const total = portfolioData.projects.length;
        const indexStr = `${project.number} // 0${total}`;

        // Verified action buttons logic
        const hasLive = Boolean(project.live);
        const actionButtonsHtml = `
          ${
            hasLive
              ? `<a href="${escapeHtml(project.live)}" target="_blank" rel="noopener noreferrer" class="btn-card-action primary">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  <span>View Live Demo</span>
                </a>`
              : ""
          }
          <a href="${escapeHtml(project.github)}" target="_blank" rel="noopener noreferrer" class="btn-card-action ${hasLive ? 'secondary' : 'primary'}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            <span>View Source Code</span>
          </a>
          <button type="button" class="btn-card-action tertiary btn-open-specs" data-project-id="${escapeHtml(project.id)}" aria-haspopup="dialog">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            <span>Technical Specs</span>
          </button>
        `;

        const techPillsHtml = project.technologies
          .map((tech) => `<span class="tech-pill">${escapeHtml(tech)}</span>`)
          .join("");

        // 5th project spans 2 columns on wide screens
        const isFifth = index === 4;
        const cardClass = isFifth ? "project-card-v featured-span-2" : "project-card-v";

        return `
          <article class="${cardClass}" data-index="${index}" aria-label="Project: ${escapeHtml(project.title)}">
            <div class="project-card-thumb-wrap">
              <img src="${escapeHtml(project.image)}" alt="Verified interface screenshot of ${escapeHtml(project.title)}" loading="lazy" width="700" height="420" />
            </div>
            <div class="project-card-body">
              <div class="project-card-header">
                <div class="project-meta-row">
                  <span class="project-index-badge">${indexStr}</span>
                  <span class="project-category-tag">${escapeHtml(project.category)}</span>
                </div>
                <h3 class="project-card-v-title">${escapeHtml(project.title)}</h3>
                <div class="project-card-v-tagline">${escapeHtml(project.tagline)}</div>
                <p class="project-card-v-desc">${escapeHtml(project.shortDescription)}</p>
                <div class="project-tech-pills" aria-label="Technologies used">
                  ${techPillsHtml}
                </div>
              </div>
              <div class="card-action-row">
                ${actionButtonsHtml}
              </div>
            </div>
          </article>
        `;
      })
      .join("");

    bindModalTriggers();
  }

  function bindModalTriggers() {
    const triggers = document.querySelectorAll(".btn-open-specs");
    triggers.forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-project-id");
        openProjectModal(id, btn);
      });
    });
  }

  function openProjectModal(projectId, triggerBtn) {
    if (typeof portfolioData === "undefined") return;
    const project = portfolioData.projects.find((p) => String(p.id) === String(projectId));
    if (!project) return;

    previouslyFocusedElement = triggerBtn || document.activeElement;

    const modal = document.getElementById("projectModal");
    const modalContent = document.getElementById("modalBody");
    if (!modal || !modalContent) return;

    const featuresList = (project.features || [])
      .map((f) => `<li>${escapeHtml(f)}</li>`)
      .join("");

    const techPills = (project.technologies || [])
      .map((t) => `<span class="tech-pill">${escapeHtml(t)}</span>`)
      .join("");

    const hasLive = Boolean(project.live);
    const modalActions = `
      ${
        hasLive
          ? `<a href="${escapeHtml(project.live)}" target="_blank" rel="noopener noreferrer" class="btn-card-action primary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              <span>View Live Demo</span>
            </a>`
          : ""
      }
      <a href="${escapeHtml(project.github)}" target="_blank" rel="noopener noreferrer" class="btn-card-action ${hasLive ? 'secondary' : 'primary'}">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
        <span>View Source Code</span>
      </a>
      <button type="button" class="btn-card-action secondary btn-close-modal">Close Specs</button>
    `;

    modalContent.innerHTML = `
      <div class="modal-header">
        <div class="modal-badge">${escapeHtml(project.category)} // SPEC-${escapeHtml(project.number)}</div>
        <h2 id="modalDialogTitle" class="modal-title">${escapeHtml(project.title)}</h2>
        <p class="project-card-v-tagline" style="margin-top:0.35rem;">${escapeHtml(project.tagline)}</p>
      </div>

      <div class="modal-section">
        <h3 class="modal-section-title">System Overview</h3>
        <p>${escapeHtml(project.description)}</p>
      </div>

      <div class="modal-section">
        <h3 class="modal-section-title">Key Architectural Features</h3>
        <ul>${featuresList}</ul>
      </div>

      <div class="modal-section">
        <h3 class="modal-section-title">Engineering Challenge & Solution</h3>
        <div class="timeline-engagement-callout" style="margin-bottom:0.625rem;">
          <strong>Challenge:</strong> ${escapeHtml(project.challenges)}
        </div>
        <div class="timeline-engagement-callout" style="border-left-color: var(--color-accent-secondary);">
          <strong>Engineered Solution:</strong> ${escapeHtml(project.solution)}
        </div>
      </div>

      <div class="modal-section">
        <h3 class="modal-section-title">Verified Technology Stack</h3>
        <div class="project-tech-pills">${techPills}</div>
      </div>

      <div class="card-action-row" style="margin-top:1.5rem; padding-top:1rem; border-top:1px solid var(--color-border-subtle);">
        ${modalActions}
      </div>
    `;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // Setup close listeners
    const closeBtns = modal.querySelectorAll(".btn-close-modal, .modal-close-btn");
    closeBtns.forEach((b) => b.addEventListener("click", closeProjectModal));

    // Focus first focusable element inside modal
    const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable.length > 0) focusable[0].focus();
  }

  function closeProjectModal() {
    const modal = document.getElementById("projectModal");
    if (!modal) return;

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    if (previouslyFocusedElement) {
      previouslyFocusedElement.focus();
      previouslyFocusedElement = null;
    }
  }

  // Keyboard navigation & accessibility handlers
  document.addEventListener("keydown", (e) => {
    const modal = document.getElementById("projectModal");
    if (modal && modal.classList.contains("open")) {
      if (e.key === "Escape") {
        closeProjectModal();
      } else if (e.key === "Tab") {
        // Trap focus inside modal
        const focusables = Array.from(modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'));
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  });

  // Close on backdrop click
  document.addEventListener("click", (e) => {
    const modal = document.getElementById("projectModal");
    if (modal && modal.classList.contains("open") && e.target === modal) {
      closeProjectModal();
    }
  });

  function escapeHtml(str) {
    if (typeof str !== "string") return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  document.addEventListener("DOMContentLoaded", renderProjects);
})();
