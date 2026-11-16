import * as THREE from 'three';
import { DESTINATIONS, SAVAGEZED_NPC } from '../data/tutorialContent.js';
import { createOutpostMaterials } from './materials.js';
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
 * Merges indexed BufferGeometries (positions, normals, UVs, indices) into one mesh geometry
 * so complex organic multi-plane trees/ferns/foliage stay within a single InstancedMesh draw call.
 */
function mergeIndexedGeometries(geometries) {
  const mergedPositions = [];
  const mergedNormals = [];
  const mergedUVs = [];
  const mergedIndices = [];

  for (const g of geometries) {
    const baseVertex = mergedPositions.length / 3;
    const p = g.attributes.position.array;
    const n = g.attributes.normal.array;
    const u = g.attributes.uv ? g.attributes.uv.array : null;
    const idx = g.index.array;

    for (let i = 0; i < p.length; i++) mergedPositions.push(p[i]);
    for (let i = 0; i < n.length; i++) mergedNormals.push(n[i]);

    if (u) {
      for (let i = 0; i < u.length; i++) mergedUVs.push(u[i]);
    } else {
      const vCount = p.length / 3;
      for (let i = 0; i < vCount; i++) mergedUVs.push(0, 0);
    }

    for (let i = 0; i < idx.length; i++) mergedIndices.push(idx[i] + baseVertex);
  }

  const combined = new THREE.BufferGeometry();
  combined.setAttribute('position', new THREE.Float32BufferAttribute(mergedPositions, 3));
  combined.setAttribute('normal', new THREE.Float32BufferAttribute(mergedNormals, 3));
  combined.setAttribute('uv', new THREE.Float32BufferAttribute(mergedUVs, 2));
  combined.setIndex(mergedIndices);
  return combined;
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
  const rim = radial > 48 ? (radial - 48) * 0.18 : 0;

  return baseHills * (1 - flattenWeight * 0.85) + pondDip + rim;
}

/**
 * Builds the prehistoric terrain, animated water basin, instanced flora, and 5 stations.
 */
export function createPrehistoricWorld(scene, collisionSystem, options = {}) {
  const { isTouchDevice = false, renderer = null } = options;
  const rand = createSeededRandom(1842);
  const interactables = [];
  const materials = createOutpostMaterials();

  // 1. High-resolution Terrain Mesh with bump-mapped loam, trails & mossy clearing blend
  buildTerrain(scene, materials);

  // 2. Animated Forest Pond & Rocky Shoreline
  const updatePond = buildPond(scene, materials, rand);

  // 3. Five Interactive Outpost Stations + Landmarks
  buildWelcomeCamp(scene, materials, collisionSystem, interactables);
  buildSteamStation(scene, materials, collisionSystem, interactables);
  buildCommunityOutpost(scene, materials, collisionSystem, interactables);
  buildCompanionStation(scene, materials, collisionSystem, interactables);
  buildDepartureGate(scene, materials, collisionSystem, interactables);

  // 4. Instanced Organic Prehistoric Forest, Cycads, Ferns, Grass & Boulders
  buildInstancedForest(scene, materials, collisionSystem, rand, isTouchDevice);
  buildFallenLogs(scene, materials, collisionSystem, rand);

  // 5. Evrima Omniraptor Guide (SavageZed) & Waving Malaysian Flags
  const updateSavageZed = buildSavageZedNPC(scene, collisionSystem, interactables, materials, renderer);
  const updateFlags = buildRandomMalaysiaFlags(scene, collisionSystem, 9, materials);

  return {
    interactables,
    animatedUpdaters: [updatePond, updateSavageZed, updateFlags]
  };
}

function buildTerrain(scene, materials) {
  const size = 150;
  const segments = 196;
  const geo = new THREE.PlaneGeometry(size, size, segments, segments);
  geo.rotateX(-Math.PI / 2);

  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const forestColor = new THREE.Color(0x364928);
  const mossColor = new THREE.Color(0x4a5e32);
  const loamColor = new THREE.Color(0x3e3526);
  const trailColor = new THREE.Color(0x634f38);
  const gravelColor = new THREE.Color(0x565a52);
  const temp = new THREE.Color();

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const y = getTerrainHeight(x, z);
    pos.setY(i, y);

    const trailDist = minTrailDistance(x, z);
    const pondDist = Math.hypot(x + 22, z - 20);
    const noiseA = (Math.sin(x * 0.29 + 0.5) * Math.cos(z * 0.25 - 0.3) + 1) * 0.5;
    const noiseB = (Math.sin(x * 0.72 - z * 0.61) + 1) * 0.5;

    temp.copy(forestColor).lerp(mossColor, noiseA * 0.7);
    temp.lerp(loamColor, noiseB * 0.22);

    if (trailDist < 2.35) {
      const blend = 1 - Math.max(0, (trailDist - 0.95) / 1.4);
      temp.lerp(trailColor, blend * 0.88);
    }

    if (pondDist < 9.8) {
      const shoreBlend = Math.max(0, 1 - Math.max(0, (pondDist - 6.5) / 3.3));
      temp.lerp(gravelColor, shoreBlend * 0.65);
    }

    colors[i * 3] = temp.r;
    colors[i * 3 + 1] = temp.g;
    colors[i * 3 + 2] = temp.b;
  }

  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.computeVertexNormals();

  const mat = new THREE.MeshStandardMaterial({
    vertexColors: true,
    bumpMap: materials.terrainBump,
    bumpScale: 0.14,
    roughness: 0.95,
    metalness: 0.02
  });

  const terrain = new THREE.Mesh(geo, mat);
  terrain.receiveShadow = true;
  scene.add(terrain);
}

