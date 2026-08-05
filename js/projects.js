/* ==========================================================
   PROJECTS.JS — Dynamic project card rendering & modal
   Aligned with Sharanya N's verified resume projects
========================================================== */

"use strict";

const modal = document.getElementById("projectModal");
const modalBody = document.getElementById("modalBody");
const projectCloseBtn = modal ? modal.querySelector(".close") : null;
const projectsGrid = document.getElementById("projectsGrid");

function renderProjects() {
  if (!projectsGrid || typeof portfolioData === "undefined" || !portfolioData.projects) return;

  projectsGrid.innerHTML = portfolioData.projects
    .map((project) => {
      const hasLive = Boolean(project.live);

      return `
<div class="project-card glass-card" data-project-id="${project.id}">
  <div class="project-image">
    <img src="${project.image}" alt="${project.title}" loading="lazy">
    <div class="project-overlay">
      <button class="view-btn" data-project="${project.id}" type="button">
        <i class="fa-solid fa-eye"></i> View Details
      </button>
    </div>
    ${project.period ? `<span class="project-period-badge">${project.period}</span>` : ""}
  </div>
  <div class="project-content">
    <div class="project-header-meta">
      <h3>${project.title}</h3>
      ${project.subtitle ? `<p class="project-subtitle">${project.subtitle}</p>` : ""}
    </div>
    <p class="project-desc-short">${project.shortDescription}</p>
    <div class="project-stack">
      ${project.technologies.slice(0, 4).map((t) => `<span class="tech-pill">${t}</span>`).join("")}
      ${project.technologies.length > 4 ? `<span class="tech-pill more">+${project.technologies.length - 4}</span>` : ""}
    </div>
    <div class="project-links">
      ${
        hasLive
          ? `
      <a href="${project.github}" target="_blank" rel="noopener" class="proj-link-btn" title="View Source Code">
        <i class="fab fa-github"></i> Code
      </a>
      <a href="${project.live}" target="_blank" rel="noopener" class="proj-link-btn proj-live-btn" title="Launch Live Demo">
        <i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo
      </a>`
          : `
      <a href="${project.github}" target="_blank" rel="noopener" class="proj-link-btn proj-live-btn" style="flex: 1.2;" title="View GitHub Repository">
        <i class="fab fa-github"></i> GitHub Repo
      </a>`
      }
      <button class="proj-link-btn proj-details-btn view-btn" data-project="${project.id}" type="button" title="View Full Details">
        <i class="fa-solid fa-circle-info"></i> Info
      </button>
    </div>
  </div>
</div>`;
    })
    .join("");

  bindProjectEvents();
  if (typeof initScrollRevealForSelector === "function") {
    initScrollRevealForSelector(".project-card", "reveal-left", "reveal-right");
  }
}

function openProject(id) {
  const project = portfolioData.projects.find((p) => p.id === id);
  if (!project || !modal || !modalBody) return;

  const hasLive = Boolean(project.live);

  modalBody.innerHTML = `
<div class="modal-project">
  <div class="modal-header-img">
    <img src="${project.image}" alt="${project.title}" class="modal-img">
    <div class="modal-img-gradient"></div>
  </div>
  
  <div class="modal-title-bar">
    <div>
      <h2>${project.title}</h2>
      ${project.subtitle ? `<p class="modal-subtitle-text">${project.subtitle} &bull; <span class="modal-time-tag">${project.period || ""}</span></p>` : ""}
    </div>
  </div>

  <p class="modal-desc">${project.description}</p>
  
  <div class="modal-section">
    <h4><i class="fa-solid fa-sparkles"></i> Key Highlights & Features</h4>
    <ul class="modal-features">
      ${project.features.map((f) => `<li><i class="fa-solid fa-check-circle"></i> <span>${f}</span></li>`).join("")}
    </ul>
  </div>
  
  <div class="modal-section">
    <h4><i class="fa-solid fa-layer-group"></i> Technologies & Tools</h4>
    <div class="modal-tech">
      ${project.technologies.map((t) => `<span class="tech-badge">${t}</span>`).join("")}
    </div>
  </div>
  
  ${
    project.challenges
      ? `
  <div class="modal-grid-two">
    <div class="modal-section-half">
      <h4><i class="fa-solid fa-triangle-exclamation"></i> Engineering Challenge</h4>
      <p class="modal-text-dim">${project.challenges}</p>
    </div>
    <div class="modal-section-half">
      <h4><i class="fa-solid fa-lightbulb"></i> Architectural Solution</h4>
      <p class="modal-text-dim">${project.solution}</p>
    </div>
  </div>`
      : ""
  }
  
  <div class="modal-actions">
    ${
      hasLive
        ? `
    <a href="${project.live}" target="_blank" rel="noopener" class="primary-btn">
      <i class="fa-solid fa-arrow-up-right-from-square"></i> Launch Live App
    </a>
    <a href="${project.github}" target="_blank" rel="noopener" class="secondary-btn">
      <i class="fab fa-github"></i> GitHub Source
    </a>`
        : `
    <a href="${project.github}" target="_blank" rel="noopener" class="primary-btn" style="flex: 1; justify-content: center;">
      <i class="fab fa-github"></i> View GitHub Repository
    </a>`
    }
  </div>
</div>`;

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeProject() {
  if (!modal) return;
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

function bindProjectEvents() {
  document.querySelectorAll(".view-btn[data-project]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      openProject(parseInt(btn.dataset.project, 10));
    });
  });

  document.querySelectorAll("#projectsGrid .project-image img").forEach((img) => {
    img.addEventListener("click", () => {
      const card = img.closest(".project-card");
      const id = card ? card.dataset.projectId : null;
      if (id) openProject(parseInt(id, 10));
    });
  });
}

if (projectCloseBtn) projectCloseBtn.addEventListener("click", closeProject);

if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeProject();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal && modal.style.display === "flex") closeProject();
});

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderProjects);
} else {
  renderProjects();
}
