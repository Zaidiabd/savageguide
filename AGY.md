Read the entire AGY.md file in the project root before making any changes.

Treat it as the authoritative project specification. Follow all requirements, development milestones, technical architecture, visual direction and acceptance criteria.

Do not omit or silently modify any requirements.

When implementing new features or revisions, preserve existing functionality and update AGY.md whenever the project specification changes.

Begin by inspecting the workspace and executing the development milestones in the specified order.

# MASTER DEVELOPMENT SPECIFICATION
# THE ISLE — EXPEDITION
### Interactive 3D Player Onboarding Experience

**Project Type:** Browser-based interactive 3D application  
**Development Environment:** Google Antigravity + Gemini Agent Mode  
**Technologies:** HTML5, CSS3, JavaScript ES Modules, Three.js  
**Primary Platform:** Desktop Web Browser

---

# 1. PROJECT OBJECTIVE

Develop a complete, interactive 3D onboarding experience for new players of The Isle: Evrima.

The application must feature a realistic prehistoric environment that users can physically explore.

Instead of navigating conventional website pages, users enter a prehistoric expedition outpost and visit interactive stations to learn about:

1. The Isle and Evrima.
2. Downloading and installing the game through Steam.
3. Community server information.
4. Companion applications.
5. Final preparation before playing.

The 3D environment must serve as the primary navigation interface.

Users must be able to walk around, approach buildings, interact with objects, open information panels and follow guided tutorials.

This must be a fully functional application, not a static mockup or decorative 3D landing page.

# 2. DESIGN AND VISUAL DIRECTION

## Project identity

**THE ISLE — EXPEDITION**

Tagline:

YOUR JOURNEY INTO THE ISLE BEGINS HERE.

Visual concept:

A realistic prehistoric research outpost surrounded by lush Mesozoic vegetation.

Visual references should combine the atmosphere of a natural-history documentary with the environmental presentation of modern survival games.

Use:
- Realistic prehistoric vegetation.
- Dense ferns and cycads.
- Coniferous trees.
- Natural terrain formations.
- Atmospheric fog.
- Natural sunlight and shadows.
- Wooden research structures.
- Weathered equipment.
- Natural pathways.
- Environmental storytelling.

Avoid:
- Low-poly cartoon graphics.
- Neon colour schemes.
- Excessive futuristic holograms.
- Generic corporate dashboard aesthetics.
- Excessive floating UI elements.

Colour palette:
- Forest green.
- Earth brown.
- Weathered timber.
- Natural stone grey.
- Muted olive.
- Warm sunlight.
- Dark neutral interface surfaces.

# 3. PREHISTORIC ENVIRONMENT

Create a compact, explorable prehistoric research outpost.

The environment must contain five primary destinations.

## LOCATION 01 — CENTRAL EXPEDITION CAMP

The central starting location.

Include:
- Wooden research buildings.
- Expedition noticeboard.
- Equipment crates.
- Research equipment.
- Wooden signboards.
- Camp lighting.
- Small pathways.
- Surrounding prehistoric vegetation.

Functions:
- Welcome message.
- Introduction to the experience.
- Navigation instructions.
- Expedition map.
- Access to all tutorial destinations.

## LOCATION 02 — STEAM INSTALLATION STATION

A small research workstation containing an interactive computer terminal.

Purpose: Guide new players through installing The Isle: Evrima.

## LOCATION 03 — COMMUNITY OUTPOST

A wooden information board displaying available community information.

Purpose: Introduce the two community destinations and their respective information sources.

## LOCATION 04 — COMPANION APPLICATION STATION

A dedicated computer workstation explaining companion applications and their installation procedures.

Purpose: Direct users to verified application information and official distribution sources.

## LOCATION 05 — EXPEDITION DEPARTURE

A wooden expedition gate or pathway leading deeper into the prehistoric forest.

Purpose:
- Final preparation checklist.
- Onboarding completion.
- Final instructions.

## Environmental details

Populate the environment with:
- Ferns.
- Cycads.
- Conifers.
- Bushes.
- Grass.
- Rocks.
- Fallen trees.
- Small streams.
- Ponds.
- Natural elevation.
- Environmental debris.

Use procedural placement, variation and instancing.

Do not include dinosaurs in this initial release. The focus is the prehistoric environment and player onboarding experience.

# 4. PLAYER NAVIGATION

Implement first-person navigation using Three.js PointerLockControls.

Controls:

