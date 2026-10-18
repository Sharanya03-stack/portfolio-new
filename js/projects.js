/* ==========================================================
   PROJECTS.JS — Curated Case Study Rendering, Filtering & Accessible Modal
   Aligned with Sharanya N's verified resume & GitHub repositories
========================================================== */

"use strict";

const modal = document.getElementById("projectModal");
const modalBody = document.getElementById("modalBody");
const projectCloseBtn = document.getElementById("modalCloseBtn") || (modal ? modal.querySelector(".close") : null);
const projectsGrid = document.getElementById("projectsGrid");

let activeFilter = "featured";
let lastFocusedTrigger = null;

function getFilteredProjects(filter) {
  if (typeof portfolioData === "undefined" || !Array.isArray(portfolioData.projects)) {
    return [];
  }
  if (filter === "featured") {
    return portfolioData.projects.filter((p) => p.featured);
  }
  if (filter === "web" || filter === "ai") {
    return portfolioData.projects.filter((p) => p.category === filter);
  }
  return portfolioData.projects;
}

function renderProjects(filter = activeFilter) {
  if (!projectsGrid || typeof portfolioData === "undefined" || !portfolioData.projects) return;
  activeFilter = filter;

  const list = getFilteredProjects(filter);

  projectsGrid.innerHTML = list
    .map((project) => {
      const hasLive = Boolean(project.live);

      return `
<article class="project-card glass-card" data-project-id="${project.id}" data-category="${project.category || "web"}">
  <div class="project-image">
    <img src="${project.image}" alt="${project.title} interface preview" width="640" height="360" loading="eager" decoding="async">
    <div class="project-badges-top">
      <span class="project-cat-badge">${project.categoryLabel || "Web Application"}</span>
      ${project.period ? `<span class="project-period-badge">${project.period}</span>` : ""}
    </div>
  </div>

  <div class="project-content">
    <div class="project-header-meta">
      <h3>${project.title}</h3>
      ${project.subtitle ? `<p class="project-subtitle">${project.subtitle}</p>` : ""}
    </div>

    <p class="project-desc-short">${project.shortDescription}</p>

    <div class="project-case-summary">
      ${
        project.problem
          ? `<div class="case-row">
              <span class="case-label">Problem:</span>
              <span class="case-val">${project.problem}</span>
            </div>`
          : ""
      }
      ${
        project.contribution
          ? `<div class="case-row">
              <span class="case-label">Role:</span>
              <span class="case-val">${project.contribution}</span>
            </div>`
          : ""
      }
    </div>

    ${
      project.scopeNote
        ? `<p class="project-scope-note"><i class="fa-solid fa-circle-check" aria-hidden="true"></i> <span>${project.scopeNote}</span></p>`
        : ""
    }

    <div class="project-stack" aria-label="Technologies used">
      ${project.technologies.map((t) => `<span class="tech-pill">${t}</span>`).join("")}
    </div>

    <div class="project-links">
      ${
        hasLive
          ? `
      <a href="${project.live}" target="_blank" rel="noopener noreferrer" class="proj-link-btn proj-live-btn">
        <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> Live Demo
      </a>
      <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="proj-link-btn">
        <i class="fab fa-github" aria-hidden="true"></i> Code
      </a>`
          : `
      <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="proj-link-btn proj-live-btn">
        <i class="fab fa-github" aria-hidden="true"></i> GitHub Repo
      </a>`
      }
      <button class="proj-link-btn proj-details-btn view-btn" data-project="${project.id}" type="button" aria-haspopup="dialog">
        <i class="fa-solid fa-file-lines" aria-hidden="true"></i> Case Study
      </button>
    </div>
  </div>
</article>`;
    })
    .join("");

  bindProjectEvents();
  if (typeof window.refreshScrollReveals === "function") {
    window.refreshScrollReveals();
  }
}

