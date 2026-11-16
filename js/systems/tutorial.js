import { STEAM_TUTORIAL } from '../data/tutorialContent.js';
import { getLocaleBundle } from '../data/i18n.js';
import { renderVideoGuideGrid } from '../data/survivalContent.js';

/**
 * Generates clearly labelled interface illustrations (not fabricated screenshots)
 * for each Steam & Easy Anti-Cheat tutorial step.
 */
function renderIllustration(key, caption = 'INTERFACE ILLUSTRATION — NOT AN ACTUAL SCREENSHOT') {
  const diagrams = {
    'steam-store': `
      <div class="diagram-window">
        <div class="diagram-bar"><span>STEAM STORE</span><span>store.steampowered.com/app/376210</span></div>
        <div class="diagram-body diagram-split">
          <div class="diagram-box diagram-hero">THE ISLE<br/><small>App ID: 376210</small></div>
          <div class="diagram-col">
            <div class="diagram-line"></div>
            <div class="diagram-line short"></div>
            <div class="diagram-pill highlight">Add to Cart / Play Game</div>
          </div>
        </div>
      </div>`,
    'steam-library': `
      <div class="diagram-window">
        <div class="diagram-bar"><span>STEAM</span><span>LIBRARY &rsaquo; HOME</span></div>
        <div class="diagram-body diagram-split">
          <div class="diagram-sidebar">
            <div class="diagram-search">Search: The Isle</div>
            <div class="diagram-item active">The Isle</div>
            <div class="diagram-item">Other Games...</div>
          </div>
          <div class="diagram-col">
            <div class="diagram-pill">INSTALL / PLAY</div>
            <div class="diagram-line"></div>
          </div>
        </div>
      </div>`,
    'steam-properties': `
      <div class="diagram-window">
        <div class="diagram-bar"><span>STEAM LIBRARY</span><span>CONTEXT MENU</span></div>
        <div class="diagram-body diagram-split">
          <div class="diagram-sidebar">
            <div class="diagram-item active">The Isle (Right-Click)</div>
          </div>
          <div class="diagram-menu">
            <div>Play</div>
            <div>Manage &rsaquo;</div>
            <div class="highlight">Properties...</div>
          </div>
        </div>
      </div>`,
    'steam-betas': `
      <div class="diagram-window">
        <div class="diagram-bar"><span>THE ISLE — PROPERTIES</span><span>BETAS / GAME VERSIONS</span></div>
        <div class="diagram-body diagram-split">
          <div class="diagram-sidebar">
            <div class="diagram-item">General</div>
            <div class="diagram-item">Installed Files</div>
            <div class="diagram-item active">Betas</div>
          </div>
          <div class="diagram-col">
            <div class="diagram-field-label">Beta Participation</div>
            <div class="diagram-pill highlight">evrima - EVRIMA Public Branch &#9662;</div>
          </div>
        </div>
      </div>`,
    'steam-download': `
      <div class="diagram-window">
        <div class="diagram-bar"><span>STEAM DOWNLOADS</span><span>THE ISLE [evrima]</span></div>
        <div class="diagram-body">
          <div class="diagram-field-label">Downloading Evrima Branch Files...</div>
          <div class="diagram-progress"><span style="width: 78%"></span></div>
          <div class="diagram-line short"></div>
        </div>
      </div>`,
    'eac-overview': `
      <div class="diagram-window">
        <div class="diagram-bar"><span>THE ISLE: EVRIMA</span><span>BUNDLED ANTI-CHEAT</span></div>
        <div class="diagram-body diagram-center">
          <div class="diagram-shield">EAC</div>
          <div class="diagram-col">
            <div class="diagram-pill highlight">Included in Steam Install</div>
            <div class="diagram-field-label">No external download required</div>
          </div>
        </div>
      </div>`,
    'eac-terminal': `
      <div class="diagram-window">
        <div class="diagram-bar"><span>INSTALLED FILES &rsaquo; BROWSE</span><span>LOCAL DIRECTORY</span></div>
        <div class="diagram-body diagram-split">
          <div class="diagram-sidebar">
            <div class="diagram-item">...\\steamapps\\common\\The Isle\\</div>
            <div class="diagram-item active">InstallAntiCheat.bat / EasyAntiCheat\\</div>
          </div>
          <div class="diagram-col">
            <div class="diagram-pill highlight">Run Official Bundled Installer</div>
            <div class="diagram-field-label">Option A or Verify Files (Option B)</div>
          </div>
        </div>
      </div>`,
    'steam-verify': `
      <div class="diagram-window">
        <div class="diagram-bar"><span>THE ISLE — PROPERTIES</span><span>INSTALLED FILES</span></div>
        <div class="diagram-body diagram-split">
          <div class="diagram-sidebar">
            <div class="diagram-item">General</div>
            <div class="diagram-item active">Installed Files</div>
            <div class="diagram-item">Betas</div>
          </div>
          <div class="diagram-col">
            <div class="diagram-pill">Browse...</div>
            <div class="diagram-pill highlight">Verify integrity of game files</div>
          </div>
        </div>
      </div>`,
    'steam-launch': `
      <div class="diagram-window">
        <div class="diagram-bar"><span>STEAM LIBRARY</span><span>THE ISLE [evrima]</span></div>
        <div class="diagram-body diagram-center">
          <div class="diagram-pill play">&#9654; PLAY</div>
          <div class="diagram-field-label">Easy Anti-Cheat initializes &rarr; Evrima Main Menu</div>
        </div>
      </div>`,
    'install-complete': `
      <div class="diagram-window">
        <div class="diagram-bar"><span>EXPEDITION READINESS</span><span>STEAM + EVRIMA + EAC</span></div>
        <div class="diagram-body diagram-center">
          <div class="diagram-pill play">&#10003; READY FOR EVRIMA</div>
          <div class="diagram-field-label">Proceed to Location 03 — Community Outpost</div>
        </div>
      </div>`
  };

  return `
    <div class="illustration-frame">
      <div class="illustration-caption">${caption}</div>
      ${diagrams[key] || diagrams['steam-store']}
    </div>
  `;
}

