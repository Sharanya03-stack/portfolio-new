/* ==========================================================
   SKILLS.JS — render skill categories from portfolioData
========================================================== */

"use strict";

function renderSkills() {
  const grid = document.getElementById("skillsGrid");
  if (!grid || typeof portfolioData === "undefined") return;

  const categories = portfolioData.skills
    .map(
      (cat) => `
<div class="skill-category glass-card">
  <h3><i class="${cat.icon}"></i> ${cat.category}</h3>
  <div class="skill-tags">
    ${cat.items.map((item) => `<span class="skill-tag">${item}</span>`).join("")}
  </div>
</div>`
    )
    .join("");

  const softSkills = `
<div class="skill-category glass-card">
  <h3><i class="fa-solid fa-brain"></i> Soft Skills</h3>
  <div class="soft-grid">
    ${portfolioData.softSkills.map((s) => `<div class="soft-card">${s}</div>`).join("")}
  </div>
</div>`;

  grid.innerHTML = categories + softSkills;

  if (typeof initScrollRevealForSelector === "function") {
    initScrollRevealForSelector(".skill-category", "reveal-right", "reveal-left");
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderSkills);
} else {
  renderSkills();
}
