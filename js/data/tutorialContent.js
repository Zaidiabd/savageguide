/**
 * Skeleton destination & station definitions aligned with AGY.md.
 * Coordinates define world placement, player quick-jump approach points,
 * and skeleton preview copy for each interactive station.
 */
export const SAVAGEZED_NPC = {
  id: 'savagezed',
  isNpc: true,
  badge: 'EXPEDITION GUIDE',
  zoneLabel: 'LOCATION 01 — CENTRAL EXPEDITION CAMP (SAVAGEZED)',
  title: 'SavageZed',
  subtitle: 'Primeval Malaysia Community Welcomer',
  position: { x: 3.2, z: 6.8 },
  approach: { x: 1.8, z: 9.8, lookAt: { x: 3.2, y: 1.5, z: 6.8 } },
  interactRadius: 4.8,
  promptLabel: 'Talk to SavageZed',
  dialogPages: [
    {
      id: 'greeting',
      speaker: 'SavageZed',
      role: 'Primeval Malaysia Community Guide',
      text:
        'Selamat datang and warm greetings, fellow survivor! I am SavageZed, and I am truly delighted to welcome you to the Primeval Malaysia Community outpost. Take your time soaking in the prehistoric camp—we are happy to have you with us!',
      hint: 'Use the buttons below to ask what to do here, or press ESC anytime to continue exploring.'
    },
    {
      id: 'what-to-do',
      speaker: 'SavageZed',
      role: 'Outpost Orientation',
      text:
        'Here is what you can do around our camp to get ready for The Isle: Evrima:\n' +
        '1. Inspect the Welcome Centre Noticeboard right behind me for hardware tips & camp basics.\n' +
        '2. Visit the Steam & Easy Anti-Cheat Terminal to the northwest to learn how to switch to the Evrima branch and verify EAC.\n' +
        '3. Check the Community Directory Board to the northeast for verified community portals & rules.\n' +
        '4. Drop by the Companion Application Desk to the southeast for official companion setup guidance.\n' +
        '5. Walk through the Expedition Departure Gate up north when you are ready for your final checklist!',
      hint: 'Tip: You can walk the forest trails using WASD + Shift, or use the top-right DESTINATION menu to quick-jump.'
    }
  ]
};