W — Forward  
S — Backward  
A — Left  
D — Right  
Mouse — Look around  
E — Interact  
SHIFT — Sprint  
ESC — Release mouse  
M — Toggle minimap

Implement:
- Smooth movement.
- Mouse-look.
- Ground detection.
- Gravity.
- Collision detection.
- Configurable movement speed.
- Sprint functionality.
- Interaction distance detection.

Prevent the player from walking through buildings, large rocks and solid structures.

Display an interaction prompt when approaching an interactive object:

[ E ] INTERACT

Provide a welcome screen explaining controls before entering the world.

Provide an alternative navigation menu for users who prefer selecting destinations directly.

# 5. INTERACTIVE DESTINATIONS

## DESTINATION 01 — WELCOME CENTRE

Include:
- Welcome to The Isle.
- Introduction to Evrima.
- Purpose of the onboarding experience.
- Basic PC requirements.
- Explanation of the five destinations.
- Navigation instructions.

Include a START EXPEDITION button.

## DESTINATION 02 — STEAM INSTALLATION STATION

Official Steam store:

https://store.steampowered.com/app/376210/The_Isle/

Create a complete step-by-step installation tutorial.

### Step 1 — Obtain the game

Explain how to access The Isle through Steam.

### Step 2 — Open Steam Library

Explain how to locate The Isle.

### Step 3 — Access Properties

Right-click The Isle and select Properties.

### Step 4 — Access Game Versions

Navigate to the Betas or Game Versions section.

### Step 5 — Select Evrima

Explain how to select the Evrima branch where available.

### Step 6 — Download required files

Allow Steam to download or update the necessary files.

### Step 7 — Launch the game

Explain how to launch the game and verify the installed version.

Requirements:
- Numbered instructions.
- Genuine illustrative screenshots.
- Previous and Next buttons.
- Progress indicator.
- Completion checklist.
- Official Steam link.

Never fabricate screenshots. Keep instructional content editable.

## DESTINATION 03 — COMMUNITY OUTPOST

This is a major component of the application.

Create a dedicated community directory containing two initial community entries.

The directory must have a professional visual presentation with separate cards for each community.

### COMMUNITY 01 — ISLELINK

Community name:

ISLELINK

Community Discord:

https://discord.gg/islelink

Purpose:

Provide community information and identify the official Discord as the community information source.

IMPORTANT:
- Use the Discord invitation instead of the IsleLink website.
- Do not present an IsleLink companion application download.
- Do not invent additional download URLs.
- Clearly display the published 18+ community restriction.
- Do not expose a join action to underage users.
- Keep age restrictions and community information visible and accurate.

### COMMUNITY 02 — OBSIDIAN ISLE

Community name:

OBSIDIAN ISLE

Official Discord:

https://discord.gg/4CKwnyJ72C

Companion application:

Distributed through the Obsidian Isle Discord community.

Instructions:

1. Open the official community Discord.
2. Review community announcements.
3. Locate the companion application download published by administrators.
4. Follow the published installation instructions.
5. Review server rules and connection requirements.

Include:
- Community information.
- OPEN DISCORD button.
- SERVER INFORMATION button.
- COMPANION APPLICATION button.

The companion application button must direct users to the official Discord source.

Do not invent:
- Server IP addresses.
- Player population.
- Player capacity.
- Gameplay settings.
- Server features.
- Direct download URLs.

Only display information verified by community administrators.

### COMMUNITY DIRECTORY FUNCTIONALITY

The directory must support:
- Multiple community entries.
- Individual community cards.
- Search.
- Filtering.
- Region information when verified.
- Community descriptions when verified.
- Discord links.
- Companion application information.
- Age restriction notices where applicable.

Use a separate JavaScript configuration file.

Adding a new community must not require modifying the entire application.

Example data structure:

const communities = [
  {
    id: "islelink",
    name: "IsleLink",
    discord: "https://discord.gg/islelink",
    website: null,
    companionApp: null,
    ageRestriction: "18+",
    accessNotice: "Adults only"
  },
  {
    id: "obsidian-isle",
    name: "Obsidian Isle",
    discord: "https://discord.gg/4CKwnyJ72C",
    companionApp: "Distributed through Discord",
    ageRestriction: null
  }
];

Do not expose restricted community access actions to underage users.

## DESTINATION 04 — COMPANION APPLICATION STATION

Purpose:

Introduce companion applications used by The Isle: Evrima communities.

