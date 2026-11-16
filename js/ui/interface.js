import { DESTINATIONS, SAVAGEZED_NPC } from '../data/tutorialContent.js';
import { getLocaleBundle } from '../data/i18n.js';
import { SteamTutorialController } from '../systems/tutorial.js';
import { WelcomeStationController, CommunityDirectoryController } from '../systems/destinations.js';

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
    this.onOpenStation = onOpenStation;
    this.onCloseStation = onCloseStation;

    this.currentModalIndex = -1;
    this.currentNpcPageId = 'greeting';
    this.currentActiveStation = null;
    this.isModalOpen = false;
    this.isNpcDialogOpen = false;
    this.hasEnteredWorld = false;
    this.joystickTouchId = null;

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
      btnTouchSprint: document.getElementById('btn-touch-sprint'),
      welcomeOverlay: document.getElementById('welcome-overlay'),
      welcomeEyebrow: document.getElementById('welcome-eyebrow'),
      welcomeTagline: document.getElementById('welcome-tagline'),
      welcomeDesc: document.getElementById('welcome-desc'),
      welcomeLangLabel: document.getElementById('welcome-lang-label'),
      welcomeLangPills: document.querySelectorAll('#welcome-lang-switcher .lang-pill'),
      ctrlMove: document.getElementById('ctrl-move'),
      ctrlLook: document.getElementById('ctrl-look'),
      ctrlSprint: document.getElementById('ctrl-sprint'),
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
      npcCommunityTag: document.querySelector('.npc-community-tag'),
      npcName: document.getElementById('npc-name'),
      npcRole: document.getElementById('npc-role'),
      npcDialogText: document.getElementById('npc-dialog-text'),
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
    this.els.ctrlInteract.textContent = u.ctrlInteract;
    this.els.ctrlEsc.textContent = u.ctrlEsc;
    this.els.btnStart.textContent = u.startBtn;
    this.els.pointerNote.textContent = this.player.isTouchDevice ? u.pointerNoteTouch : u.pointerNote;
    this.els.btnTouchSprint.textContent = u.sprintBtn;

    // HUD strings
    this.els.hudLangLabel.textContent = u.langLabel;
    this.els.hudDestLabel.textContent = u.destLabel;
    this.els.btnControlsHelp.textContent = u.controlsBtn;
    this.els.hudStatusLabel.textContent = u.statusLabel;
    this.els.hudHint.innerHTML = u.hudHint.replace('ESC', '<kbd>ESC</kbd>');
    if (!this.isModalOpen && !this.isNpcDialogOpen) {
      this.els.objectiveText.textContent = u.objectiveDefault;
    }

    // Modal & NPC static button labels
    this.els.btnCloseModal.textContent = u.closeEsc;
    this.els.btnPrevStation.textContent = u.prevStation;
    this.els.btnNextStation.textContent = u.nextStation;
    this.els.btnResumeWalk.textContent = u.returnOutpost;

    this.els.npcCommunityTag.textContent = u.npcCommunityTag;
    this.els.btnCloseNpc.textContent = u.npcByeEsc;
    this.els.btnNpcWhatToDo.textContent = u.npcBtnWhatToDo;
    this.els.btnNpcGreeting.textContent = u.npcBtnGreeting;
    this.els.btnNpcJumpSteam.textContent = u.npcBtnJumpSteam;
    this.els.btnNpcBye.textContent = u.npcBtnBye;

    this._populateDestinationMenu();

    // Refresh currently open modal or NPC dialog immediately
    if (this.isModalOpen && this.currentModalIndex >= 0) {
      this.openStationModal(DESTINATIONS[this.currentModalIndex]);
    }
    if (this.isNpcDialogOpen) {
      this._renderNpcPage(this.currentNpcPageId);
      this.els.objectiveText.textContent = u.speakingWith;
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
      this.closeNpcDialog(false);
      const steamDest = this.navigation.jumpTo('steam-station');
      if (steamDest) {
        const b = this._bundle();
        const loc = b.destinations[steamDest.id] || steamDest;
        this.els.objectiveText.textContent = b.ui.arrivedStation(loc.title);
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
    this.hasEnteredWorld = true;
    this.els.welcomeOverlay.classList.add('hidden');
    this.els.hud.classList.remove('hidden');
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
      this.openNpcDialog();
    } else {
      this.openStationModal(target);
    }
  }

  openNpcDialog() {
    const b = this._bundle();
    this.isNpcDialogOpen = true;
    this.player.setEnabled(false);
    this.player.unlockPointer();
    this._renderNpcPage('greeting');
    this.els.npcDialog.classList.remove('hidden');
    this.els.objectiveText.textContent = b.ui.speakingWith;
  }

  _renderNpcPage(pageId) {
    this.currentNpcPageId = pageId;
    const b = this._bundle();
    const page = b.npc.pages[pageId] || b.npc.pages.greeting;

    this.els.npcName.textContent = page.speaker;
    this.els.npcRole.textContent = page.role;
    this.els.npcDialogText.textContent = page.text;
    this.els.npcDialogHint.textContent = page.hint;

    this.els.btnNpcWhatToDo.classList.toggle('hidden', pageId === 'what-to-do');
    this.els.btnNpcGreeting.classList.toggle('hidden', pageId === 'greeting');
  }

  closeNpcDialog(reLockPointer = false) {
    if (!this.isNpcDialogOpen) return;
    this.isNpcDialogOpen = false;
    this.els.npcDialog.classList.add('hidden');
    this.player.setEnabled(true);
    this.els.objectiveText.textContent = this._bundle().ui.objectiveDefault;
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
    this.els.objectiveText.textContent = this._bundle().ui.objectiveDefault;
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
      const zoneText = nearestZone.isNpc
        ? b.npc.zoneLabel
        : (b.destinations[nearestZone.id]?.zoneLabel || nearestZone.zoneLabel);
      this.els.currentZone.textContent = zoneText;
    } else {
      this.els.currentZone.textContent = b.ui.trailsZone;
    }

    if (activeStation && !this.hasOpenOverlay) {
      const promptText = activeStation.isNpc
        ? b.npc.promptLabel
        : (b.destinations[activeStation.id]?.promptLabel || activeStation.promptLabel);
      this.els.interactPrompt.classList.remove('hidden');
      this.els.interactLabel.textContent = promptText.toUpperCase();
      this.els.crosshair.classList.add('active');
    } else {
      this.els.interactPrompt.classList.add('hidden');
      this.els.crosshair.classList.remove('active');
    }
  }
}
