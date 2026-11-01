/**
 * Content Sections Renderer
 * Populates Metrics, Experience, Academics, Skills Matrix, Achievements, and Contact Nodes.
 */

"use strict";

(function () {
  function renderAllSections() {
    if (typeof portfolioData === "undefined") return;

    renderMetrics();
    renderResearch();
    renderExperienceAndAcademics();
    renderSkills();
    renderAchievements();
    renderContactNodes();
  }

  function renderMetrics() {
    const container = document.getElementById("metricsGrid");
    if (!container || !portfolioData.metrics) return;

    container.innerHTML = portfolioData.metrics
      .map(
        (m) => `
        <div class="metric-cell">
          <div class="metric-value">${escapeHtml(m.value)}</div>
          <div class="metric-label">${escapeHtml(m.label)}</div>
          <div class="metric-detail">${escapeHtml(m.detail)}</div>
        </div>
      `
      )
      .join("");
  }

  function renderResearch() {
    const container = document.getElementById("researchSpotlight");
    if (!container || !portfolioData.research) return;

    const r = portfolioData.research;
    const tags = r.tags.map((t) => `<span class="tech-pill">${escapeHtml(t)}</span>`).join("");

    container.innerHTML = `
      <article class="research-card-editorial" aria-label="Research: ${escapeHtml(r.title)}">
        <div>
          <div class="research-badge-row">
            <span class="research-conf-badge">Academic Publication</span>
            <span class="project-category-tag">Peer-Reviewed Conference</span>
          </div>
          <h3 class="research-title">${escapeHtml(r.title)}</h3>
          <div class="research-venue-callout">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            <span>${escapeHtml(r.venue)}</span>
          </div>
          <div class="research-abstract-box">
            <p>${escapeHtml(r.summary)}</p>
          </div>
          <div class="project-tech-pills">${tags}</div>
        </div>
        <div>
          <div class="timeline-engagement-callout" style="border-left-width: 4px; padding: 1.5rem; background: var(--color-bg-elevated);">
            <h4 style="font-size: 1rem; margin-bottom: 0.5rem; color: var(--color-text-primary);">Research Contribution</h4>
            <p style="font-size: 0.875rem; color: var(--color-text-secondary); line-height: 1.6; margin-bottom: 1rem;">
              Investigates the intersection of machine learning recommendation systems, network propagation models, and computational virality equations in modern algorithmic feeds.
            </p>
            <div style="display:flex; flex-wrap:wrap; gap:0.75rem;">
              <a href="${escapeHtml(r.pdf || 'assets/research/The_Meme_Equation_Simulating_Virality.pdf')}" target="_blank" rel="noopener noreferrer" class="btn-card-action primary" style="font-size: 0.8125rem;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                <span>Read Full Paper (PDF)</span>
              </a>
              <a href="mailto:sharureddy13@gmail.com?subject=Inquiry%20Regarding%20Meme%20Equation%20Research%20Paper" class="btn-card-action secondary" style="font-size: 0.8125rem;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <span>Discuss Research</span>
              </a>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  function renderExperienceAndAcademics() {
    const expContainer = document.getElementById("journeyTimeline");
    if (expContainer && portfolioData.experiences) {
      expContainer.innerHTML = portfolioData.experiences
        .map((exp) => {
          const tags = (exp.tags || []).map((t) => `<span class="timeline-tag">${escapeHtml(t)}</span>`).join("");
          return `
          <div class="timeline-entry-card">
            <div class="timeline-header">
              <div>
                <h3 class="timeline-role">${escapeHtml(exp.role)}</h3>
                <div class="timeline-org">${escapeHtml(exp.organization)}</div>
              </div>
              <span class="timeline-period">${escapeHtml(exp.period)}</span>
            </div>
            <p class="timeline-desc">${escapeHtml(exp.description)}</p>
            ${
              exp.engagement
                ? `<div class="timeline-engagement-callout">
                    ${escapeHtml(exp.engagement)}
                  </div>`
                : ""
            }
            <div class="timeline-tags">${tags}</div>
          </div>
        `;
        })
        .join("");
    }

    const academicContainer = document.getElementById("academicHighlights");
    if (academicContainer && portfolioData.education) {
      const edu = portfolioData.education;
      academicContainer.innerHTML = (edu.highlights || [])
        .map(
          (h) => `
          <div class="academic-highlight-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
            <span>${escapeHtml(h)}</span>
          </div>
        `
        )
        .join("");
    }
  }

  function renderSkills() {
    const grid = document.getElementById("skillsMatrixGrid");
    if (!grid || !portfolioData.skills) return;

    grid.innerHTML = portfolioData.skills
      .map((cat) => {
        const items = cat.items.map((i) => `<span class="skill-chip">${escapeHtml(i)}</span>`).join("");
        return `
        <div class="skill-domain-card">
          <div class="skill-domain-header">
            <h3 class="skill-domain-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              <span>${escapeHtml(cat.category)}</span>
            </h3>
            <span class="domain-code-badge">${escapeHtml(cat.code)}</span>
          </div>
          <div class="skill-items-wrap">
            ${items}
          </div>
        </div>
      `;
      })
      .join("");
  }

  function renderAchievements() {
    const grid = document.getElementById("achievementsGrid");
    if (!grid || !portfolioData.achievements) return;

    const iconSvgs = {
      trophy: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-2.34"/><path d="M14 14.66V17c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-2.34"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>`,
      award: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`,
      medal: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
      code: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    };

    grid.innerHTML = portfolioData.achievements
      .map(
        (a) => `
        <article class="achievement-card">
          <div>
            <div class="achievement-icon-row">
              <div class="achievement-icon">${iconSvgs[a.icon] || iconSvgs.award}</div>
              <span class="achievement-badge">${escapeHtml(a.badge)}</span>
            </div>
            <h3 class="achievement-title">${escapeHtml(a.title)}</h3>
            <div class="achievement-org">${escapeHtml(a.organization)}</div>
            <p class="achievement-desc">${escapeHtml(a.description)}</p>
          </div>
        </article>
      `
      )
      .join("");
  }

  function renderContactNodes() {
    const pane = document.getElementById("contactNodes");
    if (!pane || typeof portfolioData === "undefined") return;

    pane.innerHTML = `
      <!-- Email Node -->
      <div class="contact-node-card">
        <div class="contact-node-left">
          <div class="contact-node-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </div>
          <div>
            <div class="contact-node-label">Email Address</div>
            <a href="mailto:${escapeHtml(portfolioData.email)}" class="contact-node-val">${escapeHtml(portfolioData.email)}</a>
          </div>
        </div>
        <button type="button" class="contact-copy-btn" data-copy="${escapeHtml(portfolioData.email)}">Copy</button>
      </div>

      <!-- WhatsApp Node -->
      <div class="contact-node-card">
        <div class="contact-node-left">
          <div class="contact-node-icon" style="color: var(--color-accent-secondary);">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
          </div>
          <div>
            <div class="contact-node-label">Direct WhatsApp</div>
            <a href="${escapeHtml(portfolioData.whatsapp)}" target="_blank" rel="noopener noreferrer" class="contact-node-val">+91 6362813866</a>
          </div>
        </div>
        <a href="${escapeHtml(portfolioData.whatsapp)}" target="_blank" rel="noopener noreferrer" class="contact-copy-btn">Chat</a>
      </div>

      <!-- Location Node -->
      <div class="contact-node-card">
        <div class="contact-node-left">
          <div class="contact-node-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <div>
            <div class="contact-node-label">Location Base</div>
            <div class="contact-node-val">${escapeHtml(portfolioData.location)}</div>
          </div>
        </div>
        <span class="timeline-period">IST (UTC+5:30)</span>
      </div>

      <!-- Professional Profiles -->
      <div class="contact-node-card">
        <div class="contact-node-left">
          <div class="contact-node-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          </div>
          <div>
            <div class="contact-node-label">Engineering Network</div>
            <div class="contact-node-val">GitHub & LinkedIn</div>
          </div>
        </div>
        <div style="display:flex; gap:0.5rem;">
          <a href="${escapeHtml(portfolioData.github)}" target="_blank" rel="noopener noreferrer" class="contact-copy-btn">GitHub</a>
          <a href="${escapeHtml(portfolioData.linkedin)}" target="_blank" rel="noopener noreferrer" class="contact-copy-btn">LinkedIn</a>
        </div>
      </div>
    `;

    // Click to copy handler
    pane.querySelectorAll("[data-copy]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const text = btn.getAttribute("data-copy");
        if (!text) return;
        navigator.clipboard.writeText(text).then(() => {
          const original = btn.textContent;
          btn.textContent = "Copied!";
          setTimeout(() => {
            btn.textContent = original;
          }, 2000);
        });
      });
    });
  }

  function escapeHtml(str) {
    if (typeof str !== "string") return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  document.addEventListener("DOMContentLoaded", renderAllSections);
})();