/**
 * Renders and manages the interactive Steam & Easy Anti-Cheat Station UI.
 */
export class SteamTutorialController {
  constructor(progressSystem) {
    this.progress = progressSystem;
    this.activeTab = 'walkthrough'; // 'walkthrough' | 'eac' | 'troubleshooting' | 'checklist'
    this.container = null;
  }

  mount(containerElement) {
    this.container = containerElement;
    this.render();
  }

  setTab(tabName) {
    this.activeTab = tabName;
    this.render();
  }

  _t() {
    return getLocaleBundle(this.progress.getLanguage()).steam;
  }

  render() {
    if (!this.container) return;

    const t = this._t();
    const completedCount = STEAM_TUTORIAL.steps.filter((s) => this.progress.isStepCompleted(s.id)).length;
    const totalSteps = STEAM_TUTORIAL.steps.length;

    const tabsHtml = `
      <div class="terminal-tabs" role="tablist">
        <button type="button" class="terminal-tab ${this.activeTab === 'walkthrough' ? 'active' : ''}" data-tab="walkthrough">
          ${t.tabs.walkthrough(completedCount, totalSteps)}
        </button>
        <button type="button" class="terminal-tab ${this.activeTab === 'eac' ? 'active' : ''}" data-tab="eac">
          ${t.tabs.eac}
        </button>
        <button type="button" class="terminal-tab ${this.activeTab === 'troubleshooting' ? 'active' : ''}" data-tab="troubleshooting">
          ${t.tabs.troubleshooting}
        </button>
        <button type="button" class="terminal-tab ${this.activeTab === 'checklist' ? 'active' : ''}" data-tab="checklist">
          ${t.tabs.checklist}
        </button>
      </div>
    `;

    let panelHtml = '';
    if (this.activeTab === 'walkthrough') panelHtml = this._renderWalkthrough();
    else if (this.activeTab === 'eac') panelHtml = this._renderEacTerminal();
    else if (this.activeTab === 'troubleshooting') panelHtml = this._renderTroubleshooting();
    else panelHtml = this._renderChecklist();

    this.container.innerHTML = `${tabsHtml}<div class="terminal-stage">${panelHtml}</div>`;
    this._bindInteractions();
  }

