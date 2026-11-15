import * as THREE from 'three';
import { getTerrainHeight } from './world.js';
import { DESTINATIONS, SAVAGEZED_NPC } from '../data/tutorialContent.js';

/**
 * Creates a procedural CanvasTexture of the Malaysian Flag (Jalur Gemilang):
 * 14 alternating red/white stripes, navy blue canton, yellow crescent and 14-point star.
 */
function createMalaysiaFlagTexture() {
  const width = 512;
  const height = 256;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const stripeHeight = height / 14;
  for (let i = 0; i < 14; i++) {
    ctx.fillStyle = i % 2 === 0 ? '#cc0001' : '#ffffff';
    ctx.fillRect(0, i * stripeHeight, width, Math.ceil(stripeHeight));
  }

  // Blue canton: 8 stripes high, half width
  const cantonW = width * 0.5;
  const cantonH = stripeHeight * 8;
  ctx.fillStyle = '#010066';
  ctx.fillRect(0, 0, cantonW, cantonH);

  // Yellow crescent
  const cx = cantonW * 0.42;
  const cy = cantonH * 0.5;
  const outerR = cantonH * 0.34;
  const innerR = cantonH * 0.27;

  ctx.fillStyle = '#ffcc00';
  ctx.beginPath();
  ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#010066';
  ctx.beginPath();
  ctx.arc(cx + outerR * 0.28, cy, innerR, 0, Math.PI * 2);
  ctx.fill();

  // 14-point star (Bintang Persekutuan)
  const starX = cantonW * 0.62;
  const starY = cy;
  const starOuter = cantonH * 0.24;
  const starInner = cantonH * 0.1;
  const points = 14;

  ctx.fillStyle = '#ffcc00';
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? starOuter : starInner;
    const angle = (i * Math.PI) / points - Math.PI / 2;
    const px = starX + Math.cos(angle) * r;
    const py = starY + Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

/**
 * Builds the anthropomorphic dinosaur guide "SavageZed" standing at Central Camp
 * with an explorer vest, satchel, subtle wave/tail-sway animation, and interaction target.
 */
export function buildSavageZedNPC(scene, collisionSystem, interactables) {
  const { x, z } = SAVAGEZED_NPC.position;
  const y = getTerrainHeight(x, z);

  const root = new THREE.Group();
  root.position.set(x, y, z);
  // Face slightly toward the incoming spawn trail
  root.rotation.y = -0.35;

  const skinMat = new THREE.MeshStandardMaterial({ color: 0x4b6e41, roughness: 0.78 });
  const bellyMat = new THREE.MeshStandardMaterial({ color: 0x9aa66b, roughness: 0.85 });
  const vestMat = new THREE.MeshStandardMaterial({ color: 0x6b5139, roughness: 0.88 });
  const scarfMat = new THREE.MeshStandardMaterial({ color: 0xc98d3a, roughness: 0.75 });
  const clawMat = new THREE.MeshStandardMaterial({ color: 0x262420, roughness: 0.6 });
  const eyeWhiteMat = new THREE.MeshStandardMaterial({ color: 0xf4f1e6, roughness: 0.35 });
  const pupilMat = new THREE.MeshStandardMaterial({ color: 0x191b18, roughness: 0.2 });

  // Legs (digitigrade stance)
  for (const side of [-1, 1]) {
    const thigh = new THREE.Mesh(new THREE.CapsuleGeometry(0.16, 0.38, 6, 10), skinMat);
    thigh.position.set(side * 0.22, 0.68, 0);
    thigh.rotation.x = -0.18;
    thigh.castShadow = true;
    root.add(thigh);

    const shin = new THREE.Mesh(new THREE.CapsuleGeometry(0.11, 0.42, 6, 10), skinMat);
    shin.position.set(side * 0.22, 0.28, -0.05);
    shin.rotation.x = 0.22;
    shin.castShadow = true;
    root.add(shin);

    const foot = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.1, 0.38), skinMat);
    foot.position.set(side * 0.22, 0.05, 0.08);
    foot.castShadow = true;
    root.add(foot);
  }

  // Torso group (animated gently for breathing)
  const upperBody = new THREE.Group();
  upperBody.position.set(0, 0.92, 0);
  root.add(upperBody);

  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.32, 0.46, 8, 12), skinMat);
  torso.position.set(0, 0.34, 0);
  torso.castShadow = true;
  upperBody.add(torso);

  const belly = new THREE.Mesh(new THREE.CapsuleGeometry(0.24, 0.38, 8, 10), bellyMat);
  belly.position.set(0, 0.32, 0.12);
  upperBody.add(belly);

  // Explorer Vest & Satchel Strap
  const vest = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.37, 0.56, 12), vestMat);
  vest.position.set(0, 0.36, -0.01);
  vest.castShadow = true;
  upperBody.add(vest);

  const neckerchief = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.055, 8, 16), scarfMat);
  neckerchief.rotation.x = Math.PI / 2 + 0.12;
  neckerchief.position.set(0, 0.68, 0.02);
  upperBody.add(neckerchief);

  // Tail (animated sway)
  const tailPivot = new THREE.Group();
  tailPivot.position.set(0, 0.08, -0.25);
  upperBody.add(tailPivot);

  const tailBase = new THREE.Mesh(new THREE.ConeGeometry(0.2, 1.25, 10), skinMat);
  tailBase.rotation.x = -Math.PI / 2 + 0.28;
  tailBase.position.set(0, -0.06, -0.58);
  tailBase.castShadow = true;
  tailPivot.add(tailBase);

  // Neck & Head
  const headPivot = new THREE.Group();
  headPivot.position.set(0, 0.72, 0.04);
  upperBody.add(headPivot);

  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.18, 0.28, 10), skinMat);
  neck.position.set(0, 0.1, 0);
  neck.castShadow = true;
  headPivot.add(neck);

  const cranium = new THREE.Mesh(new THREE.SphereGeometry(0.24, 14, 12), skinMat);
  cranium.position.set(0, 0.3, 0.04);
  cranium.scale.set(0.92, 0.9, 1.15);
  cranium.castShadow = true;
  headPivot.add(cranium);

  const snout = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.16, 0.36), skinMat);
  snout.position.set(0, 0.27, 0.28);
  snout.castShadow = true;
  headPivot.add(snout);

  const lowerJaw = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.08, 0.3), bellyMat);
  lowerJaw.position.set(0, 0.17, 0.25);
  lowerJaw.rotation.x = 0.08;
  headPivot.add(lowerJaw);

  // Friendly eyes
  for (const side of [-1, 1]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.055, 10, 10), eyeWhiteMat);
    eye.position.set(side * 0.15, 0.36, 0.18);
    headPivot.add(eye);

    const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 8), pupilMat);
    pupil.position.set(side * 0.165, 0.36, 0.22);
    headPivot.add(pupil);
  }

  // Head crest ridges
  for (let i = 0; i < 3; i++) {
    const crest = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.13, 6), scarfMat);
    crest.position.set(0, 0.49 - i * 0.04, 0.05 - i * 0.11);
    crest.rotation.x = -0.4;
    headPivot.add(crest);
  }

  // Left arm (resting casually)
  const leftArm = new THREE.Mesh(new THREE.CapsuleGeometry(0.075, 0.32, 6, 8), skinMat);
  leftArm.position.set(-0.38, 0.4, 0.1);
  leftArm.rotation.z = 0.35;
  leftArm.rotation.x = -0.35;
  leftArm.castShadow = true;
  upperBody.add(leftArm);

  // Right arm (friendly welcoming wave)
  const rightArmPivot = new THREE.Group();
  rightArmPivot.position.set(0.34, 0.56, 0.04);
  upperBody.add(rightArmPivot);

  const rightUpperArm = new THREE.Mesh(new THREE.CapsuleGeometry(0.075, 0.26, 6, 8), skinMat);
  rightUpperArm.position.set(0.14, 0.1, 0.06);
  rightUpperArm.rotation.z = -0.85;
  rightUpperArm.castShadow = true;
  rightArmPivot.add(rightUpperArm);

  const rightHand = new THREE.Mesh(new THREE.SphereGeometry(0.085, 8, 8), skinMat);
  rightHand.position.set(0.28, 0.22, 0.12);
  rightArmPivot.add(rightHand);

  const handClaw = new THREE.Mesh(new THREE.ConeGeometry(0.025, 0.07, 5), clawMat);
  handClaw.position.set(0.32, 0.27, 0.15);
  rightArmPivot.add(handClaw);

  // Small wooden name pedestal next to SavageZed
  const pedestal = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.85, 0.18), vestMat);
  pedestal.position.set(-0.92, 0.42, 0.2);
  pedestal.rotation.y = 0.2;
  pedestal.castShadow = true;
  root.add(pedestal);

  const lanternGlow = new THREE.Mesh(
    new THREE.BoxGeometry(0.16, 0.2, 0.16),
    new THREE.MeshStandardMaterial({ color: 0xffe4ad, emissive: 0xffb347, emissiveIntensity: 1.3 })
  );
  lanternGlow.position.set(-0.92, 0.96, 0.2);
  root.add(lanternGlow);

  const guideLight = new THREE.PointLight(0xffbe6b, 1.8, 10, 1.6);
  guideLight.position.set(-0.92, 1.15, 0.35);
  root.add(guideLight);

  scene.add(root);
  root.updateMatrixWorld(true);

  collisionSystem.addCylinder(x, z, 0.65, 'npc-savagezed');

  const worldPos = new THREE.Vector3();
  torso.getWorldPosition(worldPos);
  interactables.push({
    type: 'npc',
    destination: SAVAGEZED_NPC,
    group: root,
    target: torso,
    worldPosition: worldPos
  });

  // Subtle idle animation updater
  return (elapsed) => {
    upperBody.position.y = 0.92 + Math.sin(elapsed * 2.1) * 0.018;
    tailPivot.rotation.y = Math.sin(elapsed * 2.4) * 0.16;
    headPivot.rotation.y = Math.sin(elapsed * 0.9) * 0.12;
    rightArmPivot.rotation.z = Math.sin(elapsed * 3.8) * 0.22;
  };
}

