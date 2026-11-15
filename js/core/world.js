import * as THREE from 'three';
import { DESTINATIONS, SAVAGEZED_NPC } from '../data/tutorialContent.js';
import { buildSavageZedNPC, buildRandomMalaysiaFlags } from './npc.js';

/**
 * Deterministic pseudo-random generator for reproducible forest placement.
 */
function createSeededRandom(seed = 4219) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

/**
 * Distance from point (x, z) to line segment (ax, az)-(bx, bz).
 */
function distToSegment(x, z, ax, az, bx, bz) {
  const vx = bx - ax;
  const vz = bz - az;
  const wx = x - ax;
  const wz = z - az;
  const lenSq = vx * vx + vz * vz;
  const t = lenSq > 0 ? Math.max(0, Math.min(1, (wx * vx + wz * vz) / lenSq)) : 0;
  const px = ax + t * vx;
  const pz = az + t * vz;
  return Math.hypot(x - px, z - pz);
}

const TRAIL_SEGMENTS = [
  [0, 14, 0, 0],     // Spawn -> Central Camp
  [0, 0, -24, -14],  // Central Camp -> Steam Station
  [0, 0, 24, -10],   // Central Camp -> Community Outpost
  [0, 0, 20, 18],    // Central Camp -> Companion Station
  [0, 0, 0, -36]     // Central Camp -> Expedition Departure
];

function minTrailDistance(x, z) {
  let minDist = Infinity;
  for (const [ax, az, bx, bz] of TRAIL_SEGMENTS) {
    const d = distToSegment(x, z, ax, az, bx, bz);
    if (d < minDist) minDist = d;
  }
  return minDist;
}

/**
 * Shared terrain elevation function used by mesh generation, object placement,
 * and player ground detection. Keeps station pads gently levelled.
 */
export function getTerrainHeight(x, z) {
  const baseHills =
    Math.sin(x * 0.048) * Math.cos(z * 0.045) * 1.45 +
    Math.sin(x * 0.11 + z * 0.09) * 0.35;

  // Gently flatten around central camp & each destination pad
  let flattenWeight = 0;
  for (const dest of DESTINATIONS) {
    const d = Math.hypot(x - dest.position.x, z - dest.position.z);
    const w = Math.max(0, 1 - d / 10);
    flattenWeight = Math.max(flattenWeight, w * w);
  }

  // Slight basin for stream/pond on southwest flank
  const pondDist = Math.hypot(x + 22, z - 20);
  const pondDip = pondDist < 11 ? (1 - pondDist / 11) * -0.95 : 0;

  // Outer valley rim rise
  const radial = Math.hypot(x, z);
  const rim = radial > 48 ? ((radial - 48) * 0.18) : 0;

  return baseHills * (1 - flattenWeight * 0.85) + pondDip + rim;
}

/**
 * Builds the prehistoric terrain, water basin, instanced flora, and 5 stations.
 */