function buildPond(scene, materials, rand) {
  const cx = -22;
  const cz = 20;

  // Dark silt basin below water surface
  const bedGeo = new THREE.CircleGeometry(7.7, 36);
  bedGeo.rotateX(-Math.PI / 2);
  const bedMat = new THREE.MeshStandardMaterial({
    color: 0x202821,
    roughness: 0.98
  });
  const bed = new THREE.Mesh(bedGeo, bedMat);
  bed.position.set(cx, -0.58, cz);
  bed.receiveShadow = true;
  scene.add(bed);

  // Shimmering translucent water surface
  const pondGeo = new THREE.CircleGeometry(7.2, 42);
  pondGeo.rotateX(-Math.PI / 2);
  const pondMat = new THREE.MeshStandardMaterial({
    color: 0x25443d,
    emissive: 0x10211d,
    emissiveIntensity: 0.35,
    roughness: 0.09,
    metalness: 0.42,
    bumpMap: materials.terrainBump,
    bumpScale: 0.018,
    transparent: true,
    opacity: 0.84
  });
  const pond = new THREE.Mesh(pondGeo, pondMat);
  pond.position.set(cx, -0.35, cz);
  pond.receiveShadow = true;
  scene.add(pond);

  // Subtle concentric ripple ring
  const ringGeo = new THREE.RingGeometry(2.1, 2.24, 36);
  ringGeo.rotateX(-Math.PI / 2);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x9ec4b8,
    transparent: true,
    opacity: 0.18
  });
  const rippleRing = new THREE.Mesh(ringGeo, ringMat);
  rippleRing.position.set(cx - 0.8, -0.335, cz + 0.6);
  scene.add(rippleRing);

  // Natural shoreline pebbles & mossy rocks
  const rockGeo = buildOrganicBoulderGeometry();
  const shoreRockCount = 16;
  const shoreInst = new THREE.InstancedMesh(rockGeo, materials.stone, shoreRockCount);
  shoreInst.castShadow = true;
  shoreInst.receiveShadow = true;
  const dummy = new THREE.Object3D();

  for (let i = 0; i < shoreRockCount; i++) {
    const angle = (i / shoreRockCount) * Math.PI * 2 + (rand() - 0.5) * 0.25;
    const rad = 6.9 + rand() * 1.15;
    const rx = cx + Math.cos(angle) * rad;
    const rz = cz + Math.sin(angle) * rad;
    const ry = getTerrainHeight(rx, rz);

    dummy.position.set(rx, ry - 0.12, rz);
    dummy.rotation.set(rand() * Math.PI, rand() * Math.PI * 2, rand() * Math.PI);
    dummy.scale.set(0.32 + rand() * 0.48, 0.22 + rand() * 0.28, 0.32 + rand() * 0.48);
    dummy.updateMatrix();
    shoreInst.setMatrixAt(i, dummy.matrix);
  }
  scene.add(shoreInst);

  return (elapsed) => {
    pond.position.y = -0.35 + Math.sin(elapsed * 1.15) * 0.012;
    pond.rotation.y = elapsed * 0.018;
    const phase = (elapsed * 0.45) % 1;
    rippleRing.scale.setScalar(0.55 + phase * 1.65);
    ringMat.opacity = (1 - phase) * 0.22;
  };
}

/**
 * Adds a detailed wrought-iron bracket lantern with cap, cage frame, and warm glass core.
 */
function addLantern(parent, x, y, z, materials, withPointLight = false) {
  const lantern = new THREE.Group();
  lantern.position.set(x, y, z);

  // Metal top cap & hanging hook
  const cap = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.14, 8), materials.metalDark);
  cap.position.y = 0.2;
  lantern.add(cap);

  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.055, 0.014, 6, 12), materials.metalDark);
  ring.position.y = 0.29;
  lantern.add(ring);

  // Base tray
  const tray = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.05, 8), materials.metalDark);
  tray.position.y = -0.17;
  lantern.add(tray);

  // 4 thin protective frame bars
  for (const [bx, bz] of [[-0.1, -0.1], [0.1, -0.1], [-0.1, 0.1], [0.1, 0.1]]) {
    const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.32, 6), materials.metalDark);
    bar.position.set(bx, 0, bz);
    lantern.add(bar);
  }

  // Warm glowing glass cylinder
  const glow = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.085, 0.24, 10), materials.lanternGlass);
  lantern.add(glow);

  if (withPointLight) {
    const light = new THREE.PointLight(0xffb85c, 2.2, 13, 1.6);
    light.position.set(0, -0.08, 0);
    lantern.add(light);
  }

  parent.add(lantern);
}

/**
 * Shared architectural helper: builds a gabled double-slope shingle roof with gable walls,
 * ridge beam, and exposed rafter tails.
 */
function addGabledRoof(parent, opts, materials) {
  const {
    width,
    depth,
    ridgeHeight = 1.1,
    yBase = 2.75,
    zOffset = 0,
    overhangX = 0.35,
    overhangZ = 0.35
  } = opts;

  const halfW = width * 0.5 + overhangX;
  const slopeLen = Math.hypot(halfW, ridgeHeight);
  const angle = Math.atan2(ridgeHeight, halfW);
  const roofDepth = depth + overhangZ * 2;

  const roofGroup = new THREE.Group();
  roofGroup.position.set(0, yBase, zOffset);

  for (const side of [-1, 1]) {
    const slope = new THREE.Mesh(new THREE.BoxGeometry(slopeLen, 0.14, roofDepth), materials.shingle);
    slope.position.set(side * halfW * 0.5, ridgeHeight * 0.5, 0);
    slope.rotation.z = -side * angle;
    slope.castShadow = true;
    slope.receiveShadow = true;
    roofGroup.add(slope);
  }

  // Timber ridge beam along peak
  const ridgeBeam = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.22, roofDepth + 0.12), materials.timberDark);
  ridgeBeam.position.set(0, ridgeHeight + 0.04, 0);
  ridgeBeam.castShadow = true;
  roofGroup.add(ridgeBeam);

  // Triangular gable infill panels front & back
  const gableShape = new THREE.Shape();
  gableShape.moveTo(-width * 0.5, 0);
  gableShape.lineTo(width * 0.5, 0);
  gableShape.lineTo(0, (width * 0.5 / halfW) * ridgeHeight);
  gableShape.closePath();

  const gableGeo = new THREE.ExtrudeGeometry(gableShape, { depth: 0.14, bevelEnabled: false });
  for (const zPos of [-depth * 0.5 + 0.07, depth * 0.5 - 0.21]) {
    const gable = new THREE.Mesh(gableGeo, materials.timberWeathered);
    gable.position.set(0, 0, zPos);
    gable.castShadow = true;
    roofGroup.add(gable);
  }

  // Exposed rafter beams at both eaves
  const rafterCount = 4;
  for (let i = 0; i < rafterCount; i++) {
    const t = rafterCount === 1 ? 0 : i / (rafterCount - 1) - 0.5;
    const rz = t * (depth - 0.4);
    const rafter = new THREE.Mesh(new THREE.BoxGeometry(width + overhangX * 1.4, 0.1, 0.1), materials.timberDark);
    rafter.position.set(0, 0.05, rz);
    roofGroup.add(rafter);
  }

  parent.add(roofGroup);
}