export const STEAM_TUTORIAL = {
  steamStoreUrl: 'https://store.steampowered.com/app/376210/The_Isle/',
  steps: [
    {
      id: 'step-01',
      number: 'STEP 01',
      title: 'Obtain The Isle through Steam',
      checklistKey: 'steamObtained',
      illustration: 'steam-store',
      summary:
        'Ensure you have a Steam account with the Steam desktop client installed, then purchase or access The Isle on the official Steam Store.',
      instructions: [
        'Open the official Steam desktop client (or sign in to Steam in your browser).',
        'Visit the official Steam Store page for The Isle using the verified link below.',
        'Purchase and add The Isle to your Steam account if you do not already own it.'
      ],
      externalLink: {
        label: 'Open Official Steam Store Page',
        url: 'https://store.steampowered.com/app/376210/The_Isle/'
      },
      notice: null
    },
    {
      id: 'step-02',
      number: 'STEP 02',
      title: 'Locate The Isle in Steam Library',
      checklistKey: null,
      illustration: 'steam-library',
      summary:
        'Open your Steam Library and find The Isle in your installed or owned games list.',
      instructions: [
        'Launch the Steam desktop application and click the LIBRARY tab at the top.',
        'Type "The Isle" in the library search bar on the left sidebar.',
        'Select "The Isle" from your games list to view its library entry.'
      ],
      notice: null
    },
    {
      id: 'step-03',
      number: 'STEP 03',
      title: 'Access Game Properties',
      checklistKey: null,
      illustration: 'steam-properties',
      summary:
        'Open the game configuration window so you can switch from the legacy branch to Evrima.',
      instructions: [
        'Right-click "The Isle" in your Steam Library sidebar (or click the gear Manage icon).',
        'Select "Properties..." from the context menu.',
        'Keep the Properties window open for the branch selection step next.'
      ],
      notice: null
    },
    {
      id: 'step-04',
      number: 'STEP 04',
      title: 'Select the Evrima Game Branch',
      checklistKey: 'evrimaSelected',
      illustration: 'steam-betas',
      summary:
        'Evrima is the active development branch of The Isle and is accessed through Steam’s Betas / Game Versions menu.',
      instructions: [
        'In the Properties window, click the "Betas" (or "Game Versions & Betas") tab.',
        'Open the "Beta Participation" dropdown menu.',
        'Select "evrima - EVRIMA Public Branch" where available, then close the Properties window.'
      ],
      notice: 'Selecting Evrima queues the Evrima branch files through Steam automatically.'
    },
    {
      id: 'step-05',
      number: 'STEP 05',
      title: 'Download and Install the Game Files',
      checklistKey: 'filesDownloaded',
      illustration: 'steam-download',
      summary:
        'Allow Steam to download or update all required Evrima game files onto an SSD with sufficient free storage.',
      instructions: [
        'Click "Install" or "Update" on The Isle in your Steam Library.',
        'Confirm your installation drive (an SSD is recommended for smoother loading).',
        'Wait for the Steam Downloads queue to reach 100% completion.'
      ],
      notice: null
    },
    {
      id: 'step-06',
      number: 'STEP 06',
      title: 'Understand Easy Anti-Cheat',
      checklistKey: null,
      illustration: 'eac-overview',
      summary:
        'Easy Anti-Cheat (EAC) is the anti-cheat component used by The Isle: Evrima. It is bundled directly with the game’s installation files through Steam.',
      instructions: [
        'Steam normally handles installing the required Easy Anti-Cheat components automatically.',
        'You generally do NOT need to download a separate EAC installer from any external website.',
        'Only run manual repair steps if the game reports that Easy Anti-Cheat is missing or not installed.'
      ],
      notice:
        'Easy Anti-Cheat is included with The Isle: Evrima. A separate download is normally unnecessary. If the game reports that EAC is missing or not installed, follow the repair instructions below.'
    },
    {
      id: 'step-07',
      number: 'STEP 07',
      title: 'Install or Repair Easy Anti-Cheat if Necessary',
      checklistKey: 'eacChecked',
      illustration: 'eac-terminal',
      summary:
        'If Evrima reports missing EAC on launch, use the official bundled installer inside your local game folder (Option A) or verify game files through Steam (Option B).',
      instructions: [
        'First attempt launching the game normally—if it launches cleanly, manual EAC installation is NOT required.',
        'If an EAC error appears, open the "EAC SYSTEM VERIFICATION" tab above and follow Option A (Local Installer / Repair).',
        'Only run official files located inside your verified Steam installation directory—never download replacement EAC files from third-party websites.'
      ],
      openEacTab: true,
      notice:
        'File names and folder structures (such as InstallAntiCheat.bat, EasyAntiCheat folder, or EasyAntiCheat_Setup.exe) may differ between game builds. If no installer is present, proceed to Option B / Step 08.'
    },
    {
      id: 'step-08',
      number: 'STEP 08',
      title: 'Verify Game Files',
      checklistKey: 'filesVerified',
      illustration: 'steam-verify',
      summary:
        'Use Steam’s built-in file verification whenever game or bundled anti-cheat files are missing or corrupted.',
      instructions: [
        'Open Steam Library, right-click "The Isle", and select "Properties...".',
        'Navigate to the "Installed Files" section.',
        'Click "Verify integrity of game files" and wait for Steam to scan and replace any missing or corrupted components.'
      ],
      notice:
        'If an EAC error still persists after verification, consult The Isle’s official support channels rather than downloading unofficial anti-cheat installers.'
    },
    {
      id: 'step-09',
      number: 'STEP 09',
      title: 'Launch The Isle: Evrima',
      checklistKey: 'gameLaunched',
      illustration: 'steam-launch',
      summary:
        'Launch The Isle from Steam and approve any standard Windows or Easy Anti-Cheat startup prompt.',
      instructions: [
        'Click the green "Play" button for The Isle in your Steam Library.',
        'Allow Easy Anti-Cheat to initialize if prompted.',
        'Confirm you reach the Evrima main menu cleanly.'
      ],
      notice: null
    },
    {
      id: 'step-10',
      number: 'STEP 10',
      title: 'Confirm Successful Installation',
      checklistKey: null,
      illustration: 'install-complete',
      summary:
        'Verify your Evrima build is active and check off your Steam & EAC preparation before visiting the Community Outpost.',
      instructions: [
        'Confirm the main menu displays the Evrima title screen and server browser works.',
        'Review the Steam & EAC Checklist tab to ensure all applicable items are checked.',
        'Return to the outpost and proceed to Location 03 — Community Outpost.'
      ],
      notice:
        'Once you confirm the game launches successfully (or EAC verification passes), Easy Anti-Cheat is considered ready.'
    }
  ],
  eacTerminal: {
    title: 'EASY ANTI-CHEAT',
    subtitle: 'SYSTEM VERIFICATION',
    tagline: 'Ensuring your game installation is ready.',
    noticeBanner:
      'Easy Anti-Cheat is included with The Isle: Evrima. A separate download is normally unnecessary. If the game reports that EAC is missing or not installed, follow Option A or Option B below.',
    optionA: {
      code: 'OPTION A',
      title: 'LOCAL INSTALLER / REPAIR',
      completionMessage: 'EAC INSTALLATION CHECK COMPLETE',
      buildVarianceWarning:
        'Important: File names and directory structures may differ between game builds. Do not assume every installation contains all listed filenames. If no official installer is present, proceed directly to Option B.',
      officialOnlyWarning:
        'Only use files inside your verified official Steam game directory. Never download replacement EAC executables or batch files from unofficial websites.',
      steps: [
        'Open Steam Library.',
        'Right-click The Isle.',
        'Select Properties.',
        'Navigate to Installed Files.',
        'Click Browse to open the local game installation directory.',
        'Locate Easy Anti-Cheat installation files if present (examples depending on build: InstallAntiCheat.bat, EasyAntiCheat folder, or EasyAntiCheat_Setup.exe).',
        'Run the official game-bundled installation/repair script or executable and choose Install or Repair (approve Windows administrator elevation if requested).',
        'Wait for the installation or repair process to complete.',
        'Return to Steam and launch The Isle.'
      ]
    },
    optionB: {
      code: 'OPTION B',
      title: 'VERIFY GAME FILES',
      completionMessage: 'GAME FILE VERIFICATION COMPLETE',
      fallbackWarning:
        'If the EAC error persists after verification, consult The Isle’s official support channels rather than downloading unofficial anti-cheat installers.',
      steps: [
        'Open Steam Library.',
        'Right-click The Isle.',
        'Select Properties.',
        'Open Installed Files.',
        'Select "Verify integrity of game files".',
        'Wait for Steam to complete the verification process.',
        'Allow Steam to identify and replace missing or corrupted game files, including bundled anti-cheat components where applicable.',
        'Once verification is complete, launch The Isle again.'
      ]
    }
  },
  troubleshooting: [
    {
      code: 'ISSUE 01',
      title: 'Easy Anti-Cheat Not Installed',
      action:
        'Check the local game installation directory for the official EAC installer (Option A). If unavailable, verify the game files through Steam (Option B).'
    },
    {
      code: 'ISSUE 02',
      title: 'EAC Installer Missing',
      action:
        'Use Steam’s "Verify integrity of game files" function under Properties → Installed Files so Steam restores bundled files.'
    },
    {
      code: 'ISSUE 03',
      title: 'EAC Installation Fails',
      action:
        'Restart Steam, verify game files, and retry the official installation or repair process with administrator approval when prompted.'
    },
    {
      code: 'ISSUE 04',
      title: 'Game Still Cannot Launch',
      action:
        'Consult The Isle’s official support resources and provide the exact error message. Never attempt to bypass, disable, or circumvent Easy Anti-Cheat.'
    }
  ],
  checklistItems: [
    { key: 'steamObtained', label: 'The Isle obtained through Steam' },
    { key: 'evrimaSelected', label: 'Evrima branch selected in Steam Properties' },
    { key: 'filesDownloaded', label: 'Game files downloaded successfully' },
    { key: 'eacChecked', label: 'Easy Anti-Cheat installation checked' },
    { key: 'eacRepaired', label: 'EAC repaired if required (skip if Steam handled automatically)' },
    { key: 'filesVerified', label: 'Game file verification completed if necessary' },
    { key: 'gameLaunched', label: 'The Isle: Evrima successfully launched' }
  ]
};