export function createPrehistoricWorld(scene, collisionSystem) {
  const rand = createSeededRandom(1842);
  const interactables = [];

  // Shared materials aligned with AGY.md colour palette
  const materials = {
    timberDark: new THREE.MeshStandardMaterial({ color: 0x4f3a29, roughness: 0.92 }),
    timberWeathered: new THREE.MeshStandardMaterial({ color: 0x6f553c, roughness: 0.88 }),
    plankLight: new THREE.MeshStandardMaterial({ color: 0x876a4b, roughness: 0.86 }),
    shingle: new THREE.MeshStandardMaterial({ color: 0x3b352e, roughness: 0.95 }),
    stone: new THREE.MeshStandardMaterial({ color: 0x636761, roughness: 0.94, flatShading: true }),
    metalDark: new THREE.MeshStandardMaterial({ color: 0x2b302c, roughness: 0.55, metalness: 0.45 }),
    screenGlow: new THREE.MeshStandardMaterial({
      color: 0x2a4533,
      emissive: 0x4d8c61,
      emissiveIntensity: 0.75,
      roughness: 0.3
    }),
    boardSlate: new THREE.MeshStandardMaterial({ color: 0x262b27, roughness: 0.85 }),
    noticePaper: new THREE.MeshStandardMaterial({ color: 0xd9d2be, roughness: 0.9 }),
    noticeAmber: new THREE.MeshStandardMaterial({ color: 0xc99646, roughness: 0.75 }),
    lanternGlass: new THREE.MeshStandardMaterial({
      color: 0xffe4ad,
      emissive: 0xffb347,
      emissiveIntensity: 1.4,
      roughness: 0.2
    }),
    trunk: new THREE.MeshStandardMaterial({ color: 0x4b3828, roughness: 0.95 }),
    coniferNeedles: new THREE.MeshStandardMaterial({ color: 0x294426, roughness: 0.88, flatShading: true }),
    fernFrond: new THREE.MeshStandardMaterial({
      color: 0x3f6331,
      roughness: 0.82,
      side: THREE.DoubleSide
    }),
    cycadCrown: new THREE.MeshStandardMaterial({
      color: 0x4c6b35,
      roughness: 0.8,
      side: THREE.DoubleSide
    })
  };

  // 1. Terrain Mesh with vertex-painted trails & forest floor
  buildTerrain(scene);

  // 2. Small Pond / Stream Feature
  buildPond(scene);

  // 3. Five Interactive Outpost Stations + Landmarks
  buildWelcomeCamp(scene, materials, collisionSystem, interactables);
  buildSteamStation(scene, materials, collisionSystem, interactables);
  buildCommunityOutpost(scene, materials, collisionSystem, interactables);
  buildCompanionStation(scene, materials, collisionSystem, interactables);
  buildDepartureGate(scene, materials, collisionSystem, interactables);

  // 4. Instanced Prehistoric Vegetation & Boulders
  buildInstancedForest(scene, materials, collisionSystem, rand);

  // 5. Anthropomorphic Dinosaur Guide (SavageZed) & Random Malaysian Flags
  const updateSavageZed = buildSavageZedNPC(scene, collisionSystem, interactables);
  const updateFlags = buildRandomMalaysiaFlags(scene, collisionSystem, 9);

  return {
    interactables,
    animatedUpdaters: [updateSavageZed, updateFlags]
  };
}

function buildTerrain(scene) {
  const size = 180;
  const segments = 140;
  const geo = new THREE.PlaneGeometry(size, size, segments, segments);
  geo.rotateX(-Math.PI / 2);

  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const forestColor = new THREE.Color(0x3a4d2c);
  const mossColor = new THREE.Color(0x495b34);
  const trailColor = new THREE.Color(0x5c4a35);
  const rockTint = new THREE.Color(0x565a52);
  const temp = new THREE.Color();

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const y = getTerrainHeight(x, z);
    pos.setY(i, y);

    const trailDist = minTrailDistance(x, z);
    const pondDist = Math.hypot(x + 22, z - 20);
    const noise = (Math.sin(x * 0.31) * Math.cos(z * 0.27) + 1) * 0.5;

    temp.copy(forestColor).lerp(mossColor, noise * 0.65);

    if (trailDist < 2.2) {
      const blend = 1 - Math.max(0, (trailDist - 1.0) / 1.2);
      temp.lerp(trailColor, blend * 0.85);
    }

    if (pondDist < 9.5) {
      temp.lerp(rockTint, 0.55);
    }

    colors[i * 3] = temp.r;
    colors[i * 3 + 1] = temp.g;
    colors[i * 3 + 2] = temp.b;
  }

  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.computeVertexNormals();

  const mat = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.96,
    metalness: 0.02
  });

  const terrain = new THREE.Mesh(geo, mat);
  terrain.receiveShadow = true;
  scene.add(terrain);
}

function buildPond(scene) {
  const pondGeo = new THREE.CircleGeometry(7.2, 28);
  pondGeo.rotateX(-Math.PI / 2);
  const pondMat = new THREE.MeshStandardMaterial({
    color: 0x2d453f,
    roughness: 0.16,
    metalness: 0.25,
    transparent: true,
    opacity: 0.86
  });
  const pond = new THREE.Mesh(pondGeo, pondMat);
  pond.position.set(-22, -0.35, 20);
  pond.receiveShadow = true;
  scene.add(pond);
}