/**
 * Adds a framed window with wooden mullions and warm ember pane glow.
 */
function addCabinWindow(parent, x, y, z, rotY, materials) {
  const win = new THREE.Group();
  win.position.set(x, y, z);
  win.rotation.y = rotY;

  const frame = new THREE.Mesh(new THREE.BoxGeometry(1.06, 0.92, 0.12), materials.timberDark);
  win.add(frame);

  const pane = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.72, 0.14), materials.lanternGlass);
  win.add(pane);

  const mullionV = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.76, 0.16), materials.timberDark);
  win.add(mullionV);
  const mullionH = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.06, 0.16), materials.timberDark);
  win.add(mullionH);

  parent.add(win);
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

  // Stone foundation plinth beneath timber deck
  const plinth = new THREE.Mesh(new THREE.BoxGeometry(7.6, 0.24, 6.6), m.stone);
  plinth.position.set(0, 0.1, -1.8);
  plinth.receiveShadow = true;
  group.add(plinth);

  // Raised planked deck platform + front entry step
  const deck = new THREE.Mesh(new THREE.BoxGeometry(7.2, 0.22, 6.2), m.timberDark);
  deck.position.set(0, 0.24, -1.8);
  deck.castShadow = true;
  deck.receiveShadow = true;
  group.add(deck);

  const step = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.16, 0.55), m.plankLight);
  step.position.set(0, 0.1, 1.45);
  step.receiveShadow = true;
  group.add(step);

  // Main wooden research cabin body
  const cabinBody = new THREE.Mesh(new THREE.BoxGeometry(5.9, 2.75, 4.3), m.timberWeathered);
  cabinBody.position.set(0, 1.72, -2.2);
  cabinBody.castShadow = true;
  cabinBody.receiveShadow = true;
  group.add(cabinBody);

  // Corner log posts & horizontal wall trim beams
  for (const [cx, cz] of [[-2.96, -4.35], [2.96, -4.35], [-2.96, -0.05], [2.96, -0.05]]) {
    const corner = new THREE.Mesh(new THREE.BoxGeometry(0.24, 2.85, 0.24), m.timberDark);
    corner.position.set(cx, 1.75, cz);
    corner.castShadow = true;
    group.add(corner);
  }

  // Front framed timber door & brass handle
  const doorFrame = new THREE.Mesh(new THREE.BoxGeometry(1.16, 2.08, 0.12), m.timberDark);
  doorFrame.position.set(0, 1.38, -0.04);
  group.add(doorFrame);

  const doorPanel = new THREE.Mesh(new THREE.BoxGeometry(0.96, 1.94, 0.15), m.plankLight);
  doorPanel.position.set(0, 1.35, -0.03);
  group.add(doorPanel);

  // Side & front framed windows
  addCabinWindow(group, -1.75, 1.85, -0.04, 0, m);
  addCabinWindow(group, 1.75, 1.85, -0.04, 0, m);
  addCabinWindow(group, -2.96, 1.85, -2.2, Math.PI / 2, m);
  addCabinWindow(group, 2.96, 1.85, -2.2, Math.PI / 2, m);

  // Detailed gabled shingle roof replacing blocky pyramid
  addGabledRoof(group, {
    width: 6.0,
    depth: 4.5,
    ridgeHeight: 1.55,
    yBase: 3.1,
    zOffset: -2.2,
    overhangX: 0.45,
    overhangZ: 0.48
  }, m);

  // Front expedition noticeboard (primary interactive anchor)
  const boardGroup = new THREE.Group();
  boardGroup.position.set(0, 0, 1.8);

  for (const px of [-1.35, 1.35]) {
    const footing = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.2, 0.32), m.stone);
    footing.position.set(px, 0.1, 0);
    boardGroup.add(footing);

    const post = new THREE.Mesh(new THREE.BoxGeometry(0.18, 2.55, 0.18), m.timberDark);
    post.position.set(px, 1.3, 0);
    post.castShadow = true;
    boardGroup.add(post);
  }

  const boardFrame = new THREE.Mesh(new THREE.BoxGeometry(2.85, 1.58, 0.14), m.timberWeathered);
  boardFrame.position.set(0, 1.65, 0);
  boardFrame.castShadow = true;
  boardGroup.add(boardFrame);

  const boardFace = new THREE.Mesh(new THREE.BoxGeometry(2.5, 1.3, 0.16), m.boardSlate);
  boardFace.position.set(0, 1.65, 0);
  boardGroup.add(boardFace);

  // Pinned field notes on board
  const note1 = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.8, 0.025), m.noticePaper);
  note1.position.set(-0.68, 1.7, 0.09);
  note1.rotation.z = 0.04;
  boardGroup.add(note1);

  const note2 = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.55, 0.025), m.noticeAmber);
  note2.position.set(0.28, 1.82, 0.09);
  note2.rotation.z = -0.03;
  boardGroup.add(note2);

  const note3 = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.42, 0.025), m.noticePaper);
  note3.position.set(0.62, 1.34, 0.09);
  boardGroup.add(note3);

  addGabledRoof(boardGroup, {
    width: 0.72,
    depth: 3.15,
    ridgeHeight: 0.32,
    yBase: 2.5,
    zOffset: 0,
    overhangX: 0.18,
    overhangZ: 0.12
  }, m);

  // Rotate board awning by 90 deg around Y? No, let's build small pitched canopy directly aligned along X:
  // Actually addGabledRoof ridge runs along Z by default, which works cleanly above boards too if swapped,
  // or add a sloped shingle awning hood:
  boardGroup.children[boardGroup.children.length - 1].rotation.y = Math.PI / 2;

  addLantern(boardGroup, 1.38, 2.15, 0.28, m, true);
  group.add(boardGroup);

  // Supply crates + wooden barrel beside cabin
  const crate1 = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.85, 0.95), m.plankLight);
  crate1.position.set(-2.6, 0.78, 0.6);
  crate1.castShadow = true;
  crate1.receiveShadow = true;
  group.add(crate1);

  const crate2 = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.65, 0.7), m.timberWeathered);
  crate2.position.set(-2.5, 1.52, 0.55);
  crate2.rotation.y = 0.28;
  crate2.castShadow = true;
  group.add(crate2);

  const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.34, 0.92, 14), m.timberWeathered);
  barrel.position.set(-1.68, 0.8, 0.62);
  barrel.castShadow = true;
  barrel.receiveShadow = true;
  group.add(barrel);

  for (const hy of [0.55, 1.05]) {
    const hoop = new THREE.Mesh(new THREE.CylinderGeometry(0.37, 0.37, 0.06, 14), m.metalDark);
    hoop.position.set(-1.68, hy, 0.62);
    group.add(hoop);
  }

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

  // Stone pad + wooden workstation deck
  const pad = new THREE.Mesh(new THREE.BoxGeometry(4.7, 0.18, 3.9), m.stone);
  pad.position.set(0, 0.08, 0);
  pad.receiveShadow = true;
  group.add(pad);

  const base = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.2, 3.6), m.timberDark);
  base.position.set(0, 0.22, 0);
  base.receiveShadow = true;
  group.add(base);

  // Corner posts + diagonal knee braces
  for (const [px, pz] of [[-1.9, -1.5], [1.9, -1.5], [-1.9, 1.5], [1.9, 1.5]]) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.2, 2.65, 0.2), m.timberDark);
    post.position.set(px, 1.5, pz);
    post.castShadow = true;
    group.add(post);

    const brace = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.65, 0.12), m.timberWeathered);
    brace.position.set(px * 0.86, 2.52, pz);
    brace.rotation.z = px > 0 ? 0.68 : -0.68;
    group.add(brace);
  }

  // Timber header beams & gabled shingle canopy roof
  for (const bz of [-1.5, 1.5]) {
    const beam = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.16, 0.16), m.timberDark);
    beam.position.set(0, 2.75, bz);
    group.add(beam);
  }

  addGabledRoof(group, {
    width: 4.1,
    depth: 3.5,
    ridgeHeight: 0.95,
    yBase: 2.8,
    zOffset: 0,
    overhangX: 0.42,
    overhangZ: 0.35
  }, m);

  // Desk & computer terminal with keyboard, mouse, and tower grille
  const deskTop = new THREE.Mesh(new THREE.BoxGeometry(2.55, 0.12, 1.05), m.plankLight);
  deskTop.position.set(0, 1.08, -0.4);
  deskTop.castShadow = true;
  deskTop.receiveShadow = true;
  group.add(deskTop);

  const deskPanel = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.78, 0.85), m.timberWeathered);
  deskPanel.position.set(0, 0.68, -0.44);
  deskPanel.castShadow = true;
  deskPanel.receiveShadow = true;
  group.add(deskPanel);

  const monitorStand = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.18, 0.24, 10), m.metalDark);
  monitorStand.position.set(0, 1.22, -0.46);
  group.add(monitorStand);

  const monitorCase = new THREE.Mesh(new THREE.BoxGeometry(1.18, 0.74, 0.14), m.metalDark);
  monitorCase.position.set(0, 1.62, -0.45);
  monitorCase.castShadow = true;
  group.add(monitorCase);

  const screen = new THREE.Mesh(new THREE.BoxGeometry(1.04, 0.6, 0.04), m.screenGlow);
  screen.position.set(0, 1.62, -0.37);
  group.add(screen);

  const keyboard = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.04, 0.2), m.metalDark);
  keyboard.position.set(-0.08, 1.16, -0.15);
  keyboard.rotation.x = 0.08;
  group.add(keyboard);

  const tower = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.56, 0.52), m.metalDark);
  tower.position.set(0.88, 1.42, -0.42);
  tower.castShadow = true;
  group.add(tower);

  const towerLed = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.34, 0.02), m.screenGlow);
  towerLed.position.set(0.88, 1.42, -0.15);
  group.add(towerLed);

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

  const pad = new THREE.Mesh(new THREE.BoxGeometry(5.1, 0.18, 2.7), m.stone);
  pad.position.set(0, 0.08, 0);
  pad.receiveShadow = true;
  group.add(pad);

  const base = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.2, 2.4), m.timberDark);
  base.position.set(0, 0.22, 0);
  base.receiveShadow = true;
  group.add(base);

  for (const px of [-2.1, 2.1]) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.24, 2.9, 0.24), m.timberDark);
    post.position.set(px, 1.65, -0.2);
    post.castShadow = true;
    group.add(post);

    const brace = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.72, 0.14), m.timberWeathered);
    brace.position.set(px * 0.85, 2.75, -0.2);
    brace.rotation.z = px > 0 ? 0.65 : -0.65;
    group.add(brace);
  }

  const boardFrame = new THREE.Mesh(new THREE.BoxGeometry(4.1, 1.85, 0.18), m.timberWeathered);
  boardFrame.position.set(0, 1.78, -0.2);
  boardFrame.castShadow = true;
  group.add(boardFrame);

  const boardFace = new THREE.Mesh(new THREE.BoxGeometry(3.75, 1.55, 0.2), m.boardSlate);
  boardFace.position.set(0, 1.78, -0.2);
  group.add(boardFace);

  // Notice flyers pinned to the community bulletin board
  for (const [fx, fy, fw, fh, mat, rot] of [
    [-1.18, 1.92, 0.75, 0.88, m.noticePaper, 0.04],
    [-0.12, 1.86, 0.85, 0.72, m.noticeAmber, -0.02],
    [0.98, 1.76, 0.78, 0.9, m.noticePaper, 0.03]
  ]) {
    const flyer = new THREE.Mesh(new THREE.BoxGeometry(fw, fh, 0.025), mat);
    flyer.position.set(fx, fy, -0.09);
    flyer.rotation.z = rot;
    group.add(flyer);
  }

  // Timber bench in front of bulletin board
  const benchSeat = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.1, 0.56), m.plankLight);
  benchSeat.position.set(0, 0.62, 0.78);
  benchSeat.castShadow = true;
  group.add(benchSeat);

  for (const bx of [-0.95, 0.95]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.44, 0.48), m.timberDark);
    leg.position.set(bx, 0.4, 0.78);
    group.add(leg);
  }

  // Gabled canopy shelter oriented along board width
  const canopyGroup = new THREE.Group();
  addGabledRoof(canopyGroup, {
    width: 1.85,
    depth: 4.8,
    ridgeHeight: 0.65,
    yBase: 2.95,
    zOffset: 0,
    overhangX: 0.28,
    overhangZ: 0.22
  }, m);
  canopyGroup.rotation.y = Math.PI / 2;
  canopyGroup.position.z = -0.15;
  group.add(canopyGroup);

  addLantern(group, -1.9, 2.55, 0.5, m, true);
  addLantern(group, 1.9, 2.55, 0.5, m, false);

  scene.add(group);
  group.updateMatrixWorld(true);

  collision.addBox(dest.position.x, dest.position.z, 4.4, 2.4, 'community-outpost');
  registerStation(2, group, boardFace, interactables);
}

