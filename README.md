# THE ISLE — EXPEDITION

> **Your journey into The Isle begins here.**

**THE ISLE — EXPEDITION** is a browser-based, first-person 3D onboarding experience for players preparing to enter *The Isle: Evrima*. Explore a prehistoric research outpost, meet dinosaur guides, and interact with learning stations covering game setup, community discovery, companion-application safety, and in-game survival.

It turns the usual “read a guide, open another tab, find another guide” process into an explorable expedition.

<p align="center">
  <a href="https://zaidiabd.github.io/savageguide/"><strong>Launch the live experience</strong></a>
  &nbsp;·&nbsp;
  <a href="https://github.com/Zaidiabd/savageguide/issues">Report an issue</a>
</p>

---

## Overview

The experience is built around a real-time 3D environment rather than a conventional set of web pages. Players move through a forest outpost in first person, approach marked stations, and press **E** to open their learning panels. Dinosaur NPCs provide contextual introductions and direct players to relevant locations.

The current codebase includes:

- A procedurally constructed outdoor environment with terrain, forest vegetation, trails, rocks, a pond, atmospheric lighting, fog, and animated environmental elements.
- First-person navigation with keyboard controls, pointer-lock mouse look, and a mouse-drag fallback.
- Mobile touch movement, jump, and sprint controls.
- Six in-world destinations, dinosaur station guides, and the SavageZed welcome character.
- A Steam and Evrima setup walkthrough, bundled Easy Anti-Cheat (EAC) guidance, repair/verification options, and troubleshooting content.
- A searchable community directory with source-verification notes and an age-restricted community flow.
- A survival field manual covering controls, diets, stamina, nesting, night vision, and gameplay advice.
- English, Bahasa Melayu, and Kecek KL localization.
- Browser-local progress persistence for supported checklists and reviewed sections.
- Locally bundled dinosaur GLB models and texture assets for the 3D guides.

## Live Demo