function addLantern(parent, x, y, z, materials, withPointLight = false) {
  const housing = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.34, 0.24), materials.metalDark);
  housing.position.set(x, y, z);
  parent.add(housing);

  const glow = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.2, 0.16), materials.lanternGlass);
  glow.position.set(x, y, z);
  parent.add(glow);

  if (withPointLight) {
    const light = new THREE.PointLight(0xffb85c, 2.2, 13, 1.6);
    light.position.set(x, y - 0.1, z);
    parent.add(light);
  }
}

function registerStation(destIndex, meshGroup, targetMesh, interactables) {
  const dest = DESTINATIONS[destIndex];
  const worldPos = new THREE.Vector3();
  targetMesh.getWorldPosition(worldPos);
  interactables.push({
    destination: dest,
    group: meshGroup,
    target: targetMesh,
    worldPosition: worldPos
  });
}

function buildWelcomeCamp(scene, m, collision, interactables) {
  const dest = DESTINATIONS[0];
  const y = getTerrainHeight(dest.position.x, dest.position.z);
  const group = new THREE.Group();
  group.position.set(dest.position.x, y, dest.position.z);

  // Raised timber deck platform
  const deck = new THREE.Mesh(new THREE.BoxGeometry(7.2, 0.3, 6.2), m.timberDark);
  deck.position.set(0, 0.15, -1.8);
  deck.castShadow = true;
  deck.receiveShadow = true;
  group.add(deck);

  // Main wooden research cabin
  const cabinBody = new THREE.Mesh(new THREE.BoxGeometry(6.0, 2.8, 4.4), m.timberWeathered);
  cabinBody.position.set(0, 1.7, -2.2);
  cabinBody.castShadow = true;
  cabinBody.receiveShadow = true;
  group.add(cabinBody);

  // Pitched cabin roof
  const roof = new THREE.Mesh(new THREE.ConeGeometry(4.7, 1.8, 4), m.shingle);
  roof.rotation.y = Math.PI / 4;
  roof.position.set(0, 4.0, -2.2);
  roof.castShadow = true;
  group.add(roof);

  // Front expedition noticeboard (primary interactive anchor)
  const boardGroup = new THREE.Group();
  boardGroup.position.set(0, 0, 1.8);

  const postL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 2.5, 0.18), m.timberDark);
  postL.position.set(-1.35, 1.25, 0);
  postL.castShadow = true;
  boardGroup.add(postL);

  const postR = postL.clone();
  postR.position.x = 1.35;
  boardGroup.add(postR);

  const boardFrame = new THREE.Mesh(new THREE.BoxGeometry(2.8, 1.55, 0.14), m.timberWeathered);
  boardFrame.position.set(0, 1.65, 0);
  boardFrame.castShadow = true;
  boardGroup.add(boardFrame);

  const boardFace = new THREE.Mesh(new THREE.BoxGeometry(2.5, 1.3, 0.16), m.boardSlate);
  boardFace.position.set(0, 1.65, 0);
  boardGroup.add(boardFace);

  // Pinned field notes on board
  const note1 = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.8, 0.02), m.noticePaper);
  note1.position.set(-0.65, 1.7, 0.09);
  boardGroup.add(note1);

  const note2 = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.55, 0.02), m.noticeAmber);
  note2.position.set(0.35, 1.8, 0.09);
  boardGroup.add(note2);

  const boardRoof = new THREE.Mesh(new THREE.BoxGeometry(3.15, 0.16, 0.7), m.shingle);
  boardRoof.position.set(0, 2.55, 0);
  boardRoof.castShadow = true;
  boardGroup.add(boardRoof);

  addLantern(boardGroup, 1.35, 2.32, 0.25, m, true);
  group.add(boardGroup);

  // Equipment crates beside cabin
  const crate1 = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.85, 0.95), m.plankLight);
  crate1.position.set(-2.6, 0.72, 0.6);
  crate1.castShadow = true;
  crate1.receiveShadow = true;
  group.add(crate1);

  const crate2 = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.65, 0.7), m.timberWeathered);
  crate2.position.set(-2.5, 1.47, 0.55);
  crate2.rotation.y = 0.28;
  crate2.castShadow = true;
  group.add(crate2);

  scene.add(group);
  group.updateMatrixWorld(true);

  collision.addBox(dest.position.x, dest.position.z - 2.2, 6.4, 4.8, 'welcome-cabin');
  collision.addBox(dest.position.x, dest.position.z + 1.8, 3.0, 0.6, 'welcome-board');
  collision.addBox(dest.position.x - 2.6, dest.position.z + 0.6, 1.1, 1.1, 'welcome-crates');

  registerStation(0, group, boardFace, interactables);
}