function buildCompanionStation(scene, m, collision, interactables) {
  const dest = DESTINATIONS[3];
  const y = getTerrainHeight(dest.position.x, dest.position.z);
  const group = new THREE.Group();
  group.position.set(dest.position.x, y, dest.position.z);
  group.rotation.y = -2.35;

  const pad = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.18, 3.7), m.stone);
  pad.position.set(0, 0.08, 0);
  pad.receiveShadow = true;
  group.add(pad);

  const deck = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.22, 3.4), m.timberDark);
  deck.position.set(0, 0.22, 0);
  deck.receiveShadow = true;
  group.add(deck);

  for (const [px, pz] of [[-1.8, -1.4], [1.8, -1.4], [-1.8, 1.4], [1.8, 1.4]]) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.18, 2.6, 0.18), m.timberDark);
    post.position.set(px, 1.5, pz);
    post.castShadow = true;
    group.add(post);
  }

  addGabledRoof(group, {
    width: 3.9,
    depth: 3.3,
    ridgeHeight: 0.9,
    yBase: 2.75,
    zOffset: 0,
    overhangX: 0.4,
    overhangZ: 0.35
  }, m);

  // Dual-monitor tactical companion console desk
  const desk = new THREE.Mesh(new THREE.BoxGeometry(2.55, 0.88, 1.02), m.plankLight);
  desk.position.set(0, 0.74, -0.35);
  desk.castShadow = true;
  desk.receiveShadow = true;
  group.add(desk);

  for (const [mx, rotY] of [[-0.54, 0.18], [0.54, -0.18]]) {
    const bezel = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.62, 0.1), m.metalDark);
    bezel.position.set(mx, 1.54, -0.42);
    bezel.rotation.y = rotY;
    bezel.castShadow = true;
    group.add(bezel);

    const screen = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.52, 0.03), m.screenGlow);
    screen.position.set(mx, 1.54, -0.36);
    screen.rotation.y = rotY;
    group.add(screen);
  }

  // Radio transceiver & antenna mast with crossbars and amber beacon
  const radio = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.22, 0.34), m.metalDark);
  radio.position.set(0, 1.28, -0.2);
  group.add(radio);

  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.065, 3.4, 12), m.metalDark);
  mast.position.set(1.75, 3.0, -1.3);
  group.add(mast);

  for (const cy of [3.95, 4.35]) {
    const crossbar = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.75, 8), m.metalDark);
    crossbar.rotation.z = Math.PI / 2;
    crossbar.position.set(1.75, cy, -1.3);
    group.add(crossbar);
  }

  const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 10), m.lanternGlass);
  beacon.position.set(1.75, 4.74, -1.3);
  group.add(beacon);

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

  // Heavy twin timber gate pillars with stone plinth footings
  for (const px of [-2.6, 2.6]) {
    const footing = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.42, 0.95), m.stone);
    footing.position.set(px, 0.21, 0);
    footing.castShadow = true;
    footing.receiveShadow = true;
    group.add(footing);

    const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.55, 4.45, 0.55), m.timberDark);
    pillar.position.set(px, 2.32, 0);
    pillar.castShadow = true;
    group.add(pillar);

    const brace = new THREE.Mesh(new THREE.BoxGeometry(0.24, 1.05, 0.24), m.timberWeathered);
    brace.position.set(px > 0 ? px - 0.38 : px + 0.38, 3.72, 0);
    brace.rotation.z = px > 0 ? -0.68 : 0.68;
    group.add(brace);
  }

  // Overhead double crossbeam & shingled gatehouse arch cap
  const crossbeam = new THREE.Mesh(new THREE.BoxGeometry(6.7, 0.52, 0.58), m.timberWeathered);
  crossbeam.position.set(0, 4.25, 0);
  crossbeam.castShadow = true;
  group.add(crossbeam);

  const gateRoof = new THREE.Group();
  addGabledRoof(gateRoof, {
    width: 1.45,
    depth: 6.9,
    ridgeHeight: 0.62,
    yBase: 4.5,
    zOffset: 0,
    overhangX: 0.28,
    overhangZ: 0.25
  }, m);
  gateRoof.rotation.y = Math.PI / 2;
  group.add(gateRoof);

  const plaqueFrame = new THREE.Mesh(new THREE.BoxGeometry(3.65, 0.88, 0.16), m.timberDark);
  plaqueFrame.position.set(0, 4.25, 0.28);
  group.add(plaqueFrame);

  const plaque = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.7, 0.2), m.noticeAmber);
  plaque.position.set(0, 4.25, 0.32);
  group.add(plaque);

  // Side checklist lectern with angled top
  const lecternBase = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.18, 0.8), m.stone);
  lecternBase.position.set(-1.6, 0.09, 0.9);
  group.add(lecternBase);

  const lectern = new THREE.Mesh(new THREE.BoxGeometry(0.92, 1.18, 0.6), m.timberWeathered);
  lectern.position.set(-1.6, 0.68, 0.9);
  lectern.castShadow = true;
  group.add(lectern);

  const lecternTop = new THREE.Mesh(new THREE.BoxGeometry(1.06, 0.12, 0.72), m.plankLight);
  lecternTop.position.set(-1.6, 1.28, 0.9);
  lecternTop.rotation.x = 0.22;
  group.add(lecternTop);

  const checklistPage = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.04, 0.5), m.noticePaper);
  checklistPage.position.set(-1.6, 1.35, 0.91);
  checklistPage.rotation.x = 0.22;
  group.add(checklistPage);

  addLantern(group, -2.05, 3.65, 0.48, m, true);
  addLantern(group, 2.05, 3.65, 0.48, m, false);

  scene.add(group);
  group.updateMatrixWorld(true);

  collision.addBox(dest.position.x - 2.6, dest.position.z, 1.0, 1.0, 'gate-pillar-l');
  collision.addBox(dest.position.x + 2.6, dest.position.z, 1.0, 1.0, 'gate-pillar-r');
  collision.addBox(dest.position.x - 1.6, dest.position.z + 0.9, 1.1, 0.9, 'gate-lectern');

  registerStation(4, group, plaque, interactables);
}

