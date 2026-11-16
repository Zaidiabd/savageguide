# Development Log — THE ISLE — EXPEDITION (`savageguide`)

**Live URL:** https://zaidiabd.github.io/savageguide/  
**Repository:** https://github.com/Zaidiabd/savageguide  
**Last Updated:** 2026-11-16

---

## 1. Chronological Progress Summary

### Stage 1 — Skeleton Navigable 3D Environment
* **Scaffolded Vite + Three.js ES Module Project** matching the modular layout in `AGY.md`:
  * `package.json`, `vite.config.js`, `index.html`, `css/{main,environment,interface}.css`, `js/main.js`.
* **Core 3D Scene & Lighting (`js/core/scene.js`, `js/core/camera.js`):**
  * Misty Mesozoic forest atmosphere (`THREE.FogExp2`), hemisphere sky/ground light, and warm directional sunlight with soft shadows (`PCFSoftShadowMap`).
* **Prehistoric Outpost World (`js/core/world.js`):**
  * Shared procedural terrain heightfield (`getTerrainHeight`) with vertex-painted dirt trails, mossy forest floor, and a southwest pond.
  * Instanced forest (`THREE.InstancedMesh`) with conifers, ferns, and boulders.
  * Five distinct destination structures placed across the outpost:
    1. **Destination 01 — Welcome Centre & Noticeboard** (`(0, 0)`)
    2. **Destination 02 — Steam Installation Station** (`(-24, -14)`)
    3. **Destination 03 — Community Outpost** (`(24, -10)`)
    4. **Destination 04 — Companion Application Station** (`(20, 18)`)
    5. **Destination 05 — Expedition Departure Gate** (`(0, -36)`)
* **Navigation, Collision & Interactions (`js/core/player.js`, `js/systems/collision.js`, `js/core/interaction.js`, `js/systems/navigation.js`):**
  * `PointerLockControls` (`WASD` / Arrows, `SHIFT` sprint, mouse-look + drag fallback).
  * Terrain height clamping and XZ circle-vs-AABB wall-sliding collision.
  * Proximity + look-alignment + raycast `[E] INTERACT` trigger, Welcome Overlay, station preview modals, and top-right Quick Jump destination dropdown.

### Stage 2 — SavageZed NPC, Primeval Malaysia Welcome & Malaysian Flags
* **Added `js/core/npc.js`:**
  * Built procedural anthropomorphic dinosaur guide **SavageZed** near Central Expedition Camp (`(3.2, 6.8)`) with explorer vest, neckerchief, lantern pedestal, breathing, tail sway, head turn, and waving animations.
  * Added dedicated NPC Dialog Box (`#npc-dialog`) welcoming players to the **Primeval Malaysia Community** with interactive orientation guidance for all 5 stations.
  * Built procedural *Jalur Gemilang* canvas texture (14 stripes, blue canton, yellow crescent and 14-point star) on 9 randomly placed animated flagpoles around camp clearings.
* **Bug Fixes After Visual Inspection:**
  * Removed the crossroad signpost at `(2.6, 7.5)` that blocked the view/path in front of SavageZed, and widened flag exclusion clearance around SavageZed's approach point.
  * Fixed `NaN` vertex positions/normals in `buildFernGeometry()` (negative `y` input to `Math.pow`) that caused instanced ferns to render as black rectangles, reshaped them into tapered green fronds, and excluded ferns/trees/rocks from SavageZed's sightline.
* Updated `AGY.md` with the Primeval Malaysia guide & flag revision notes.

### Stage 3 — Destination 02: Steam & Easy Anti-Cheat Terminal (v1)
* **Added `js/systems/progress.js`:**
  * `localStorage` persistence (`the-isle-expedition-progress-v1`) tracking active Steam step, completed steps, EAC Option A/B completion flags, and checklist items.