function buildSteamStation(scene, m, collision, interactables) {
  const dest = DESTINATIONS[1];
  const y = getTerrainHeight(dest.position.x, dest.position.z);
  const group = new THREE.Group();
  group.position.set(dest.position.x, y, dest.position.z);
  group.rotation.y = 0.52;

  // Open-sided wooden workstation shelter
  const base = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.22, 3.6), m.timberDark);
  base.position.set(0, 0.11, 0);
  base.receiveShadow = true;
  group.add(base);

  for (const [px, pz] of [[-1.9, -1.5], [1.9, -1.5], [-1.9, 1.5], [1.9, 1.5]]) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.2, 2.7, 0.2), m.timberDark);
    post.position.set(px, 1.4, pz);
    post.castShadow = true;
    group.add(post);
  }

  const roof = new THREE.Mesh(new THREE.BoxGeometry(4.9, 0.22, 4.1), m.shingle);
  roof.position.set(0, 2.8, 0);
  roof.rotation.x = 0.08;
  roof.castShadow = true;
  group.add(roof);

  // Desk & computer terminal
  const desk = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.9, 1.0), m.timberWeathered);
  desk.position.set(0, 0.67, -0.4);
  desk.castShadow = true;
  desk.receiveShadow = true;
  group.add(desk);

  const monitorCase = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.72, 0.14), m.metalDark);
  monitorCase.position.set(0, 1.55, -0.45);
  monitorCase.castShadow = true;
  group.add(monitorCase);

  const screen = new THREE.Mesh(new THREE.BoxGeometry(1.02, 0.58, 0.04), m.screenGlow);
  screen.position.set(0, 1.55, -0.38);
  group.add(screen);

  const tower = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.52, 0.52), m.metalDark);
  tower.position.set(0.85, 1.38, -0.42);
  tower.castShadow = true;
  group.add(tower);

  addLantern(group, -1.7, 2.35, 1.35, m, true);
  scene.add(group);
  group.updateMatrixWorld(true);

  collision.addBox(dest.position.x, dest.position.z, 3.6, 3.2, 'steam-station');
  registerStation(1, group, screen, interactables);
}

function buildCommunityOutpost(scene, m, collision, interactables) {
  const dest = DESTINATIONS[2];
  const y = getTerrainHeight(dest.position.x, dest.position.z);
  const group = new THREE.Group();
  group.position.set(dest.position.x, y, dest.position.z);
  group.rotation.y = -0.65;

  const base = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.22, 2.4), m.timberDark);
  base.position.set(0, 0.11, 0);
  base.receiveShadow = true;
  group.add(base);

  const postL = new THREE.Mesh(new THREE.BoxGeometry(0.22, 2.8, 0.22), m.timberDark);
  postL.position.set(-1.95, 1.5, 0);
  postL.castShadow = true;
  group.add(postL);

  const postR = postL.clone();
  postR.position.x = 1.95;
  group.add(postR);

  const panel = new THREE.Mesh(new THREE.BoxGeometry(3.8, 1.85, 0.18), m.boardSlate);
  panel.position.set(0, 1.75, 0);
  panel.castShadow = true;
  group.add(panel);

  // Two visual community plaques (IsleLink & Obsidian Isle)
  const cardL = new THREE.Mesh(new THREE.BoxGeometry(1.45, 1.3, 0.04), m.noticePaper);
  cardL.position.set(-0.9, 1.75, 0.1);
  group.add(cardL);

  const cardR = new THREE.Mesh(new THREE.BoxGeometry(1.45, 1.3, 0.04), m.noticeAmber);
  cardR.position.set(0.9, 1.75, 0.1);
  group.add(cardR);

  const roof = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.2, 1.4), m.shingle);
  roof.position.set(0, 2.95, 0);
  roof.castShadow = true;
  group.add(roof);

  addLantern(group, 0, 2.7, 0.45, m, true);
  scene.add(group);
  group.updateMatrixWorld(true);

  collision.addBox(dest.position.x, dest.position.z, 3.8, 2.0, 'community-outpost');
  registerStation(2, group, panel, interactables);
}

