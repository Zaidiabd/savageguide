export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'ms', label: 'Bahasa Melayu' },
  { code: 'kl', label: 'Kecek KL' }
];

const LOCALES = {
  en: {
    ui: {
      eyebrow: 'PREHISTORIC PLAYER ONBOARDING — SKELETON PROTOTYPE',
      tagline: 'YOUR JOURNEY INTO THE ISLE BEGINS HERE.',
      welcomeDesc:
        'Explore the research outpost in first-person across all six onboarding stations and meet each dinosaur guide to prepare for The Isle: Evrima.',
      ctrlMove: 'Move',
      ctrlLook: 'Look Around',
      ctrlSprint: 'Sprint',
      ctrlJump: 'Jump',
      ctrlInteract: 'Interact at Station',
      ctrlEsc: 'Release Mouse / Close Panel',
      startBtn: 'START EXPEDITION',
      nameLabel: 'SURVIVOR NAME',
      namePlaceholder: 'Enter your name for this session...',
      nameRequired: 'Please enter your survivor name before stepping into the outpost.',
      objectiveDefault: 'Welcome, {name}! Explore the outpost and approach any station.',
      pointerNote:
        'Click to enter first-person mode. If pointer lock is unavailable, drag with the mouse to look around.',
      pointerNoteTouch:
        'Touch controls enabled: use the left thumbstick to walk, swipe the screen to look around, and tap prompts to interact.',
      sprintBtn: 'SPRINT',
      jumpBtn: 'JUMP',
      langLabel: 'LANGUAGE',
      destLabel: 'DESTINATION',
      quickJumpDefault: 'Quick Jump...',
      controlsBtn: 'CONTROLS',
      statusLabel: 'EXPEDITION STATUS',
      hudHint: 'Click viewport to lock mouse • ESC to release cursor',
      trailsZone: 'OUTPOST TRAILS — MESOZOIC FOREST',
      closeEsc: 'CLOSE [ESC]',
      prevStation: 'Previous Station',
      nextStation: 'Next Station',
      returnOutpost: 'Return to Outpost',
      skeletonTag: 'SKELETON STATION PREVIEW',
      functionalTag: 'FUNCTIONAL TERMINAL — PROGRESS SAVED',
      arrivedStation: (title) => `Arrived at ${title}. Press [E] to inspect.`,
      arrivedNpc: (title) => `Arrived at ${title}. Press [E] to talk.`,
      inspecting: (title) => `Inspecting ${title}`,
      speakingWith: 'Speaking with SavageZed — Primeval Malaysia Guide',
      speakingWithGuide: (name, species) => `Speaking with ${name} (${species})`,
      talkToPrompt: (name) => `Talk to ${name}`,
      guideZoneLabel: (name, species) => `${name.toUpperCase()} — ${species.toUpperCase()} GUIDE`,
      npcCommunityTag: 'PRIMEVAL MALAYSIA COMMUNITY',
      npcByeEsc: 'GOODBYE [ESC]',
      npcBtnWhatToDo: 'What should I do here?',
      npcBtnPremise: 'Game Premise & Survival',
      npcBtnMapGuide: 'Gateway Map & Legends',
      npcBtnOpenMap: 'Open Gateway Map Viewer',
      mapHudBtn: '[M] GATEWAY MAP',
      npcBtnGreeting: 'Back to Welcome',
      npcBtnJumpSteam: 'Go to Steam Station',
      npcBtnBye: 'Thank you, SavageZed!',
      npcMenuLabel: '★ SavageZed (Camp Guide)'
    },
    npc: {
      zoneLabel: 'LOCATION 01 — CENTRAL EXPEDITION CAMP (SAVAGEZED)',
      title: 'SavageZed',
      promptLabel: 'Talk to SavageZed',
      pages: {
        greeting: {
          speaker: 'SavageZed',
          role: 'Primeval Malaysia Community Guide',
          text:
            'Selamat datang and warm greetings, {name}! I am SavageZed, thrilled to welcome you to the Primeval Malaysia Community outpost.\n\n' +
            'The Premise of The Isle: Evrima: You spawn into a ruthless prehistoric island as a tiny, vulnerable dinosaur. Every life is permadeath—you must track water, match your 3-nutrient diet to grow faster, defend against predators or ambush prey, and master the Gateway Map to survive!',
          hint: 'Ask me about the Game Premise, Gateway Map & Legends, or Outpost Stations below, {name}.'
        },
        premise: {
          speaker: 'SavageZed',
          role: 'What Is The Isle: Evrima?',
          text:
            'In The Isle: Evrima, there are no quests, shops, or second chances—nature is your only arena, {name}:\n' +
            '• Growth & Nutrients: Hatch as a Juvenile, hide in thick cover, and balance Alpha (α), Beta (β), and Gamma (γ) diet symbols to grow swiftly to Sub-Adult and Adult.\n' +
            '• Instincts & Risks: Every drink from a river risks a Deinosuchus ambush; every sprint burns precious stamina; every wrong jump fractures bones.\n' +
            '• Primeval Malaysia Survival: Knowing the terrain via the Gateway Map and its Legends turns helpless hatchlings into apex survivors!',
          hint: 'Want to see the actual Gateway Map and learn why Legends save lives? Click "Gateway Map & Legends" below!'
        },
        'gateway-map': {
          speaker: 'SavageZed',
          role: 'Gateway Map & Importance of Legends',
          text:
            'Gateway is the sprawling Evrima island where you spawn, {name}—packed with twisting rivers, swamps, steep cliffs, highlands, and the giant central Dome.\n\n' +
            'Why Understanding Map Legends Matters:\n' +
            '• Water Icons (Cyan vs Deep Navy): Tells safe shallow freshwater apart from saltwater coasts and crocodile-infested deep rivers.\n' +
            '• Elevation & Cliff Shadows: Prevents fatal cliff drops and broken legs while navigating in storms or fog.\n' +
            '• Scent & Resource Icons (Q): Red Palm = Juvenile Sanctuaries; Footprints = Herbivore Migration feeding corridors.\n' +
            '• Map Grid (A1–H8): Lets you call exact coordinates so Primeval Malaysia friends can regroup fast!\n\n' +
            'Click "Open Gateway Map Viewer" below (or press [M] anytime) to explore our live rendered Gateway Map!',
          hint: 'Tip: Inspect the rendered Gateway Map right now, {name}, to memorize safe waterholes and coastal cliffs.'
        },
        'what-to-do': {
          speaker: 'SavageZed',
          role: 'Outpost Orientation',
          text:
            'Here is what you can do around our camp, {name}, to get ready for The Isle: Evrima:\n' +
            '1. Inspect the Welcome Centre Noticeboard right behind me for hardware tips & camp basics.\n' +
            '2. Visit the Steam & Easy Anti-Cheat Terminal to the northwest to learn how to switch to the Evrima branch and verify EAC.\n' +
            '3. Check the Community Directory Board to the northeast for verified community portals & rules.\n' +
            '4. Drop by the Companion Application Desk to the southeast for official companion setup guidance.\n' +
            '5. Visit the walled Survival Training Ground to the west (Primeval Malaysia Training Camp) for combat, diet & survival tips!\n' +
            '6. Walk through the Expedition Departure Gate up north when you are ready for your final checklist!',
          hint: 'Tip: You can walk the forest trails using WASD + Shift, or use the top-right DESTINATION menu to quick-jump.'
        }
      }
    },
    destinations: {
      'welcome-centre': {
        badge: 'DESTINATION 01',
        zoneLabel: 'LOCATION 01 — CENTRAL EXPEDITION CAMP',
        title: 'Welcome Centre & Noticeboard',
        subtitle: 'Orientation to The Isle: Evrima and the five expedition stations.',
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
      'steam-station': {
        badge: 'DESTINATION 02',
        zoneLabel: 'LOCATION 02 — STEAM INSTALLATION STATION',
        title: 'Steam & Easy Anti-Cheat Terminal',
        subtitle: 'Step-by-step Steam install, Evrima branch switch, and EAC repair.',
        promptLabel: 'Access Steam Terminal'
      },
      'community-outpost': {
        badge: 'DESTINATION 03',
        zoneLabel: 'LOCATION 03 — COMMUNITY OUTPOST',
        title: 'Community Directory Board',
        subtitle: 'Verified community portals, Discord sources, and access policies.',
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
      'companion-station': {
        badge: 'DESTINATION 04',
        zoneLabel: 'LOCATION 04 — COMPANION APPLICATION STATION',
        title: 'Companion Application Desk',
        subtitle: 'Official distribution sources, setup steps, and safety checks.',
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
      'expedition-departure': {
        badge: 'DESTINATION 05',
        zoneLabel: 'LOCATION 05 — EXPEDITION DEPARTURE',
        title: 'Expedition Departure Gate',
        subtitle: 'Final pre-launch readiness checklist before entering The Isle.',
        promptLabel: 'Open Departure Checklist',
        summary:
          'Forest departure archway housing the final readiness checklist covering Steam, Evrima, Easy Anti-Cheat, community rules, and companion setup.',
        plannedSections: [
          '11-point interactive readiness checklist (including EAC verification items)',
          'LocalStorage progress persistence across sessions',
          'Completion state: EXPEDITION PREPARATION COMPLETE'
        ],
        callout: 'Skeleton Notice: Interactive persistent checklist tracking will be wired in Milestone 4.'
      },
      'survival-training': {
        badge: 'DESTINATION 06',
        zoneLabel: 'LOCATION 06 — PRIMEVAL MALAYSIA TRAINING CAMP',
        title: 'Survival Training Ground',
        subtitle: 'Walled camp & bonfire teaching controls, diets, stamina, scent, night vision & pro tips.',
        promptLabel: 'Open Survival Training Manual'
      }
    },
    steam: {
      tabs: {
        walkthrough: (done, total) => `WALKTHROUGH (${done}/${total})`,
        eac: 'EAC SYSTEM VERIFICATION',
        troubleshooting: 'TROUBLESHOOTING',
        checklist: 'CHECKLIST'
      },
      illustrationCaption: 'INTERFACE ILLUSTRATION — NOT AN ACTUAL SCREENSHOT',
      stepOf: (curr, total) => `STEP ${String(curr).padStart(2, '0')} OF ${String(total).padStart(2, '0')}`,
      throughWalkthrough: (pct) => `${pct}% THROUGH WALKTHROUGH`,
      stepCompleted: 'Step Completed',
      markComplete: 'Mark Complete',
      prevStep: '← Previous Step',
      nextStep: 'Next Step →',
      reviewChecklist: 'Review Checklist →',
      openEacTabBtn: 'Open EAC System Verification Terminal →',
      openSteamBtn: 'Open Official Steam Store Page',
      steps: [
        {
          number: 'STEP 01',
          title: 'Obtain The Isle through Steam',
          summary:
            'Ensure you have a Steam account with the Steam desktop client installed, then purchase or access The Isle on the official Steam Store.',
          instructions: [
            'Open the official Steam desktop client (or sign in to Steam in your browser).',
            'Visit the official Steam Store page for The Isle using the verified link below.',
            'Purchase and add The Isle to your Steam account if you do not already own it.'
          ]
        },
        {
          number: 'STEP 02',
          title: 'Locate The Isle in Steam Library',
          summary: 'Open your Steam Library and find The Isle in your installed or owned games list.',
          instructions: [
            'Launch the Steam desktop application and click the LIBRARY tab at the top.',
            'Type "The Isle" in the library search bar on the left sidebar.',
            'Select "The Isle" from your games list to view its library entry.'
          ]
        },
        {
          number: 'STEP 03',
          title: 'Access Game Properties',
          summary: 'Open the game configuration window so you can switch from the legacy branch to Evrima.',
          instructions: [
            'Right-click "The Isle" in your Steam Library sidebar (or click the gear Manage icon).',
            'Select "Properties..." from the context menu.',
            'Keep the Properties window open for the branch selection step next.'
          ]
        },
        {
          number: 'STEP 04',
          title: 'Select the Evrima Game Branch',
          summary: 'Evrima is the active development branch of The Isle and is accessed through Steam’s Betas / Game Versions menu.',
          instructions: [
            'In the Properties window, click the "Betas" (or "Game Versions & Betas") tab.',
            'Open the "Beta Participation" dropdown menu.',
            'Select "evrima - EVRIMA Public Branch" where available, then close the Properties window.'
          ],
          notice: 'Selecting Evrima queues the Evrima branch files through Steam automatically.'
        },
        {
          number: 'STEP 05',
          title: 'Download and Install the Game Files',
          summary: 'Allow Steam to download or update all required Evrima game files onto an SSD with sufficient free storage.',
          instructions: [
            'Click "Install" or "Update" on The Isle in your Steam Library.',
            'Confirm your installation drive (an SSD is recommended for smoother loading).',
            'Wait for the Steam Downloads queue to reach 100% completion.'
          ]
        },
        {
          number: 'STEP 06',
          title: 'Understand Easy Anti-Cheat',
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
          number: 'STEP 07',
          title: 'Install or Repair Easy Anti-Cheat if Necessary',
          summary:
            'If Evrima reports missing EAC on launch, use the official bundled installer inside your local game folder (Option A) or verify game files through Steam (Option B).',
          instructions: [
            'First attempt launching the game normally—if it launches cleanly, manual EAC installation is NOT required.',
            'If an EAC error appears, open the "EAC SYSTEM VERIFICATION" tab above and follow Option A (Local Installer / Repair).',
            'Only run official files located inside your verified Steam installation directory—never download replacement EAC files from third-party websites.'
          ],
          notice:
            'File names and folder structures (such as InstallAntiCheat.bat, EasyAntiCheat folder, or EasyAntiCheat_Setup.exe) may differ between game builds. If no installer is present, proceed to Option B / Step 08.'
        },
        {
          number: 'STEP 08',
          title: 'Verify Game Files',
          summary: 'Use Steam’s built-in file verification whenever game or bundled anti-cheat files are missing or corrupted.',
          instructions: [
            'Open Steam Library, right-click "The Isle", and select "Properties...".',
            'Navigate to the "Installed Files" section.',
            'Click "Verify integrity of game files" and wait for Steam to scan and replace any missing or corrupted components.'
          ],
          notice:
            'If an EAC error still persists after verification, consult The Isle’s official support channels rather than downloading unofficial anti-cheat installers.'
        },
        {
          number: 'STEP 09',
          title: 'Launch The Isle: Evrima',
          summary: 'Launch The Isle from Steam and approve any standard Windows or Easy Anti-Cheat startup prompt.',
          instructions: [
            'Click the green "Play" button for The Isle in your Steam Library.',
            'Allow Easy Anti-Cheat to initialize if prompted.',
            'Confirm you reach the Evrima main menu cleanly.'
          ]
        },
        {
          number: 'STEP 10',
          title: 'Confirm Successful Installation',
          summary: 'Verify your Evrima build is active and check off your Steam & EAC preparation before visiting the Community Outpost.',
          instructions: [
            'Confirm the main menu displays the Evrima title screen and server browser works.',
            'Review the Steam & EAC Checklist tab to ensure all applicable items are checked.',
            'Return to the outpost and proceed to Location 03 — Community Outpost.'
          ],
          notice: 'Once you confirm the game launches successfully (or EAC verification passes), Easy Anti-Cheat is considered ready.'
        }
      ],
      eacTerminal: {
        ledLabel: 'FIELD EQUIPMENT VERIFICATION TERMINAL',
        title: 'EASY ANTI-CHEAT — SYSTEM VERIFICATION',
        tagline: '"Ensuring your game installation is ready."',
        noticeBanner:
          'Easy Anti-Cheat is included with The Isle: Evrima. A separate download is normally unnecessary. If the game reports that EAC is missing or not installed, follow Option A or Option B below.',
        optionA: {
          code: 'OPTION A',
          title: 'LOCAL INSTALLER / REPAIR',
          confirmBtn: 'Confirm Local Check Complete',
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
          confirmBtn: 'Confirm File Verification Complete',
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
          action: 'Use Steam’s "Verify integrity of game files" function under Properties → Installed Files so Steam restores bundled files.'
        },
        {
          code: 'ISSUE 03',
          title: 'EAC Installation Fails',
          action: 'Restart Steam, verify game files, and retry the official installation or repair process with administrator approval when prompted.'
        },
        {
          code: 'ISSUE 04',
          title: 'Game Still Cannot Launch',
          action: 'Consult The Isle’s official support resources and provide the exact error message. Never attempt to bypass, disable, or circumvent Easy Anti-Cheat.'
        }
      ],
      troublePolicy:
        'Official Policy: Never bypass, disable, or circumvent Easy Anti-Cheat, and never download EAC installers from unofficial websites.',
      checklistHeading: 'STEAM & EAC PREPARATION CHECKLIST',
      checklistCountSuffix: (done, total) => `${done} / ${total} Checked (Saved Automatically)`,
      checklistNote:
        'Note: Easy Anti-Cheat is marked checked automatically once you confirm The Isle launches successfully or complete Steam file verification—manual EAC installation is not required unless an error occurs.',
      checklistItems: {
        steamObtained: 'The Isle obtained through Steam',
        evrimaSelected: 'Evrima branch selected in Steam Properties',
        filesDownloaded: 'Game files downloaded successfully',
        eacChecked: 'Easy Anti-Cheat installation checked',
        eacRepaired: 'EAC repaired if required (skip if Steam handled automatically)',
        filesVerified: 'Game file verification completed if necessary',
        gameLaunched: 'The Isle: Evrima successfully launched'
      }
    },
    welcome: {
      introTitle: 'Welcome to The Isle & Evrima',
      introBody:
        'The Isle is an open-world dinosaur survival game. Evrima is its active primary branch featuring updated mechanics, dinosaurs, and ongoing development. This 3D outpost walks you through every step needed before joining a community server.',
      purposeTitle: 'Purpose of This Onboarding Outpost',
      purposeBody:
        'Instead of reading scattered links, walk through the five research stations (or use Quick Jump) to install Evrima via Steam, verify Easy Anti-Cheat, review verified communities, and complete your departure checklist.',
      pcTitle: 'Basic PC Readiness Guidelines',
      pcItems: [
        '64-bit Windows OS with an up-to-date DirectX 11/12 dedicated graphics card',
        'Quad-core+ processor and 16 GB RAM recommended for stable frame rates',
        'SSD storage with generous free space for Evrima downloads and patches',
        'Stable broadband connection for multiplayer servers and Easy Anti-Cheat'
      ],
      steamSpecsLink: 'Check Exact Live System Requirements on Steam Store ↗',
      destinationsTitle: 'The Six Expedition Destinations',
      destinationCards: [
        { id: 'welcome-centre', code: '01', name: 'Welcome Centre', desc: 'Overview, Evrima intro, PC readiness, and controls.' },
        { id: 'steam-station', code: '02', name: 'Steam & EAC Terminal', desc: '10-step Steam install, Evrima branch switch, and EAC verification.' },
        { id: 'community-outpost', code: '03', name: 'Community Outpost', desc: 'Verified community directory with Discord portals & access rules.' },
        { id: 'companion-station', code: '04', name: 'Companion Desk', desc: 'Official companion utility guidance and safety rules.' },
        { id: 'expedition-departure', code: '05', name: 'Expedition Departure', desc: 'Final pre-launch readiness checklist before playing.' },
        { id: 'survival-training', code: '06', name: 'Survival Training Ground', desc: 'Walled camp & bonfire with full Evrima survival field manual.' }
      ],
      jumpBtn: 'Visit Station →',
      navTitle: 'Outpost Navigation Instructions',
      navDesktop: 'Desktop: WASD / Arrows to walk • Space to jump • Shift to sprint • Mouse to look • E to interact • ESC to close panels.',
      navMobile: 'Mobile / Touch: Left thumbstick to walk • Swipe screen to look • Tap the [E] prompt when near a station.',
      startBtn: 'START EXPEDITION',
      nameLabel: 'SURVIVOR NAME',
      namePlaceholder: 'Enter your name for this session...',
      nameRequired: 'Please enter your survivor name before stepping into the outpost.',
      objectiveDefault: 'Welcome, {name}! Explore the outpost and approach any station.',
      goSteamBtn: 'Proceed to Steam Station →',
      reviewedBadge: '✓ ORIENTATION REVIEWED'
    },
    community: {
      intro:
        'Browse verified community entries loaded dynamically from serverDirectory.js. Only administrator-verified Discord portals and official policies are displayed.',
      searchPlaceholder: 'Search communities by name or info...',
      filterAll: 'All Communities',
      filterUnrestricted: 'Open / No 18+ Tag',
      filterAge18: '18+ Restricted',
      filterCompanion: 'Has Companion App',
      emptyState: 'No community entries match your current search or filter.',
      ageGateLabel: '18+ ADULTS ONLY RESTRICTION',
      ageGatePrompt:
        'This community publishes an 18+ adults-only restriction. Please confirm your age status before any join option is shown:',
      confirmAdultBtn: 'I confirm I am 18 or older',
      confirmUnderageBtn: 'I am under 18',
      underageBlocked:
        'Access Restricted: IsleLink is an 18+ adults-only community. Community join actions are hidden for underage users.',
      resetAgeBtn: 'Change age confirmation',
      verifiedSourceTag: 'OFFICIAL DISCORD SOURCE',
      noWebsiteTag: 'Website: Not used (Discord is official source)',
      noCompanionTag: 'Companion App: None offered here',
      companionTag: (val) => `Companion App: ${val}`,
      regionTag: (val) => `Region: ${val || 'Verified inside official Discord'}`,
      openDiscordBtn: 'OPEN DISCORD ↗',
      companionDownloadBtn: 'DOWNLOAD COMPANION ↗',
      websiteBtn: 'WEBSITE ↗',
      serverInfoBtn: 'SERVER INFORMATION',
      companionAppBtn: 'COMPANION APPLICATION',
      serverInfoTitle: 'Verified Server Information Policy',
      serverInfoBody:
        'Server rules, announcements, and connection requirements are maintained by community administrators inside the official Discord. Server IP addresses, player population, capacity, and gameplay settings are intentionally not fabricated here—always check the official Discord for live verified details.',
      companionPanelTitle: 'Companion Application Instructions (Official Discord Only)',
      companionWarning:
        'Official Source Only: Do not download companion installers from unofficial third-party mirrors. Only use the download published by Obsidian Isle administrators inside their official Discord.',
      markReviewedBtn: 'Mark Community Directory Reviewed',
      reviewedBadge: '✓ COMMUNITY DIRECTORY REVIEWED'
    },
    companion: {
      intro:
        'Companion utilities help Primeval Malaysia players coordinate maps, server tools, and packs. Only use official sources provided by server administrators—we play on many servers, with our main two being IsleLink and Obsidian Isle.',
      islelinkTitle: 'IsleLink Companion App (Main Server #1)',
      islelinkDesc: 'Official companion application download portal for IsleLink (islelink.gg/download). Requires 18+ confirmation to match server access rules.',
      islelinkDownloadBtn: 'DOWNLOAD ISLELINK COMPANION ↗',
      islelinkAgeNote: 'IsleLink is 18+ adults only. Confirm your age status to view the official companion download link:',
      islelinkUnderage: 'Access Restricted: IsleLink (18+) links stay hidden for underage players.',
      confirm18: 'I confirm I am 18 or older',
      confirmUnder18: 'I am under 18',
      obsidianTitle: 'Obsidian Isle Companion (Main Server #2)',
      obsidianDesc: 'Distributed strictly through official admin posts inside the Obsidian Isle Discord—never from third-party reupload sites.',
      obsidianDiscordBtn: 'OPEN OBSIDIAN DISCORD ↗',
      safetyTitle: 'Companion Setup & Security Guidelines',
      safetyItems: [
        'Download IsleLink Companion strictly from https://islelink.gg/download and Obsidian Isle utilities directly from their official Discord.',
        'Never run "EAC bypasses" or unverified third-party executables claiming secret radar hacks.',
        'Keep your Steam & Easy Anti-Cheat files clean and verified before joining community servers.'
      ],
      markReviewedBtn: 'Mark Companion Guidelines Understood',
      reviewedBadge: '✓ COMPANION SETUP REVIEWED'
    },
    departure: {
      intro:
        'Complete every readiness item below before stepping onto Gateway Island. Items sync automatically with your Steam/EAC terminal, Community Directory, Companion Desk, and Survival Camp progress!',
      heading: 'FINAL EXPEDITION PREPARATION CHECKLIST (11 ITEMS)',
      items: {
        steamObtained: 'The Isle obtained through Steam',
        evrimaSelected: 'Evrima branch selected in Steam Properties',
        filesDownloaded: 'Game files downloaded successfully',
        eacChecked: 'Easy Anti-Cheat installation checked',
        eacRepaired: 'EAC repaired if required (skip if Steam handled automatically)',
        filesVerified: 'Game file verification completed if necessary',
        gameLaunched: 'The Isle: Evrima successfully launched',
        communityReviewed: 'Community information reviewed (IsleLink, Obsidian Isle, Noctua Isle, Dino Den)',
        companionReviewed: 'Relevant companion application reviewed/installed from official source',
        rulesReviewed: 'Community rules & Gateway Map Legends understood',
        readyToExplore: 'Ready to explore The Isle: Evrima!'
      },
      eacPolicyNote:
        'Reminder: Never use unofficial external EAC installers—use Steam file verification or the bundled EAC installer only if needed.',
      completeTitle: 'EXPEDITION PREPARATION COMPLETE',
      completeTagline: 'YOUR JOURNEY INTO THE ISLE BEGINS HERE.',
      completeBody:
        'Outstanding work, survivor! Every technical check, community guide, and survival habit is ready. Good luck on Gateway—watch the rivers and trust your instincts!',
      returnBtn: 'RETURN TO EXPEDITION',
      visitSurvivalBtn: 'Visit Survival Training Camp →'
    }
  },

  ms: {
    ui: {
      eyebrow: 'PANDUAN PEMAIN BAHARU PRASEJARAH — PROTOTIP RANGKA',
      tagline: 'PERJALANAN ANDA KE DALAM THE ISLE BERMULA DI SINI.',
      welcomeDesc:
        'Terokai pos penyelidikan ini dalam mod orang pertama merentasi keenam-enam stesen panduan dan temui setiap pemandu dinosaur sebagai persediaan The Isle: Evrima.',
      ctrlMove: 'Bergerak',
      ctrlLook: 'Lihat Sekeliling',
      ctrlSprint: 'Lari Pecut',
      ctrlJump: 'Lompat',
      ctrlInteract: 'Berinteraksi di Stesen',
      ctrlEsc: 'Lepaskan Tetikus / Tutup Panel',
      startBtn: 'MULAKAN EKSPEDISI',
      nameLabel: 'NAMA PENGEMBARA',
      namePlaceholder: 'Masukkan nama anda untuk sesi ini...',
      nameRequired: 'Sila masukkan nama pengembara anda sebelum memasuki pos.',
      objectiveDefault: 'Selamat datang, {name}! Terokai kawasan pos dan dekati mana-mana stesen.',
      pointerNote:
        'Klik untuk masuk ke mod orang pertama. Jika kunci tetikus tidak disokong, seret tetikus untuk melihat sekeliling.',
      pointerNoteTouch:
        'Kawalan sentuh diaktifkan: guna kayu ria kiri untuk berjalan, leret skrin untuk melihat sekeliling, dan ketik butang interaksi.',
      sprintBtn: 'PECUT',
      jumpBtn: 'LOMPAT',
      langLabel: 'BAHASA',
      destLabel: 'DESTINASI',
      quickJumpDefault: 'Lompat Terus...',
      controlsBtn: 'KAWALAN',
      statusLabel: 'STATUS EKSPEDISI',
      hudHint: 'Klik paparan untuk kunci tetikus • ESC untuk lepaskan kursor',
      trailsZone: 'LALUAN POS — HUTAN MESOZOIK',
      closeEsc: 'TUTUP [ESC]',
      prevStation: 'Stesen Sebelumnya',
      nextStation: 'Stesen Seterusnya',
      returnOutpost: 'Kembali ke Pos',
      skeletonTag: 'PRATONTON STESEN RANGKA',
      functionalTag: 'TERMINAL BERFUNGSI — KEMAJUAN DISIMPAN',
      arrivedStation: (title) => `Tiba di ${title}. Tekan [E] untuk periksa.`,
      arrivedNpc: (title) => `Tiba berhampiran ${title}. Tekan [E] untuk berbual.`,
      inspecting: (title) => `Memeriksa ${title}`,
      speakingWith: 'Berbual dengan SavageZed — Pemandu Komuniti Primeval Malaysia',
      speakingWithGuide: (name, species) => `Berbual dengan ${name} (${species})`,
      talkToPrompt: (name) => `Berbual dengan ${name}`,
      guideZoneLabel: (name, species) => `${name.toUpperCase()} — PEMANDU ${species.toUpperCase()}`,
      npcCommunityTag: 'KOMUNITI PRIMEVAL MALAYSIA',
      npcByeEsc: 'SELAMAT TINGGAL [ESC]',
      npcBtnWhatToDo: 'Apa perlu saya buat di sini?',
      npcBtnPremise: 'Konsep Permainan & Survival',
      npcBtnMapGuide: 'Peta Gateway & Petunjuk',
      npcBtnOpenMap: 'Buka Pemapar Peta Gateway',
      mapHudBtn: '[M] PETA GATEWAY',
      npcBtnGreeting: 'Kembali ke Ucapan',
      npcBtnJumpSteam: 'Pergi ke Stesen Steam',
      npcBtnBye: 'Terima kasih, SavageZed!',
      npcMenuLabel: '★ SavageZed (Pemandu Kem)'
    },
    npc: {
      zoneLabel: 'LOKASI 01 — KEM EKSPEDISI UTAMA (SAVAGEZED)',
      title: 'SavageZed',
      promptLabel: 'Berbual dengan SavageZed',
      pages: {
        greeting: {
          speaker: 'SavageZed',
          role: 'Pemandu Komuniti Primeval Malaysia',
          text:
            'Selamat datang dan salam mesra, {name}! Saya SavageZed, gembira menyambut anda ke pos Komuniti Primeval Malaysia.\n\n' +
            'Konsep Permainan The Isle: Evrima: Anda bermula sebagai dinosaur kecil yang terdedah di pulau prasejarah. Permainan ini bersifat permadeath—anda mesti mencari air selamat, melengkapkan 3 nutrien diet untuk membesar, mengelak atau memburu pemangsa, dan memahami Peta Gateway!',
          hint: 'Tanya saya tentang Konsep Permainan, Peta Gateway & Petunjuk, atau Stesen Pos di bawah, {name}.'
        },
        premise: {
          speaker: 'SavageZed',
          role: 'Apakah The Isle: Evrima?',
          text:
            'Dalam The Isle: Evrima tiada misi automatik atau kedai—alam semula jadi ialah gelanggang sebenar anda, {name}:\n' +
            '• Tumbesaran & Nutrien: Lahir sebagai Juvenile, bersembunyi di semak, dan lengkapkan simbol diet Alpha (α), Beta (β), dan Gamma (γ) supaya membesar pantas ke Sub-Adult dan Adult.\n' +
            '• Risiko & Naluri: Minum di sungai mendedahkan anda kepada Deinosuchus; pecutan tanpa kawalan menghabiskan stamina; lompatan silap mematahkan kaki.\n' +
            '• Survival Primeval Malaysia: Menguasai Peta Gateway dan simbol Petunjuknya mengubah pemain baharu menjadi pemandiri sejati!',
          hint: 'Mahu lihat Peta Gateway sebenar dan fahami kepentingan Legends? Klik "Peta Gateway & Petunjuk" di bawah!'
        },
        'gateway-map': {
          speaker: 'SavageZed',
          role: 'Peta Gateway & Kepentingan Legends',
          text:
            'Gateway ialah pulau luas dalam Evrima, {name}—dipenuhi sungai berliku, paya, tebing curam, bukit tinggi, dan Kubah (Dome) gergasi di tengah pulau.\n\n' +
            'Kenapa Faham Petunjuk (Legends) Peta Sangat Penting:\n' +
            '• Simbol Air (Biru Muda vs Biru Gelap): Membezakan sungai air tawar cetek yang selamat daripada air masin serta lubuk buaya Deinosuchus.\n' +
            '• Kontur & Cerun Bukit: Mengelakkan anda terjatuh gaung curam atau patah kaki dalam gelap dan ribut.\n' +
            '• Ikon Deria Bau [Q]: Palma Merah = Sanctuary anak dino; Tapak Kaki = Zon Migrasi herbivor.\n' +
            '• Grid Koordinat (A1–H8): Memudahkan rakan Primeval Malaysia mencari lokasi anda dengan tepat!\n\n' +
            'Klik "Buka Pemapar Peta Gateway" di bawah (atau tekan [M] bila-bila masa) untuk melihat peta interaktif Gateway!',
          hint: 'Tip: Periksa Peta Gateway interaktif sekarang, {name}, untuk mengenali sungai selamat dan tebing berbahaya.'
        },
        'what-to-do': {
          speaker: 'SavageZed',
          role: 'Taklimat Kawasan Pos',
          text:
            'Berikut ialah perkara yang boleh anda lakukan di kem kami, {name}, sebagai persediaan untuk The Isle: Evrima:\n' +
            '1. Periksa Papan Kenyataan Pusat Alu-aluan di belakang saya untuk keperluan asas PC & info kem.\n' +
            '2. Lawati Terminal Steam & Easy Anti-Cheat di arah barat laut untuk panduan memilih cabang Evrima dan semakan EAC.\n' +
            '3. Semak Papan Direktori Komuniti di arah timur laut untuk maklumat pelayan komuniti & peraturan yang disahkan.\n' +
            '4. Singgah ke Meja Aplikasi Pendamping di tenggara untuk panduan muat turun rasmi.\n' +
            '5. Kunjungi Kem Latihan Survival berbenteng kayu di arah barat (Primeval Malaysia Training Camp) untuk petua tempur, diet & survival!\n' +
            '6. Pergi ke Pintu Pelepasan Ekspedisi di utara apabila anda sudah bersedia dengan senarai semak akhir!',
          hint: 'Tip: Anda boleh berjalan menggunakan WASD + Shift, atau guna menu DESTINASI di penjuru kanan atas untuk lompat terus.'
        }
      }
    },
    destinations: {
      'welcome-centre': {
        badge: 'DESTINASI 01',
        zoneLabel: 'LOKASI 01 — KEM EKSPEDISI UTAMA',
        title: 'Pusat Alu-aluan & Papan Kenyataan',
        subtitle: 'Pengenalan kepada The Isle: Evrima dan lima stesen ekspedisi.',
        promptLabel: 'Periksa Papan Alu-aluan',
        summary:
          'Hab permulaan utama yang memperkenalkan The Isle: Evrima, keperluan asas PC, dan susun atur pos ekspedisi.',
        plannedSections: [
          'Pengenalan kepada The Isle & cabang Evrima',
          'Gambaran keseluruhan lima destinasi panduan',
          'Keperluan perkakasan PC minimum & disyorkan',
          'Panduan navigasi ekspedisi'
        ],
        callout: 'Nota Rangka: Kad taklimat penuh dan penjejakan MULAKAN EKSPEDISI akan dilengkapkan pada Pencapaian 4.'
      },
      'steam-station': {
        badge: 'DESTINASI 02',
        zoneLabel: 'LOKASI 02 — STESEN PEMASANGAN STEAM',
        title: 'Terminal Steam & Easy Anti-Cheat',
        subtitle: 'Panduan langkah demi langkah pemasangan Steam, cabang Evrima, dan pembaikan EAC.',
        promptLabel: 'Buka Terminal Steam'
      },
      'community-outpost': {
        badge: 'DESTINASI 03',
        zoneLabel: 'LOKASI 03 — POS KOMUNITI',
        title: 'Papan Direktori Komuniti',
        subtitle: 'Portal komuniti yang disahkan, pautan Discord, dan polisi akses.',
        promptLabel: 'Baca Direktori Komuniti',
        summary: 'Papan direktori kayu yang memaparkan senarai komuniti rasmi daripada fail konfigurasi berasingan.',
        plannedSections: [
          'IsleLink — Sumber Discord rasmi dengan sekatan umur 18+ yang ketat',
          'Obsidian Isle — Sumber Discord rasmi, maklumat pelayan, dan panduan aplikasi pendamping',
          'Kad komuniti dengan carian & penapis daripada serverDirectory.js'
        ],
        callout: 'Nota Rangka: Pengesahan umur dan kad komuniti interaktif akan ditambah pada Pencapaian 4.'
      },
      'companion-station': {
        badge: 'DESTINASI 04',
        zoneLabel: 'LOKASI 04 — STESEN APLIKASI PENDAMPING',
        title: 'Meja Aplikasi Pendamping',
        subtitle: 'Sumber edaran rasmi, langkah pemasangan, dan semakan keselamatan.',
        promptLabel: 'Periksa Meja Pendamping',
        summary:
          'Stesen kerja khas yang menerangkan aplikasi pendamping komuniti, saluran edaran Discord rasmi, dan langkah keselamatan.',
        plannedSections: [
          'Ciri-ciri dan kegunaan aplikasi pendamping yang disokong',
          'Panduan edaran rasmi melalui Discord sahaja (Obsidian Isle)',
          'Senarai semak pemasangan & amaran sumber tidak rasmi'
        ],
        callout: 'Nota Rangka: Senarai semak terperinci dan bantuan masalah aplikasi pendamping akan ditambah pada Pencapaian 4.'
      },
      'expedition-departure': {
        badge: 'DESTINASI 05',
        zoneLabel: 'LOKASI 05 — PELEPASAN EKSPEDISI',
        title: 'Pintu Pelepasan Ekspedisi',
        subtitle: 'Senarai semak persediaan akhir sebelum memasuki The Isle.',
        promptLabel: 'Buka Senarai Semak Akhir',
        summary:
          'Gerbang pelepasan hutan yang memuatkan senarai semak kesiapsiagaan akhir termasuk Steam, Evrima, Easy Anti-Cheat, peraturan komuniti, dan aplikasi pendamping.',
        plannedSections: [
          'Senarai semak interaktif 11 perkara (termasuk semakan EAC)',
          'Simpanan kemajuan automatik melalui LocalStorage',
          'Status tamat: PERSEDIAAN EKSPEDISI SELESAI'
        ],
        callout: 'Nota Rangka: Penjejakan senarai semak akhir berterusan akan diaktifkan pada Pencapaian 4.'
      },
      'survival-training': {
        badge: 'DESTINASI 06',
        zoneLabel: 'LOKASI 06 — KEM LATIHAN PRIMEVAL MALAYSIA',
        title: 'Kem Latihan Survival',
        subtitle: 'Kem berdinding kayu & unggun api: ajaran kawalan, diet, stamina, bau, malam & tip survival.',
        promptLabel: 'Buka Manual Latihan Survival'
      }
    },
    steam: {
      tabs: {
        walkthrough: (done, total) => `PANDUAN (${done}/${total})`,
        eac: 'SEMAKAN SISTEM EAC',
        troubleshooting: 'PENYELESAIAN MASALAH',
        checklist: 'SENARAI SEMAK'
      },
      illustrationCaption: 'ILUSTRASI ANTARA MUKA — BUKAN TANGKAPAN SKRIN SEBENAR',
      stepOf: (curr, total) => `LANGKAH ${String(curr).padStart(2, '0')} DARIPADA ${String(total).padStart(2, '0')}`,
      throughWalkthrough: (pct) => `${pct}% DARIPADA PANDUAN`,
      stepCompleted: 'Langkah Selesai',
      markComplete: 'Tanda Selesai',
      prevStep: '← Langkah Sebelumnya',
      nextStep: 'Langkah Seterusnya →',
      reviewChecklist: 'Semak Senarai Semak →',
      openEacTabBtn: 'Buka Terminal Semakan Sistem EAC →',
      openSteamBtn: 'Buka Halaman Rasmi Steam Store',
      steps: [
        {
          number: 'LANGKAH 01',
          title: 'Dapatkan The Isle melalui Steam',
          summary:
            'Pastikan anda mempunyai akaun Steam dan klien desktop Steam yang dipasang, kemudian dapatkan The Isle daripada Kedai Steam rasmi.',
          instructions: [
            'Buka aplikasi desktop rasmi Steam (atau log masuk Steam dalam pelayar anda).',
            'Lawati halaman rasmi Steam Store bagi The Isle menggunakan pautan sah di bawah.',
            'Beli dan tambahkan The Isle ke akaun Steam anda jika belum memilikinya.'
          ]
        },
        {
          number: 'LANGKAH 02',
          title: 'Cari The Isle dalam Pustaka Steam',
          summary: 'Buka Pustaka (Library) Steam anda dan cari The Isle dalam senarai permainan.',
          instructions: [
            'Lancarkan aplikasi Steam dan klik tab LIBRARY di bahagian atas.',
            'Taip "The Isle" pada ruangan carian di bar sisi kiri.',
            'Pilih "The Isle" daripada senarai permainan anda.'
          ]
        },
        {
          number: 'LANGKAH 03',
          title: 'Buka Properties Permainan',
          summary: 'Buka tetingkap tetapan permainan untuk menukar daripada versi asal ke cabang Evrima.',
          instructions: [
            'Klik kanan pada "The Isle" di bar sisi Steam Library (atau klik ikon gear Manage).',
            'Pilih "Properties..." daripada menu yang muncul.',
            'Biarkan tetingkap Properties terbuka untuk langkah pemilihan cabang.'
          ]
        },
        {
          number: 'LANGKAH 04',
          title: 'Pilih Cabang Permainan Evrima',
          summary: 'Evrima ialah cabang pembangunan aktif The Isle yang diakses melalui menu Betas / Game Versions di Steam.',
          instructions: [
            'Dalam tetingkap Properties, klik tab "Betas" (atau "Game Versions & Betas").',
            'Buka menu lungsur "Beta Participation".',
            'Pilih "evrima - EVRIMA Public Branch" jika tersedia, kemudian tutup tetingkap Properties.'
          ],
          notice: 'Memilih Evrima akan memulakan giliran muat turun fail Evrima di Steam secara automatik.'
        },
        {
          number: 'LANGKAH 05',
          title: 'Muat Turun dan Pasang Fail Permainan',
          summary: 'Benarkan Steam memuat turun atau mengemas kini semua fail Evrima ke storan SSD dengan ruang kosong yang mencukupi.',
          instructions: [
            'Klik "Install" atau "Update" pada The Isle di dalam Steam Library.',
            'Sahkan pemacu pemasangan (SSD amat disyorkan untuk pemuatan yang lebih lancar).',
            'Tunggu sehingga giliran muat turun Steam mencapai 100%.'
          ]
        },
        {
          number: 'LANGKAH 06',
          title: 'Fahami Easy Anti-Cheat',
          summary:
            'Easy Anti-Cheat (EAC) ialah komponen anti-penipuan yang digunakan oleh The Isle: Evrima dan disertakan terus bersama fail pemasangan Steam.',
          instructions: [
            'Steam kebiasaannya mengurus pemasangan komponen Easy Anti-Cheat secara automatik.',
            'Anda lazimnya TIDAK perlu memuat turun pemasang EAC berasingan daripada laman web luar.',
            'Jalankan langkah pembaikan manual hanya jika permainan melaporkan EAC tiada atau belum dipasang.'
          ],
          notice:
            'Easy Anti-Cheat disertakan bersama The Isle: Evrima. Muat turun berasingan kebiasaannya tidak diperlukan. Jika permainan melaporkan EAC tiada atau belum dipasang, ikut arahan pembaikan di bawah.'
        },
        {
          number: 'LANGKAH 07',
          title: 'Pasang atau Baiki Easy Anti-Cheat jika Perlu',
          summary:
            'Jika Evrima melaporkan ralat EAC semasa dilancarkan, gunakan pemasang rasmi dalam folder permainan tempatan (Pilihan A) atau sahkan fail melalui Steam (Pilihan B).',
          instructions: [
            'Cuba lancarkan permainan seperti biasa dahulu—jika berjalan lancar, pemasangan manual EAC TIDAK diperlukan.',
            'Jika ralat EAC muncul, buka tab "SEMAKAN SISTEM EAC" di atas dan ikut Pilihan A (Pemasang / Pembaikan Tempatan).',
            'Gunakan fail rasmi di dalam direktori pemasangan Steam sahaja—jangan sekali-kali muat turun fail EAC daripada laman pihak ketiga.'
          ],
          notice:
            'Nama fail dan struktur folder (seperti InstallAntiCheat.bat, folder EasyAntiCheat, atau EasyAntiCheat_Setup.exe) boleh berbeza mengikut versi permainan. Jika tiada pemasang ditemui, teruskan ke Pilihan B / Langkah 08.'
        },
        {
          number: 'LANGKAH 08',
          title: 'Sahkan Fail Permainan (Verify Game Files)',
          summary: 'Gunakan fungsi pengesahan fail terbina dalam Steam apabila fail permainan atau komponen anti-penipuan hilang atau rosak.',
          instructions: [
            'Buka Steam Library, klik kanan "The Isle", dan pilih "Properties...".',
            'Pergi ke bahagian "Installed Files".',
            'Klik "Verify integrity of game files" dan tunggu Steam mengimbas serta menggantikan fail yang hilang atau rosak.'
          ],
          notice:
            'Jika ralat EAC masih berterusan selepas pengesahan, rujuk saluran sokongan rasmi The Isle dan elakkan memuat turun pemasang anti-cheat tidak rasmi.'
        },
        {
          number: 'LANGKAH 09',
          title: 'Lancarkan The Isle: Evrima',
          summary: 'Lancarkan The Isle daripada Steam dan benarkan sebarang pengesahan permulaan Windows atau Easy Anti-Cheat.',
          instructions: [
            'Klik butang hijau "Play" bagi The Isle di Steam Library.',
            'Benarkan Easy Anti-Cheat dimulakan jika diminta.',
            'Pastikan anda berjaya masuk ke menu utama Evrima tanpa ralat.'
          ]
        },
        {
          number: 'LANGKAH 10',
          title: 'Sahkan Pemasangan Berjaya',
          summary: 'Pastikan binaan Evrima aktif dan semak senarai persediaan Steam & EAC sebelum melawat Pos Komuniti.',
          instructions: [
            'Pastikan menu utama memaparkan skrin Evrima dan pelayar pelayan berfungsi.',
            'Semak tab Senarai Semak untuk memastikan item berkaitan telah ditanda.',
            'Kembali ke pos dan teruskan ke Lokasi 03 — Pos Komuniti.'
          ],
          notice: 'Apabila anda mengesahkan permainan berjaya dilancarkan (atau semakan EAC lulus), Easy Anti-Cheat dianggap sedia.'
        }
      ],
      eacTerminal: {
        ledLabel: 'TERMINAL SEMAKAN PERALATAN LAPANGAN',
        title: 'EASY ANTI-CHEAT — SEMAKAN SISTEM',
        tagline: '"Memastikan pemasangan permainan anda sedia digunakan."',
        noticeBanner:
          'Easy Anti-Cheat disertakan bersama The Isle: Evrima. Muat turun berasingan kebiasaannya tidak diperlukan. Jika permainan melaporkan EAC tiada atau belum dipasang, ikut Pilihan A atau Pilihan B di bawah.',
        optionA: {
          code: 'PILIHAN A',
          title: 'PEMASANG / PEMBAIKAN TEMPATAN',
          confirmBtn: 'Sahkan Semakan Tempatan Selesai',
          completionMessage: 'SEMAKAN PEMASANGAN EAC SELESAI',
          buildVarianceWarning:
            'Penting: Nama fail dan struktur direktori mungkin berbeza antara binaan permainan. Jangan andaikan semua pemasangan mempunyai nama fail yang sama. Jika pemasang tiada, teruskan ke Pilihan B.',
          officialOnlyWarning:
            'Hanya gunakan fail di dalam direktori permainan Steam rasmi anda. Jangan muat turun fail .exe atau .bat EAC gantian daripada laman web tidak rasmi.',
          steps: [
            'Buka Steam Library.',
            'Klik kanan pada The Isle.',
            'Pilih Properties.',
            'Pergi ke Installed Files.',
            'Klik Browse untuk membuka direktori pemasangan permainan tempatan.',
            'Cari fail pemasangan Easy Anti-Cheat jika ada (contoh bergantung pada versi: InstallAntiCheat.bat, folder EasyAntiCheat, atau EasyAntiCheat_Setup.exe).',
            'Jalankan skrip atau pemasang rasmi yang disertakan bersama permainan dan pilih Install atau Repair (luluskan kebenaran pentadbir Windows jika diminta).',
            'Tunggu sehingga proses pemasangan atau pembaikan selesai.',
            'Kembali ke Steam dan lancarkan The Isle.'
          ]
        },
        optionB: {
          code: 'PILIHAN B',
          title: 'SAHKAN FAIL PERMAINAN',
          confirmBtn: 'Sahkan Semakan Fail Selesai',
          completionMessage: 'PENGESAHAN FAIL PERMAINAN SELESAI',
          fallbackWarning:
            'Jika ralat EAC masih berterusan selepas pengesahan, hubungi saluran sokongan rasmi The Isle dan jangan muat turun pemasang anti-cheat tidak rasmi.',
          steps: [
            'Buka Steam Library.',
            'Klik kanan pada The Isle.',
            'Pilih Properties.',
            'Buka Installed Files.',
            'Pilih "Verify integrity of game files".',
            'Tunggu sehingga Steam melengkapkan proses pengesahan.',
            'Biarkan Steam mengenal pasti dan menggantikan fail permainan yang hilang atau rosak, termasuk komponen anti-cheat yang disertakan.',
            'Setelah pengesahan selesai, lancarkan The Isle semula.'
          ]
        }
      },
      troubleshooting: [
        {
          code: 'ISU 01',
          title: 'Easy Anti-Cheat Belum Dipasang',
          action:
            'Semak direktori pemasangan tempatan permainan untuk pemasang rasmi EAC (Pilihan A). Jika tiada, sahkan fail permainan melalui Steam (Pilihan B).'
        },
        {
          code: 'ISU 02',
          title: 'Pemasang EAC Tidak Dijumpai',
          action: 'Gunakan fungsi "Verify integrity of game files" Steam di bawah Properties → Installed Files supaya Steam memulihkan fail asal.'
        },
        {
          code: 'ISU 03',
          title: 'Pemasangan EAC Gagal',
          action: 'Mulakan semula Steam, sahkan fail permainan, dan cuba semula pemasangan atau pembaikan rasmi dengan kebenaran pentadbir.'
        },
        {
          code: 'ISU 04',
          title: 'Permainan Masih Tidak Boleh Dilancarkan',
          action:
            'Rujuk saluran sokongan rasmi The Isle dan sertakan mesej ralat yang tepat. Jangan cuba memintas atau menyahaktifkan Easy Anti-Cheat.'
        }
      ],
      troublePolicy:
        'Polisi Rasmi: Jangan sekali-kali memintas, menyahaktifkan, atau mengelak Easy Anti-Cheat, dan jangan muat turun pemasang EAC daripada sumber tidak rasmi.',
      checklistHeading: 'SENARAI SEMAK PERSEDIAAN STEAM & EAC',
      checklistCountSuffix: (done, total) => `${done} / ${total} Ditanda (Disimpan Automatik)`,
      checklistNote:
        'Nota: Easy Anti-Cheat akan ditanda secara automatik setelah anda mengesahkan The Isle berjaya dilancarkan atau melengkapkan pengesahan fail Steam—pemasangan manual tidak wajib jika tiada ralat.',
      checklistItems: {
        steamObtained: 'The Isle diperoleh melalui Steam',
        evrimaSelected: 'Cabang Evrima dipilih dalam Steam Properties',
        filesDownloaded: 'Fail permainan berjaya dimuat turun',
        eacChecked: 'Pemasangan Easy Anti-Cheat telah disemak',
        eacRepaired: 'EAC dibaiki jika perlu (abaikan jika Steam pasang automatik)',
        filesVerified: 'Pengesahan fail permainan diselesaikan jika perlu',
        gameLaunched: 'The Isle: Evrima berjaya dilancarkan'
      }
    },
    welcome: {
      introTitle: 'Selamat Datang ke The Isle & Evrima',
      introBody:
        'The Isle ialah permainan survival dinosaur dunia terbuka. Evrima ialah cabang utama aktif yang menampilkan mekanik baharu, dinosaur terkini, dan kemas kini berterusan. Pos 3D ini membimbing anda langkah demi langkah sebelum menyertai pelayan komuniti.',
      purposeTitle: 'Tujuan Pengalaman Panduan Ini',
      purposeBody:
        'Daripada mencari pautan secara berasingan, terokai lima stesen penyelidikan (atau guna Lompat Terus) untuk memasang Evrima melalui Steam, menyemak Easy Anti-Cheat, meneliti komuniti rasmi, dan melengkapkan senarai semak akhir.',
      pcTitle: 'Panduan Asas Kesediaan PC',
      pcItems: [
        'Sistem operasi Windows 64-bit dengan kad grafik khusus DirectX 11/12 terkini',
        'Pemproses 4-teras ke atas dan 16 GB RAM disyorkan untuk prestasi stabil',
        'Storan SSD dengan ruang kosong mencukupi untuk muat turun & kemas kini Evrima',
        'Sambungan internet jalur lebar stabil untuk pelayan berbilang pemain & Easy Anti-Cheat'
      ],
      steamSpecsLink: 'Semak Spesifikasi Rasmi Terkini di Steam Store ↗',
      destinationsTitle: 'Enam Destinasi Ekspedisi',
      destinationCards: [
        { id: 'welcome-centre', code: '01', name: 'Pusat Alu-aluan', desc: 'Pengenalan Evrima, kesediaan PC, dan kawalan asas.' },
        { id: 'steam-station', code: '02', name: 'Terminal Steam & EAC', desc: 'Panduan 10 langkah Steam, cabang Evrima, dan semakan EAC.' },
        { id: 'community-outpost', code: '03', name: 'Pos Komuniti', desc: 'Direktori komuniti disahkan berserta Discord rasmi & polisi akses.' },
        { id: 'companion-station', code: '04', name: 'Meja Aplikasi Pendamping', desc: 'Panduan aplikasi pendamping rasmi dan langkah keselamatan.' },
        { id: 'expedition-departure', code: '05', name: 'Pintu Pelepasan Ekspedisi', desc: 'Senarai semak persediaan akhir sebelum mula bermain.' },
        { id: 'survival-training', code: '06', name: 'Kem Latihan Survival', desc: 'Kem berbenteng kayu & unggun api dengan manual lengkap survival Evrima.' }
      ],
      jumpBtn: 'Lawat Stesen →',
      navTitle: 'Arahan Navigasi Pos',
      navDesktop: 'Komputer: WASD / Anak Panah untuk bergerak • Space untuk lompat • Shift untuk pecut • Tetikus untuk melihat • E untuk berinteraksi • ESC untuk tutup panel.',
      navMobile: 'Mudah Alih / Sentuh: Kayu ria kiri untuk berjalan • Leret skrin untuk melihat • Ketik butang [E] apabila berdekatan stesen.',
      startBtn: 'MULAKAN EKSPEDISI',
      nameLabel: 'NAMA PENGEMBARA',
      namePlaceholder: 'Masukkan nama anda untuk sesi ini...',
      nameRequired: 'Sila masukkan nama pengembara anda sebelum memasuki pos.',
      objectiveDefault: 'Selamat datang, {name}! Terokai kawasan pos dan dekati mana-mana stesen.',
      goSteamBtn: 'Terus ke Stesen Steam →',
      reviewedBadge: '✓ TAKLIMAT DISEMAK'
    },
    community: {
      intro:
        'Layari senarai komuniti yang disahkan daripada fail konfigurasi serverDirectory.js. Hanya pautan Discord dan polisi rasmi yang disahkan oleh pentadbir dipaparkan.',
      searchPlaceholder: 'Cari komuniti mengikut nama atau maklumat...',
      filterAll: 'Semua Komuniti',
      filterUnrestricted: 'Terbuka / Tiada Had 18+',
      filterAge18: 'Sekatan 18+',
      filterCompanion: 'Ada Aplikasi Pendamping',
      emptyState: 'Tiada komuniti sepadan dengan carian atau penapis anda.',
      ageGateLabel: 'SEKATAN KOMUNITI DEWASA 18+',
      ageGatePrompt:
        'Komuniti ini menetapkan sekatan umur 18+ sahaja. Sila sahkan status umur anda sebelum tindakan sertai dipaparkan:',
      confirmAdultBtn: 'Saya sahkan saya berumur 18 tahun ke atas',
      confirmUnderageBtn: 'Saya berumur bawah 18 tahun',
      underageBlocked:
        'Akses Disekat: IsleLink ialah komuniti dewasa 18+ sahaja. Pautan dan tindakan menyertai tidak didedahkan kepada pengguna bawah umur.',
      resetAgeBtn: 'Tukar pengesahan umur',
      verifiedSourceTag: 'SUMBER DISCORD RASMI',
      noWebsiteTag: 'Laman Web: Tidak digunakan (Discord sumber rasmi)',
      noCompanionTag: 'Aplikasi Pendamping: Tiada ditawarkan di sini',
      companionTag: (val) => `Aplikasi Pendamping: ${val}`,
      regionTag: (val) => `Wilayah: ${val || 'Disahkan dalam Discord rasmi'}`,
      openDiscordBtn: 'BUKA DISCORD ↗',
      companionDownloadBtn: 'MUAT TURUN PENDAMPING ↗',
      websiteBtn: 'LAMAN WEB ↗',
      serverInfoBtn: 'MAKLUMAT PELAYAN',
      companionAppBtn: 'APLIKASI PENDAMPING',
      serverInfoTitle: 'Polisi Maklumat Pelayan Disahkan',
      serverInfoBody:
        'Peraturan pelayan, pengumuman, dan syarat sambungan diuruskan oleh pentadbir komuniti di dalam Discord rasmi. Alamat IP, jumlah pemain, kapasiti, dan tetapan pelayan tidak direka di sini—sentiasa rujuk Discord rasmi untuk maklumat sahih terkini.',
      companionPanelTitle: 'Arahan Aplikasi Pendamping (Discord Rasmi Sahaja)',
      companionWarning:
        'Sumber Rasmi Sahaja: Jangan muat turun pemasang daripada laman pihak ketiga. Hanya gunakan pautan muat turun yang diterbitkan oleh pentadbir Obsidian Isle di dalam Discord rasmi mereka.',
      markReviewedBtn: 'Tanda Direktori Komuniti Telah Disemak',
      reviewedBadge: '✓ DIREKTORI KOMUNITI DISEMAK'
    },
    companion: {
      intro:
        'Aplikasi pendamping membantu pemain Primeval Malaysia menyelaraskan peta dan kumpulan. Gunakan sumber rasmi sahaja—kami bermain di banyak pelayan, namun dua pelayan utama kami ialah IsleLink dan Obsidian Isle.',
      islelinkTitle: 'Aplikasi Pendamping IsleLink (Pelayan Utama #1)',
      islelinkDesc: 'Portal muat turun rasmi aplikasi pendamping IsleLink (islelink.gg/download). Pengesahan umur 18+ diperlukan.',
      islelinkDownloadBtn: 'MUAT TURUN ISLELINK COMPANION ↗',
      islelinkAgeNote: 'IsleLink khusus untuk dewasa 18+. Sahkan status umur anda untuk memaparkan pautan muat turun rasmi:',
      islelinkUnderage: 'Akses Disekat: Pautan IsleLink (18+) disembunyikan untuk pengguna bawah umur.',
      confirm18: 'Saya berumur 18 tahun ke atas',
      confirmUnder18: 'Saya bawah 18 tahun',
      obsidianTitle: 'Aplikasi Pendamping Obsidian Isle (Pelayan Utama #2)',
      obsidianDesc: 'Diedarkan secara rasmi oleh pentadbir di dalam Discord Obsidian Isle sahaja—jangan muat turun daripada laman pihak ketiga.',
      obsidianDiscordBtn: 'BUKA DISCORD OBSIDIAN ↗',
      safetyTitle: 'Garis Panduan Keselamatan Pemasangan',
      safetyItems: [
        'Muat turun IsleLink Companion hanya dari https://islelink.gg/download dan alat Obsidian Isle dari Discord rasmi mereka.',
        'Jangan sekali-kali menjalankan pemintas EAC atau fail tidak disahkan.',
        'Pastikan fail Steam dan Easy Anti-Cheat anda sah sebelum menyertai pelayan komuniti.'
      ],
      markReviewedBtn: 'Tanda Panduan Aplikasi Pendamping Difahami',
      reviewedBadge: '✓ PENDAMPING TELAH DISEMAK'
    },
    departure: {
      intro:
        'Lengkapkan kesemua 11 item kesediaan di bawah sebelum melangkah ke Pulau Gateway. Kemajuan disegerakkan automatik dengan stesen lain!',
      heading: 'SENARAI SEMAK PERSEDIAAN EKSPEDISI AKHIR (11 PERKARA)',
      items: {
        steamObtained: 'The Isle diperoleh melalui Steam',
        evrimaSelected: 'Cabang Evrima dipilih dalam Steam Properties',
        filesDownloaded: 'Fail permainan berjaya dimuat turun',
        eacChecked: 'Pemasangan Easy Anti-Cheat disemak',
        eacRepaired: 'EAC dibaiki jika diperlukan (skip jika Steam pasang automatik)',
        filesVerified: 'Pengesahan fail permainan (Verify Files) selesai jika perlu',
        gameLaunched: 'The Isle: Evrima berjaya dilancarkan',
        communityReviewed: 'Maklumat komuniti disemak (IsleLink, Obsidian Isle, Noctua Isle, Dino Den)',
        companionReviewed: 'Aplikasi pendamping rasmi disemak / dimuat turun',
        rulesReviewed: 'Peraturan komuniti & Peta Gateway / Legends difahami',
        readyToExplore: 'Sedia meneroka The Isle: Evrima!'
      },
      eacPolicyNote:
        'Peringatan: Jangan guna pemasang EAC luar yang tidak rasmi—guna Steam Verify Integrity atau pemasang terbina dalam permainan jika perlu.',
      completeTitle: 'PERSEDIAAN EKSPEDISI SELESAI',
      completeTagline: 'PERJALANAN ANDA KE DALAM THE ISLE BERMULA DI SINI.',
      completeBody:
        'Tahniah pengembara! Semua semakan teknikal, panduan komuniti, dan asas survival telah bersedia. Selamat berjuang di Pulau Gateway!',
      returnBtn: 'KEMBALI KE EKSPEDISI',
      visitSurvivalBtn: 'Lawat Kem Latihan Survival →'
    }
  },

  kl: {
    ui: {
      eyebrow: 'ONBOARDING PLAYER BARU — PROTOTIP SKELETON',
      tagline: 'ADVENTURE KORANG KAT THE ISLE MULA KAT SINI.',
      welcomeDesc:
        'Jom pusing-pusing kem penyelidikan ni dalam first-person merentasi enam stesen onboarding dan borak dengan semua guide dino untuk bersiap masuk The Isle: Evrima.',
      ctrlMove: 'Jalan',
      ctrlLook: 'Pusing Kamera',
      ctrlSprint: 'Lari Laju',
      ctrlJump: 'Lompat',
      ctrlInteract: 'Tekan Kat Stesen',
      ctrlEsc: 'Lepas Mouse / Tutup Panel',
      startBtn: 'JOM MULA EKSPEDISI',
      nameLabel: 'NAMA SURVIVOR KORANG',
      namePlaceholder: 'Masukkan nama korang untuk sesi ni...',
      nameRequired: 'Masukkan nama korang dulu bro sebelum masuk kem!',
      objectiveDefault: 'Welcome {name}! Pusing-pusing kem dan pergi mana-mana stesen jap.',
      pointerNote:
        'Klik untuk masuk mode first-person. Kalau pointer lock tak jalan, drag je mouse untuk pusing pandangan.',
      pointerNoteTouch:
        'Mode sentuh aktif: guna joystick kiri untuk jalan, swipe skrin untuk pusing kamera, dan tap je prompt bila dekat.',
      sprintBtn: 'LARI',
      jumpBtn: 'LOMPAT',
      langLabel: 'BAHASA',
      destLabel: 'LOKASI',
      quickJumpDefault: 'Terus Teleport...',
      controlsBtn: 'KAWALAN',
      statusLabel: 'STATUS EKSPEDISI',
      hudHint: 'Klik skrin untuk lock mouse • ESC nak lepas cursor',
      trailsZone: 'JALAN HUTAN — KEM MESOZOIK',
      closeEsc: 'TUTUP [ESC]',
      prevStation: 'Stesen Lepas',
      nextStation: 'Stesen Depan',
      returnOutpost: 'Sambung Jalan',
      skeletonTag: 'PREVIEW STESEN SKELETON',
      functionalTag: 'TERMINAL ONZ — PROGRESS DAH SAVE',
      arrivedStation: (title) => `Dah sampai ${title}. Tekan [E] nak tengok.`,
      arrivedNpc: (title) => `Dah depan ${title}. Tekan [E] nak borak.`,
      inspecting: (title) => `Tengah tengok ${title}`,
      speakingWith: 'Tengah sembang dengan SavageZed — Guide Primeval Malaysia',
      speakingWithGuide: (name, species) => `Tengah sembang dengan ${name} (${species})`,
      talkToPrompt: (name) => `Borak dengan ${name}`,
      guideZoneLabel: (name, species) => `${name.toUpperCase()} — GUIDE ${species.toUpperCase()}`,
      npcCommunityTag: 'KOMUNITI PRIMEVAL MALAYSIA',
      npcByeEsc: 'GERAK DULU [ESC]',
      npcBtnWhatToDo: 'Nak buat apa kat sini bro?',
      npcBtnPremise: 'Cerita Game & Cara Survive',
      npcBtnMapGuide: 'Peta Gateway & Legends',
      npcBtnOpenMap: 'Buka Peta Gateway Interaktif',
      mapHudBtn: '[M] PETA GATEWAY',
      npcBtnGreeting: 'Balik Ucapan Mula',
      npcBtnJumpSteam: 'Terus ke Stesen Steam',
      npcBtnBye: 'Okay cun, thanks SavageZed!',
      npcMenuLabel: '★ SavageZed (Guide Kem)'
    },
    npc: {
      zoneLabel: 'LOKASI 01 — KEM UTAMA (SAVAGEZED)',
      title: 'SavageZed',
      promptLabel: 'Borak dengan SavageZed',
      pages: {
        greeting: {
          speaker: 'SavageZed',
          role: 'Guide Komuniti Primeval Malaysia',
          text:
            'Wey selamat datang {name}! Aku SavageZed, happy gila sambut korang masuk kem Komuniti Primeval Malaysia ni.\n\n' +
            'Konsep Game The Isle: Evrima: Korang spawn jadi dino kecik yang lemah kat pulau prasejarah. Game ni permadeath terus—kena cari air selamat, cukupkan 3 diet nutrien biar cepat besar, elak predator atau serang hendap mangsa, dan faham betul-betul Peta Gateway!',
          hint: 'Tanya aku pasal Cerita Game, Peta Gateway & Legends, atau Stesen kat bawah ni, {name}.'
        },
        premise: {
          speaker: 'SavageZed',
          role: 'Apa Benda The Isle: Evrima Ni?',
          text:
            'Kat The Isle: Evrima takde kedai atau quest auto—alam liar tu betul-betul arena korang, {name}:\n' +
            '• Growth & Diet: Mula-mula jadi Juvenile menyorok dalam semak, campur simbol diet Alpha (α), Beta (β), dengan Gamma (γ) biar laju naik Sub-Adult sampai Adult.\n' +
            '• Risiko Sebenar: Silap minum kat sungai kena ngap buaya Deinosuchus; sprint kering habis stamina; terjun gaung terus patah kaki.\n' +
            '• Survival Primeval Malaysia: Kalau korang master Peta Gateway dengan Legends dia, senang je survive lama!',
          hint: 'Nak tengok Peta Gateway sebenar & tahu kenapa Legends tu penting gila? Tekan "Peta Gateway & Legends" kat bawah!'
        },
        'gateway-map': {
          speaker: 'SavageZed',
          role: 'Peta Gateway & Kepentingan Legends',
          text:
            'Gateway ni map pulau besar Evrima, {name}—penuh dengan sungai bercabang, paya, gaung tinggi, bukit batu, dengan Dome raksasa kat tengah.\n\n' +
            'Kenapa Kena Faham Map Legends:\n' +
            '• Warna Air (Biru Cyan vs Biru Gelap): Senang beza air tawar cetek selamat dengan laut masin dan sungai dalam penuh Deinosuchus.\n' +
            '• Kontur & Bayang Bukit: Elak terjun gaung curam waktu malam atau ribut gelap.\n' +
            '• Icon Bau [Q]: Palma Merah = Sanctuary selamat budak kecik; Tapak Kaki = Zon Migrasi herbivor makan.\n' +
            '• Grid Koordinat (A1–H8): Senang nak bagi koordinat tepat kat member Primeval Malaysia bila nak berkumpul!\n\n' +
            'Klik "Buka Peta Gateway Interaktif" kat bawah (atau tekan [M] bila-bila) untuk zoom dan tengok Peta Gateway sekarang!',
          hint: 'Tip: Bukak Peta Gateway tu kejap, {name}, biar biasa tengok sungai dengan daratan dia.'
        },
        'what-to-do': {
          speaker: 'SavageZed',
          role: 'Briefing Santai Kem',
          text:
            'Ni benda {name} kena check sebelum terjun main The Isle: Evrima:\n' +
            '1. Tengok Papan Notice kat belakang aku ni dulu untuk spec PC basic dengan info kem.\n' +
            '2. Pergi Terminal Steam & Easy Anti-Cheat kat belah barat laut sana—situ ajar cara tukar branch Evrima dengan settlekan EAC kalau buat hal.\n' +
            '3. Check Papan Direktori Komuniti kat belah timur laut untuk link Discord verified dengan rules server.\n' +
            '4. Singgah Meja Companion App belah tenggara kalau nak tahu pasal app tambahan yang official je.\n' +
            '5. Singgah sekali Kem Latihan Survival berdinding kayu kat belah barat (Primeval Malaysia Training Camp) untuk belajar teknik combat, diet & survival!\n' +
            '6. Last sekali, lalu Pintu Pelepasan kat utara sana untuk check senarai akhir. Ngam!',
          hint: 'Tip: Jalan pakai WASD + Shift, ataupun pilih je kat dropdown LOKASI belah kanan atas kalau malas jalan jauh.'
        }
      }
    },
    destinations: {
      'welcome-centre': {
        badge: 'DESTINASI 01',
        zoneLabel: 'LOKASI 01 — KEM EKSPEDISI UTAMA',
        title: 'Pusat Welcome & Papan Notice',
        subtitle: 'Intro pasal The Isle: Evrima dengan lima stesen kat kem ni.',
        promptLabel: 'Tengok Papan Welcome',
        summary: 'Port mula-mula untuk kenalkan The Isle: Evrima, spec PC yang ngam, dan map kasar kem ni.',
        plannedSections: [
          'Intro pasal The Isle & branch Evrima',
          'Ringkasan lima stesen onboarding',
          'Spec PC minimum & recommended biar tak lag',
          'Cara gerak dalam kem'
        ],
        callout: 'Nota Skeleton: Info penuh dengan tracking JOM MULA EKSPEDISI akan siap masa Milestone 4 nanti.'
      },
      'steam-station': {
        badge: 'DESTINASI 02',
        zoneLabel: 'LOKASI 02 — STESEN INSTALL STEAM',
        title: 'Terminal Steam & Easy Anti-Cheat',
        subtitle: 'Tutorial step-by-step install Steam, tukar branch Evrima, dengan repair EAC.',
        promptLabel: 'Buka Terminal Steam'
      },
      'community-outpost': {
        badge: 'DESTINASI 03',
        zoneLabel: 'LOKASI 03 — PORT KOMUNITI',
        title: 'Papan Direktori Komuniti',
        subtitle: 'Senarai komuniti verified, link Discord betul, dengan rules akses.',
        promptLabel: 'Tengok Direktori Komuniti',
        summary: 'Papan kayu untuk senarai komuniti verified yang tarik data terus dari fail config berasingan.',
        plannedSections: [
          'IsleLink — Link Discord rasmi dengan gate umur 18+ yang strict',
          'Obsidian Isle — Link Discord rasmi, info server, dan panduan companion app',
          'Kad komuniti boleh search & filter guna serverDirectory.js'
        ],
        callout: 'Nota Skeleton: Age-gate dengan kad komuniti interaktif akan siap masuk masa Milestone 4.'
      },
      'companion-station': {
        badge: 'DESTINASI 04',
        zoneLabel: 'LOKASI 04 — STESEN COMPANION APP',
        title: 'Meja Companion App',
        subtitle: 'Sumber download rasmi, cara setup, dan tips elak link scam.',
        promptLabel: 'Check Meja Companion',
        summary: 'Meja khas untuk explain app pendamping komuniti, mana nak dapat kat Discord rasmi, dan langkah selamat.',
        plannedSections: [
          'Apa fungsi companion app yang disokong',
          'Panduan download ikut Discord rasmi je (Obsidian Isle)',
          'Checklist setup & warning jangan tekan link pelik-pelik'
        ],
        callout: 'Nota Skeleton: Checklist lengkap dengan troubleshooting companion app akan masuk masa Milestone 4.'
      },
      'expedition-departure': {
        badge: 'DESTINASI 05',
        zoneLabel: 'LOKASI 05 — PINTU PELEPASAN',
        title: 'Pintu Pelepasan Ekspedisi',
        subtitle: 'Checklist last sebelum korang terjun masuk The Isle.',
        promptLabel: 'Check Senarai Akhir',
        summary:
          'Gerbang hutan tempat check semua benda dah settle ke belum—Steam, Evrima, Easy Anti-Cheat, rules komuniti, dengan companion app.',
        plannedSections: [
          '11 checklist interaktif (termasuk check EAC)',
          'Auto-save kat LocalStorage biar tak hilang',
          'Status siap: PERSEDIAAN EKSPEDISI COMPLETE'
        ],
        callout: 'Nota Skeleton: Checklist akhir yang link dengan progress penuh akan aktif masa Milestone 4.'
      },
      'survival-training': {
        badge: 'DESTINASI 06',
        zoneLabel: 'LOKASI 06 — KEM LATIHAN PRIMEVAL MALAYSIA',
        title: 'Kem Latihan Survival',
        subtitle: 'Kem berpagar kayu & unggun api: ajaran controls, diet, stamina, bau, malam & tips padu.',
        promptLabel: 'Buka Manual Latihan Survival'
      }
    },
    steam: {
      tabs: {
        walkthrough: (done, total) => `STEP-BY-STEP (${done}/${total})`,
        eac: 'TERMINAL CHECK EAC',
        troubleshooting: 'KALAU ERROR',
        checklist: 'CHECKLIST'
      },
      illustrationCaption: 'ILUSTRASI UI JE — BUKAN SCREENSHOT BETUL',
      stepOf: (curr, total) => `STEP ${String(curr).padStart(2, '0')} DARI ${String(total).padStart(2, '0')}`,
      throughWalkthrough: (pct) => `DAH ${pct}% SIAP`,
      stepCompleted: 'Step Ni Dah Settle',
      markComplete: 'Tanda Dah Settle',
      prevStep: '← Step Lepas',
      nextStep: 'Step Depan →',
      reviewChecklist: 'Tengok Checklist →',
      openEacTabBtn: 'Buka Terminal Check EAC →',
      openSteamBtn: 'Buka Steam Store Rasmi',
      steps: [
        {
          number: 'STEP 01',
          title: 'Dapatkan The Isle kat Steam',
          summary:
            'Pastikan Steam dah install kat PC korang, lepas tu beli atau buka page rasmi The Isle kat Steam Store.',
          instructions: [
            'Buka app Steam kat PC (atau login kat browser).',
            'Pergi ke page Steam Store rasmi The Isle guna button link kat bawah ni.',
            'Beli dan masukkan The Isle dalam akaun Steam korang kalau belum ada.'
          ]
        },
        {
          number: 'STEP 02',
          title: 'Cari The Isle dalam Steam Library',
          summary: 'Buka Steam Library dan cari nama The Isle kat list game korang.',
          instructions: [
            'Buka Steam dan tekan tab LIBRARY kat atas tu.',
            'Taip "The Isle" kat kotak search belah kiri.',
            'Klik "The Isle" dalam list game korang.'
          ]
        },
        {
          number: 'STEP 03',
          title: 'Buka Properties Game',
          summary: 'Masuk setting Properties game supaya korang boleh tukar dari versi lama ke branch Evrima.',
          instructions: [
            'Right-click kat "The Isle" kat sidebar Library (atau tekan ikon gear Manage).',
            'Pilih "Properties..." dalam menu tu.',
            'Biar je window Properties tu terbuka untuk step sebelah.'
          ]
        },
        {
          number: 'STEP 04',
          title: 'Pilih Branch Evrima',
          summary: 'Evrima ni versi aktif yang semua orang main sekarang—kena tukar kat bahagian Betas / Game Versions.',
          instructions: [
            'Dalam window Properties tu, klik tab "Betas" (atau "Game Versions & Betas").',
            'Klik dropdown "Beta Participation".',
            'Pilih "evrima - EVRIMA Public Branch", lepas tu tutup window Properties.'
          ],
          notice: 'Lepas korang pilih Evrima, Steam akan automatik queue download fail Evrima.'
        },
        {
          number: 'STEP 05',
          title: 'Download & Install Fail Game',
          summary: 'Bagi Steam download atau update semua fail Evrima—elok letak kat SSD biar tak sangkut loading.',
          instructions: [
            'Tekan "Install" atau "Update" kat The Isle dalam Library.',
            'Pilih drive yang ada ruang cukup (SSD paling ngam).',
            'Tunggu sampai download Steam siap 100%.'
          ]
        },
        {
          number: 'STEP 06',
          title: 'Fahami Easy Anti-Cheat (EAC)',
          summary:
            'Easy Anti-Cheat (EAC) ni sistem anti-cheat untuk The Isle: Evrima. Dia memang dah sekali bundle dalam download Steam tu.',
          instructions: [
            'Selalunya Steam memang terus install EAC ni automatik sekali dengan game.',
            'Korang TAK payah pun cari atau download installer EAC asing dari website luar.',
            'Buat repair manual ni kalau betul-betul keluar error kata EAC takde atau tak install je.'
          ],
          notice:
            'Easy Anti-Cheat dah memang ada sekali dalam The Isle: Evrima. Tak perlu download asing. Kalau game keluar error kata EAC takde atau tak install, baru ikut step repair kat bawah.'
        },
        {
          number: 'STEP 07',
          title: 'Install atau Repair Easy Anti-Cheat Kalau Perlu',
          summary:
            'Kalau Evrima keluar error EAC masa launch, guna installer rasmi dalam folder game sendiri (Option A) atau verify file kat Steam (Option B).',
          instructions: [
            'Cuba tekan Play macam biasa dulu—kalau masuk game elok, korang TAK payah usik EAC langsung.',
            'Kalau ada error EAC, buka tab "TERMINAL CHECK EAC" kat atas dan ikut Option A (Local Installer / Repair).',
            'Guna fail yang memang ada dalam folder Steam rasmi korang je—jangan sesekali download fail EAC dari website luar!'
          ],
          notice:
            'Nama fail dengan folder (contoh macam InstallAntiCheat.bat, folder EasyAntiCheat, atau EasyAntiCheat_Setup.exe) kadang lain ikut build game. Kalau tak jumpa installer, terus buat Option B / Step 08.'
        },
        {
          number: 'STEP 08',
          title: 'Verify Game Files Kat Steam',
          summary: 'Guna feature Verify kat Steam kalau ada fail game atau fail anti-cheat yang hilang atau corrupt.',
          instructions: [
            'Buka Steam Library, right-click "The Isle", lepas tu klik "Properties...".',
            'Masuk tab "Installed Files".',
            'Tekan "Verify integrity of game files" dan tunggu Steam scan serta ganti balik mana-mana fail yang rosak.'
          ],
          notice:
            'Kalau lepas verify pun error EAC masih sangkut, tanya support rasmi The Isle—jangan download installer anti-cheat pelik-pelik kat luar.'
        },
        {
          number: 'STEP 09',
          title: 'Launch The Isle: Evrima',
          summary: 'Run The Isle dari Steam dan accept kalau Windows atau EAC keluar prompt permission.',
          instructions: [
            'Tekan button hijau "Play" kat The Isle dalam Steam Library.',
            'Bagi Easy Anti-Cheat jalan kalau dia keluar loading screen.',
            'Pastikan korang sampai ke main menu Evrima dengan aman.'
          ]
        },
        {
          number: 'STEP 10',
          title: 'Confirm Semua Dah Mantap',
          summary: 'Pastikan skrin menu Evrima dah keluar elok dan tick checklist sebelum korang gerak ke Port Komuniti.',
          instructions: [
            'Check main menu tulis Evrima dan senarai server boleh keluar.',
            'Buka tab Checklist untuk pastikan semua item penting dah bertanda.',
            'Keluar balik ke kem dan teruskan ke Lokasi 03 — Port Komuniti.'
          ],
          notice: 'Bila game dah boleh launch elok (atau lepas check EAC), kira EAC korang dah settel!'
        }
      ],
      eacTerminal: {
        ledLabel: 'TERMINAL SEMAKAN PERALATAN LAPANGAN',
        title: 'EASY ANTI-CHEAT — CHECK SISTEM',
        tagline: '"Pastikan install game korang betul-betul ready."',
        noticeBanner:
          'Easy Anti-Cheat dah memang sekali dengan The Isle: Evrima. Tak payah download asing. Kalau game keluar error kata EAC takde, ikut Option A atau Option B kat bawah ni.',
        optionA: {
          code: 'OPTION A',
          title: 'INSTALLER / REPAIR DALAM FOLDER',
          confirmBtn: 'Confirm Check Folder Siap',
          completionMessage: 'CHECK PEMASANGAN EAC SETTLE',
          buildVarianceWarning:
            'Penting: Nama fail dengan susunan folder boleh berbeza ikut build game. Jangan pelik kalau tak semua fail kat bawah ada. Kalau tak jumpa langsung, terus buat Option B.',
          officialOnlyWarning:
            'Guna fail dalam folder Steam rasmi korang je. Jangan download fail .exe atau .bat EAC dari website tak rasmi!',
          steps: [
            'Buka Steam Library.',
            'Right-click kat The Isle.',
            'Pilih Properties.',
            'Pergi ke Installed Files.',
            'Tekan Browse untuk buka folder game kat PC korang.',
            'Cari fail installer Easy Anti-Cheat kalau ada (contoh ikut versi: InstallAntiCheat.bat, folder EasyAntiCheat, atau EasyAntiCheat_Setup.exe).',
            'Run skrip atau installer rasmi tu dan pilih Install atau Repair (tekan Yes kalau Windows minta admin permission).',
            'Tunggu sampai proses install/repair tu habis.',
            'Balik ke Steam dan tekan Play.'
          ]
        },
        optionB: {
          code: 'OPTION B',
          title: 'VERIFY GAME FILES KAT STEAM',
          confirmBtn: 'Confirm Verify Fail Siap',
          completionMessage: 'VERIFY FAIL GAME SETTLE',
          fallbackWarning:
            'Kalau lepas verify pun masih sangkut error EAC, contact support rasmi The Isle—jangan guna installer pihak ketiga.',
          steps: [
            'Buka Steam Library.',
            'Right-click kat The Isle.',
            'Pilih Properties.',
            'Buka Installed Files.',
            'Tekan "Verify integrity of game files".',
            'Tunggu sampai Steam habis scan fail.',
            'Steam akan automatik ganti balik fail game yang hilang atau corrupt termasuk komponen EAC sekali.',
            'Dah siap verify, cuba launch The Isle balik.'
          ]
        }
      },
      troubleshooting: [
        {
          code: 'MASALAH 01',
          title: 'Easy Anti-Cheat Tak Install',
          action:
            'Check folder game kat PC untuk cari installer rasmi EAC (Option A). Kalau takde juga, verify game files kat Steam (Option B).'
        },
        {
          code: 'MASALAH 02',
          title: 'Fail Installer EAC Hilang',
          action: 'Guna "Verify integrity of game files" kat Steam (Properties → Installed Files) biar Steam download balik fail yang hilang.'
        },
        {
          code: 'MASALAH 03',
          title: 'Install EAC Asyik Fail',
          action: 'Restart Steam dulu, verify game files, lepas tu run balik installer rasmi dengan admin permission.'
        },
        {
          code: 'MASALAH 04',
          title: 'Game Masih Tak Boleh Masuk',
          action:
            'Tanya kat channel support rasmi The Isle dan tunjuk mesej error penuh. Jangan sesekali cuba bypass atau matikan Easy Anti-Cheat!'
        }
      ],
      troublePolicy:
        'Amaran Keras: Jangan bypass, disable, atau curi-curi matikan Easy Anti-Cheat, dan jangan download fail EAC dari site luar.',
      checklistHeading: 'CHECKLIST PERSEDIAAN STEAM & EAC',
      checklistCountSuffix: (done, total) => `${done} / ${total} Siap (Auto-Save)`,
      checklistNote:
        'Nota: Easy Anti-Cheat automatik bertanda siap bila korang dah confirm game boleh launch atau dah siap verify file kat Steam—tak payah install manual kalau game jalan elok.',
      checklistItems: {
        steamObtained: 'Dah dapat The Isle kat Steam',
        evrimaSelected: 'Dah tukar branch ke Evrima kat Steam Properties',
        filesDownloaded: 'Dah habis download semua fail game',
        eacChecked: 'Dah check status Easy Anti-Cheat',
        eacRepaired: 'Dah repair EAC kalau perlu (skip kalau Steam dah settlekan)',
        filesVerified: 'Dah verify game files kalau perlu',
        gameLaunched: 'The Isle: Evrima dah berjaya masuk menu'
      }
    },
    welcome: {
      introTitle: 'Welcome ke The Isle & Evrima',
      introBody:
        'The Isle ni game survival dinosaur open-world. Evrima tu branch utama yang aktif sekarang dengan mekanik baru, dino baru, dan update berterusan. Kem 3D ni guide korang step-by-step sebelum korang masuk server komuniti.',
      purposeTitle: 'Kenapa Kena Pusing Kem Ni?',
      purposeBody:
        'Daripada korang pening cari link merata, singgah je lima stesen kat sini (atau pakai Teleport) untuk install Evrima kat Steam, check Easy Anti-Cheat, tengok senarai komuniti verified, dan habiskan checklist akhir.',
      pcTitle: 'Spec PC Asas Biar Ngam',
      pcItems: [
        'Windows 64-bit dengan kad grafik dedicated DirectX 11/12 yang elok',
        'CPU quad-core ke atas dan 16 GB RAM memang digalakkan biar tak sangkut',
        'SSD dengan ruang kosong cukup untuk download dengan update Evrima',
        'Internet stabil untuk main multiplayer dan jalankan Easy Anti-Cheat'
      ],
      steamSpecsLink: 'Check Spec Rasmi Penuh Kat Steam Store ↗',
      destinationsTitle: 'Enam Stesen Dalam Kem Ni',
      destinationCards: [
        { id: 'welcome-centre', code: '01', name: 'Pusat Welcome', desc: 'Intro Evrima, spec PC asas, dengan cara kawal.' },
        { id: 'steam-station', code: '02', name: 'Terminal Steam & EAC', desc: '10 step install Steam, tukar branch Evrima, dan check EAC.' },
        { id: 'community-outpost', code: '03', name: 'Port Komuniti', desc: 'Senarai komuniti verified dengan link Discord & rules akses.' },
        { id: 'companion-station', code: '04', name: 'Meja Companion App', desc: 'Panduan app tambahan yang official dengan tips elak scam.' },
        { id: 'expedition-departure', code: '05', name: 'Pintu Pelepasan', desc: 'Checklist last sebelum korang terjun masuk server.' },
        { id: 'survival-training', code: '06', name: 'Kem Latihan Survival', desc: 'Kem dinding kayu & unggun api dengan manual survival Evrima penuh.' }
      ],
      jumpBtn: 'Pergi Stesen →',
      navTitle: 'Cara Gerak Kat Kem',
      navDesktop: 'PC: WASD / Arrow untuk jalan • Space untuk lompat • Shift untuk lari • Mouse untuk pusing • E untuk tekan • ESC untuk tutup panel.',
      navMobile: 'Phone / Touch: Joystick kiri untuk jalan • Swipe skrin untuk pusing kamera • Tap button [E] bila dah dekat stesen.',
      startBtn: 'JOM MULA EKSPEDISI',
      nameLabel: 'NAMA SURVIVOR KORANG',
      namePlaceholder: 'Masukkan nama korang untuk sesi ni...',
      nameRequired: 'Masukkan nama korang dulu bro sebelum masuk kem!',
      objectiveDefault: 'Welcome {name}! Pusing-pusing kem dan pergi mana-mana stesen jap.',
      goSteamBtn: 'Terus ke Stesen Steam →',
      reviewedBadge: '✓ ORIENTASI DAH CHECK'
    },
    community: {
      intro:
        'Tengok senarai komuniti verified yang tarik terus dari serverDirectory.js. Link Discord rasmi dan rules yang admin sahkan je keluar kat sini.',
      searchPlaceholder: 'Cari nama komuniti atau info...',
      filterAll: 'Semua Komuniti',
      filterUnrestricted: 'Terbuka / Bukan 18+',
      filterAge18: 'Had Umur 18+',
      filterCompanion: 'Ada Companion App',
      emptyState: 'Tak jumpa komuniti yang ngam dengan carian atau filter korang.',
      ageGateLabel: 'HAD UMUR DEWASA 18+',
      ageGatePrompt:
        'Komuniti ni khusus untuk 18 tahun ke atas je. Sahkan dulu umur korang sebelum button join dibuka:',
      confirmAdultBtn: 'Ya, saya 18 tahun ke atas',
      confirmUnderageBtn: 'Saya bawah 18 tahun',
      underageBlocked:
        'Akses Disekat: IsleLink ni komuniti 18+ sahaja. Link dengan button join memang disembunyikan untuk pengguna bawah umur.',
      resetAgeBtn: 'Tukar pengesahan umur',
      verifiedSourceTag: 'DISCORD RASMI SAHAJA',
      noWebsiteTag: 'Website: Tak pakai (Discord sumber rasmi)',
      noCompanionTag: 'Companion App: Memang takde kat sini',
      companionTag: (val) => `Companion App: ${val}`,
      regionTag: (val) => `Region: ${val || 'Check dalam Discord rasmi'}`,
      openDiscordBtn: 'BUKA DISCORD ↗',
      companionDownloadBtn: 'DOWNLOAD COMPANION ↗',
      websiteBtn: 'WEBSITE ↗',
      serverInfoBtn: 'INFO SERVER',
      companionAppBtn: 'COMPANION APP',
      serverInfoTitle: 'Polisi Info Server Sahih',
      serverInfoBody:
        'Rules server, announcement, dengan cara connect semua diuruskan admin dalam Discord rasmi. IP server, jumlah player, slot, atau setting pelik-pelik memang tak direka kat sini—check terus kat Discord rasmi diaorang.',
      companionPanelTitle: 'Step Companion Application (Ikut Discord Rasmi Je)',
      companionWarning:
        'Sumber Rasmi Je: Jangan sesekali download installer dari website luar. Guna download yang admin Obsidian Isle sendiri post kat Discord rasmi diaorang.',
      markReviewedBtn: 'Tanda Direktori Komuniti Dah Check',
      reviewedBadge: '✓ DIREKTORI KOMUNITI DAH CHECK'
    },
    companion: {
      intro:
        'Companion app tolong player Primeval Malaysia check peta dengan koordinasi geng. Guna link rasmi je ya—kitaorang main kat banyak server, tapi dua server utama ialah IsleLink dengan Obsidian Isle.',
      islelinkTitle: 'IsleLink Companion App (Server Utama #1)',
      islelinkDesc: 'Link rasmi download companion app IsleLink (islelink.gg/download). Kena sahkan umur 18+ dulu ikut rules server.',
      islelinkDownloadBtn: 'DOWNLOAD ISLELINK COMPANION ↗',
      islelinkAgeNote: 'IsleLink ni server 18+. Sahkan umur korang dulu sebelum nampak link download rasmi:',
      islelinkUnderage: 'Akses Disekat: Link IsleLink (18+) memang disembunyikan untuk bawah umur.',
      confirm18: 'Ya, saya 18 tahun ke atas',
      confirmUnder18: 'Saya bawah 18 tahun',
      obsidianTitle: 'Obsidian Isle Companion (Server Utama #2)',
      obsidianDesc: 'Admin Obsidian Isle post companion app diaorang dalam Discord rasmi je—jangan download dari luar.',
      obsidianDiscordBtn: 'BUKA DISCORD OBSIDIAN ↗',
      safetyTitle: 'Langkah Selamat & Setup',
      safetyItems: [
        'Download IsleLink Companion dari https://islelink.gg/download je, dan companion Obsidian terus dalam Discord rasmi diaorang.',
        'Jangan sesekali run fail "EAC bypass" atau tool scam pihak ketiga.',
        'Pastikan fail Steam dengan Easy Anti-Cheat elok sebelum masuk server komuniti.'
      ],
      markReviewedBtn: 'Tanda Panduan Companion Dah Faham',
      reviewedBadge: '✓ COMPANION DAH CHECK'
    },
    departure: {
      intro:
        'Habiskan semua 11 checklist kat bawah ni sebelum terjun masuk Pulau Gateway. Progress auto-sync dengan stesen lain!',
      heading: 'CHECKLIST AKHIR PERSEDIAAN EKSPEDISI (11 PERKARA)',
      items: {
        steamObtained: 'Dah dapat The Isle kat Steam',
        evrimaSelected: 'Dah pilih branch Evrima dalam Steam Properties',
        filesDownloaded: 'Dah habis download semua fail game',
        eacChecked: 'Dah check pemasangan Easy Anti-Cheat',
        eacRepaired: 'Dah repair EAC kalau perlu (skip kalau Steam settlekan)',
        filesVerified: 'Dah verify game files kat Steam kalau perlu',
        gameLaunched: 'The Isle: Evrima dah berjaya masuk game',
        communityReviewed: 'Dah check info komuniti (IsleLink, Obsidian Isle, Noctua Isle, Dino Den)',
        companionReviewed: 'Dah check / download companion app dari sumber rasmi',
        rulesReviewed: 'Dah faham rules komuniti dengan Peta Gateway / Legends',
        readyToExplore: 'Memang ready nak terjun ke The Isle: Evrima!'
      },
      eacPolicyNote:
        'Peringatan: Jangan pakai installer EAC luar—guna Steam Verify Files atau installer rasmi dalam folder game je kalau sangkut.',
      completeTitle: 'PERSEDIAAN EKSPEDISI COMPLETE!',
      completeTagline: 'ADVENTURE KORANG KAT THE ISLE MULA KAT SINI.',
      completeBody:
        'Padu gila bro! Semua benda teknikal, komuniti, dengan ilmu survival dah settle. Good luck kat Gateway—jaga sungai dan jaga stamina!',
      returnBtn: 'SAMBUNG JALAN KAT KEM',
      visitSurvivalBtn: 'Pergi Kem Latihan Survival →'
    }
  }
};

export function getLocaleBundle(lang = 'en') {
  return LOCALES[lang] || LOCALES.en;
}