* **Added `js/systems/tutorial.js` & expanded `js/data/tutorialContent.js`:**
  * Implemented the 4-tab Steam & EAC Terminal:
    * **Walkthrough (`STEP 01`–`STEP 10`):** Progress bar, clickable step pills, completion checkboxes, official Steam Store link (`https://store.steampowered.com/app/376210/The_Isle/`), and clearly labelled UI diagrams (*"INTERFACE ILLUSTRATION — NOT AN ACTUAL SCREENSHOT"*).
    * **EAC System Verification:** Military-style terminal panel detailing bundled EAC, **Option A — Local Installer / Repair** (9 steps + build-variance & official-directory warnings), and **Option B — Verify Game Files** (8 steps + official support fallback).
    * **Troubleshooting (`ISSUE 01`–`ISSUE 04`)** & **Checklist** (auto-checks EAC once launch or file verification is confirmed).

### Stage 4 — 3-Language Localization
* **Added `js/data/i18n.js`:**
  * Implemented live switching (saved in `localStorage`) between:
    * **English (`en`)**
    * **Bahasa Melayu (`ms`)**
    * **Kecek KL (`kl`)** — casual KL Malaysian gamer slang while keeping exact Steam/EAC menu names intact.
  * Wired language switchers on both the Welcome Overlay and top-right HUD, re-rendering HUD labels, SavageZed dialog, stations, and all Steam/EAC terminal tabs immediately.

### Stage 5 — Security Audit, GitHub Pages Deployment & Documentation
* **Security & Leak Check:**
  * Verified `npm audit --omit=dev` returned `0` vulnerabilities.
  * Scanned tracked project files for tokens, API keys, passwords, `.env` files, private IPs, and local paths — none found.
  * Confirmed external links use `target="_blank" rel="noopener noreferrer"` and `innerHTML` only renders static hardcoded locale/tutorial data.
  * Hardened `.gitignore` with `.env` and `.env.*`.
* **GitHub Pages CI/CD (`.github/workflows/deploy.yml`, `vite.config.js`):**
  * Configured `base: './'` in `vite.config.js` for GitHub Pages subpath hosting.
  * Configured `.github/workflows/deploy.yml` with `actions/configure-pages@v5`, `actions/upload-pages-artifact@v3`, and `actions/deploy-pages@v4`.
  * Verified live deployment at `https://zaidiabd.github.io/savageguide/` (`HTTP 200`).
* **Documentation:**
  * Wrote comprehensive `README.md` (`6ffe12f`).

### Stage 6 — Mobile-Friendly Controls & Responsive Layout
* **Touch Controls (`js/core/player.js`, `js/ui/interface.js`, `index.html`, `css/environment.css`):**
  * Added bottom-left multi-touch virtual thumbstick (with outer-ring auto-sprint) and bottom-right Sprint toggle pill (`SPRINT` / `PECUT` / `LARI`) on touch devices.
  * Added simultaneous canvas swipe-to-look (`touch-action: none` to prevent browser scrolling/pull-to-refresh).
  * Converted `#interact-prompt` into a tappable `<button>` so mobile players can tap directly to interact.
* **Responsive UI & Mobile Performance (`css/interface.css`, `js/core/scene.js`):**
  * Added `viewport-fit=cover`, `env(safe-area-inset-*)` padding, single-column terminal/diagram grids on `< 820px`, scrollable Welcome/dialog cards on short viewports, and capped mobile pixel ratio (`1.5`) + shadow map (`1024×1024`).

### Stage 7 — Spec Recovery & Log
* Restored `AGY.md` from commit `6ffe12f` after it was removed in remote commit `3d7a980`.
* Created this `LOG.md` file summarizing all completed work (`a8b3295`).

### Stage 8 — Destination 01 (Welcome Centre) & Destination 03 (Community Outpost)
* **Added `js/data/serverDirectory.js`:** Modular verified community directory config with **IsleLink** (`https://discord.gg/islelink`, `18+` Adults Only, `website: null`, `companionApp: null`) and **Obsidian Isle** (`https://discord.gg/4CKwnyJ72C`, `"Distributed through Discord"`, 5-step companion instructions).
* **Added `js/systems/destinations.js`:**
  * `WelcomeStationController` (Destination 01): *The Isle* & Evrima intro, onboarding purpose, basic PC readiness guidelines + official Steam Store link, interactive 5-destination cards with direct station jump buttons, desktop/mobile navigation instructions, and `START EXPEDITION` CTA.
  * `CommunityDirectoryController` (Destination 03): Search input, category filters (`All`, `Open / No 18+`, `18+ Restricted`, `Has Companion App`), strict 18+ age-verification gate on IsleLink (hides Discord/join actions unless confirmed 18+, blocks underage users), and Obsidian Isle `OPEN DISCORD`, `SERVER INFORMATION` (verified-only policy, zero invented IP/stats), and `COMPANION APPLICATION` drawers.