function buildCompanionStation(scene, m, collision, interactables) {
  const dest = DESTINATIONS[3];
  const y = getTerrainHeight(dest.position.x, dest.position.z);
  const group = new THREE.Group();
  group.position.set(dest.position.x, y, dest.position.z);
  group.rotation.y = -2.35;

  const deck = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.24, 3.4), m.timberDark);
  deck.position.set(0, 0.12, 0);
  deck.receiveShadow = true;
  group.add(deck);

  for (const [px, pz] of [[-1.8, -1.4], [1.8, -1.4], [-1.8, 1.4], [1.8, 1.4]]) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.18, 2.6, 0.18), m.timberDark);
    post.position.set(px, 1.4, pz);
    post.castShadow = true;
    group.add(post);
  }

  const roof = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.2, 3.8), m.shingle);
  roof.position.set(0, 2.75, 0);
  roof.castShadow = true;
  group.add(roof);

  const desk = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.9, 1.0), m.plankLight);
  desk.position.set(0, 0.67, -0.35);
  desk.castShadow = true;
  group.add(desk);

  const monitorL = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.56, 0.1), m.screenGlow);
  monitorL.position.set(-0.5, 1.48, -0.4);
  monitorL.rotation.y = 0.18;
  group.add(monitorL);

  const monitorR = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.56, 0.1), m.screenGlow);
  monitorR.position.set(0.5, 1.48, -0.4);
  monitorR.rotation.y = -0.18;
  group.add(monitorR);

  // Communications antenna mast
  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 3.2, 8), m.metalDark);
  mast.position.set(1.75, 2.9, -1.3);
  group.add(mast);

  addLantern(group, -1.65, 2.3, 1.25, m, true);
  scene.add(group);
  group.updateMatrixWorld(true);

  collision.addBox(dest.position.x, dest.position.z, 3.8, 3.2, 'companion-station');
  registerStation(3, group, desk, interactables);
}

function buildDepartureGate(scene, m, collision, interactables) {
  const dest = DESTINATIONS[4];
  const y = getTerrainHeight(dest.position.x, dest.position.z);
  const group = new THREE.Group();
  group.position.set(dest.position.x, y, dest.position.z);

  // Heavy twin timber gate pillars
  const pillarL = new THREE.Mesh(new THREE.BoxGeometry(0.55, 4.4, 0.55), m.timberDark);
  pillarL.position.set(-2.6, 2.2, 0);
  pillarL.castShadow = true;
  group.add(pillarL);

  const pillarR = pillarL.clone();
  pillarR.position.x = 2.6;
  group.add(pillarR);

  // Overhead crossbeam & signboard
  const crossbeam = new THREE.Mesh(new THREE.BoxGeometry(6.6, 0.5, 0.55), m.timberWeathered);
  crossbeam.position.set(0, 4.2, 0);
  crossbeam.castShadow = true;
  group.add(crossbeam);

  const plaque = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.72, 0.18), m.noticeAmber);
  plaque.position.set(0, 4.2, 0.3);
  group.add(plaque);

  // Side checklist lectern
  const lectern = new THREE.Mesh(new THREE.BoxGeometry(0.95, 1.25, 0.65), m.timberWeathered);
  lectern.position.set(-1.6, 0.62, 0.9);
  lectern.castShadow = true;
  group.add(lectern);

  const checklistPage = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.08, 0.5), m.noticePaper);
  checklistPage.position.set(-1.6, 1.27, 0.92);
  checklistPage.rotation.x = 0.25;
  group.add(checklistPage);

  // Stone cairns flanking the gate
  const cairnL = new THREE.Mesh(new THREE.DodecahedronGeometry(0.95, 0), m.stone);
  cairnL.position.set(-3.4, 0.6, 0.4);
  cairnL.castShadow = true;
  group.add(cairnL);

  const cairnR = cairnL.clone();
  cairnR.position.x = 3.4;
  group.add(cairnR);

  addLantern(group, -2.6, 3.4, 0.42, m, true);
  addLantern(group, 2.6, 3.4, 0.42, m, false);

  scene.add(group);
  group.updateMatrixWorld(true);

  collision.addBox(dest.position.x - 2.9, dest.position.z, 1.5, 1.5, 'gate-pillar-left');
  collision.addBox(dest.position.x + 2.9, dest.position.z, 1.5, 1.5, 'gate-pillar-right');
  collision.addBox(dest.position.x - 1.6, dest.position.z + 0.9, 1.1, 0.9, 'gate-lectern');

  registerStation(4, group, lectern, interactables);
}

