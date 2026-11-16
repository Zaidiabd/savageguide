import { DESTINATIONS, SAVAGEZED_NPC } from '../data/tutorialContent.js';
import { getLocaleBundle } from '../data/i18n.js';
import { GUIDE_TRANSLATIONS, SHANKS_MUTATIONS } from '../data/survivalContent.js';
import { SteamTutorialController } from '../systems/tutorial.js';
import { WelcomeStationController, CommunityDirectoryController } from '../systems/destinations.js';
import { SurvivalGuideController } from '../systems/survivalGuide.js';

const SESSION_NAME_KEY = 'the-isle-expedition-player-name';

function escapeHtml(val) {
  return String(val ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Manages DOM UI overlays, HUD status, destination selector,
 * language switching (English / Bahasa Melayu / Kecek KL),
 * interaction prompt, station modal panels, and SavageZed NPC dialog.
 */
export class InterfaceController {
  constructor({ player, navigation, progress, onOpenStation, onCloseStation }) {
    this.player = player;
    this.navigation = navigation;
    this.progress = progress;
    this.steamTutorial = new SteamTutorialController(progress);
    this.welcomeStation = new WelcomeStationController(progress, {
      onStartExpedition: () => this.closeStationModal(true),
      onJumpToStation: (destId) => {
        const dest = this.navigation.jumpTo(destId);
        if (dest) this.openStationModal(dest);
      }
    });
    this.communityDirectory = new CommunityDirectoryController(progress);
    this.survivalGuide = new SurvivalGuideController(progress);
    this.onOpenStation = onOpenStation;
    this.onCloseStation = onCloseStation;

    this.currentModalIndex = -1;
    this.currentNpcPageId = 'greeting';
    this.activeNpcTarget = null;
    this.selectedMutationId = 'reniculate';
    this.currentActiveStation = null;
    this.isModalOpen = false;
    this.isNpcDialogOpen = false;
    this.hasEnteredWorld = false;
    this.joystickTouchId = null;

    try {
      this.playerName = window.sessionStorage.getItem(SESSION_NAME_KEY)?.trim() || '';
    } catch {
      this.playerName = '';
    }

    document.body.classList.toggle('touch-device', Boolean(player.isTouchDevice));

    this.els = {
      hud: document.getElementById('hud'),
      currentZone: document.getElementById('current-zone'),
      objectiveText: document.getElementById('objective-text'),
      hudLangLabel: document.getElementById('hud-lang-label'),
      languageSelect: document.getElementById('language-select'),
      hudDestLabel: document.getElementById('hud-dest-label'),
      destinationSelect: document.getElementById('destination-select'),
      btnControlsHelp: document.getElementById('btn-controls-help'),
      hudStatusLabel: document.getElementById('hud-status-label'),
      hudHint: document.getElementById('hud-hint'),
      crosshair: document.getElementById('crosshair'),
      interactPrompt: document.getElementById('interact-prompt'),
      interactLabel: document.getElementById('interact-label'),
      touchJoystick: document.getElementById('touch-joystick'),
      touchJoystickKnob: document.getElementById('touch-joystick-knob'),
      btnTouchJump: document.getElementById('btn-touch-jump'),
      btnTouchSprint: document.getElementById('btn-touch-sprint'),
      welcomeOverlay: document.getElementById('welcome-overlay'),
      welcomeEyebrow: document.getElementById('welcome-eyebrow'),
      welcomeTagline: document.getElementById('welcome-tagline'),
      welcomeDesc: document.getElementById('welcome-desc'),
      welcomeLangLabel: document.getElementById('welcome-lang-label'),
      welcomeLangPills: document.querySelectorAll('#welcome-lang-switcher .lang-pill'),
      welcomeNameLabel: document.getElementById('welcome-name-label'),
      playerNameInput: document.getElementById('player-name-input'),
      welcomeNameError: document.getElementById('welcome-name-error'),
      ctrlMove: document.getElementById('ctrl-move'),
      ctrlLook: document.getElementById('ctrl-look'),
      ctrlSprint: document.getElementById('ctrl-sprint'),
      ctrlJump: document.getElementById('ctrl-jump'),
      ctrlInteract: document.getElementById('ctrl-interact'),
      ctrlEsc: document.getElementById('ctrl-esc'),
      pointerNote: document.getElementById('pointer-status-note'),
      btnStart: document.getElementById('btn-start-expedition'),
      stationModal: document.getElementById('station-modal'),
      stationBadge: document.getElementById('station-badge'),
      stationTitle: document.getElementById('station-title'),
      stationSubtitle: document.getElementById('station-subtitle'),
      stationBody: document.getElementById('station-body'),
      btnCloseModal: document.getElementById('btn-close-modal'),
      btnPrevStation: document.getElementById('btn-prev-station'),
      btnNextStation: document.getElementById('btn-next-station'),
      btnResumeWalk: document.getElementById('btn-resume-walk'),
      npcDialog: document.getElementById('npc-dialog'),
      npcAvatarBadge: document.getElementById('npc-avatar-badge'),
      npcCommunityTag: document.querySelector('.npc-community-tag'),
      npcName: document.getElementById('npc-name'),
      npcRole: document.getElementById('npc-role'),
      npcDialogText: document.getElementById('npc-dialog-text'),
      npcExtraPanel: document.getElementById('npc-extra-panel'),
      npcDialogHint: document.getElementById('npc-dialog-hint'),
      btnCloseNpc: document.getElementById('btn-close-npc'),
      btnNpcWhatToDo: document.getElementById('btn-npc-what-to-do'),
      btnNpcGreeting: document.getElementById('btn-npc-greeting'),
      btnNpcJumpSteam: document.getElementById('btn-npc-jump-steam'),
      btnNpcBye: document.getElementById('btn-npc-bye')
    };

    this._bindEvents();
    this.applyLanguage();
  }

  get hasOpenOverlay() {
    return this.isModalOpen || this.isNpcDialogOpen;
  }

  _bundle() {
    return getLocaleBundle(this.progress.getLanguage());
  }

  getDisplayName() {
    return this.playerName || 'Survivor';
  }

  _withName(text) {
    return String(text ?? '').replaceAll('{name}', this.getDisplayName());
  }

  setLanguage(langCode) {
    this.progress.setLanguage(langCode);
    this.applyLanguage();
  }

  applyLanguage() {
    const lang = this.progress.getLanguage();
    const b = this._bundle();
    const u = b.ui;

    // Sync language selectors
    this.els.languageSelect.value = lang;
    this.els.welcomeLangPills.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Welcome Overlay strings
    this.els.welcomeEyebrow.textContent = u.eyebrow;
    this.els.welcomeTagline.textContent = u.tagline;
    this.els.welcomeDesc.textContent = u.welcomeDesc;
    this.els.welcomeLangLabel.textContent = u.langLabel;
    this.els.ctrlMove.textContent = u.ctrlMove;
    this.els.ctrlLook.textContent = u.ctrlLook;
    this.els.ctrlSprint.textContent = u.ctrlSprint;
    if (this.els.ctrlJump) {
      this.els.ctrlJump.textContent = u.ctrlJump || 'Jump';
    }
    this.els.ctrlInteract.textContent = u.ctrlInteract;
    this.els.ctrlEsc.textContent = u.ctrlEsc;
    this.els.btnStart.textContent = u.startBtn;
    if (this.els.welcomeNameLabel) {
      this.els.welcomeNameLabel.textContent = u.nameLabel || 'SURVIVOR NAME';
    }
    if (this.els.playerNameInput) {
      this.els.playerNameInput.placeholder = u.namePlaceholder || 'Enter your name...';
      if (this.playerName && !this.els.playerNameInput.value) {
        this.els.playerNameInput.value = this.playerName;
      }
    }
    if (this.els.welcomeNameError && !this.els.welcomeNameError.classList.contains('hidden')) {
      this.els.welcomeNameError.textContent = u.nameRequired;
    }
    this.els.pointerNote.textContent = this.player.isTouchDevice ? u.pointerNoteTouch : u.pointerNote;
    this.els.btnTouchSprint.textContent = u.sprintBtn;
    if (this.els.btnTouchJump) {
      this.els.btnTouchJump.textContent = u.jumpBtn || 'JUMP';
    }

    // HUD strings
    this.els.hudLangLabel.textContent = u.langLabel;
    this.els.hudDestLabel.textContent = u.destLabel;
    this.els.btnControlsHelp.textContent = u.controlsBtn;
    this.els.hudStatusLabel.textContent = u.statusLabel;
    this.els.hudHint.innerHTML = u.hudHint.replace('ESC', '<kbd>ESC</kbd>');
    if (!this.isModalOpen && !this.isNpcDialogOpen) {
      this.els.objectiveText.textContent = this._withName(u.objectiveDefault);
    }

    // Modal & NPC static button labels
    this.els.btnCloseModal.textContent = u.closeEsc;
    this.els.btnPrevStation.textContent = u.prevStation;
    this.els.btnNextStation.textContent = u.nextStation;
    this.els.btnResumeWalk.textContent = u.returnOutpost;

    this.els.npcCommunityTag.textContent = u.npcCommunityTag;
    this.els.btnCloseNpc.textContent = u.npcByeEsc;

    this._populateDestinationMenu();

    // Refresh currently open modal or NPC dialog immediately
    if (this.isModalOpen && this.currentModalIndex >= 0) {
      this.openStationModal(DESTINATIONS[this.currentModalIndex]);
    }
    if (this.isNpcDialogOpen) {
      this._renderNpcPage(this.currentNpcPageId);
      this.els.objectiveText.textContent = this._getNpcSpeakingStatus();
    }
  }

  _populateDestinationMenu() {
    const b = this._bundle();
    const select = this.els.destinationSelect;
    select.innerHTML = '';

    const defaultOpt = document.createElement('option');
    defaultOpt.value = '';
    defaultOpt.textContent = b.ui.quickJumpDefault;
    select.appendChild(defaultOpt);

    const npcOpt = document.createElement('option');
    npcOpt.value = SAVAGEZED_NPC.id;
    npcOpt.textContent = b.ui.npcMenuLabel;
    select.appendChild(npcOpt);

    for (const dest of DESTINATIONS) {
      const loc = b.destinations[dest.id] || dest;
      const num = (loc.badge || dest.badge).split(' ').pop();
      const opt = document.createElement('option');
      opt.value = dest.id;
      opt.textContent = `${num}. ${loc.title}`;
      select.appendChild(opt);
    }
  }

  _bindEvents() {
    this.els.languageSelect.addEventListener('change', (e) => {
      this.setLanguage(e.target.value);
      e.target.blur();
    });

    this.els.welcomeLangPills.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.setLanguage(btn.dataset.lang);
      });
    });

    this.els.btnStart.addEventListener('click', () => {
      this.enterWorld();
    });

    if (this.els.playerNameInput) {
      this.els.playerNameInput.addEventListener('input', () => {
        if (this.els.welcomeNameError) {
          this.els.welcomeNameError.classList.add('hidden');
        }
      });
      this.els.playerNameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.enterWorld();
        }
      });
    }

    // Tappable interaction prompt for mobile & non-pointer-lock play
    this.els.interactPrompt.addEventListener('click', (e) => {
      e.stopPropagation();
      if (this.currentActiveStation && !this.hasOpenOverlay) {
        this.openInteraction(this.currentActiveStation);
      }
    });

    this._bindTouchControls();

    this.els.btnControlsHelp.addEventListener('click', () => {
      this.showWelcome();
    });

    this.els.destinationSelect.addEventListener('change', (e) => {
      const id = e.target.value;
      if (!id) return;
      const dest = this.navigation.jumpTo(id);
      if (dest) {
        const b = this._bundle();
        if (dest.isNpc) {
          this.els.objectiveText.textContent = b.ui.arrivedNpc(b.npc.title);
        } else {
          const loc = b.destinations[dest.id] || dest;
          this.els.objectiveText.textContent = b.ui.arrivedStation(loc.title);
        }
      }
      e.target.value = '';
      e.target.blur();
    });

    this.els.btnCloseModal.addEventListener('click', () => this.closeStationModal());
    this.els.btnResumeWalk.addEventListener('click', () => this.closeStationModal(true));

    this.els.btnPrevStation.addEventListener('click', () => {
      if (this.currentModalIndex < 0) return;
      const prevIdx = (this.currentModalIndex - 1 + DESTINATIONS.length) % DESTINATIONS.length;
      const dest = DESTINATIONS[prevIdx];
      this.navigation.jumpTo(dest.id);
      this.openStationModal(dest);
    });

    this.els.btnNextStation.addEventListener('click', () => {
      if (this.currentModalIndex < 0) return;
      const nextIdx = (this.currentModalIndex + 1) % DESTINATIONS.length;
      const dest = DESTINATIONS[nextIdx];
      this.navigation.jumpTo(dest.id);
      this.openStationModal(dest);
    });

    // SavageZed Dialog Box actions
    this.els.btnCloseNpc.addEventListener('click', () => this.closeNpcDialog(false));
    this.els.btnNpcBye.addEventListener('click', () => this.closeNpcDialog(true));
    this.els.btnNpcWhatToDo.addEventListener('click', () => this._renderNpcPage('what-to-do'));
    this.els.btnNpcGreeting.addEventListener('click', () => this._renderNpcPage('greeting'));
    this.els.btnNpcJumpSteam.addEventListener('click', () => {
      const targetStationId =
        this.activeNpcTarget?.isStationGuide && this.activeNpcTarget.stationId
          ? this.activeNpcTarget.stationId
          : 'steam-station';
      this.closeNpcDialog(false);
      const dest = DESTINATIONS.find((d) => d.id === targetStationId);
      if (dest) {
        if (this.activeNpcTarget?.isStationGuide) {
          this.openStationModal(dest);
        } else {
          const arrived = this.navigation.jumpTo(dest.id);
          if (arrived) {
            const b = this._bundle();
            const loc = b.destinations[arrived.id] || arrived;
            this.els.objectiveText.textContent = b.ui.arrivedStation(loc.title);
          }
        }
      }
    });
  }

  _bindTouchControls() {
    const joy = this.els.touchJoystick;
    const knob = this.els.touchJoystickKnob;
    if (!joy || !knob) return;

    const maxRadius = 38;

    const updateStick = (clientX, clientY) => {
      const rect = joy.getBoundingClientRect();
      const cx = rect.left + rect.width * 0.5;
      const cy = rect.top + rect.height * 0.5;
      let dx = clientX - cx;
      let dy = clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist > maxRadius) {
        dx = (dx / dist) * maxRadius;
        dy = (dy / dist) * maxRadius;
      }
      knob.style.transform = `translate(${dx}px, ${dy}px)`;
      this.player.setAnalogMove(dx / maxRadius, -dy / maxRadius);
    };

    const resetStick = () => this._resetTouchStick();
    this._resetStickFn = () => {
      this.joystickTouchId = null;
      knob.style.transform = 'translate(0px, 0px)';
      this.player.setAnalogMove(0, 0);
    };

    joy.addEventListener(
      'touchstart',
      (e) => {
        if (this.joystickTouchId !== null) return;
        const t = e.changedTouches[0];
        if (!t) return;
        this.joystickTouchId = t.identifier;
        updateStick(t.clientX, t.clientY);
        e.preventDefault();
      },
      { passive: false }
    );

    joy.addEventListener(
      'touchmove',
      (e) => {
        for (const t of e.changedTouches) {
          if (t.identifier === this.joystickTouchId) {
            updateStick(t.clientX, t.clientY);
            e.preventDefault();
            break;
          }
        }
      },
      { passive: false }
    );

    const endStick = (e) => {
      for (const t of e.changedTouches) {
        if (t.identifier === this.joystickTouchId) {
          resetStick();
          break;
        }
      }
    };
    joy.addEventListener('touchend', endStick, { passive: true });
    joy.addEventListener('touchcancel', endStick, { passive: true });

    if (this.els.btnTouchJump) {
      this.els.btnTouchJump.addEventListener('click', (e) => {
        e.stopPropagation();
        this.player.triggerJump();
      });
    }

    this.els.btnTouchSprint.addEventListener('click', (e) => {
      e.stopPropagation();
      const next = !this.player.touchSprint;
      this.player.setTouchSprint(next);
      this.els.btnTouchSprint.classList.toggle('active', next);
    });
  }

  _resetTouchStick() {
    if (this._resetStickFn) this._resetStickFn();
  }

  enterWorld() {
    if (this.els.playerNameInput) {
      const entered = this.els.playerNameInput.value.trim();
      if (!entered) {
        if (this.els.welcomeNameError) {
          this.els.welcomeNameError.textContent =
            this._bundle().ui.nameRequired || 'Please enter your survivor name first.';
          this.els.welcomeNameError.classList.remove('hidden');
        }
        this.els.playerNameInput.focus();
        return;
      }
      this.playerName = entered;
      try {
        window.sessionStorage.setItem(SESSION_NAME_KEY, entered);
      } catch {
        // Ignore storage restrictions
      }
      if (this.els.welcomeNameError) {
        this.els.welcomeNameError.classList.add('hidden');
      }
    }

    this.hasEnteredWorld = true;
    this.els.welcomeOverlay.classList.add('hidden');
    this.els.hud.classList.remove('hidden');
    this.els.objectiveText.textContent = this._withName(this._bundle().ui.objectiveDefault);
    this.player.setEnabled(true);
    this.player.lockPointer();
  }

  showWelcome() {
    this._resetTouchStick();
    this.player.unlockPointer();
    this.player.setEnabled(false);
    this.els.welcomeOverlay.classList.remove('hidden');
  }

  openInteraction(target) {
    this._resetTouchStick();
    if (target.isNpc) {
      this.openNpcDialog(target);
    } else {
      this.openStationModal(target);
    }
  }

  _getNpcSpeakingStatus() {
    const u = this._bundle().ui;
    if (this.activeNpcTarget?.isStationGuide) {
      return u.speakingWithGuide
        ? u.speakingWithGuide(this.activeNpcTarget.displayName, this.activeNpcTarget.speciesLabel)
        : `Speaking with ${this.activeNpcTarget.displayName}`;
    }
    return u.speakingWith;
  }

  openNpcDialog(npcTarget = SAVAGEZED_NPC) {
    this.activeNpcTarget = npcTarget || SAVAGEZED_NPC;
    this.isNpcDialogOpen = true;
    this.player.setEnabled(false);
    this.player.unlockPointer();
    this._renderNpcPage('greeting');
    this.els.npcDialog.classList.remove('hidden');
    this.els.objectiveText.textContent = this._getNpcSpeakingStatus();
  }

  _renderNpcPage(pageId) {
    this.currentNpcPageId = pageId;
    const lang = this.progress.getLanguage();
    const b = this._bundle();
    const u = b.ui;

    if (this.activeNpcTarget?.isStationGuide) {
      const guide = this.activeNpcTarget;
      const gLocale = GUIDE_TRANSLATIONS[lang] || GUIDE_TRANSLATIONS.en;
      const gInfo = gLocale.guides[guide.guideId] || GUIDE_TRANSLATIONS.en.guides[guide.guideId];
      const stationDest = DESTINATIONS.find((d) => d.id === guide.stationId);
      const stationTitle =
        (stationDest && (b.destinations[stationDest.id]?.title || stationDest.title)) ||
        guide.stationId;

      if (this.els.npcAvatarBadge) {
        this.els.npcAvatarBadge.textContent = guide.initials || 'GD';
      }
      this.els.npcName.textContent = guide.displayName;
      this.els.npcRole.textContent = gInfo.role;
      this.els.npcDialogText.textContent = this._withName(
        pageId === 'what-to-do' ? gInfo.tips : gInfo.greeting
      );
      this.els.npcDialogHint.textContent = this._withName(gInfo.hint);

      if (guide.guideId === 'shanks') {
        const sData = SHANKS_MUTATIONS[lang] || SHANKS_MUTATIONS.en;
        this.els.btnNpcWhatToDo.textContent = sData.askBtn;
        this._renderShanksMutationsPanel(sData);
      } else {
        this.els.btnNpcWhatToDo.textContent = u.npcBtnWhatToDo;
        if (this.els.npcExtraPanel) {
          this.els.npcExtraPanel.classList.add('hidden');
          this.els.npcExtraPanel.innerHTML = '';
        }
      }

      this.els.btnNpcGreeting.textContent = u.npcBtnGreeting;
      this.els.btnNpcJumpSteam.textContent = gLocale.openStationBtn(stationTitle);
      this.els.btnNpcBye.textContent = gLocale.byeGuideBtn(guide.displayName);

      this.els.btnNpcWhatToDo.classList.toggle('hidden', pageId === 'what-to-do');
      this.els.btnNpcGreeting.classList.toggle('hidden', pageId === 'greeting');
      return;
    }

    if (this.els.npcExtraPanel) {
      this.els.npcExtraPanel.classList.add('hidden');
      this.els.npcExtraPanel.innerHTML = '';
    }

    const page = b.npc.pages[pageId] || b.npc.pages.greeting;
    if (this.els.npcAvatarBadge) {
      this.els.npcAvatarBadge.textContent = 'SZ';
    }
    this.els.npcName.textContent = page.speaker;
    this.els.npcRole.textContent = page.role;
    this.els.npcDialogText.textContent = this._withName(page.text);
    this.els.npcDialogHint.textContent = this._withName(page.hint);

    this.els.btnNpcWhatToDo.textContent = u.npcBtnWhatToDo;
    this.els.btnNpcGreeting.textContent = u.npcBtnGreeting;
    this.els.btnNpcJumpSteam.textContent = u.npcBtnJumpSteam;
    this.els.btnNpcBye.textContent = u.npcBtnBye;

    this.els.btnNpcWhatToDo.classList.toggle('hidden', pageId === 'what-to-do');
    this.els.btnNpcGreeting.classList.toggle('hidden', pageId === 'greeting');
  }

  _renderShanksMutationsPanel(sData) {
    const panel = this.els.npcExtraPanel;
    if (!panel) return;

    panel.classList.remove('hidden');

    const pillsHtml = sData.items
      .map(
        (m) => `
        <button type="button" class="mutation-pill ${this.selectedMutationId === m.id ? 'active' : ''}" data-mut-id="${escapeHtml(m.id)}">
          ${escapeHtml(m.name)}
        </button>
      `
      )
      .join('');

    const allBtnHtml = `
      <button type="button" class="mutation-pill ${this.selectedMutationId === 'all' ? 'active' : ''}" data-mut-id="all">
        ${escapeHtml(sData.revealAllLabel)}
      </button>
    `;

    let detailHtml = '';
    if (this.selectedMutationId === 'all') {
      detailHtml = sData.items
        .map(
          (m) => `
          <div style="margin-bottom: 8px;">
            <strong>${escapeHtml(m.name)}:</strong> ${escapeHtml(m.effect)}<br/>
            <span style="color: var(--accent-olive);">Unlock:</span> ${escapeHtml(m.condition)}
          </div>
        `
        )
        .join('');
    } else {
      const selected = sData.items.find((m) => m.id === this.selectedMutationId) || sData.items[0];
      detailHtml = `
        <div><strong>${escapeHtml(selected.name)}</strong> — ${escapeHtml(selected.effect)}</div>
        <div style="margin-top: 4px;"><strong style="color: var(--accent-olive);">Condition:</strong> ${escapeHtml(selected.condition)}</div>
      `;
    }

    panel.innerHTML = `
      <div style="font-size: 0.78rem; color: var(--accent-sun); font-weight: 700; margin-bottom: 8px;">
        ${escapeHtml(this._withName(sData.promptTitle))}
      </div>
      <div class="mutation-pill-row">${pillsHtml}${allBtnHtml}</div>
      <div class="mutation-detail-card">${detailHtml}</div>
    `;

    panel.querySelectorAll('[data-mut-id]').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.selectedMutationId = btn.dataset.mutId;
        this._renderShanksMutationsPanel(sData);
      });
    });
  }

  closeNpcDialog(reLockPointer = false) {
    if (!this.isNpcDialogOpen) return;
    this.isNpcDialogOpen = false;
    this.els.npcDialog.classList.add('hidden');
    if (this.els.npcExtraPanel) {
      this.els.npcExtraPanel.classList.add('hidden');
    }
    this.player.setEnabled(true);
    this.els.objectiveText.textContent = this._withName(this._bundle().ui.objectiveDefault);
    if (reLockPointer) {
      this.player.lockPointer();
    }
  }

  openStationModal(destination) {
    const b = this._bundle();
    const loc = b.destinations[destination.id] || destination;

    this.currentModalIndex = DESTINATIONS.findIndex((d) => d.id === destination.id);
    this.isModalOpen = true;
    this.player.setEnabled(false);
    this.player.unlockPointer();

    this.els.stationBadge.textContent = loc.badge || destination.badge;
    this.els.stationTitle.textContent = loc.title || destination.title;
    this.els.stationSubtitle.textContent = loc.subtitle || destination.subtitle;

    const stationCard = this.els.stationModal.querySelector('.station-card');
    const footerTag = this.els.stationModal.querySelector('.skeleton-tag');

    if (destination.id === 'welcome-centre') {
      stationCard.classList.add('wide');
      footerTag.textContent = b.ui.functionalTag;
      this.welcomeStation.mount(this.els.stationBody);
    } else if (destination.id === 'steam-station') {
      stationCard.classList.add('wide');
      footerTag.textContent = b.ui.functionalTag;
      this.steamTutorial.mount(this.els.stationBody);
    } else if (destination.id === 'community-outpost') {
      stationCard.classList.add('wide');
      footerTag.textContent = b.ui.functionalTag;
      this.communityDirectory.mount(this.els.stationBody);
    } else if (destination.id === 'survival-training') {
      stationCard.classList.add('wide');
      footerTag.textContent = b.ui.functionalTag;
      this.survivalGuide.mount(this.els.stationBody);
    } else {
      stationCard.classList.remove('wide');
      footerTag.textContent = b.ui.skeletonTag;
      const sections = loc.plannedSections || destination.plannedSections;
      const listItems = sections.map((item) => `<li>${item}</li>`).join('');

      this.els.stationBody.innerHTML = `
        <p>${loc.summary || destination.summary}</p>
        <ul class="skeleton-list">${listItems}</ul>
        <div class="skeleton-callout">${loc.callout || destination.callout}</div>
      `;
    }

    this.els.stationModal.classList.remove('hidden');
    this.els.objectiveText.textContent = b.ui.inspecting(loc.title || destination.title);
    if (this.onOpenStation) this.onOpenStation(destination);
  }

  closeStationModal(reLockPointer = false) {
    if (!this.isModalOpen) return;
    this.isModalOpen = false;
    this.els.stationModal.classList.add('hidden');
    this.player.setEnabled(true);
    this.els.objectiveText.textContent = this._withName(this._bundle().ui.objectiveDefault);
    if (reLockPointer) {
      this.player.lockPointer();
    }
    if (this.onCloseStation) this.onCloseStation();
  }

  closeActiveOverlay(reLockPointer = false) {
    if (this.isNpcDialogOpen) this.closeNpcDialog(reLockPointer);
    if (this.isModalOpen) this.closeStationModal(reLockPointer);
  }

  updateHud({ activeStation, nearestZone }) {
    this.currentActiveStation = activeStation;
    const b = this._bundle();

    if (nearestZone) {
      let zoneText;
      if (nearestZone.isStationGuide) {
        zoneText = b.ui.guideZoneLabel
          ? b.ui.guideZoneLabel(nearestZone.displayName, nearestZone.speciesLabel)
          : nearestZone.zoneLabel;
      } else if (nearestZone.isNpc) {
        zoneText = b.npc.zoneLabel;
      } else {
        zoneText = b.destinations[nearestZone.id]?.zoneLabel || nearestZone.zoneLabel;
      }
      this.els.currentZone.textContent = zoneText;
    } else {
      this.els.currentZone.textContent = b.ui.trailsZone;
    }

    if (activeStation && !this.hasOpenOverlay) {
      let promptText;
      if (activeStation.isStationGuide) {
        promptText = b.ui.talkToPrompt
          ? b.ui.talkToPrompt(activeStation.displayName)
          : activeStation.promptLabel;
      } else if (activeStation.isNpc) {
        promptText = b.npc.promptLabel;
      } else {
        promptText = b.destinations[activeStation.id]?.promptLabel || activeStation.promptLabel;
      }
      this.els.interactPrompt.classList.remove('hidden');
      this.els.interactLabel.textContent = promptText.toUpperCase();
      this.els.crosshair.classList.add('active');
    } else {
      this.els.interactPrompt.classList.add('hidden');
      this.els.crosshair.classList.remove('active');
    }
  }
}