* **Extended `js/systems/progress.js`, `js/data/i18n.js`, `js/ui/interface.js`, and `css/interface.css`:**
  * Persisted `welcomeReviewed`, `communityReviewed`, and `isleLinkAgeStatus` in `localStorage`.
  * Added full **English**, **Bahasa Melayu**, and **Kecek KL** translations for Destination 01 and Destination 03.

### Stage 9 — High-Detail Polygon, Procedural PBR & Foliage Render Upgrade
* **Added Procedural PBR Material Library (`js/core/materials.js`):**
  * Generated procedural CanvasTextures with paired normal/bump maps for dark structural timber, weathered planks, roofing shingles, furrowed conifer bark, mossy craggy boulders, fine loam/trail soil (`terrainBump`), and reptilian scales (`scaleBump`), plus alpha-cutout feathery pine boughs, pinnate fern/cycad fronds, and grass tufts.
* **Atmosphere & Lighting Upgrade (`js/core/scene.js`, `js/main.js`):**
  * Replaced flat background clearing with a procedural vertical-gradient atmospheric sky dome shader (`createSkyDome`), drifting sunlit forest dust motes (`createDustMotes`), and secondary cool fill lighting while preserving mobile-adaptive shadow map and pixel-ratio caps.
* **Organic Prehistoric Flora, Architecture & NPC (`js/core/world.js`, `js/core/npc.js`):**
  * Upgraded terrain resolution to `196×196` segments with `terrainBump`, animated pond water/ripples with shore rocks, and added fallen mossy logs across forest clearings.
  * Upgraded all 5 outpost structures with stone plinths, corner log posts, knee braces, gabled double-slope shingle roofs with exposed rafter tails, framed glowing windows, desk hardware, and detailed hanging cage lanterns.
  * Replaced low-poly 7-sided cone trees and faceted dodecahedron rocks with 12-segment bark trunks + multi-whorl drooping pine-bough `InstancedMesh` canopies, UV-mapped pinnate fern rosettes, cycad palms, ground grass tufts, and smoothly subdivided spherical-noise boulders (`IcosahedronGeometry(1, 2)`), scaled proportionally on touch devices.
  * Sculpted an organic **SavageZed** theropod mesh (`LatheGeometry` tail, capsule snout/jaw, brow ridges, amber eyes, head crest, scaly bump skin, explorer vest & backpack) and subdivided `14×6` smoothly rippling *Jalur Gemilang* flags.

### Stage 10 — SavageZed Omniraptor GLB Model Replacement
* **Deployed Omniraptor Model & Basis Transcoder (`public/models/omniraptor/`, `public/basis/`, `.gitignore`):**
  * Bundled `Omniraptor.glb` along with `T_Omniraptor_Albedo.webp`, `T_Omniraptor_Adult_Pattern_1.webp`, `T_Omniraptor_Detail_M.webp`, and Three.js `basis_transcoder.{js,wasm}` for KTX2 + Meshopt decoding, while ignoring the raw 500+ MB source asset folders in `.gitignore`.
* **Evrima Skin Compositor & Skeletal Idle Loader (`js/core/npc.js`, `js/core/world.js`, `js/main.js`):**
  * Replaced the procedural SavageZed dino mesh with `Omniraptor.glb` loaded via `GLTFLoader` + `KTX2Loader` + `MeshoptDecoder`.
  * Applied the `Adult` morph target, aligned the head-to-tail skeleton axis toward the player trail (`+Z`), normalized stature (`1.88m`) flush to terrain, and played the embedded `'Idle'` skeletal `AnimationClip` loop via `THREE.AnimationMixer`.
  * Composited `T_Omniraptor_Albedo.webp`, `T_Omniraptor_Adult_Pattern_1.webp`, and `T_Omniraptor_Detail_M.webp` with the `Omniraptor.json` layer/anatomy palette while preserving quantized glTF UV transforms (`offset`, `repeat`, `channel`).