/**
 * Checks minimum clearance against all 5 stations + SavageZed NPC + player conversation sightline.
 */
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

/**
 * Builds dense prehistoric forest trees (12-segment textured trunks + drooping pine-bough foliage cards),
 * lush UV-mapped fern rosettes, prehistoric cycad palms, meadow grass tufts, and sculpted mossy boulders.
 */
function buildInstancedForest(scene, m, collision, rand, isTouchDevice = false) {
  const treeCount = isTouchDevice ? 115 : 165;
  const fernCount = isTouchDevice ? 130 : 210;
  const cycadCount = isTouchDevice ? 36 : 56;
  const grassCount = isTouchDevice ? 175 : 290;
  const boulderCount = isTouchDevice ? 38 : 54;

  // 1. Conifer Trees: smooth tapered bark trunks + flared root collar + multi-whorl foliage boughs
  const trunkGeo = buildConiferTrunkGeometry();
  const canopyGeo = buildConiferCanopyGeometry();

  const trunkInst = new THREE.InstancedMesh(trunkGeo, m.trunk, treeCount);
  const canopyInst = new THREE.InstancedMesh(canopyGeo, m.coniferBough, treeCount);
  trunkInst.castShadow = true;
  trunkInst.receiveShadow = true;
  canopyInst.castShadow = true;
  canopyInst.receiveShadow = true;

  const dummy = new THREE.Object3D();
  let placedTrees = 0;
  let attempts = 0;

  while (placedTrees < treeCount && attempts < 2800) {
    attempts++;
    const angle = rand() * Math.PI * 2;
    const radius = 12 + Math.pow(rand(), 0.75) * 52;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    if (minTrailDistance(x, z) < 3.6) continue;
    if (Math.hypot(x + 22, z - 20) < 8.8) continue;
    if (isNearStation(x, z, 6.8)) continue;

    const y = getTerrainHeight(x, z);
    const scale = 0.8 + rand() * 0.65;

    dummy.position.set(x, y - 0.15, z);
    dummy.rotation.set((rand() - 0.5) * 0.045, rand() * Math.PI * 2, (rand() - 0.5) * 0.045);
    dummy.scale.setScalar(scale);
    dummy.updateMatrix();

    trunkInst.setMatrixAt(placedTrees, dummy.matrix);
    canopyInst.setMatrixAt(placedTrees, dummy.matrix);

    if (radius < 54) {
      collision.addCylinder(x, z, 0.42 * scale, 'conifer-trunk');
    }
    placedTrees++;
  }

  trunkInst.count = placedTrees;
  canopyInst.count = placedTrees;
  scene.add(trunkInst, canopyInst);

  // 2. Understory Feathery Ferns (UV-mapped curved rosettes)
  const fernGeo = buildFernGeometry();
  const fernInst = new THREE.InstancedMesh(fernGeo, m.fernFrond, fernCount);
  fernInst.receiveShadow = true;

  let placedFerns = 0;
  attempts = 0;
  while (placedFerns < fernCount && attempts < 2200) {
    attempts++;
    const x = (rand() - 0.5) * 118;
    const z = (rand() - 0.5) * 118;
    if (minTrailDistance(x, z) < 2.15) continue;
    if (Math.hypot(x + 22, z - 20) < 7.6) continue;
    if (isNearStation(x, z, 4.8)) continue;

    const y = getTerrainHeight(x, z);
    const scale = 0.75 + rand() * 0.95;

    dummy.position.set(x, y - 0.05, z);
    dummy.rotation.set((rand() - 0.5) * 0.12, rand() * Math.PI * 2, (rand() - 0.5) * 0.12);
    dummy.scale.setScalar(scale);
    dummy.updateMatrix();

    fernInst.setMatrixAt(placedFerns, dummy.matrix);
    placedFerns++;
  }

  fernInst.count = placedFerns;
  scene.add(fernInst);

  // 3. Prehistoric Cycad Palms (textured short stem + feathery crown)
  const cycadStemGeo = new THREE.CylinderGeometry(0.18, 0.28, 1.1, 10);
  cycadStemGeo.translate(0, 0.55, 0);
  const cycadCrownGeo = buildCycadCrownGeometry();

  const cycadStemInst = new THREE.InstancedMesh(cycadStemGeo, m.trunk, cycadCount);
  const cycadCrownInst = new THREE.InstancedMesh(cycadCrownGeo, m.cycadFrond, cycadCount);
  cycadStemInst.castShadow = true;
  cycadCrownInst.castShadow = true;
  cycadCrownInst.receiveShadow = true;

  let placedCycads = 0;
  attempts = 0;
  while (placedCycads < cycadCount && attempts < 1400) {
    attempts++;
    const x = (rand() - 0.5) * 106;
    const z = (rand() - 0.5) * 106;
    if (minTrailDistance(x, z) < 2.8) continue;
    if (Math.hypot(x + 22, z - 20) < 8.0) continue;
    if (isNearStation(x, z, 5.4)) continue;

    const y = getTerrainHeight(x, z);
    const scale = 0.85 + rand() * 0.7;

    dummy.position.set(x, y - 0.08, z);
    dummy.rotation.set((rand() - 0.5) * 0.08, rand() * Math.PI * 2, (rand() - 0.5) * 0.08);
    dummy.scale.setScalar(scale);
    dummy.updateMatrix();

    cycadStemInst.setMatrixAt(placedCycads, dummy.matrix);
    cycadCrownInst.setMatrixAt(placedCycads, dummy.matrix);
    placedCycads++;
  }

  cycadStemInst.count = placedCycads;
  cycadCrownInst.count = placedCycads;
  scene.add(cycadStemInst, cycadCrownInst);

  // 4. Forest Floor Grass Tufts (softens ground silhouette)
  const grassGeo = buildGrassTuftGeometry();
  const grassInst = new THREE.InstancedMesh(grassGeo, m.grassTuft, grassCount);
  grassInst.receiveShadow = true;

  let placedGrass = 0;
  attempts = 0;
  while (placedGrass < grassCount && attempts < 2200) {
    attempts++;
    const x = (rand() - 0.5) * 108;
    const z = (rand() - 0.5) * 108;
    if (minTrailDistance(x, z) < 1.65) continue;
    if (Math.hypot(x + 22, z - 20) < 7.1) continue;
    if (isNearStation(x, z, 4.1)) continue;

    const y = getTerrainHeight(x, z);
    const scale = 0.75 + rand() * 0.85;

    dummy.position.set(x, y - 0.04, z);
    dummy.rotation.set(0, rand() * Math.PI * 2, 0);
    dummy.scale.setScalar(scale);
    dummy.updateMatrix();

    grassInst.setMatrixAt(placedGrass, dummy.matrix);
    placedGrass++;
  }

  grassInst.count = placedGrass;
  scene.add(grassInst);

  // 5. Organic Sculpted Mossy Forest Boulders
  const rockGeo = buildOrganicBoulderGeometry();
  const rockInst = new THREE.InstancedMesh(rockGeo, m.stone, boulderCount);
  rockInst.castShadow = true;
  rockInst.receiveShadow = true;

  let placedRocks = 0;
  attempts = 0;
  while (placedRocks < boulderCount && attempts < 1400) {
    attempts++;
    const x = (rand() - 0.5) * 112;
    const z = (rand() - 0.5) * 112;
    if (minTrailDistance(x, z) < 2.8) continue;
    if (isNearStation(x, z, 5.5)) continue;

    const y = getTerrainHeight(x, z);
    const scale = 0.55 + rand() * 1.25;

    dummy.position.set(x, y + scale * 0.25, z);
    dummy.rotation.set(rand() * Math.PI, rand() * Math.PI, rand() * Math.PI);
    dummy.scale.set(scale * (0.9 + rand() * 0.35), scale * (0.62 + rand() * 0.3), scale * (0.9 + rand() * 0.35));
    dummy.updateMatrix();

    rockInst.setMatrixAt(placedRocks, dummy.matrix);
    if (Math.hypot(x, z) < 52) {
      collision.addCylinder(x, z, scale * 0.82, 'boulder');
    }
    placedRocks++;
  }

  rockInst.count = placedRocks;
  scene.add(rockInst);
}

