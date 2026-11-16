import { STEAM_TUTORIAL } from '../data/tutorialContent.js';
import { communities } from '../data/serverDirectory.js';
import { getLocaleBundle } from '../data/i18n.js';

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Renders and handles Destination 01 — Welcome Centre & Noticeboard.
 */
export class WelcomeStationController {
  constructor(progressSystem, { onStartExpedition, onJumpToStation }) {
    this.progress = progressSystem;
    this.onStartExpedition = onStartExpedition;
    this.onJumpToStation = onJumpToStation;
    this.container = null;
  }

  mount(containerElement) {
    this.container = containerElement;
    this.render();
  }

  render() {
    if (!this.container) return;

    const lang = this.progress.getLanguage();
    const w = getLocaleBundle(lang).welcome;
    const reviewed = this.progress.isWelcomeReviewed();

    const pcListHtml = w.pcItems.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
    const destCardsHtml = w.destinationCards
      .map(
        (card) => `
        <div class="welcome-dest-card">
          <div class="welcome-dest-head">
            <span class="eac-code">${escapeHtml(card.code)}</span>
            <strong>${escapeHtml(card.name)}</strong>
          </div>
          <p>${escapeHtml(card.desc)}</p>
          ${
            card.id !== 'welcome-centre'
              ? `<button type="button" class="secondary-btn welcome-jump-btn" data-jump-dest="${escapeHtml(card.id)}">${escapeHtml(w.jumpBtn)}</button>`
              : ''
          }
        </div>
      `
      )
      .join('');

    this.container.innerHTML = `
      <div class="welcome-station-shell">
        <div class="welcome-section-grid">
          <section class="step-card">
            <div class="step-eyebrow">THE ISLE : EVRIMA</div>
            <h3>${escapeHtml(w.introTitle)}</h3>
            <p class="step-summary">${escapeHtml(w.introBody)}</p>
          </section>

          <section class="step-card">
            <div class="step-eyebrow">ONBOARDING</div>
            <h3>${escapeHtml(w.purposeTitle)}</h3>
            <p class="step-summary">${escapeHtml(w.purposeBody)}</p>
          </section>
        </div>

        <section class="step-card">
          <h3>${escapeHtml(w.pcTitle)}</h3>
          <ul class="skeleton-list">${pcListHtml}</ul>
          <div class="step-extra-actions">
            <a class="external-link-btn" href="${STEAM_TUTORIAL.steamStoreUrl}" target="_blank" rel="noopener noreferrer">
              ${escapeHtml(w.steamSpecsLink)}
            </a>
          </div>
        </section>

        <section class="step-card">
          <h3>${escapeHtml(w.destinationsTitle)}</h3>
          <div class="welcome-dest-grid">${destCardsHtml}</div>
        </section>

        <section class="step-card">
          <h3>${escapeHtml(w.navTitle)}</h3>
          <p class="step-summary">${escapeHtml(w.navDesktop)}</p>
          <p class="step-summary">${escapeHtml(w.navMobile)}</p>
        </section>

        <div class="welcome-station-cta">
          <button type="button" class="primary-btn" id="btn-welcome-start-exp">${escapeHtml(w.startBtn)}</button>
          <button type="button" class="secondary-btn" id="btn-welcome-go-steam">${escapeHtml(w.goSteamBtn)}</button>
          ${reviewed ? `<span class="eac-complete-badge">${escapeHtml(w.reviewedBadge)}</span>` : ''}
        </div>
      </div>
    `;

    this.container.querySelectorAll('[data-jump-dest]').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.progress.setWelcomeReviewed(true);
        if (this.onJumpToStation) this.onJumpToStation(btn.dataset.jumpDest);
      });
    });

    this.container.querySelector('#btn-welcome-start-exp')?.addEventListener('click', () => {
      this.progress.setWelcomeReviewed(true);
      if (this.onStartExpedition) this.onStartExpedition();
    });

    this.container.querySelector('#btn-welcome-go-steam')?.addEventListener('click', () => {
      this.progress.setWelcomeReviewed(true);
      if (this.onJumpToStation) this.onJumpToStation('steam-station');
    });
  }
}

/**
 * Renders and handles Destination 03 — Community Outpost Directory.
 * Driven dynamically by js/data/serverDirectory.js with search, filtering,
 * strict 18+ age-gating on restricted communities, and verified-only details.
 */
export class CommunityDirectoryController {
  constructor(progressSystem) {
    this.progress = progressSystem;
    this.container = null;
    this.searchQuery = '';
    this.filterMode = 'all'; // 'all' | 'unrestricted' | 'age18' | 'companion'
    this.expandedPanels = {}; // { [communityId]: 'serverInfo' | 'companionApp' | null }
  }