### Stage 11 — Survival Training Ground (Station 06) & 8 Named Station Dinosaur Guides (Local Dev)
* **Added Station 06 — Survival Training Ground (`js/core/world.js`, `js/data/tutorialContent.js`, `js/data/survivalContent.js`, `js/systems/survivalGuide.js`):**
  * Built a walled timber palisade compound at `(-31, 2)` connected by a western forest trail, with colliders along all 5 wall sections leaving a walkable entrance walkway.
  * Added an **Entrance Gateway** on the east wall (`(-23.8, 2)`) featuring a carved signboard reading **`PRIMEVAL MALAYSIA TRAINING CAMP`**, timber rafters, and hanging lanterns.
  * Built a central animated **bonfire** (stone ring, stacked logs, glowing ember bed, flickering flames, rising spark particles, and warm `PointLight`), surrounded by log benches, sparring posts, and the interactive Survival Training Board.
  * Implemented an interactive 6-tab **Survival Training Field Manual** (`Controls & Moves`, `Diet & Water`, `Stamina & Healing`, `Groups & Sanctuaries`, `Night & Stealth`, `Pro Survival Tips`) localized in **English**, **Bahasa Melayu**, and **Kecek KL** with persistent review tracking (`ProgressSystem.markSurvivalReviewed()`).
* **Deployed 8 Named Station Dinosaur Guides (`js/core/npc.js`, `js/ui/interface.js`, `public/models/`):**
  * Copied required `.glb` models & skin/mask textures for **Pteranodon**, **Triceratops**, **Maiasaura**, **Tyrannosaurus** (shared via `SkeletonUtils.clone` with distinct Pattern 1/2/3 skins), **Allosaurus**, and **Dilophosaurus**.
  * Placed floating nameplates, skeletal `Idle` animations, colliders, and interactive dialogs for:
    * `kift90` (Pteranodon — Station 01 Welcome Centre)
    * `kenzy` (Triceratops — Station 02 Steam Terminal)
    * `apollo` (Maiasaura — Station 03 Community Outpost)
    * `mapotofu` (Tyrannosaurus — Station 04 Companion Station)
    * `kmy` & `Zapicy` (Tyrannosaurus — Station 05 Departure Gate)
    * `sai` (Allosaurus) & `Dom` (Dilophosaurus) — Survival Training Ground
  * Wired every guide's `[E]` interaction dialog to deliver localized station briefings and open their assigned station directly.

### Stage 12 — Session Survivor Name, Space Jumping & Shanks Ceratosaurus (Hidden Mutations)
* **Session Survivor Name Input (`index.html`, `js/ui/interface.js`, `js/data/i18n.js`, `js/data/survivalContent.js`, `css/interface.css`):**
  * Prompted users to enter their survivor name on the Welcome Overlay (`sessionStorage`-persisted for the session) with localized validation across **English**, **Bahasa Melayu**, and **Kecek KL**.
  * Personalized HUD objectives and all dinosaur guide dialogs (SavageZed, `kift90`, `kenzy`, `apollo`, `mapotofu`, `kmy`, `Zapicy`, `sai`, `Dom`, and `Shanks`) with the entered `{name}` throughout the session.
* **Jumping Controls (`js/core/player.js`, `index.html`, `css/interface.css`, `js/data/i18n.js`, `js/data/survivalContent.js`):**
  * Implemented `Space` keyboard jumping (and mobile `JUMP` touch button) with vertical gravity physics and terrain landing detection in `PlayerController`, plus documented `Space — Jump` in the Welcome Controls and Survival Training Manual.