/**
 * Adds fallen weathered logs in forest clearings for extra depth and natural cover.
 */
function buildFallenLogs(scene, m, collision, rand) {
  const logCount = 14;
  const logGeo = new THREE.CylinderGeometry(0.28, 0.36, 4.4, 12, 1);
  logGeo.rotateZ(Math.PI / 2);

  const logInst = new THREE.InstancedMesh(logGeo, m.trunk, logCount);
  logInst.castShadow = true;
  logInst.receiveShadow = true;
  const dummy = new THREE.Object3D();

  let placed = 0;
  let attempts = 0;
  while (placed < logCount && attempts < 900) {
    attempts++;
    const x = (rand() - 0.5) * 96;
    const z = (rand() - 0.5) * 96;
    if (minTrailDistance(x, z) < 4.5) continue;
    if (Math.hypot(x + 22, z - 20) < 9.5) continue;
    if (isNearStation(x, z, 7.2)) continue;

    const y = getTerrainHeight(x, z);
    const rotY = rand() * Math.PI * 2;
    const scale = 0.8 + rand() * 0.55;

    dummy.position.set(x, y + 0.14 * scale, z);
    dummy.rotation.set((rand() - 0.5) * 0.08, rotY, (rand() - 0.5) * 0.08);
    dummy.scale.setScalar(scale);
    dummy.updateMatrix();

    logInst.setMatrixAt(placed, dummy.matrix);
    if (Math.hypot(x, z) < 48) {
      collision.addCylinder(x, z, 0.85 * scale, 'fallen-log');
    }
    placed++;
  }

  logInst.count = placed;
  scene.add(logInst);
}

