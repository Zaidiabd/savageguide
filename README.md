# THE ISLE — EXPEDITION (`savageguide`)

> **YOUR JOURNEY INTO THE ISLE BEGINS HERE.**

An interactive 3D browser-based player onboarding experience for **The Isle: Evrima**, featuring a navigable prehistoric research outpost, an anthropomorphic dinosaur guide (**SavageZed**) welcoming players to the **Primeval Malaysia Community**, a functional **Steam & Easy Anti-Cheat (EAC)** installation terminal, and live **3-language support** (**English**, **Bahasa Melayu**, and **Kecek KL**).

**Live Demo:** https://zaidiabd.github.io/savageguide/

---

## Current Status & Implemented Features

This repository currently provides a playable **3D skeleton outpost** alongside the first functional iteration of **Destination 02 (Steam & Easy Anti-Cheat Terminal)**, **SavageZed NPC dialog**, and **multi-language UI**:

### 1. Prehistoric 3D Outpost (`Three.js` + `InstancedMesh`)
* **Terrain & Atmosphere:** Procedural sloped terrain with vertex-painted dirt trails, mossy clearings, a southwest pond, exponential forest fog, hemisphere bounce lighting, and directional sunlight with soft shadows.
* **Instanced Flora & Obstacles:** Procedurally placed conifers, tapered prehistoric ferns, and boulders using `THREE.InstancedMesh`.
* **Malaysian Flags (*Jalur Gemilang*):** Procedurally generated canvas textures (14 stripes, blue canton, yellow crescent and 14-point star) mounted on randomly placed timber flagpoles with continuous wind-wave animation.

### 2. SavageZed — Primeval Malaysia Community Guide
* Anthropomorphic dinosaur NPC stationed near the Central Expedition Camp arrival trail with idle breathing, tail sway, head motion, and welcoming wave animations.
* Approaching and pressing **`E`** opens an interactive dialog box welcoming players to the **Primeval Malaysia Community**, explaining what to do across the five outpost destinations, with quick-navigation actions.

### 3. First-Person Navigation & Collision
* **Pointer Lock + Drag Fallback:** `PointerLockControls` for smooth mouse-look, plus automatic mouse-drag fallback if pointer lock is unavailable.
* **Terrain & Wall-Sliding Collision:** Ground-height clamping and circle-vs-AABB sliding collision against buildings, desks, boulders, tree trunks, and flagpoles.
* **Quick Jump Menu:** Top-right `DESTINATION` dropdown to teleport directly in front of SavageZed or any of the five stations.

### 4. Five Outpost Destinations
| Station | Status | Purpose |
| :--- | :--- | :--- |
| **01 — Welcome Centre & Noticeboard** | Skeleton Preview | Orientation to *The Isle: Evrima*, camp overview, and hardware expectations |
| **02 — Steam & Easy Anti-Cheat Terminal** | **Functional (v1)** | 10-step Steam/Evrima guide, EAC System Verification terminal, troubleshooting, and persistent checklist |
| **03 — Community Directory Board** | Skeleton Preview | Planned directory for IsleLink (18+ gated) and Obsidian Isle Discord communities |
| **04 — Companion Application Desk** | Skeleton Preview | Planned official companion app setup and safety guidance |
| **05 — Expedition Departure Gate** | Skeleton Preview | Planned 11-item final pre-launch readiness checklist |

### 5. Destination 02 — Steam & Easy Anti-Cheat Terminal
* **Walkthrough (`STEP 01`–`STEP 10`):** Progress bar, clickable step pills, completion checkboxes, official Steam Store link (`https://store.steampowered.com/app/376210/The_Isle/`), and clearly labelled UI interface illustrations.
* **EAC System Verification Terminal:**
  * Explains that Easy Anti-Cheat is bundled with *The Isle: Evrima* through Steam and normally needs no separate download.
  * **Option A — Local Installer / Repair:** 9-step local directory guide with build-variance disclaimers (`InstallAntiCheat.bat`, `EasyAntiCheat` folder, `EasyAntiCheat_Setup.exe`) and official-directory-only safety warnings.
  * **Option B — Verify Game Files:** 8-step Steam file verification guide.