* **Added Ceratosaurus Guide `Shanks` Outside Training Camp (`public/models/ceratosaurus/`, `js/core/npc.js`, `js/data/tutorialContent.js`, `js/data/survivalContent.js`):**
  * Copied `Ceratosaurus.glb` and matching Adult Pattern 1 / Albedo / Detail textures into `public/models/ceratosaurus/`.
  * Placed `Shanks` in a crouched/resting leaf-and-stone hollow (`sittingPose: true`) right outside the Training Camp palisade gateway (`(-21.8, -3.2)`).
  * Built an interactive whispering dialog panel asking `{name}` about Evrima's **Hidden Mutations** (`Reniculate Kidneys`, `Reinforced Tendons`, `Osteophagic`, and `Augmented Tapetum` — kill 5 players at night) and revealing their exact unlock conditions and survival effects.

### Stage 13 — Community Servers, Destination 04/05 Completion, Gateway Map & Colorful Skins
* **Community & Companion Directory Updates (`js/data/serverDirectory.js`, `js/systems/destinations.js`, `js/data/survivalContent.js`):**
  * Added **Noctua Isle** (`https://discord.gg/Z2NAfTgNVv`) and **Dino Den** (`https://discord.gg/thedinoden`, `https://dinoden.gg`) to `communities`.
  * Updated **IsleLink** with the official companion app download URL (`https://islelink.gg/download`) behind 18+ confirmation and implemented `CompanionStationController` (Destination 04).
  * Updated `mapotofu`'s dialog across `en`, `ms`, and `kl` stating that players roam many servers, with the main two being **IsleLink** and **Obsidian Isle**.
* **Destination 05 Departure Checklist & Animated Exit Portal (`js/systems/destinations.js`, `js/systems/progress.js`, `js/data/i18n.js`, `js/core/world.js`):**
  * Completed `DepartureStationController` with the full **11-point interactive readiness checklist** synced to `ProgressSystem` / `localStorage`, progress meter, and **`EXPEDITION PREPARATION COMPLETE`** completion banner.
  * Added an animated swirling Exit Portal inside the Destination 05 Departure Gate (`ShaderMaterial` emerald/cyan/gold spiral vortex, 3 counter-rotating additive halo rings, 22 orbiting crystal motes, ground energy pad, and pulsing beacon light).
* **SavageZed Game Premise & Tiled Gateway Map (`public/map-tiles/`, `js/systems/gatewayMap.js`, `js/ui/interface.js`, `js/core/world.js`, `js/main.js`):**
  * Bundled the Gateway `z0..z4` map tileset into `public/map-tiles/` and pinned the island overview chart onto the Welcome Noticeboard.
  * Built `GatewayMapViewer` (`[M]` hotkey & HUD button + SavageZed dialog trigger) supporting zoom/pan canvas rendering and a localized **Evrima Map Legends** guide explaining freshwater, saltwater/cliffs, sanctuaries, migrations, and grid coordinates.
  * Expanded **SavageZed**'s dialog with `'premise'` (game premise & permadeath survival) and `'gateway-map'` pages in `en`, `ms`, and `kl`.
* **Colorful Randomized Dinosaur Skins & Signature SavageZed Palette (`js/core/npc.js`):**
  * Injected a **Gold, Black, and Red** Evrima skin (`SAVAGEZED_GOLD_BLACK_RED`) onto SavageZed (`Omniraptor.glb`) and vibrant randomized multi-hue palettes onto all 9 other dinosaur station guides.
* **Procedural Grass, Insects & Crawling Wildlife (`js/core/wildlife.js`, `js/core/world.js`):**
  * Generated `2,700` desktop (`1,350` touch) 5-blade curved procedural grass clumps (`7,000–13,500` animated blades) driven by a GPU wind vertex shader (`onBeforeCompile`) across glades and forest floors.
  * Added instanced flapping **dragonflies**, **butterflies**, and additive glowing **fireflies** across the pond and trails.
  * Added terrain-clamped crawling **iridescent beetles**, **darting forest lizards**, and **segmented millipedes** patrolling clearings and pond banks.