Display:
- Application name.
- Description.
- Supported features.
- Official distribution source.
- Download instructions.
- Installation checklist.
- Troubleshooting information.

For Obsidian Isle:

Official distribution source:

https://discord.gg/4CKwnyJ72C

Explain that the application is distributed through its Discord community.

Do not fabricate download URLs.

Do not automatically download or execute installers.

Clearly distinguish official sources from third-party downloads.

## DESTINATION 05 — EXPEDITION DEPARTURE

Create a final preparation checklist.

Checklist:

[ ] The Isle obtained through Steam.

[ ] Evrima branch selected.

[ ] Game successfully launched.

[ ] Community information reviewed.

[ ] Relevant companion application installed from its official source.

[ ] Community rules reviewed.

[ ] Ready to explore.

Display:

EXPEDITION PREPARATION COMPLETE

YOUR JOURNEY INTO THE ISLE BEGINS HERE.

Include a RETURN TO EXPEDITION button.

# 6. INFORMATION PANEL SYSTEM

All interactive stations must open a professional information panel.

Design:
- Dark translucent background.
- Subtle blur.
- Clean typography.
- Large section heading.
- Step-by-step content.
- Relevant images.
- External links.
- Close button.
- Scrollable content.

Interactions:
- ESC closes the panel.
- Previous and Next navigation.
- Scrollable tutorial content.
- Responsive layout.
- External links open safely in a new tab.

Maintain consistent visual styling.

# 7. USER INTERFACE

TOP LEFT:
- THE ISLE — EXPEDITION logo.
- Current destination.

TOP RIGHT:
- Minimap.
- Controls reference.
- Sound toggle.
- Settings.

BOTTOM CENTRE:
- Interaction prompt.

BOTTOM LEFT:
- Current objective.
- Navigation hint.
- Expedition progress.

The interface must remain unobtrusive.

# 8. TECHNICAL ARCHITECTURE

Use:
- HTML5.
- CSS3.
- JavaScript ES Modules.
- Three.js.
- PointerLockControls.
- GLTFLoader.
- Raycasting.
- LocalStorage.
- InstancedMesh.
- Vite.

Project structure:

THE-ISLE-EXPEDITION/

├── index.html
├── package.json
├── vite.config.js
│
├── css/
│   ├── main.css
│   ├── environment.css
│   └── interface.css
│
├── js/
│   ├── main.js
│   ├── core/
│   │   ├── scene.js
│   │   ├── camera.js
│   │   ├── player.js
│   │   ├── world.js
│   │   └── interaction.js
│   │
│   ├── systems/
│   │   ├── navigation.js
│   │   ├── collision.js
│   │   ├── tutorial.js
│   │   ├── progress.js
│   │   └── minimap.js
│   │
│   ├── data/
│   │   ├── serverDirectory.js
│   │   └── tutorialContent.js
│   │
│   └── ui/
│       ├── interface.js
│       └── controlPanel.js
│
└── assets/
    ├── models/
    ├── textures/
    ├── images/
    └── audio/

Maintain logical separation between rendering, navigation, tutorial content and UI.

# 9. PERFORMANCE REQUIREMENTS

Implement:
- Efficient geometry.
- Instanced vegetation.
- Shared materials.
- Texture optimisation.
- Shadow optimisation.
- Frustum culling.
- Appropriate pixel ratio limits.
- Lazy loading.
- Configurable graphics settings.

Target stable 60 FPS on reasonably capable desktop hardware.

Gracefully reduce quality on weaker systems.

# 10. RESPONSIVENESS

Desktop is the primary platform.

Provide:
- Responsive information panels.
- Touch-friendly controls.
- Alternative destination navigation for mobile.
- Fallback when pointer lock is unavailable.

# 11. DEVELOPMENT MILESTONES

Development must proceed sequentially.

## MILESTONE 1 — 3D ENVIRONMENT

Highest priority.

Implement:
1. Three.js scene.
2. Camera.
3. Renderer.
4. Terrain.
5. Prehistoric vegetation.
6. Research outpost buildings.
7. Natural lighting.
8. Atmospheric fog.
9. Environmental composition.

Acceptance criteria:
- Environment renders correctly.
- Convincing depth.
- Cohesive composition.
- Functional camera.
- No major console errors.

Do not proceed until the environment works.

## MILESTONE 2 — PLAYER NAVIGATION

Implement:
- WASD.
- Mouse-look.
- Collision detection.
- Ground detection.
- Gravity.
- Sprint.
- Interaction detection.
- Interaction prompts.