  _renderWalkthrough() {
    const t = this._t();
    const stepIndex = this.progress.getSteamStep();
    const meta = STEAM_TUTORIAL.steps[stepIndex];
    const step = t.steps[stepIndex];
    const total = STEAM_TUTORIAL.steps.length;
    const isCompleted = this.progress.isStepCompleted(meta.id);
    const pct = Math.round(((stepIndex + 1) / total) * 100);

    const pills = STEAM_TUTORIAL.steps
      .map((s, idx) => {
        const done = this.progress.isStepCompleted(s.id);
        const current = idx === stepIndex;
        const localized = t.steps[idx];
        return `<button type="button" class="step-pill ${current ? 'current' : ''} ${done ? 'done' : ''}" data-step-index="${idx}" title="${localized.number}: ${localized.title}">${String(idx + 1).padStart(2, '0')}</button>`;
      })
      .join('');

    const instructionsHtml = step.instructions.map((line) => `<li>${line}</li>`).join('');
    const noticeHtml = step.notice ? `<div class="terminal-notice">${step.notice}</div>` : '';
    const linkHtml = meta.externalLink
      ? `<a class="external-link-btn" href="${meta.externalLink.url}" target="_blank" rel="noopener noreferrer">${t.openSteamBtn} &#8599;</a>`
      : '';
    const eacShortcutHtml = meta.openEacTab
      ? `<button type="button" class="secondary-btn" data-jump-tab="eac">${t.openEacTabBtn}</button>`
      : '';

    return `
      <div class="walkthrough-progress">
        <div class="progress-meta">
          <span>${t.stepOf(stepIndex + 1, total)}</span>
          <span>${t.throughWalkthrough(pct)}</span>
        </div>
        <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
        <div class="step-pills">${pills}</div>
      </div>

      <div class="step-card">
        <div class="step-card-header">
          <div>
            <div class="step-eyebrow">${step.number}</div>
            <h3>${step.title}</h3>
          </div>
          <label class="step-done-toggle">
            <input type="checkbox" data-toggle-step="${meta.id}" ${isCompleted ? 'checked' : ''} />
            <span>${isCompleted ? t.stepCompleted : t.markComplete}</span>
          </label>
        </div>

        <p class="step-summary">${step.summary}</p>
        ${renderIllustration(meta.illustration, t.illustrationCaption)}

        <ol class="step-instructions">${instructionsHtml}</ol>
        ${noticeHtml}

        <div class="step-extra-actions">
          ${linkHtml}
          ${eacShortcutHtml}
        </div>
      </div>

      <div class="step-nav-bar">
        <button type="button" class="secondary-btn" id="btn-step-prev" ${stepIndex === 0 ? 'disabled' : ''}>${t.prevStep}</button>
        <button type="button" class="primary-btn" id="btn-step-next">${stepIndex === total - 1 ? t.reviewChecklist : t.nextStep}</button>
      </div>

      ${renderVideoGuideGrid(this.progress.getLanguage())}
    `;
  }

  _renderEacTerminal() {
    const t = this._t();
    const eac = t.eacTerminal;
    const status = this.progress.getEacStatus();

    const optASteps = eac.optionA.steps.map((s, i) => `<li><strong>STEP ${String(i + 1).padStart(2, '0')}:</strong> ${s}</li>`).join('');
    const optBSteps = eac.optionB.steps.map((s, i) => `<li><strong>STEP ${String(i + 1).padStart(2, '0')}:</strong> ${s}</li>`).join('');

    return `
      <div class="eac-terminal-shell">
        <div class="eac-terminal-banner">
          <div class="eac-led-row">
            <span class="eac-led"></span>
            <span>${eac.ledLabel}</span>
          </div>
          <h3>${eac.title}</h3>
          <p class="eac-tagline">${eac.tagline}</p>
        </div>

        <div class="terminal-notice">${eac.noticeBanner}</div>

        <div class="eac-options-grid">
          <section class="eac-option-card">
            <div class="eac-option-head">
              <span class="eac-code">${eac.optionA.code}</span>
              <h4>${eac.optionA.title}</h4>
            </div>
            ${renderIllustration('eac-terminal', t.illustrationCaption)}
            <ol class="eac-step-list">${optASteps}</ol>
            <div class="eac-warning">${eac.optionA.buildVarianceWarning}</div>
            <div class="eac-warning">${eac.optionA.officialOnlyWarning}</div>
            <div class="eac-status-row">
              <button type="button" class="secondary-btn" data-toggle-eac="optionA">
                ${status.optionA ? '&#10003; ' + eac.optionA.completionMessage : eac.optionA.confirmBtn}
              </button>
              ${status.optionA ? `<span class="eac-complete-badge">${eac.optionA.completionMessage}</span>` : ''}
            </div>
          </section>

          <section class="eac-option-card">
            <div class="eac-option-head">
              <span class="eac-code">${eac.optionB.code}</span>
              <h4>${eac.optionB.title}</h4>
            </div>
            ${renderIllustration('steam-verify', t.illustrationCaption)}
            <ol class="eac-step-list">${optBSteps}</ol>
            <div class="eac-warning">${eac.optionB.fallbackWarning}</div>
            <div class="eac-status-row">
              <button type="button" class="secondary-btn" data-toggle-eac="optionB">
                ${status.optionB ? '&#10003; ' + eac.optionB.completionMessage : eac.optionB.confirmBtn}
              </button>
              ${status.optionB ? `<span class="eac-complete-badge">${eac.optionB.completionMessage}</span>` : ''}
            </div>
          </section>
        </div>

        ${renderVideoGuideGrid(this.progress.getLanguage())}
      </div>
    `;
  }

