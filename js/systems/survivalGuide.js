import { SURVIVAL_MANUAL, SURVIVAL_HUD_ICONS } from '../data/survivalContent.js';

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Renders and handles Destination 06 — Survival Training Ground Field Manual.
 */
export class SurvivalGuideController {
  constructor(progressSystem) {
    this.progress = progressSystem;
    this.container = null;
    this.activeTabId = 'controls';
  }

  mount(containerElement) {
    this.container = containerElement;
    this.render();
  }

  render() {
    if (!this.container) return;

    const lang = this.progress.getLanguage();
    const m = SURVIVAL_MANUAL[lang] || SURVIVAL_MANUAL.en;
    const activeTab = m.tabs.find((t) => t.id === this.activeTabId) || m.tabs[0];
    const reviewed = this.progress.isSurvivalReviewed();

    const tabsHtml = m.tabs
      .map(
        (tab) => `
        <button
          type="button"
          class="terminal-tab ${tab.id === activeTab.id ? 'active' : ''}"
          data-survival-tab="${escapeHtml(tab.id)}"
        >${escapeHtml(tab.label)}</button>
      `
      )
      .join('');

    const cardsHtml = activeTab.cards
      .map(
        (card) => `
        <section class="step-card">
          <h3>${escapeHtml(card.heading)}</h3>
          <ul class="skeleton-list">
            ${card.items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
          </ul>
        </section>
      `
      )
      .join('');

    const iconsHtml = SURVIVAL_HUD_ICONS.map(
      (icon) => `
      <div class="hud-icon-chip">
        <img src="${escapeHtml(icon.src)}" alt="${escapeHtml(icon.label[lang] || icon.label.en)}" loading="lazy" />
        <span>${escapeHtml(icon.label[lang] || icon.label.en)}</span>
      </div>
    `
    ).join('');

    this.container.innerHTML = `
      <div class="tutorial-shell">
        <p class="welcome-desc" style="margin-bottom: 10px;">${escapeHtml(m.intro)}</p>
        <div class="eac-callout" style="margin-bottom: 12px;">${escapeHtml(m.instructorsNote)}</div>

        <div class="terminal-tabs">${tabsHtml}</div>

        <section class="step-card" style="margin-bottom: 12px;">
          <div class="step-eyebrow">${escapeHtml(activeTab.label)}</div>
          <h3>${escapeHtml(activeTab.title)}</h3>
          <p class="step-summary">${escapeHtml(activeTab.summary)}</p>
        </section>

        <div class="welcome-section-grid">
          ${cardsHtml}
        </div>

        <section class="step-card" style="margin-top: 12px;">
          <div class="step-eyebrow">HUD & α / β / γ ICONS</div>
          <h3>${escapeHtml(m.iconsSectionTitle || 'Evrima HUD Status & Diet Symbols')}</h3>
          <div class="hud-icon-grid">${iconsHtml}</div>
        </section>

        <div class="welcome-station-cta">
          <button type="button" class="primary-btn" id="btn-survival-reviewed">${escapeHtml(m.markReviewedBtn)}</button>
          ${reviewed ? `<span class="eac-complete-badge">${escapeHtml(m.reviewedBadge)}</span>` : ''}
        </div>
      </div>
    `;

    this.container.querySelectorAll('[data-survival-tab]').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.activeTabId = btn.dataset.survivalTab;
        this.render();
      });
    });

    const markBtn = this.container.querySelector('#btn-survival-reviewed');
    if (markBtn) {
      markBtn.addEventListener('click', () => {
        this.progress.markSurvivalReviewed();
        this.render();
      });
    }
  }
}