Acceptance criteria:
- Movement works.
- Camera rotation works.
- Collision works.
- Player cannot pass through major structures.

## MILESTONE 3 — INTERACTIVE DESTINATIONS

Implement all five destinations.

Every destination must be accessible through physical exploration and alternative navigation.

All stations must open their appropriate information panels.

## MILESTONE 4 — TUTORIAL AND COMMUNITY CONTENT

Implement:
- Complete Steam tutorial.
- IsleLink community listing with appropriate age restriction handling.
- Obsidian Isle community listing.
- Discord integration.
- Companion application information.
- Final preparation checklist.
- Tutorial progress tracking.

Test all permitted external links.

Verify all community information.

## MILESTONE 5 — INTERFACE AND POLISHING

Implement:
- Welcome screen.
- Minimap.
- Controls reference.
- Settings panel.
- Progress indicator.
- Ambient sound.
- Environmental animations.
- Responsive panels.
- Graphics settings.

Improve visuals without breaking functionality.

## MILESTONE 6 — OPTIMISATION AND TESTING

Test:
- Initial loading.
- Movement.
- Mouse controls.
- Collision.
- All interactive destinations.
- Information panels.
- External links.
- Checklist.
- LocalStorage.
- Mobile fallback.
- Console errors.
- Performance.

Fix all major issues.

# 12. IMPLEMENTATION PRIORITIES

Follow this exact order.

**PRIORITY 1 — FUNCTIONAL 3D ENVIRONMENT**

Create an explorable prehistoric environment first.

Do not spend excessive time designing panels before the 3D environment works.

**PRIORITY 2 — NAVIGATION**

Make player movement and interaction reliable.

**PRIORITY 3 — TUTORIAL FUNCTIONALITY**

Implement all five destinations with complete information.

Do not create decorative buildings with non-functional prompts.

**PRIORITY 4 — COMMUNITY INTEGRATION**

Implement both IsleLink and Obsidian Isle directory entries, with the correct Discord sources and appropriate access restrictions.

**PRIORITY 5 — VISUAL QUALITY**

Refine vegetation, buildings, lighting, textures and atmosphere.

**PRIORITY 6 — OPTIMISATION**

Improve performance and ensure stable operation.

Never sacrifice core functionality for decorative effects.

# 13. AGENT MODE EXECUTION INSTRUCTIONS

Act as the lead frontend developer and 3D environment engineer.

You are authorised to create, modify and organise files inside the active project workspace.

Do not merely explain how to implement the project.

Execute the development tasks directly.

Follow these rules:

1. Inspect the active workspace.
2. Establish the complete project structure.
3. Implement one milestone at a time.
4. Run the application after meaningful changes.
5. Inspect browser output and console errors.
6. Test actual functionality.
7. Fix errors before implementing dependent features.
8. Preserve working functionality.
9. Do not replace functional systems with static mockups.
10. Do not leave buttons or controls non-functional.
11. Do not fabricate community information.
12. Do not invent unavailable assets or download sources.
13. Use suitable licensed assets or procedural substitutes.
14. Document important implementation decisions.
15. Maintain clean, maintainable code.

At the end of every milestone, provide a report containing:

- Features completed.
- Files created or modified.
- Testing performed.
- Outstanding issues.
- Next implementation stage.

Do not claim completion unless functionality has been tested.

# 14. FINAL ACCEPTANCE CRITERIA

The application is complete only when:

1. It launches through the local development server.
2. The prehistoric 3D environment renders.
3. WASD and mouse navigation work.
4. Collision detection works.
5. All five destinations exist.
6. All destinations are interactive.
7. Information panels display correct content.
8. Steam installation instructions are accessible.
9. IsleLink community information is displayed with appropriate age restriction handling.
10. Obsidian Isle community information is accessible.
11. Discord sources are correct.
12. Companion application instructions are available.
13. Tutorial progress is saved.
14. Minimap works.
15. Settings controls work.
16. Application is visually coherent.
17. No major JavaScript errors remain.
18. Performance is acceptable on desktop browsers.

# 15. IMMEDIATE EXECUTION COMMAND

BEGIN DEVELOPMENT NOW.

Act as the lead developer.

Inspect the workspace.

Establish the project structure.

Start with MILESTONE 1: 3D ENVIRONMENT.

Create the actual implementation files.

Run the application.

Inspect the rendered result.

Correct visual and technical problems.