/**
 * Smooth 12-segment conifer trunk merged with flared basal root buttress.
 */
function buildConiferTrunkGeometry() {
  const mainTrunk = new THREE.CylinderGeometry(0.11, 0.4, 9.6, 12, 1);
  mainTrunk.translate(0, 4.8, 0);

  const rootFlare = new THREE.CylinderGeometry(0.36, 0.64, 1.35, 10, 1);
  rootFlare.translate(0, 0.65, 0);

  return mergeIndexedGeometries([mainTrunk, rootFlare]);
}

/**
 * Builds a multi-whorl drooping conifer canopy from curved UV-mapped pine-bough planes.
 */
function buildConiferCanopyGeometry() {
  const boughParts = [];
  const mat4 = new THREE.Matrix4();
  const rotMat = new THREE.Matrix4();

  const tiers = [
    { y: 3.8, count: 7, len: 2.85, width: 2.05, droop: 0.34, phase: 0.1 },
    { y: 5.1, count: 6, len: 2.45, width: 1.85, droop: 0.3, phase: 0.55 },
    { y: 6.35, count: 6, len: 2.05, width: 1.6, droop: 0.25, phase: 0.25 },
    { y: 7.5, count: 5, len: 1.6, width: 1.32, droop: 0.2, phase: 0.7 },
    { y: 8.6, count: 4, len: 1.15, width: 1.05, droop: 0.12, phase: 0.35 }
  ];

  for (const tier of tiers) {
    for (let i = 0; i < tier.count; i++) {
      const yaw = (i / tier.count) * Math.PI * 2 + tier.phase;
      const bough = new THREE.PlaneGeometry(tier.width, tier.len, 2, 3);
      bough.translate(0, tier.len * 0.5, 0);

      // Gentle downward curve along branch length (local +Z maps downward after +90° X rotation)
      const pos = bough.attributes.position;
      for (let v = 0; v < pos.count; v++) {
        const yVal = Math.max(0, pos.getY(v));
        const t = yVal / tier.len;
        pos.setZ(v, pos.getZ(v) + Math.pow(t, 1.7) * tier.len * 0.22);
      }
      bough.computeVertexNormals();

      // Orient: +Y points horizontally outward (+Z) & droops downward, slight twist for volume
      mat4.makeRotationY(yaw);
      rotMat.makeTranslation(0, tier.y, 0);
      mat4.premultiply(rotMat);

      const tiltX = Math.PI * 0.5 + tier.droop;
      const rollZ = (i % 2 === 0 ? 1 : -1) * 0.22;
      const localPitch = new THREE.Matrix4().makeRotationFromEuler(
        new THREE.Euler(tiltX, 0, rollZ, 'YXZ')
      );
      bough.applyMatrix4(localPitch);
      bough.applyMatrix4(mat4);

      boughParts.push(bough);
    }
  }

  return mergeIndexedGeometries(boughParts);
}