function buildInstancedForest(scene, m, collision, rand) {
  const treeCount = 190;
  const fernCount = 320;
  const rockCount = 55;

  // Conifer trunk + 3 stacked needle tiers
  const trunkGeo = new THREE.CylinderGeometry(0.18, 0.34, 4.4, 7);
  trunkGeo.translate(0, 2.2, 0);
  const tier1Geo = new THREE.ConeGeometry(2.1, 3.6, 7);
  tier1Geo.translate(0, 4.6, 0);
  const tier2Geo = new THREE.ConeGeometry(1.6, 3.0, 7);
  tier2Geo.translate(0, 6.4, 0);
  const tier3Geo = new THREE.ConeGeometry(1.0, 2.3, 7);
  tier3Geo.translate(0, 8.0, 0);

  const trunkInst = new THREE.InstancedMesh(trunkGeo, m.trunk, treeCount);
  const tier1Inst = new THREE.InstancedMesh(tier1Geo, m.coniferNeedles, treeCount);
  const tier2Inst = new THREE.InstancedMesh(tier2Geo, m.coniferNeedles, treeCount);
  const tier3Inst = new THREE.InstancedMesh(tier3Geo, m.coniferNeedles, treeCount);

  for (const inst of [trunkInst, tier1Inst, tier2Inst, tier3Inst]) {
    inst.castShadow = true;
    inst.receiveShadow = true;
  }

  const dummy = new THREE.Object3D();
  let placedTrees = 0;
  let attempts = 0;

  while (placedTrees < treeCount && attempts < 1600) {
    attempts++;
    const angle = rand() * Math.PI * 2;
    const radius = 11 + rand() * 58;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    if (minTrailDistance(x, z) < 4.2) continue;
    if (Math.hypot(x + 22, z - 20) < 9.5) continue; // Keep out of pond
    if (isNearStation(x, z, 7.2)) continue;

    const y = getTerrainHeight(x, z);
    const scale = 0.78 + rand() * 0.75;
    dummy.position.set(x, y - 0.15, z);
    dummy.rotation.set((rand() - 0.5) * 0.04, rand() * Math.PI * 2, (rand() - 0.5) * 0.04);
    dummy.scale.setScalar(scale);
    dummy.updateMatrix();

    trunkInst.setMatrixAt(placedTrees, dummy.matrix);
    tier1Inst.setMatrixAt(placedTrees, dummy.matrix);
    tier2Inst.setMatrixAt(placedTrees, dummy.matrix);
    tier3Inst.setMatrixAt(placedTrees, dummy.matrix);

    if (radius < 54) {
      collision.addCylinder(x, z, 0.42 * scale, 'conifer-trunk');
    }
    placedTrees++;
  }

  trunkInst.count = placedTrees;
  tier1Inst.count = placedTrees;
  tier2Inst.count = placedTrees;
  tier3Inst.count = placedTrees;
  scene.add(trunkInst, tier1Inst, tier2Inst, tier3Inst);

  // Prehistoric ferns & cycad clusters (crossed angled frond planes)
  const fernGeo = buildFernGeometry();
  const fernInst = new THREE.InstancedMesh(fernGeo, m.fernFrond, fernCount);
  fernInst.receiveShadow = true;

  let placedFerns = 0;
  attempts = 0;
  while (placedFerns < fernCount && attempts < 2000) {
    attempts++;
    const x = (rand() - 0.5) * 118;
    const z = (rand() - 0.5) * 118;
    if (minTrailDistance(x, z) < 2.1) continue;
    if (Math.hypot(x + 22, z - 20) < 7.8) continue;
    if (isNearStation(x, z, 4.8)) continue;

    const y = getTerrainHeight(x, z);
    const s = 0.65 + rand() * 0.95;
    dummy.position.set(x, y, z);
    dummy.rotation.set(0, rand() * Math.PI * 2, 0);
    dummy.scale.set(s, s * (0.8 + rand() * 0.5), s);
    dummy.updateMatrix();
    fernInst.setMatrixAt(placedFerns, dummy.matrix);
    placedFerns++;
  }
  fernInst.count = placedFerns;
  scene.add(fernInst);

  // Natural boulders & rocks
  const rockGeo = new THREE.DodecahedronGeometry(1, 0);
  const rockInst = new THREE.InstancedMesh(rockGeo, m.stone, rockCount);
  rockInst.castShadow = true;
  rockInst.receiveShadow = true;

  let placedRocks = 0;
  attempts = 0;
  while (placedRocks < rockCount && attempts < 800) {
    attempts++;
    const x = (rand() - 0.5) * 108;
    const z = (rand() - 0.5) * 108;
    if (minTrailDistance(x, z) < 3.4) continue;
    if (isNearStation(x, z, 6.2)) continue;

    const y = getTerrainHeight(x, z);
    const sx = 0.6 + rand() * 1.1;
    const sy = 0.45 + rand() * 0.85;
    const sz = 0.6 + rand() * 1.1;
    dummy.position.set(x, y + sy * 0.25, z);
    dummy.rotation.set(rand() * 0.4, rand() * Math.PI * 2, rand() * 0.4);
    dummy.scale.set(sx, sy, sz);
    dummy.updateMatrix();
    rockInst.setMatrixAt(placedRocks, dummy.matrix);

    if (Math.max(sx, sz) > 0.85) {
      collision.addCylinder(x, z, Math.max(sx, sz) * 0.78, 'boulder');
    }
    placedRocks++;
  }
  rockInst.count = placedRocks;
  scene.add(rockInst);
}