Once MILESTONE 1 passes its acceptance criteria, proceed to MILESTONE 2.

Continue sequentially through all remaining milestones.

Do not stop at an architecture proposal, development plan or initial code sample.

The objective is to deliver the complete working application inside the active Antigravity workspace.

FINAL PROJECT IDENTITY:

THE ISLE — EXPEDITION

YOUR JOURNEY INTO THE ISLE BEGINS HERE.


# PROJECT REVISION — THE ISLE: EXPEDITION
## ADDITION: EASY ANTI-CHEAT (EAC) INSTALLATION AND TROUBLESHOOTING

### INSTRUCTION TO ANTIGRAVITY

Modify the existing THE ISLE — EXPEDITION project.

Do not rebuild the application from scratch.

Preserve all existing functionality, visual design, 3D environment, navigation systems, community directory, tutorial panels and project architecture.

Integrate a new Easy Anti-Cheat (EAC) installation tutorial into:

DESTINATION 02 — STEAM INSTALLATION STATION.

This tutorial must become a mandatory section of the game preparation walkthrough.

---

# 1. UPDATE THE STEAM INSTALLATION WORKFLOW

Reorganise the existing Steam tutorial into the following sequence:

STEP 01 — Obtain The Isle through Steam.

STEP 02 — Locate The Isle in Steam Library.

STEP 03 — Access Game Properties.

STEP 04 — Select the Evrima game branch.

STEP 05 — Download and install the game files.

STEP 06 — Understand Easy Anti-Cheat.

STEP 07 — Install or repair Easy Anti-Cheat if necessary.

STEP 08 — Verify game files.

STEP 09 — Launch The Isle: Evrima.

STEP 10 — Confirm successful installation.

Each step must have its own instructional panel.

Include:
- Step numbering.
- Relevant screenshots or illustrations.
- Previous and Next navigation.
- Tutorial progress indicator.
- Completion checklist.

# 2. NEW TUTORIAL — UNDERSTANDING EASY ANTI-CHEAT

Explain:

Easy Anti-Cheat (EAC) is the anti-cheat component used by The Isle: Evrima.

It is bundled with the game's installation files through Steam.

Users generally do not need to download a separate EAC installer from an external website.

Steam normally handles the required installation components.

Display an informational notice:

"Easy Anti-Cheat is included with The Isle: Evrima. A separate download is normally unnecessary. If the game reports that EAC is missing or not installed, follow the repair instructions below."

# 3. METHOD 1 — RUN THE LOCAL EAC INSTALLER

Create a detailed instructional walkthrough.

STEP 01:
Open Steam Library.

STEP 02:
Right-click The Isle.

STEP 03:
Select Properties.

STEP 04:
Navigate to Installed Files.

STEP 05:
Click Browse to open the local game installation directory.

STEP 06:
Locate the Easy Anti-Cheat installation files.

Depending on the installed game build, relevant files may include:

- InstallAntiCheat.bat
- EasyAntiCheat folder
- EasyAntiCheat_Setup.exe

IMPORTANT:

Do not assume every game installation contains these exact filenames or directory structures.

The application must explain that file names and locations may differ between game builds.

STEP 07:
If an official EAC installation or repair script is present in the game's installation directory, follow its instructions.

If an installer executable is provided, run the official game-bundled installer and select Install or Repair where available.

If elevated permissions are required, Windows may request administrator approval.

Only use files located in the verified official game installation directory.

Never direct users to download replacement EAC executables or batch files from unofficial websites.

STEP 08:
Wait for the installation or repair process to complete.

STEP 09:
Return to Steam and launch The Isle.

Display a completion message:

"EAC INSTALLATION CHECK COMPLETE"

If the relevant installer is missing, instruct users to proceed to Method 2.

# 4. METHOD 2 — VERIFY GAME FILES THROUGH STEAM

Create a second repair walkthrough.

STEP 01:
Open Steam Library.

STEP 02:
Right-click The Isle.

STEP 03:
Select Properties.

STEP 04:
Open Installed Files.

STEP 05:
Select Verify integrity of game files.

STEP 06:
Wait for Steam to complete the verification process.

STEP 07:
Steam will identify and replace missing or corrupted game files, including bundled anti-cheat components where applicable.

STEP 08:
Once verification is complete, launch The Isle again.

Display:

"GAME FILE VERIFICATION COMPLETE"

If the EAC error persists, advise users to consult the official game support channels rather than downloading unofficial anti-cheat installers.

