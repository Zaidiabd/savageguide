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
* Created this `LOG.md` file summarizing all completed work.

---

## 2. Git Commit Milestones (`main`)
* `4beec44` — Initial commit (`README.md`)
* `495b327` — Initial 3D onboarding prototype, Steam/EAC terminal, SavageZed, flags, and 3-language support
* `fe2cd99` — Added `actions/configure-pages@v5` to GitHub Pages workflow
* `6ffe12f` — Added detailed `README.md`
* `3d7a980` — Deleted `AGY.md` on remote
* `58831bf` — Added mobile touch controls, tappable prompts, and responsive layouts

---

## 3. Next Planned Milestones (Pending per `AGY.md`)
* **Destination 01 (Welcome Centre):** Full orientation cards & PC requirements panel.
* **Destination 03 (Community Outpost):** `js/data/serverDirectory.js` with searchable/filterable cards, **IsleLink** 18+ age restriction gating, and **Obsidian Isle** Discord/companion instructions.
* **Destination 04 (Companion Application Station):** Full companion app details, checklists, and troubleshooting.
* **Destination 05 (Expedition Departure):** Full 11-point interactive readiness checklist synced with `ProgressSystem` and completion state.
* **Polish & Optimization:** Minimap (`M` toggle, `js/systems/minimap.js`), ambient Web Audio soundscape, graphics settings panel (`js/ui/controlPanel.js`), and full desktop/mobile QA pass.