* **Troubleshooting (`ISSUE 01`–`ISSUE 04`):** Covers missing EAC, missing local installer, failed installation, and persistent launch errors without recommending bypassing EAC or unofficial downloads.
* **Persistent Progress:** Step completion, EAC verification flags, and checklist state are saved automatically in `localStorage`.

### 6. Live 3-Language Switcher
Switch anytime from the **Welcome Overlay** or the **HUD top-right menu** (persisted in `localStorage`):
* **English**
* **Bahasa Melayu**
* **Kecek KL** *(casual KL Malaysian gamer slang while keeping exact Steam/EAC menu labels intact)*

---

## Controls

| Key / Input | Action |
| :--- | :--- |
| `W` `A` `S` `D` / Arrow Keys | Move |
| `Mouse` (or Left-Click Drag) | Look Around |
| `Shift` | Sprint |
| `E` | Interact with Station or Talk to SavageZed |
| `ESC` | Release Pointer Lock / Close Active Panel |

---

## Project Structure

```text
savageguide/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow for GitHub Pages
├── css/
│   ├── main.css                # Theme variables & base reset
│   ├── environment.css         # WebGL canvas mount layout
│   └── interface.css           # HUD, overlays, NPC dialog & Steam/EAC terminal styles
├── js/
│   ├── main.js                 # App bootstrap, input hotkeys, and render loop
│   ├── core/
│   │   ├── camera.js           # Perspective camera setup
│   │   ├── interaction.js      # Proximity + view-direction + raycast interaction detection
│   │   ├── npc.js              # SavageZed NPC & animated Malaysian flagpoles
│   │   ├── player.js           # PointerLockControls, WASD/Sprint, terrain clamping
│   │   ├── scene.js            # Scene, renderer, shadows, fog, and sun/sky lighting
│   │   └── world.js            # Terrain, pond, 5 station structures, and instanced forest
│   ├── data/
│   │   ├── i18n.js             # English, Bahasa Melayu, and Kecek KL translation bundles
│   │   └── tutorialContent.js  # Destination coordinates, SavageZed dialog, Steam/EAC data
│   ├── systems/
│   │   ├── collision.js        # XZ bounding-box collision & world perimeter clamping
│   │   ├── navigation.js       # Quick-jump teleportation to SavageZed & stations
│   │   ├── progress.js         # LocalStorage persistence for language, steps & checklists
│   │   └── tutorial.js         # Steam & EAC terminal UI controller + UI illustrations
│   └── ui/
│       └── interface.js        # Welcome screen, HUD, modals, NPC dialog & i18n wiring
├── AGY.md                      # Master development specification & revision log
├── index.html                  # Application shell & UI containers
├── package.json                # Vite + Three.js dependencies & scripts
└── vite.config.js              # Vite configuration (base: './' for subpath hosting)
```

---

## Local Development

### Prerequisites
* **Node.js** (v20+ recommended; tested on v24.22.1)
* **npm**

### Install & Run
```bash
npm install
npm run dev
```
Open the local URL printed by Vite (default: `http://localhost:5173/`).

### Production Build & Preview
```bash
npm run build
npm run preview
```
The production bundle is output to `dist/`.

---

## Deployment (GitHub Pages)

This repository includes automated deployment via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) using `actions/configure-pages@v5`, `actions/upload-pages-artifact@v3`, and `actions/deploy-pages@v4`, paired with `base: './'` in [`vite.config.js`](vite.config.js).

Every push to `main` automatically builds and publishes to **https://zaidiabd.github.io/savageguide/**.

---

## Roadmap (from `AGY.md`)

Planned next iterations in [`AGY.md`](AGY.md):
* **Destination 01, 03, 04 & 05 full content:**
  * Community Directory (`serverDirectory.js`) with search/filtering, **IsleLink** 18+ age-gating, and **Obsidian Isle** Discord & companion instructions.
  * Dedicated Companion Application Station and 11-point Expedition Departure checklist.
* **HUD & Polish:** Interactive minimap (`M` toggle), ambient Web Audio soundscape, graphics quality settings, and mobile touch controls.