function openProject(id, triggerEl) {
  const project = portfolioData.projects.find((p) => p.id === id);
  if (!project || !modal || !modalBody) return;

  lastFocusedTrigger = triggerEl || document.activeElement;
  const hasLive = Boolean(project.live);

  modalBody.innerHTML = `
<div class="modal-project">
  <div class="modal-header-img">
    <img src="${project.image}" alt="${project.title} full preview" class="modal-img" width="840" height="440" loading="eager">
  </div>

  <div class="modal-title-bar">
    <div class="modal-meta-pills">
      <span class="project-cat-badge">${project.categoryLabel || "Case Study"}</span>
      ${project.period ? `<span class="modal-time-tag">${project.period}</span>` : ""}
    </div>
    <h2 id="modalTitle">${project.title}</h2>
    ${project.subtitle ? `<p class="modal-subtitle-text">${project.subtitle}</p>` : ""}
  </div>

  <p class="modal-desc">${project.description}</p>

  <div class="modal-grid-two">
    ${
      project.problem
        ? `
    <div class="modal-section-half">
      <h4><i class="fa-solid fa-bullseye" aria-hidden="true"></i> Problem Addressed</h4>
      <p class="modal-text-dim">${project.problem}</p>
    </div>`
        : ""
    }
    ${
      project.contribution
        ? `
    <div class="modal-section-half">
      <h4><i class="fa-solid fa-user-gear" aria-hidden="true"></i> My Role &amp; Contribution</h4>
      <p class="modal-text-dim">${project.contribution}</p>
    </div>`
        : ""
    }
  </div>

  <div class="modal-section">
    <h4><i class="fa-solid fa-list-check" aria-hidden="true"></i> Key Features &amp; Deliverables</h4>
    <ul class="modal-features">
      ${project.features.map((f) => `<li><i class="fa-solid fa-check" aria-hidden="true"></i> <span>${f}</span></li>`).join("")}
    </ul>
  </div>

  ${
    project.challenges
      ? `
  <div class="modal-grid-two">
    <div class="modal-section-half">
      <h4><i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i> Technical Challenge</h4>
      <p class="modal-text-dim">${project.challenges}</p>
    </div>
    <div class="modal-section-half">
      <h4><i class="fa-solid fa-lightbulb" aria-hidden="true"></i> Engineering Approach</h4>
      <p class="modal-text-dim">${project.solution}</p>
    </div>
  </div>`
      : ""
  }

  ${
    project.scopeNote
      ? `
  <div class="modal-scope-box">
    <strong>Implementation Scope:</strong> ${project.scopeNote}
  </div>`
      : ""
  }

  <div class="modal-section">
    <h4><i class="fa-solid fa-layer-group" aria-hidden="true"></i> Technology Stack</h4>
    <div class="modal-tech">
      ${project.technologies.map((t) => `<span class="tech-badge">${t}</span>`).join("")}
    </div>
  </div>

  <div class="modal-actions">
    ${
      hasLive
        ? `
    <a href="${project.live}" target="_blank" rel="noopener noreferrer" class="primary-btn">
      <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> Open Live Demo
    </a>
    <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="secondary-btn">
      <i class="fab fa-github" aria-hidden="true"></i> View Source on GitHub
    </a>`
        : `
    <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="primary-btn">
      <i class="fab fa-github" aria-hidden="true"></i> View Repository on GitHub
    </a>`
    }
  </div>
</div>`;

  modal.style.display = "flex";
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  if (window.lenisInstance && typeof window.lenisInstance.stop === "function") {
    window.lenisInstance.stop();
  }

  const modalContent = modal.querySelector(".modal-content");
  if (modalContent) modalContent.scrollTop = 0;

  if (projectCloseBtn) {
    setTimeout(() => projectCloseBtn.focus(), 20);
  }
}

function closeProject() {
  if (!modal) return;
  modal.style.display = "none";
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  if (window.lenisInstance && typeof window.lenisInstance.start === "function") {
    window.lenisInstance.start();
  }

  if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === "function") {
    lastFocusedTrigger.focus();
    lastFocusedTrigger = null;
  }
}

function bindProjectEvents() {
  document.querySelectorAll(".view-btn[data-project]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      openProject(parseInt(btn.dataset.project, 10), btn);
    });
  });

  document.querySelectorAll("#projectsGrid .project-image img").forEach((img) => {
    img.addEventListener("click", () => {
      const card = img.closest(".project-card");
      const id = card ? card.dataset.projectId : null;
      if (id) openProject(parseInt(id, 10), img);
    });
  });
}

function initProjectFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn[data-filter]");
  if (!filterBtns.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter || "featured";
      filterBtns.forEach((b) => {
        const isCurrent = b === btn;
        b.classList.toggle("active", isCurrent);
        b.setAttribute("aria-selected", isCurrent ? "true" : "false");
      });
      renderProjects(filter);
    });
  });
}

if (projectCloseBtn) {
  projectCloseBtn.addEventListener("click", closeProject);
}

if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeProject();
  });
}

document.addEventListener("keydown", (e) => {
  if (!modal || modal.getAttribute("aria-hidden") === "true") return;

  if (e.key === "Escape") {
    e.preventDefault();
    closeProject();
    return;
  }

  if (e.key === "Tab") {
    const focusable = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initProjectFilters();
    renderProjects("featured");
  });
} else {
  initProjectFilters();
  renderProjects("featured");
}