**[https://zaidiabd.github.io/savageguide/](https://zaidiabd.github.io/savageguide/)**

The project is deployed as a static Vite application through GitHub Pages.

## The Expedition Stations

| Destination | Station | Current implementation |
|---|---|---|
| 01 | **Welcome Centre & Noticeboard** | Implemented. Introduces *The Isle: Evrima*, outlines PC readiness, explains the expedition, and provides navigation to other stations. |
| 02 | **Steam & Easy Anti-Cheat Terminal** | Implemented. Includes a 10-step Steam/Evrima walkthrough, EAC overview, conditional repair guidance, Steam file verification, and troubleshooting. |
| 03 | **Community Directory Board** | Implemented. Provides searchable/filterable directory entries, community source notes, age-restriction handling, and official Discord information. |
| 04 | **Companion Application Desk** | In-world station and guide are present; the full dedicated setup and troubleshooting module remains a work in progress. |
| 05 | **Expedition Departure Gate** | In-world gate and dinosaur guides are present; the complete interactive final-readiness checklist remains a work in progress. |
| 06 | **Survival Training Ground** | Implemented. Contains a six-section field manual for controls, diet and water, stamina and healing, groups and sanctuaries, night and stealth, and survival tips. |

The stations are arranged around a navigable outpost. Use the destination selector in the HUD for quick travel, or follow the trails and discover them on foot.

## Dinosaur Guides and 3D Assets

Dinosaur characters act as in-world guides rather than decorative menu artwork. They introduce station topics and provide contextual tips or a route into the relevant panel. SavageZed welcomes players at the central camp, while additional dinosaur guides are assigned to the expedition stations.

The repository includes local model and texture assets for species including:

- Allosaurus
- Ceratosaurus
- Dilophosaurus
- Maiasaura
- Omniraptor
- Pteranodon
- Triceratops
- Tyrannosaurus

The station roster and model configuration are data-driven. Relevant definitions are maintained in `js/data/tutorialContent.js`, `js/data/survivalContent.js`, and `js/core/npc.js`.

## Controls

### Desktop

| Input | Action |
|---|---|
| `W` `A` `S` `D` or arrow keys | Move |
| Mouse | Look around |
| `Shift` | Sprint |
| `Space` | Jump |
| `E` | Interact with a station or speak to a guide |
| `Esc` | Release mouse / close the active panel |

Click the 3D viewport to capture the mouse for first-person look. If pointer lock is unavailable, use click-and-drag to look around.

### Touch devices

Use the on-screen movement joystick and the **JUMP** and **SPRINT** controls. Touch-specific renderer settings are applied to reduce the rendering workload on mobile devices.

## Languages

The interface and learning content support three language modes:

| Language | Code | Notes |
|---|---|---|
| English | `en` | English interface and guide content |
| Bahasa Melayu | `ms` | Malay interface and guide content |
| Kecek KL | `kl` | Casual Kuala Lumpur-style Malay phrasing |

Switch languages from the welcome screen or the in-world HUD. The selected language is saved in browser storage.

## Technology

| Technology | Purpose |
|---|---|
| HTML5 | Application shell and interface structure |
| CSS3 | HUD, overlays, station panels, and responsive layout |
| JavaScript ES modules | Application logic and modular systems |
| [Three.js](https://threejs.org/) | WebGL rendering, 3D scene, models, cameras, and interaction |
| [Vite](https://vite.dev/) | Local development server and production build |
| [glTF / GLB](https://www.khronos.org/gltf/) | Local 3D dinosaur assets |
| Browser Local Storage | Local language and learning-progress persistence |
| GitHub Actions + GitHub Pages | Automated build and static hosting |

The current static deployment does not require a separate application server. Supported progress is stored in the visitor's browser; it is not synchronized between devices.

## Project Structure

```text
savageguide/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages build and deployment
├── css/
│   ├── main.css                # Base styles and theme foundation
│   ├── environment.css         # WebGL viewport layout
│   └── interface.css           # HUD, overlays, dialogs, and station UI
├── js/
│   ├── main.js                 # Application bootstrap and render loop
│   ├── core/
│   │   ├── camera.js           # Perspective camera
│   │   ├── interaction.js      # Proximity, facing, and raycast interaction
│   │   ├── materials.js        # Shared environment materials
│   │   ├── npc.js              # Dinosaur models, guides, and animated characters
│   │   ├── player.js           # First-person movement and touch input
│   │   ├── scene.js            # Renderer, lighting, sky, and atmosphere
│   │   └── world.js            # Terrain, pond, stations, and procedural forest
│   ├── data/
│   │   ├── i18n.js             # Interface translations
│   │   ├── serverDirectory.js  # Community directory entries
│   │   ├── survivalContent.js  # Guide profiles and survival manual
│   │   └── tutorialContent.js  # Destinations, NPC dialog, and Steam/EAC steps
│   ├── systems/
│   │   ├── collision.js        # World bounds and collision resolution
│   │   ├── destinations.js     # Welcome and community directory panels
│   │   ├── navigation.js       # Destination quick-jump system
│   │   ├── progress.js         # Browser-local progress management
│   │   ├── survivalGuide.js    # Survival manual interface
│   │   └── tutorial.js         # Steam/EAC tutorial interface
│   └── ui/
│       └── interface.js        # HUD, modals, language controls, and dialogs
├── public/
│   ├── basis/                  # Basis Universal transcoder assets
│   └── models/                 # Dinosaur GLB models and textures
├── AGY.md                      # Master project specification and development notes
├── LOG.md                      # Development log
├── index.html                  # Main application document
├── package.json                # Dependencies and scripts
├── package-lock.json           # Locked dependency tree
└── vite.config.js              # Vite configuration
```

## Run Locally

### Requirements

- Node.js (Node 20 or newer recommended)
- npm
- A modern desktop or mobile browser with WebGL support

### Install dependencies

```bash
git clone https://github.com/Zaidiabd/savageguide.git
cd savageguide
npm install
```

### Start the development server

```bash
npm run dev
```

Open the local address printed by Vite. The configured default is:

```text
http://localhost:5173/
```

### Create a production build

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

The production output is generated in the `dist/` directory.

## Deployment

The repository includes a GitHub Actions workflow at `.github/workflows/deploy.yml`.

- A push to `main` triggers the build and deployment workflow.
- The workflow installs dependencies with `npm ci`.
- Vite builds the static site into `dist/`.
- The generated artifact is published to GitHub Pages.
- A manual workflow dispatch is also supported.

The Vite configuration uses a relative asset base (`./`) for the repository's GitHub Pages project site.

## Progress and Browser Data

The application uses browser storage for supported user preferences and progress:

- Selected language
- Steam tutorial step and completed-step state
- EAC option status and setup checklist
- Welcome, community, and survival guide review flags
- IsleLink age-gate status

This data is local to the browser profile. Clearing site data or using a different browser/device may reset or isolate progress. The entered survivor name is stored for the current browser session.

## Accuracy and Community Safety

Community details are maintained in `js/data/serverDirectory.js`. The directory is intentionally conservative: entries direct players to administrator-controlled sources for rules, announcements, and companion downloads rather than inventing server details or distributing unverified executables.

For *The Isle* and EAC setup, use Steam and official game/community support channels. EAC is bundled with the game installation; a separate installer from an unrelated third-party website should not be required. The guide's local repair instructions are conditional and may vary with the installed game build.

**Community information, game controls, and installation steps can change.** Always confirm current rules and instructions with the relevant official source before acting on them.

## Development Notes

`AGY.md` is the master project specification and `LOG.md` records development changes. These files provide additional context for contributors. The running code is the source of truth for what is currently implemented.

## Contributing

Contributions, corrections, and issue reports are welcome.

1. Open an issue describing the problem or proposed improvement.
2. For code changes, create a feature branch.
3. Keep station content, translations, and community entries data-driven where practical.
4. Test the experience locally with `npm run dev` and confirm the production build with `npm run build`.
5. Submit a pull request with a clear summary and any relevant screenshots or reproduction steps.

## Project Status

THE ISLE — EXPEDITION is an evolving independent project. Some stations contain usable guides and interactive content, while other sections are still in progress or rely on community-supplied information. The presence of a station in the 3D environment does not imply that every planned feature is complete.

## Disclaimer

THE ISLE — EXPEDITION is an independent, fan-made community onboarding project. It is not affiliated with, endorsed by, or an official product of the developers or publishers of *The Isle*. All trademarks and game-related names belong to their respective owners.

---

<p align="center">
  <strong>THE ISLE — EXPEDITION</strong><br/>
  <em>Explore the outpost. Meet the guides. Prepare for Evrima.</em><br/>
  <a href="https://zaidiabd.github.io/savageguide/">Launch Expedition</a>
</p>