/**
 * Generates an arched rosette of pinnate prehistoric fern fronds with clean UV mapping.
 */
function buildFernGeometry() {
  const blade = new THREE.PlaneGeometry(0.68, 1.28, 2, 5);
  blade.translate(0, 0.64, 0);
  const pos = blade.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const py = Math.max(0, pos.getY(i));
    const t = py / 1.28;
    // Arch gracefully outward and droop slightly at tip
    pos.setZ(i, Math.pow(t, 1.55) * 0.68);
    pos.setY(i, py * (1 - t * 0.22));
  }
  blade.computeVertexNormals();

  const blades = [];
  const bladeCount = 7;
  const mat4 = new THREE.Matrix4();
  const tilt = new THREE.Matrix4();

  for (let b = 0; b < bladeCount; b++) {
    const g = blade.clone();
    tilt.makeRotationX(0.32 + (b % 2) * 0.16);
    mat4.makeRotationY((b / bladeCount) * Math.PI * 2);
    g.applyMatrix4(tilt);
    g.applyMatrix4(mat4);
    blades.push(g);
  }

  return mergeIndexedGeometries(blades);
}

/**
 * Generates an elevated ring of arched cycad fronds for top of cycad stem.
 */
function buildCycadCrownGeometry() {
  const blade = new THREE.PlaneGeometry(0.58, 1.55, 2, 5);
  blade.translate(0, 0.775, 0);
  const pos = blade.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const py = Math.max(0, pos.getY(i));
    const t = py / 1.55;
    pos.setZ(i, Math.pow(t, 1.45) * 0.92);
    pos.setY(i, py * (1 - t * 0.32));
  }
  blade.computeVertexNormals();

  const fronds = [];
  const frondCount = 9;
  const mat4 = new THREE.Matrix4();
  const lift = new THREE.Matrix4().makeTranslation(0, 1.02, 0);
  const tilt = new THREE.Matrix4();

  for (let b = 0; b < frondCount; b++) {
    const g = blade.clone();
    tilt.makeRotationX(0.58 + (b % 3) * 0.14);
    mat4.makeRotationY((b / frondCount) * Math.PI * 2);
    g.applyMatrix4(tilt);
    g.applyMatrix4(mat4);
    g.applyMatrix4(lift);
    fronds.push(g);
  }

  return mergeIndexedGeometries(fronds);
}

/**
 * Crossed curved grass-tuft blades for rich forest-floor ground cover.
 */
function buildGrassTuftGeometry() {
  const blades = [];
  const mat4 = new THREE.Matrix4();

  for (let b = 0; b < 3; b++) {
    const card = new THREE.PlaneGeometry(0.75, 0.62, 1, 2);
    card.translate(0, 0.31, 0);
    mat4.makeRotationY((b / 3) * Math.PI);
    card.applyMatrix4(mat4);
    blades.push(card);
  }
  return mergeIndexedGeometries(blades);
}

/**
 * Generates a high-detail organic boulder using continuous directional spherical noise
 * on an IcosahedronGeometry(1, 2) so seams stay watertight and smooth.
 */
function buildOrganicBoulderGeometry() {
  const geo = new THREE.IcosahedronGeometry(1, 2);
  const pos = geo.attributes.position;
  const dir = new THREE.Vector3();

  for (let i = 0; i < pos.count; i++) {
    dir.fromBufferAttribute(pos, i).normalize();
    const waveA = Math.sin(dir.x * 3.1 + dir.y * 2.4) * Math.cos(dir.z * 2.9);
    const waveB = Math.sin(dir.z * 5.2 - dir.x * 4.1) * 0.5;
    const disp = 1 + waveA * 0.18 + waveB * 0.09;
    pos.setXYZ(i, dir.x * disp, dir.y * disp, dir.z * disp);
  }

  geo.computeVertexNormals();
  return geo;
}