/**
 * Randomly places Malaysian flags (Jalur Gemilang) on timber flagpoles around the outpost,
 * avoiding trails, stations, and the pond. Returns an animation updater for wind ripple.
 */
export function buildRandomMalaysiaFlags(scene, collisionSystem, flagCount = 9) {
  const flagTexture = createMalaysiaFlagTexture();
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x5c4734, roughness: 0.85 });
  const finialMat = new THREE.MeshStandardMaterial({ color: 0xd4a656, roughness: 0.4, metalness: 0.5 });
  const flagMat = new THREE.MeshStandardMaterial({
    map: flagTexture,
    side: THREE.DoubleSide,
    roughness: 0.72
  });

  const baseGeo = new THREE.PlaneGeometry(1.5, 0.75, 10, 4);
  baseGeo.translate(0.75, 0, 0); // Hinge at left edge on flagpole

  const animatedFlags = [];
  const placedCoords = [];

  let attempts = 0;
  while (animatedFlags.length < flagCount && attempts < 500) {
    attempts++;
    const angle = Math.random() * Math.PI * 2;
    const radius = 8 + Math.random() * 34;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    // Keep clear of stations, SavageZed, his approach sightline, pond, and other flags
    if (Math.hypot(x - SAVAGEZED_NPC.position.x, z - SAVAGEZED_NPC.position.z) < 5.5) continue;
    if (Math.hypot(x - SAVAGEZED_NPC.approach.x, z - SAVAGEZED_NPC.approach.z) < 4.5) continue;
    if (Math.hypot(x + 22, z - 20) < 9.0) continue;

    let tooClose = false;
    for (const dest of DESTINATIONS) {
      if (Math.hypot(x - dest.position.x, z - dest.position.z) < 6.2) {
        tooClose = true;
        break;
      }
    }
    if (tooClose) continue;

    for (const prev of placedCoords) {
      if (Math.hypot(x - prev.x, z - prev.z) < 8.5) {
        tooClose = true;
        break;
      }
    }
    if (tooClose) continue;

    // Also keep off the exact center of spawn walk-in path
    if (Math.abs(x) < 3.0 && z > 2 && z < 16) continue;

    const y = getTerrainHeight(x, z);
    const poleHeight = 4.2 + Math.random() * 0.9;
    const group = new THREE.Group();
    group.position.set(x, y, z);
    group.rotation.y = Math.random() * Math.PI * 2;

    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.08, poleHeight, 8), poleMat);
    pole.position.y = poleHeight * 0.5;
    pole.castShadow = true;
    group.add(pole);

    const finial = new THREE.Mesh(new THREE.SphereGeometry(0.11, 10, 10), finialMat);
    finial.position.y = poleHeight + 0.06;
    group.add(finial);

    const flagGeo = baseGeo.clone();
    const flagMesh = new THREE.Mesh(flagGeo, flagMat);
    flagMesh.position.set(0.04, poleHeight - 0.45, 0);
    flagMesh.castShadow = true;
    group.add(flagMesh);

    scene.add(group);
    collisionSystem.addCylinder(x, z, 0.25, 'malaysia-flagpole');

    placedCoords.push({ x, z });
    animatedFlags.push({
      geometry: flagGeo,
      basePositions: Float32Array.from(flagGeo.attributes.position.array),
      phase: Math.random() * Math.PI * 2
    });
  }

  return (elapsed) => {
    for (const item of animatedFlags) {
      const pos = item.geometry.attributes.position;
      const base = item.basePositions;
      for (let i = 0; i < pos.count; i++) {
        const bx = base[i * 3];
        const by = base[i * 3 + 1];
        const pinFactor = bx / 1.5; // 0 at pole, 1 at free edge
        const wave =
          Math.sin(bx * 4.2 - elapsed * 4.4 + item.phase) * 0.11 * pinFactor +
          Math.cos(by * 3.0 - elapsed * 2.8 + item.phase) * 0.03 * pinFactor;
        pos.setZ(i, wave);
      }
      pos.needsUpdate = true;
    }
  };
}