  _renderTroubleshooting() {
    const t = this._t();
    const cards = t.troubleshooting
      .map(
        (item) => `
        <div class="trouble-card">
          <div class="trouble-code">${item.code}</div>
          <h4>${item.title}</h4>
          <p>${item.action}</p>
        </div>
      `
      )
      .join('');

    return `
      <div class="trouble-grid">
        ${cards}
      </div>
      <div class="eac-warning">
        ${t.troublePolicy}
      </div>
    `;
  }

  _renderChecklist() {
    const t = this._t();
    const itemsHtml = STEAM_TUTORIAL.checklistItems
      .map((item) => {
        const checked = this.progress.getChecklistItem(item.key);
        const label = t.checklistItems[item.key] || item.label;
        return `
          <label class="checklist-row ${checked ? 'checked' : ''}">
            <input type="checkbox" data-checklist-key="${item.key}" ${checked ? 'checked' : ''} />
            <span>${label}</span>
          </label>
        `;
      })
      .join('');

    const doneCount = STEAM_TUTORIAL.checklistItems.filter((i) => this.progress.getChecklistItem(i.key)).length;

    return `
      <div class="checklist-panel">
        <div class="checklist-summary">
          <strong>${t.checklistHeading}</strong>
          <span>${t.checklistCountSuffix(doneCount, STEAM_TUTORIAL.checklistItems.length)}</span>
        </div>
        <div class="checklist-items">${itemsHtml}</div>
        <div class="terminal-notice">
          ${t.checklistNote}
        </div>
      </div>
    `;
  }

  _bindInteractions() {
    this.container.querySelectorAll('[data-tab]').forEach((btn) => {
      btn.addEventListener('click', () => this.setTab(btn.dataset.tab));
    });

    this.container.querySelectorAll('[data-jump-tab]').forEach((btn) => {
      btn.addEventListener('click', () => this.setTab(btn.dataset.jumpTab));
    });

    this.container.querySelectorAll('[data-step-index]').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.progress.setSteamStep(Number(btn.dataset.stepIndex));
        this.render();
      });
    });

    const prevBtn = this.container.querySelector('#btn-step-prev');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.progress.setSteamStep(this.progress.getSteamStep() - 1);
        this.render();
      });
    }

    const nextBtn = this.container.querySelector('#btn-step-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const curr = this.progress.getSteamStep();
        const currStep = STEAM_TUTORIAL.steps[curr];
        this.progress.toggleStepCompleted(currStep.id, true);
        if (currStep.checklistKey) {
          this.progress.setChecklistItem(currStep.checklistKey, true);
        }

        if (curr >= STEAM_TUTORIAL.steps.length - 1) {
          this.setTab('checklist');
        } else {
          this.progress.setSteamStep(curr + 1);
          this.render();
        }
      });
    }

    this.container.querySelectorAll('[data-toggle-step]').forEach((cb) => {
      cb.addEventListener('change', () => {
        const stepId = cb.dataset.toggleStep;
        this.progress.toggleStepCompleted(stepId, cb.checked);
        const step = STEAM_TUTORIAL.steps.find((s) => s.id === stepId);
        if (step?.checklistKey) {
          this.progress.setChecklistItem(step.checklistKey, cb.checked);
        }
        this.render();
      });
    });

    this.container.querySelectorAll('[data-toggle-eac]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const opt = btn.dataset.toggleEac;
        const curr = this.progress.getEacStatus()[opt];
        this.progress.setEacOptionStatus(opt, !curr);
        this.render();
      });
    });

    this.container.querySelectorAll('[data-checklist-key]').forEach((cb) => {
      cb.addEventListener('change', () => {
        this.progress.setChecklistItem(cb.dataset.checklistKey, cb.checked);
        this.render();
      });
    });
  }
}