function isNearStation(x, z, minClearance) {
  for (const dest of DESTINATIONS) {
    if (Math.hypot(x - dest.position.x, z - dest.position.z) < minClearance) {
      return true;
    }
  }
  if (Math.hypot(x - SAVAGEZED_NPC.position.x, z - SAVAGEZED_NPC.position.z) < minClearance) {
    return true;
  }
  if (Math.hypot(x - SAVAGEZED_NPC.approach.x, z - SAVAGEZED_NPC.approach.z) < Math.max(3.5, minClearance * 0.7)) {
    return true;
  }
  return false;
}

function buildFernGeometry() {
  // Tapered arching fronds for instanced prehistoric ferns (all vertices y >= 0, no NaN normals)
  const blade = new THREE.PlaneGeometry(0.42, 1.0, 2, 4);
  blade.translate(0, 0.5, 0);
  const pos = blade.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const px = pos.getX(i);
    const py = Math.max(0, pos.getY(i));
    // Taper width toward base and pointed tip, and arch outward cleanly
    const taper = Math.sin(py * Math.PI) * 0.95 + 0.08;
    pos.setX(i, px * taper);
    pos.setZ(i, Math.pow(py, 1.65) * 0.55);
  }
  blade.computeVertexNormals();

  const mergedPositions = [];
  const mergedNormals = [];
  const mergedIndices = [];
  const bladeCount = 6;
  const mat4 = new THREE.Matrix4();

  for (let b = 0; b < bladeCount; b++) {
    const g = blade.clone();
    mat4.makeRotationY((b / bladeCount) * Math.PI * 2);
    g.applyMatrix4(mat4);

    const baseVertex = mergedPositions.length / 3;
    const p = g.attributes.position.array;
    const n = g.attributes.normal.array;
    const idx = g.index.array;

    for (let i = 0; i < p.length; i++) mergedPositions.push(p[i]);
    for (let i = 0; i < n.length; i++) mergedNormals.push(n[i]);
    for (let i = 0; i < idx.length; i++) mergedIndices.push(idx[i] + baseVertex);
  }

  const combined = new THREE.BufferGeometry();
  combined.setAttribute('position', new THREE.Float32BufferAttribute(mergedPositions, 3));
  combined.setAttribute('normal', new THREE.Float32BufferAttribute(mergedNormals, 3));
  combined.setIndex(mergedIndices);
  combined.computeVertexNormals();
  return combined;
}