  mount(containerElement) {
    this.container = containerElement;
    this.render();
  }

  _getFilteredCommunities(lang) {
    const q = this.searchQuery.trim().toLowerCase();

    return communities.filter((entry) => {
      if (this.filterMode === 'unrestricted' && entry.ageRestriction) return false;
      if (this.filterMode === 'age18' && entry.ageRestriction !== '18+') return false;
      if (this.filterMode === 'companion' && !entry.companionApp) return false;

      if (!q) return true;
      const desc = entry.description?.[lang] || entry.description?.en || '';
      const haystack = [
        entry.name,
        entry.ageRestriction || '',
        entry.accessNotice || '',
        entry.companionApp || '',
        entry.region || '',
        desc
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(q);
    });
  }

  render() {
    if (!this.container) return;

    const lang = this.progress.getLanguage();
    const c = getLocaleBundle(lang).community;
    const filtered = this._getFilteredCommunities(lang);
    const reviewed = this.progress.isCommunityReviewed();

    const cardsHtml =
      filtered.length > 0
        ? filtered.map((entry) => this._renderCommunityCard(entry, lang, c)).join('')
        : `<div class="step-card"><p class="step-summary">${escapeHtml(c.emptyState)}</p></div>`;

    this.container.innerHTML = `
      <div class="community-shell">
        <p class="community-intro">${escapeHtml(c.intro)}</p>

        <div class="community-toolbar">
          <input
            type="search"
            id="community-search-input"
            class="community-search"
            placeholder="${escapeHtml(c.searchPlaceholder)}"
            value="${escapeHtml(this.searchQuery)}"
            aria-label="${escapeHtml(c.searchPlaceholder)}"
          />
          <div class="community-filters" role="group">
            ${this._filterBtn('all', c.filterAll)}
            ${this._filterBtn('unrestricted', c.filterUnrestricted)}
            ${this._filterBtn('age18', c.filterAge18)}
            ${this._filterBtn('companion', c.filterCompanion)}
          </div>
        </div>

        <div class="community-grid">${cardsHtml}</div>

        <div class="community-footer-bar">
          <button type="button" class="secondary-btn" id="btn-community-reviewed">
            ${reviewed ? escapeHtml(c.reviewedBadge) : escapeHtml(c.markReviewedBtn)}
          </button>
          ${reviewed ? `<span class="eac-complete-badge">${escapeHtml(c.reviewedBadge)}</span>` : ''}
        </div>
      </div>
    `;

    this._bindEvents();
  }

  _filterBtn(mode, label) {
    const active = this.filterMode === mode ? 'active' : '';
    return `<button type="button" class="lang-pill ${active}" data-community-filter="${mode}">${escapeHtml(label)}</button>`;
  }

  _renderCommunityCard(entry, lang, c) {
    const desc = entry.description?.[lang] || entry.description?.en || '';
    const verificationNote = entry.verificationNote?.[lang] || entry.verificationNote?.en || '';
    const isAgeRestricted = entry.ageRestriction === '18+';
    const ageStatus = this.progress.getIsleLinkAgeStatus();
    const expanded = this.expandedPanels[entry.id] || null;

    const badgesHtml = [
      `<span class="community-badge">${escapeHtml(c.verifiedSourceTag)}</span>`,
      entry.ageRestriction
        ? `<span class="community-badge age">${escapeHtml(entry.ageRestriction)} • ${escapeHtml(entry.accessNotice || '')}</span>`
        : ''
    ]
      .filter(Boolean)
      .join('');

    const metaRows = [
      `<li>${escapeHtml(c.regionTag(entry.region))}</li>`,
      `<li>${escapeHtml(entry.website ? entry.website : c.noWebsiteTag)}</li>`,
      `<li>${escapeHtml(entry.companionApp ? c.companionTag(entry.companionApp) : c.noCompanionTag)}</li>`
    ].join('');

    let actionsHtml = '';
    if (isAgeRestricted) {
      if (ageStatus === 'adult') {
        actionsHtml = `
          <div class="eac-warning">${escapeHtml(c.ageGateLabel)} — ${escapeHtml(entry.accessNotice || 'Adults only')}</div>
          <div class="community-actions-row">
            <a class="external-link-btn" href="${escapeHtml(entry.discord)}" target="_blank" rel="noopener noreferrer">
              ${escapeHtml(c.openDiscordBtn)}
            </a>
            ${
              entry.companionUrl
                ? `<a class="external-link-btn" href="${escapeHtml(entry.companionUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(c.companionDownloadBtn || 'COMPANION DOWNLOAD ↗')}</a>`
                : ''
            }
            ${
              entry.website
                ? `<a class="secondary-btn" style="text-decoration:none;" href="${escapeHtml(entry.website)}" target="_blank" rel="noopener noreferrer">${escapeHtml(c.websiteBtn || 'WEBSITE ↗')}</a>`
                : ''
            }
            <button type="button" class="secondary-btn" data-age-choice="unknown">${escapeHtml(c.resetAgeBtn)}</button>
          </div>
        `;
      } else if (ageStatus === 'underage') {
        actionsHtml = `
          <div class="eac-warning">${escapeHtml(c.underageBlocked)}</div>
          <div class="community-actions-row">
            <button type="button" class="secondary-btn" data-age-choice="unknown">${escapeHtml(c.resetAgeBtn)}</button>
          </div>
        `;
      } else {
        actionsHtml = `
          <div class="age-gate-box">
            <div class="age-gate-title">${escapeHtml(c.ageGateLabel)}</div>
            <p>${escapeHtml(c.ageGatePrompt)}</p>
            <div class="community-actions-row">
              <button type="button" class="secondary-btn" data-age-choice="adult">${escapeHtml(c.confirmAdultBtn)}</button>
              <button type="button" class="secondary-btn" data-age-choice="underage">${escapeHtml(c.confirmUnderageBtn)}</button>
            </div>
          </div>
        `;
      }
    } else {
      const compSteps = entry.companionInstructions?.[lang] || entry.companionInstructions?.en || [];
      const compStepsHtml = compSteps.map((s) => `<li>${escapeHtml(s)}</li>`).join('');

      let drawerHtml = '';
      if (expanded === 'serverInfo') {
        drawerHtml = `
          <div class="community-drawer">
            <h5>${escapeHtml(c.serverInfoTitle)}</h5>
            <p>${escapeHtml(c.serverInfoBody)}</p>
          </div>
        `;
      } else if (expanded === 'companionApp') {
        drawerHtml = `
          <div class="community-drawer">
            <h5>${escapeHtml(c.companionPanelTitle)}</h5>
            <ol class="step-instructions">${compStepsHtml}</ol>
            <div class="terminal-notice">${escapeHtml(c.companionWarning)}</div>
            <div class="community-actions-row">
              <a class="external-link-btn" href="${escapeHtml(entry.discord)}" target="_blank" rel="noopener noreferrer">
                ${escapeHtml(c.openDiscordBtn)}
              </a>
            </div>
          </div>
        `;
      }

      actionsHtml = `
        <div class="community-actions-row">
          <a class="external-link-btn" href="${escapeHtml(entry.discord)}" target="_blank" rel="noopener noreferrer">
            ${escapeHtml(c.openDiscordBtn)}
          </a>
          ${
            entry.website
              ? `<a class="secondary-btn" style="text-decoration:none;" href="${escapeHtml(entry.website)}" target="_blank" rel="noopener noreferrer">${escapeHtml(c.websiteBtn || 'WEBSITE ↗')}</a>`
              : ''
          }
          <button type="button" class="secondary-btn" data-expand-panel="${escapeHtml(entry.id)}:serverInfo">
            ${escapeHtml(c.serverInfoBtn)}
          </button>
          ${
            entry.companionApp
              ? `<button type="button" class="secondary-btn" data-expand-panel="${escapeHtml(entry.id)}:companionApp">${escapeHtml(c.companionAppBtn)}</button>`
              : ''
          }
        </div>
        ${drawerHtml}
      `;
    }

    return `
      <article class="community-card">
        <div class="community-card-head">
          <h3>${escapeHtml(entry.name)}</h3>
          <div class="community-badges">${badgesHtml}</div>
        </div>
        <p class="community-desc">${escapeHtml(desc)}</p>
        ${verificationNote ? `<p class="community-note">${escapeHtml(verificationNote)}</p>` : ''}
        <ul class="community-meta">${metaRows}</ul>
        ${actionsHtml}
      </article>
    `;
  }

  _bindEvents() {
    const searchInput = this.container.querySelector('#community-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const cursorPos = e.target.selectionStart;
        this.searchQuery = e.target.value;
        this.render();
        const nextInput = this.container.querySelector('#community-search-input');
        if (nextInput) {
          nextInput.focus();
          if (typeof cursorPos === 'number') {
            nextInput.setSelectionRange(cursorPos, cursorPos);
          }
        }
      });
    }

    this.container.querySelectorAll('[data-community-filter]').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.filterMode = btn.dataset.communityFilter;
        this.render();
      });
    });

    this.container.querySelectorAll('[data-age-choice]').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.progress.setIsleLinkAgeStatus(btn.dataset.ageChoice);
        this.render();
      });
    });

    this.container.querySelectorAll('[data-expand-panel]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const [id, panel] = btn.dataset.expandPanel.split(':');
        this.expandedPanels[id] = this.expandedPanels[id] === panel ? null : panel;
        this.render();
      });
    });

    this.container.querySelector('#btn-community-reviewed')?.addEventListener('click', () => {
      this.progress.setCommunityReviewed(!this.progress.isCommunityReviewed());
      this.render();
    });
  }
}

/**
 * Renders and handles Destination 04 — Companion Application Station.
 */
export class CompanionStationController {
  constructor(progressSystem) {
    this.progress = progressSystem;
    this.container = null;
  }

  mount(containerElement) {
    this.container = containerElement;
    this.render();
  }

  render() {
    if (!this.container) return;

    const lang = this.progress.getLanguage();
    const d = getLocaleBundle(lang).companion;
    const isReviewed = this.progress.isCompanionReviewed();
    const ageStatus = this.progress.getIsleLinkAgeStatus();
    const islelinkEntry = communities.find((e) => e.id === 'islelink');
    const obsidianEntry = communities.find((e) => e.id === 'obsidian-isle');

    const isleLinkActions =
      ageStatus === 'adult'
        ? `<a class="external-link-btn" href="${escapeHtml(islelinkEntry?.companionUrl || 'https://islelink.gg/download')}" target="_blank" rel="noopener noreferrer">${escapeHtml(d.islelinkDownloadBtn)}</a>
           <a class="secondary-btn" style="text-decoration:none;" href="${escapeHtml(islelinkEntry?.discord || 'https://discord.gg/islelink')}" target="_blank" rel="noopener noreferrer">DISCORD ↗</a>`
        : ageStatus === 'underage'
          ? `<div class="eac-warning">${escapeHtml(d.islelinkUnderage)}</div>`
          : `<div class="age-gate-box">
               <p>${escapeHtml(d.islelinkAgeNote)}</p>
               <div class="community-actions-row">
                 <button type="button" class="secondary-btn" data-comp-age="adult">${escapeHtml(d.confirm18)}</button>
                 <button type="button" class="secondary-btn" data-comp-age="underage">${escapeHtml(d.confirmUnder18)}</button>
               </div>
             </div>`;

    const safetyHtml = d.safetyItems.map((s) => `<li>${escapeHtml(s)}</li>`).join('');

    this.container.innerHTML = `
      <div class="welcome-station-shell">
        <p class="community-intro">${escapeHtml(d.intro)}</p>

        <div class="welcome-section-grid">
          <section class="step-card">
            <div class="step-eyebrow">MAIN SERVER #1 • ISLELINK (18+)</div>
            <h3>${escapeHtml(d.islelinkTitle)}</h3>
            <p class="step-summary">${escapeHtml(d.islelinkDesc)}</p>
            <div class="community-actions-row" style="margin-top:10px;">
              ${isleLinkActions}
            </div>
          </section>

          <section class="step-card">
            <div class="step-eyebrow">MAIN SERVER #2 • OBSIDIAN ISLE</div>
            <h3>${escapeHtml(d.obsidianTitle)}</h3>
            <p class="step-summary">${escapeHtml(d.obsidianDesc)}</p>
            <div class="community-actions-row" style="margin-top:10px;">
              <a class="external-link-btn" href="${escapeHtml(obsidianEntry?.discord || 'https://discord.gg/4CKwnyJ72C')}" target="_blank" rel="noopener noreferrer">
                ${escapeHtml(d.obsidianDiscordBtn)}
              </a>
            </div>
          </section>
        </div>

        <section class="step-card">
          <h3>${escapeHtml(d.safetyTitle)}</h3>
          <ul class="skeleton-list">${safetyHtml}</ul>
        </section>

        <div class="welcome-station-cta">
          <button type="button" class="primary-btn" id="btn-companion-reviewed">
            ${isReviewed ? escapeHtml(d.reviewedBadge) : escapeHtml(d.markReviewedBtn)}
          </button>
          ${isReviewed ? `<span class="eac-complete-badge">${escapeHtml(d.reviewedBadge)}</span>` : ''}
        </div>
      </div>
    `;

    this.container.querySelectorAll('[data-comp-age]').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.progress.setIsleLinkAgeStatus(btn.dataset.compAge);
        this.render();
      });
    });

    this.container.querySelector('#btn-companion-reviewed')?.addEventListener('click', () => {
      this.progress.setCompanionReviewed(!this.progress.isCompanionReviewed());
      this.render();
    });
  }
}

/**
 * Renders and handles Destination 05 — Expedition Departure Gate (11-point readiness checklist).
 */
export class DepartureStationController {
  constructor(progressSystem, { onReturnToExpedition, onJumpToStation }) {
    this.progress = progressSystem;
    this.onReturnToExpedition = onReturnToExpedition;
    this.onJumpToStation = onJumpToStation;
    this.container = null;
  }

  mount(containerElement) {
    this.container = containerElement;
    this.render();
  }

  render() {
    if (!this.container) return;

    const lang = this.progress.getLanguage();
    const dep = getLocaleBundle(lang).departure;

    const items = [
      { key: 'steamObtained', label: dep.items.steamObtained, jump: 'steam-station' },
      { key: 'evrimaSelected', label: dep.items.evrimaSelected, jump: 'steam-station' },
      { key: 'filesDownloaded', label: dep.items.filesDownloaded, jump: 'steam-station' },
      { key: 'eacChecked', label: dep.items.eacChecked, jump: 'steam-station' },
      { key: 'eacRepaired', label: dep.items.eacRepaired, jump: 'steam-station' },
      { key: 'filesVerified', label: dep.items.filesVerified, jump: 'steam-station' },
      { key: 'gameLaunched', label: dep.items.gameLaunched, jump: 'steam-station' },
      { key: 'communityReviewed', label: dep.items.communityReviewed, jump: 'community-outpost' },
      { key: 'companionReviewed', label: dep.items.companionReviewed, jump: 'companion-station' },
      { key: 'rulesReviewed', label: dep.items.rulesReviewed, jump: 'community-outpost' },
      { key: 'readyToExplore', label: dep.items.readyToExplore, jump: 'survival-training' }
    ];

    const completedCount = items.filter((item) => this.progress.getChecklistItem(item.key)).length;
    const pct = Math.round((completedCount / items.length) * 100);
    const allComplete = completedCount === items.length;

    const listHtml = items
      .map((item) => {
        const checked = this.progress.getChecklistItem(item.key);
        return `
        <label class="checklist-row ${checked ? 'checked' : ''}">
          <input type="checkbox" data-dep-check="${escapeHtml(item.key)}" ${checked ? 'checked' : ''} />
          <span>${escapeHtml(item.label)}</span>
        </label>
      `;
      })
      .join('');

    this.container.innerHTML = `
      <div class="tutorial-shell">
        <p class="community-intro">${escapeHtml(dep.intro)}</p>

        <div class="walkthrough-progress">
          <div class="progress-meta">
            <span>${escapeHtml(dep.heading)}</span>
            <span>${completedCount} / ${items.length} (${pct}%)</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill" style="width:${pct}%;"></div>
          </div>
        </div>

        <div class="checklist-grid">${listHtml}</div>

        ${
          allComplete
            ? `
          <div class="step-card" style="margin-top:16px; border-color:var(--accent-sun); background:rgba(212,166,86,0.12);">
            <div class="step-eyebrow" style="color:var(--accent-sun);">${escapeHtml(dep.completeTitle)}</div>
            <h3>${escapeHtml(dep.completeTagline)}</h3>
            <p class="step-summary">${escapeHtml(dep.completeBody)}</p>
          </div>
        `
            : `<div class="eac-callout" style="margin-top:14px;">${escapeHtml(dep.eacPolicyNote)}</div>`
        }

        <div class="welcome-station-cta" style="margin-top:16px;">
          <button type="button" class="primary-btn" id="btn-departure-return">${escapeHtml(dep.returnBtn)}</button>
          <button type="button" class="secondary-btn" id="btn-departure-survival">${escapeHtml(dep.visitSurvivalBtn)}</button>
        </div>
      </div>
    `;

    this.container.querySelectorAll('[data-dep-check]').forEach((box) => {
      box.addEventListener('change', (e) => {
        this.progress.setChecklistItem(e.target.dataset.depCheck, e.target.checked);
        if (e.target.dataset.depCheck === 'communityReviewed') {
          this.progress.setCommunityReviewed(e.target.checked);
        }
        this.render();
      });
    });

    this.container.querySelector('#btn-departure-return')?.addEventListener('click', () => {
      if (this.onReturnToExpedition) this.onReturnToExpedition();
    });

    this.container.querySelector('#btn-departure-survival')?.addEventListener('click', () => {
      if (this.onJumpToStation) this.onJumpToStation('survival-training');
    });
  }
}