### Stage 14: Carnotaurus Courting & Nesting Coaches, `theisle.info` Fact-Checking, Playable Roster & Setup Videos
* **Carnotaurus Courting & Nesting Clearing (`js/core/world.js`, `js/core/npc.js`, `js/data/tutorialContent.js`, `js/data/survivalContent.js`):**
  * Bundled `Carnotaurus.glb` & Evrima CMYRGB mask/pattern textures under `public/models/carnotaurus/` and built the `Carnotaurus Nesting Ground` at `(11, -22)` between S4 and S5 featuring a twig/earth nest crater, trailside signboard, and **3 speckled eggs**.
  * Spawned **Cocomelon** (Light Blue Carnotaurus) and **J5** (Pink Carnotaurus) flanking the nest with full localized dialogs (`en`, `ms`, `kl`) teaching Evrima courting rules (same species, opposite sex, ungrouped, face-to-face Hold `N`), nest placement & debris gathering (`G`/`E`), egg temperature & rotten-egg cleanup (Hold `E`), `TAB` public/private passcode invites (`Space` to hatch), feeding hatchlings, and mutation inheritance.
* **Training Camp Fact-Check & HUD Icons (`js/data/survivalContent.js`, `js/systems/survivalGuide.js`, `js/data/i18n.js`, `public/icons/`):**
  * Fact-checked all Training Camp controls and survival mechanics against `https://www.theisle.info/`: clarified **`X`** for Night Vision (vs Hold **`N`** for Courting/Nesting and Hold **`H`** for Sleep/Safe-Log), documented **Alpha ($\alpha$)** / **Beta ($\beta$)** / **Gamma ($\gamma$)** nutrient symbols (including carnivore organs: Lungs $\alpha$, Hearts $\beta$, Intestines $\gamma$) & Elder Entombing (`100%` Elder -> Hold `H` sleep -> `TAB` Mutations -> Entomb).
  * Copied the provided game HUD icons into `public/icons/` and rendered the **Evrima HUD Status & Diet Symbols Reference** grid inside `SurvivalGuideController`.
* **Playable Dinosaurs Roster at S1 (`js/data/survivalContent.js`, `js/systems/destinations.js`):**
  * Added an interactive, category-filterable **Playable Dinosaurs in The Isle: Evrima (22 Species)** roster (12 Carnivores, 8 Herbivores, 2 Omnivores) fact-checked from `https://www.theisle.info/` inside Station 01 (`WelcomeStationController`).
* **Evrima & EAC Setup Walkthrough Videos (`public/videos/`, `js/systems/tutorial.js`, `js/systems/destinations.js`, `css/interface.css`):**
  * Bundled `envrimasetup.mp4` and `eacsetup.mp4` from `assets/so3/` into `public/videos/` and embedded responsive `<video controls>` players across Station 02 (`SteamTutorialController` Walkthrough & EAC tabs) and Station 03 (`CommunityDirectoryController`).

---

## 2. Git Commit Milestones (`main`)
* `4beec44` — Initial commit (`README.md`)
* `495b327` — Initial 3D onboarding prototype, Steam/EAC terminal, SavageZed, flags, and 3-language support
* `fe2cd99` — Added `actions/configure-pages@v5` to GitHub Pages workflow
* `6ffe12f` — Added detailed `README.md`
* `3d7a980` — Deleted `AGY.md` on remote
* `58831bf` — Added mobile touch controls, tappable prompts, and responsive layouts
* `a8b3295` — Restored `AGY.md` and added `LOG.md`
* `e80b639` — Implemented Destination 01 (Welcome) and Destination 03 (Community Outpost)
* `0caf690` — Upgraded 3D polygon detail, procedural PBR textures, foliage, structures, and SavageZed
* `db7e078` — Replaced SavageZed avatar with Omniraptor GLB model and Evrima skin
* `dced2d7` — Added Survival Training Ground (Station 06), gateway signboard, bonfire, and 8 station dino guides
* `8aec835` — Added session survivor name prompt, `Space` jumping, Shanks Ceratosaurus & Augmented Tapetum hidden mutation

---

## 3. Next Planned Milestones (Pending per `AGY.md`)
* **Polish & Optimization:** Ambient Web Audio soundscape, graphics settings panel (`js/ui/controlPanel.js`), and full desktop/mobile QA pass.
