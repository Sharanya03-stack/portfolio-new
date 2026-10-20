/* ==========================================================
   SKILLS.JS — Dynamic rendering of client-relevant skill categories
   Organized into Frontend & UI/UX, Backend & Integration, and Practical AI & Dashboards
   Connects demonstrated skills directly to shipped case studies.
========================================================== */

"use strict";

function renderSkills() {
  const skillsGrid = document.getElementById("skillsGrid");
  if (!skillsGrid || typeof portfolioData === "undefined" || !portfolioData.skills) return;

  skillsGrid.innerHTML = portfolioData.skills
    .map(
      (cat) => `
    <article class="skill-category-card glass-card">
      <div class="skill-card-top">
        <div class="skill-header">
          <span class="skill-icon-box" aria-hidden="true">
            <i class="fa-solid ${cat.icon}"></i>
          </span>
          <div>
            <h3>${cat.category}</h3>
            ${cat.tier ? `<span class="skill-tier-badge">${cat.tier}</span>` : ""}
          </div>
        </div>
        ${cat.description ? `<p class="skill-cat-desc">${cat.description}</p>` : ""}
      </div>
      <div class="skill-tags-wrap" aria-label="${cat.category} skills">
        ${cat.items
          .map(
            (skill) => `
          <span class="skill-tag">${skill}</span>
        `
          )
          .join("")}
      </div>
      ${
        cat.relatedProjects
          ? `<div class="skill-project-ref">
              <span class="ref-label"><i class="fa-solid fa-circle-check" aria-hidden="true"></i> Demonstrated in:</span>
              <span class="ref-projects">${cat.relatedProjects}</span>
            </div>`
          : ""
      }
    </article>`
    )
    .join("");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderSkills);
} else {
  renderSkills();
}