export const DESTINATIONS = [
  {
    id: 'welcome-centre',
    badge: 'DESTINATION 01',
    zoneLabel: 'LOCATION 01 — CENTRAL EXPEDITION CAMP',
    title: 'Welcome Centre & Noticeboard',
    subtitle: 'Orientation to The Isle: Evrima and the five expedition stations.',
    position: { x: 0, z: 0 },
    approach: { x: 0, z: 5.5, lookAt: { x: 0, y: 1.5, z: 0 } },
    interactRadius: 4.5,
    promptLabel: 'Inspect Welcome Noticeboard',
    summary:
      'Central starting hub introducing The Isle: Evrima, basic PC expectations, and the layout of the expedition outpost.',
    plannedSections: [
      'Introduction to The Isle & the Evrima branch',
      'Overview of all five onboarding destinations',
      'Minimum & recommended PC hardware expectations',
      'Expedition navigation guide'
    ],
    callout: 'Skeleton Notice: Full orientation cards and START EXPEDITION tracking will be populated in Milestone 4.'
  },
  {
    id: 'steam-station',
    badge: 'DESTINATION 02',
    zoneLabel: 'LOCATION 02 — STEAM INSTALLATION STATION',
    title: 'Steam & Easy Anti-Cheat Terminal',
    subtitle: 'Step-by-step Steam install, Evrima branch switch, and EAC repair.',
    position: { x: -24, z: -14 },
    approach: { x: -19.5, z: -10.5, lookAt: { x: -24, y: 1.4, z: -14 } },
    interactRadius: 4.5,
    promptLabel: 'Access Steam Terminal',
    summary:
      'Research workstation guiding players from obtaining The Isle on Steam through selecting the Evrima branch and verifying Easy Anti-Cheat.',
    plannedSections: [
      'Steps 01–05: Steam purchase, Library, Properties, Evrima branch selection, and download',
      'Steps 06–07: Understanding bundled Easy Anti-Cheat & running the official local installer/repair',
      'Steps 08–10: Verifying game files through Steam, launching Evrima, and troubleshooting',
      'Official Steam Store link (store.steampowered.com/app/376210/The_Isle/)'
    ],
    callout: 'Skeleton Notice: The 10-step Steam + EAC System Verification terminal UI will be wired here in Milestone 4.'
  },
  {
    id: 'community-outpost',
    badge: 'DESTINATION 03',
    zoneLabel: 'LOCATION 03 — COMMUNITY OUTPOST',
    title: 'Community Directory Board',
    subtitle: 'Verified community portals, Discord sources, and access policies.',
    position: { x: 24, z: -10 },
    approach: { x: 19.5, z: -7, lookAt: { x: 24, y: 1.6, z: -10 } },
    interactRadius: 4.5,
    promptLabel: 'Read Community Directory',
    summary:
      'Timber directory board showcasing verified community listings loaded from a modular configuration file.',
    plannedSections: [
      'IsleLink — Official Discord source with strict 18+ age-restriction gating',
      'Obsidian Isle — Official Discord source, server info, and companion app instructions',
      'Searchable & filterable community cards driven by serverDirectory.js'
    ],
    callout: 'Skeleton Notice: Age-verification gating and live community cards will be integrated in Milestone 4.'
  },
  {
    id: 'companion-station',
    badge: 'DESTINATION 04',
    zoneLabel: 'LOCATION 04 — COMPANION APPLICATION STATION',
    title: 'Companion Application Desk',
    subtitle: 'Official distribution sources, setup steps, and safety checks.',
    position: { x: 20, z: 18 },
    approach: { x: 16.5, z: 14.5, lookAt: { x: 20, y: 1.4, z: 18 } },
    interactRadius: 4.5,
    promptLabel: 'Inspect Companion Desk',
    summary:
      'Dedicated field workstation explaining community companion utilities, verified Discord distribution channels, and safety rules.',
    plannedSections: [
      'Supported companion application overview & features',
      'Official Discord-only distribution guidance (Obsidian Isle)',
      'Installation checklist & source verification warnings'
    ],
    callout: 'Skeleton Notice: Detailed companion app checklists and troubleshooting notes will be added in Milestone 4.'
  },
  {
    id: 'expedition-departure',
    badge: 'DESTINATION 05',
    zoneLabel: 'LOCATION 05 — EXPEDITION DEPARTURE',
    title: 'Expedition Departure Gate',
    subtitle: 'Final pre-launch readiness checklist before entering The Isle.',
    position: { x: 0, z: -36 },
    approach: { x: 0, z: -30.5, lookAt: { x: 0, y: 2.0, z: -36 } },
    interactRadius: 5.0,
    promptLabel: 'Open Departure Checklist',
    summary:
      'Forest departure archway housing the final readiness checklist covering Steam, Evrima, Easy Anti-Cheat, community rules, and companion setup.',
    plannedSections: [
      '11-point interactive readiness checklist (including EAC verification items)',
      'LocalStorage progress persistence across sessions',
      'Completion state: EXPEDITION PREPARATION COMPLETE'
    ],
    callout: 'Skeleton Notice: Interactive persistent checklist tracking will be wired in Milestone 4.'
  }
];
