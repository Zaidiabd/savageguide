const STORAGE_KEY = 'the-isle-expedition-progress-v1';

const DEFAULT_STATE = {
  language: 'en',
  steamCurrentStep: 0,
  steamCompletedSteps: [],
  eacOptionAComplete: false,
  eacOptionBComplete: false,
  welcomeReviewed: false,
  communityReviewed: false,
  survivalReviewed: false,
  isleLinkAgeStatus: 'unknown', // 'unknown' | 'adult' | 'underage'
  checklist: {
    steamObtained: false,
    evrimaSelected: false,
    filesDownloaded: false,
    eacChecked: false,
    eacRepaired: false,
    filesVerified: false,
    gameLaunched: false,
    communityReviewed: false,
    companionReviewed: false,
    rulesReviewed: false,
    readyToExplore: false
  }
};

/**
 * Manages persistent tutorial and checklist progress in LocalStorage.
 */
export class ProgressSystem {
  constructor() {
    this.state = this._load();
  }

  _load() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return structuredClone(DEFAULT_STATE);
      const parsed = JSON.parse(raw);
      return {
        ...structuredClone(DEFAULT_STATE),
        ...parsed,
        checklist: {
          ...DEFAULT_STATE.checklist,
          ...(parsed.checklist || {})
        }
      };
    } catch {
      return structuredClone(DEFAULT_STATE);
    }
  }

  _save() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch {
      // Ignore storage quota / privacy mode errors cleanly
    }
  }

  getLanguage() {
    return this.state.language || 'en';
  }

  setLanguage(lang) {
    if (!['en', 'ms', 'kl'].includes(lang)) return;
    this.state.language = lang;
    this._save();
  }

  getSteamStep() {
    return this.state.steamCurrentStep;
  }

  setSteamStep(index) {
    this.state.steamCurrentStep = Math.max(0, Math.min(9, index));
    this._save();
  }

  isStepCompleted(stepId) {
    return this.state.steamCompletedSteps.includes(stepId);
  }

  toggleStepCompleted(stepId, forceValue = null) {
    const exists = this.state.steamCompletedSteps.includes(stepId);
    const shouldAdd = forceValue !== null ? forceValue : !exists;
    if (shouldAdd && !exists) {
      this.state.steamCompletedSteps.push(stepId);
    } else if (!shouldAdd && exists) {
      this.state.steamCompletedSteps = this.state.steamCompletedSteps.filter((id) => id !== stepId);
    }
    this._save();
    return shouldAdd;
  }

  getChecklistItem(key) {
    return Boolean(this.state.checklist[key]);
  }

  setChecklistItem(key, value) {
    this.state.checklist[key] = Boolean(value);
    // AGY.md rule: EAC check is satisfied once user confirms launch or verification
    if ((key === 'gameLaunched' || key === 'filesVerified') && value) {
      this.state.checklist.eacChecked = true;
    }
    this._save();
  }

  setEacOptionStatus(optionKey, complete) {
    if (optionKey === 'optionA') {
      this.state.eacOptionAComplete = Boolean(complete);
      if (complete) {
        this.state.checklist.eacChecked = true;
        this.state.checklist.eacRepaired = true;
      }
    } else if (optionKey === 'optionB') {
      this.state.eacOptionBComplete = Boolean(complete);
      if (complete) {
        this.state.checklist.eacChecked = true;
        this.state.checklist.filesVerified = true;
      }
    }
    this._save();
  }

  getEacStatus() {
    return {
      optionA: this.state.eacOptionAComplete,
      optionB: this.state.eacOptionBComplete
    };
  }

  isWelcomeReviewed() {
    return Boolean(this.state.welcomeReviewed);
  }

  setWelcomeReviewed(value = true) {
    this.state.welcomeReviewed = Boolean(value);
    this._save();
  }

  isCommunityReviewed() {
    return Boolean(this.state.communityReviewed);
  }

  setCommunityReviewed(value = true) {
    this.state.communityReviewed = Boolean(value);
    this.state.checklist.communityReviewed = Boolean(value);
    this._save();
  }

  isCompanionReviewed() {
    return Boolean(this.state.checklist?.companionReviewed);
  }

  setCompanionReviewed(value = true) {
    this.state.checklist.companionReviewed = Boolean(value);
    this._save();
  }

  getIsleLinkAgeStatus() {
    return this.state.isleLinkAgeStatus || 'unknown';
  }

  setIsleLinkAgeStatus(status) {
    if (!['unknown', 'adult', 'underage'].includes(status)) return;
    this.state.isleLinkAgeStatus = status;
    this._save();
  }

  isSurvivalReviewed() {
    return Boolean(this.state.survivalReviewed);
  }

  markSurvivalReviewed(value = true) {
    this.state.survivalReviewed = Boolean(value);
    this._save();
  }
}