# 5. VISUAL PRESENTATION

The EAC tutorial must have its own dedicated information panel.

Visual concept:

A military-style equipment verification terminal located inside the expedition research workstation.

Panel title:

EASY ANTI-CHEAT
SYSTEM VERIFICATION

Subtitle:

"Ensuring your game installation is ready."

Include two clearly separated options:

OPTION A — LOCAL INSTALLER / REPAIR

Show:
- Steam Library navigation.
- Game installation directory.
- Relevant installer file examples.
- Installation and repair instructions.

OPTION B — VERIFY GAME FILES

Show:
- Steam Properties.
- Installed Files.
- Verify integrity of game files.
- Expected verification process.

Use:
- Numbered instructional cards.
- Screenshots or accurate illustrations.
- Clear navigation.
- Warning notices where necessary.
- Completion status.

Do not fabricate screenshots.

If genuine screenshots are unavailable, use clearly labelled interface illustrations.

# 6. UPDATE THE FINAL PREPARATION CHECKLIST

Modify the existing Expedition Departure checklist.

New checklist:

[ ] The Isle obtained through Steam.

[ ] Evrima branch selected.

[ ] Game files downloaded successfully.

[ ] Easy Anti-Cheat installation checked.

[ ] EAC repaired if required.

[ ] Game file verification completed if necessary.

[ ] The Isle successfully launched.

[ ] Community information reviewed.

[ ] Relevant companion application installed from its official source.

[ ] Community rules reviewed.

[ ] Ready to explore.

EAC should be marked as checked after the user confirms that the game launches successfully or that the anti-cheat installation has been verified.

Do not force users to manually install EAC when Steam has already installed the required components.

# 7. TROUBLESHOOTING PANEL

Add a small troubleshooting section.

Common issues:

ISSUE 01 — Easy Anti-Cheat Not Installed

Recommended action:
Check the local game installation directory for the official EAC installer. If unavailable, verify the game files through Steam.

ISSUE 02 — EAC Installer Missing

Recommended action:
Use Steam's Verify integrity of game files function.

ISSUE 03 — EAC Installation Fails

Recommended action:
Restart Steam, verify game files and retry the official installation or repair process.

ISSUE 04 — Game Still Cannot Launch

Recommended action:
Consult The Isle's official support resources and provide the exact error message.

Do not recommend bypassing, disabling or circumventing Easy Anti-Cheat.

# 8. DEVELOPMENT REQUIREMENTS

Integrate this tutorial into the existing modular tutorialContent.js file.

Do not duplicate the Steam Installation Station.

Maintain the existing information panel design.

Ensure:
- All steps are accessible.
- Previous and Next buttons work.
- Progress tracking works.
- The final checklist includes EAC.
- The content is readable on desktop and mobile.
- All tutorial navigation works.
- No existing functionality is broken.

# 9. TESTING AND ACCEPTANCE CRITERIA

The revision is complete when:

1. The Steam tutorial includes the EAC section.
2. The bundled nature of EAC is explained.
3. The local installer/repair method is documented.
4. Steam file verification is documented.
5. Missing installer scenarios are covered.
6. The troubleshooting section works.
7. The final checklist includes EAC.
8. All tutorial buttons work.
9. No unofficial EAC downloads are linked.
10. Existing application functionality remains intact.

After implementation, run the application and test the entire Steam installation tutorial from beginning to end.

Do not replace the existing project.

Modify the existing project and preserve all previous requirements.

---

# PROJECT REVISION — PRIMEVAL MALAYSIA WELCOME GUIDE & ENVIRONMENT ADDITIONS

## ADDITION 1 — ANTHROPOMORPHIC DINOSAUR GUIDE: SAVAGEZED
- Render an anthropomorphic dinosaur NPC named **SavageZed** near Central Expedition Camp (`js/core/npc.js`).
- SavageZed greets players with a `[ E ] TALK TO SAVAGEZED` interaction prompt and opens a dedicated dialog box (`#npc-dialog`).
- Dialog includes a polite, cheerful welcome to **Primeval Malaysia Community** and interactive guidance explaining what players can do across the five outpost destinations.

## ADDITION 2 — RANDOM MALAYSIAN FLAGS
- Randomly place Malaysian flagpoles (Jalur Gemilang: 14 stripes, blue canton, yellow crescent & 14-point star) around the outpost clearings with gentle wind-wave animation and pole collision, avoiding paths, stations, and the pond.