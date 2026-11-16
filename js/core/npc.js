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

  const cantonW = width * 0.5;
  const cantonH = stripeHeight * 8;
  ctx.fillStyle = '#010066';
  ctx.fillRect(0, 0, cantonW, cantonH);

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
 * Builds an organic tapered tail geometry via LatheGeometry.
 */
function createTailGeometry() {
  const pts = [
    new THREE.Vector2(0.01, 1.45),
    new THREE.Vector2(0.04, 1.15),
    new THREE.Vector2(0.085, 0.8),
    new THREE.Vector2(0.145, 0.42),
    new THREE.Vector2(0.21, 0.05),
    new THREE.Vector2(0.18, 0.0)
  ];
  const geo = new THREE.LatheGeometry(pts, 14);
  geo.rotateX(-Math.PI / 2 + 0.22);
  return geo;
}

/**
 * Builds the anthropomorphic dinosaur guide "SavageZed" with sculpted theropod
 * silhouette, reptilian scale bump texture, detailed explorer gear, and idle animation.
 */
export function buildSavageZedNPC(scene, collisionSystem, interactables, materials) {
  const { x, z } = SAVAGEZED_NPC.position;
  const y = getTerrainHeight(x, z);

  const root = new THREE.Group();
  root.position.set(x, y, z);
  root.rotation.y = -0.35;

  const skinMat = new THREE.MeshStandardMaterial({
    color: 0x456b3d,
    bumpMap: materials?.scaleBump || null,
    bumpScale: 0.025,
    roughness: 0.72
  });
  const bellyMat = new THREE.MeshStandardMaterial({
    color: 0xa2ad6f,
    bumpMap: materials?.scaleBump || null,
    bumpScale: 0.015,
    roughness: 0.82
  });
  const vestMat = materials?.timberWeathered || new THREE.MeshStandardMaterial({ color: 0x6b5139, roughness: 0.86 });
  const trimMat = materials?.timberDark || new THREE.MeshStandardMaterial({ color: 0x4b3827, roughness: 0.9 });
  const scarfMat = new THREE.MeshStandardMaterial({ color: 0xc98836, roughness: 0.75 });
  const brassMat = new THREE.MeshStandardMaterial({ color: 0xd4a656, roughness: 0.32, metalness: 0.65 });
  const clawMat = new THREE.MeshStandardMaterial({ color: 0x22201c, roughness: 0.48 });
  const eyeWhiteMat = new THREE.MeshStandardMaterial({ color: 0xf6f3e8, roughness: 0.25 });
  const irisMat = new THREE.MeshStandardMaterial({ color: 0xc87e28, roughness: 0.22 });
  const pupilMat = new THREE.MeshStandardMaterial({ color: 0x151715, roughness: 0.15 });

  // Sculpted digitigrade legs + three-toed clawed feet
  for (const side of [-1, 1]) {
    const hip = new THREE.Mesh(new THREE.SphereGeometry(0.18, 14, 12), skinMat);
    hip.position.set(side * 0.22, 0.88, -0.02);
    hip.castShadow = true;
    root.add(hip);

    const thigh = new THREE.Mesh(new THREE.CapsuleGeometry(0.155, 0.36, 10, 14), skinMat);
    thigh.position.set(side * 0.22, 0.65, 0.03);
    thigh.rotation.x = -0.24;
    thigh.castShadow = true;
    root.add(thigh);

    const shin = new THREE.Mesh(new THREE.CapsuleGeometry(0.105, 0.4, 10, 14), skinMat);
    shin.position.set(side * 0.22, 0.28, -0.05);
    shin.rotation.x = 0.26;
    shin.castShadow = true;
    root.add(shin);

    const ankle = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 10), skinMat);
    ankle.position.set(side * 0.22, 0.08, 0.02);
    root.add(ankle);

    for (const toeAngle of [-0.28, 0, 0.28]) {
      const toe = new THREE.Mesh(new THREE.CapsuleGeometry(0.042, 0.2, 6, 10), skinMat);
      toe.rotation.x = Math.PI / 2;
      toe.rotation.z = -toeAngle;
      toe.position.set(side * 0.22 + Math.sin(toeAngle) * 0.08, 0.045, 0.14);
      toe.castShadow = true;
      root.add(toe);

      const claw = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.09, 8), clawMat);
      claw.rotation.x = Math.PI / 2 + 0.18;
      claw.rotation.z = -toeAngle;
      claw.position.set(side * 0.22 + Math.sin(toeAngle) * 0.13, 0.038, 0.28);
      root.add(claw);
    }
  }

  // Torso group
  const upperBody = new THREE.Group();
  upperBody.position.set(0, 0.92, 0);
  root.add(upperBody);

  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.32, 0.48, 12, 18), skinMat);
  torso.position.set(0, 0.34, 0);
  torso.scale.set(1.04, 1, 0.92);
  torso.castShadow = true;
  upperBody.add(torso);

  const belly = new THREE.Mesh(new THREE.CapsuleGeometry(0.24, 0.4, 10, 16), bellyMat);
  belly.position.set(0, 0.32, 0.12);
  upperBody.add(belly);

  // Explorer Leather Vest + Pockets + Belt + Brass Buckle + Backpack
  const vest = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.37, 0.56, 20, 1, true), vestMat);
  vest.position.set(0, 0.36, -0.01);
  vest.castShadow = true;
  upperBody.add(vest);

  const belt = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.04, 10, 24), trimMat);
  belt.rotation.x = Math.PI / 2;
  belt.position.set(0, 0.12, 0);
  upperBody.add(belt);

  const buckle = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.09, 0.06), brassMat);
  buckle.position.set(0, 0.12, 0.35);
  upperBody.add(buckle);

  for (const side of [-1, 1]) {
    const pocket = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.15, 0.06), trimMat);
    pocket.position.set(side * 0.21, 0.28, 0.27);
    pocket.rotation.y = side * 0.42;
    upperBody.add(pocket);
  }

  const pack = new THREE.Mesh(new THREE.CapsuleGeometry(0.16, 0.22, 8, 12), trimMat);
  pack.position.set(0, 0.38, -0.34);
  pack.castShadow = true;
  upperBody.add(pack);

  const neckerchief = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.055, 10, 22), scarfMat);
  neckerchief.rotation.x = Math.PI / 2 + 0.14;
  neckerchief.position.set(0, 0.68, 0.02);
  upperBody.add(neckerchief);

  // Smooth tapered tail
  const tailPivot = new THREE.Group();
  tailPivot.position.set(0, 0.08, -0.22);
  upperBody.add(tailPivot);

  const tailMesh = new THREE.Mesh(createTailGeometry(), skinMat);
  tailMesh.castShadow = true;
  tailPivot.add(tailMesh);

  // Sculpted Neck & Theropod Head
  const headPivot = new THREE.Group();
  headPivot.position.set(0, 0.72, 0.04);
  upperBody.add(headPivot);

  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.145, 0.19, 0.32, 16), skinMat);
  neck.position.set(0, 0.11, 0.02);
  neck.rotation.x = 0.12;
  neck.castShadow = true;
  headPivot.add(neck);

  const cranium = new THREE.Mesh(new THREE.SphereGeometry(0.24, 18, 16), skinMat);
  cranium.position.set(0, 0.32, 0.03);
  cranium.scale.set(0.94, 0.88, 1.18);
  cranium.castShadow = true;
  headPivot.add(cranium);

  // Tapered organic upper snout (ellipsoid capsule instead of box)
  const snout = new THREE.Mesh(new THREE.CapsuleGeometry(0.115, 0.24, 10, 16), skinMat);
  snout.rotation.x = Math.PI / 2 + 0.04;
  snout.scale.set(1.05, 1, 0.78);
  snout.position.set(0, 0.3, 0.25);
  snout.castShadow = true;
  headPivot.add(snout);

  // Nostril ridges
  for (const side of [-1, 1]) {
    const nostril = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 8), trimMat);
    nostril.position.set(side * 0.06, 0.34, 0.39);
    headPivot.add(nostril);

    const brow = new THREE.Mesh(new THREE.CapsuleGeometry(0.038, 0.12, 6, 10), skinMat);
    brow.rotation.x = Math.PI / 2 - 0.15;
    brow.rotation.z = side * -0.18;
    brow.position.set(side * 0.135, 0.42, 0.16);
    headPivot.add(brow);
  }

  // Friendly lower jaw
  const lowerJaw = new THREE.Mesh(new THREE.CapsuleGeometry(0.088, 0.22, 8, 14), bellyMat);
  lowerJaw.rotation.x = Math.PI / 2 + 0.12;
  lowerJaw.scale.set(1.02, 1, 0.62);
  lowerJaw.position.set(0, 0.2, 0.23);
  headPivot.add(lowerJaw);

  // Expressive eyes with amber iris & pupil
  for (const side of [-1, 1]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.058, 12, 12), eyeWhiteMat);
    eye.position.set(side * 0.155, 0.36, 0.18);
    headPivot.add(eye);

    const iris = new THREE.Mesh(new THREE.SphereGeometry(0.038, 10, 10), irisMat);
    iris.position.set(side * 0.172, 0.36, 0.212);
    headPivot.add(iris);

    const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.022, 10, 10), pupilMat);
    pupil.position.set(side * 0.182, 0.36, 0.228);
    headPivot.add(pupil);
  }

  // Layered head crest plumes
  for (let i = 0; i < 4; i++) {
    const crest = new THREE.Mesh(new THREE.ConeGeometry(0.042 - i * 0.004, 0.14 - i * 0.015, 10), scarfMat);
    crest.position.set(0, 0.51 - i * 0.045, 0.04 - i * 0.095);
    crest.rotation.x = -0.45 - i * 0.08;
    headPivot.add(crest);
  }

  // Articulated Left Arm
  const leftArm = new THREE.Mesh(new THREE.CapsuleGeometry(0.072, 0.24, 8, 12), skinMat);
  leftArm.position.set(-0.37, 0.44, 0.06);
  leftArm.rotation.z = 0.32;
  leftArm.rotation.x = -0.25;
  leftArm.castShadow = true;
  upperBody.add(leftArm);

  const leftForearm = new THREE.Mesh(new THREE.CapsuleGeometry(0.058, 0.2, 8, 12), skinMat);
  leftForearm.position.set(-0.44, 0.26, 0.19);
  leftForearm.rotation.x = -0.95;
  leftForearm.castShadow = true;
  upperBody.add(leftForearm);

  // Articulated Right Arm (friendly wave)
  const rightArmPivot = new THREE.Group();
  rightArmPivot.position.set(0.34, 0.56, 0.04);
  upperBody.add(rightArmPivot);

  const rightUpperArm = new THREE.Mesh(new THREE.CapsuleGeometry(0.072, 0.22, 8, 12), skinMat);
  rightUpperArm.position.set(0.13, 0.08, 0.04);
  rightUpperArm.rotation.z = -0.85;
  rightUpperArm.castShadow = true;
  rightArmPivot.add(rightUpperArm);

  const rightForearm = new THREE.Mesh(new THREE.CapsuleGeometry(0.058, 0.2, 8, 12), skinMat);
  rightForearm.position.set(0.28, 0.24, 0.11);
  rightForearm.rotation.z = -0.25;
  rightForearm.rotation.x = -0.35;
  rightForearm.castShadow = true;
  rightArmPivot.add(rightForearm);

  const rightHand = new THREE.Mesh(new THREE.SphereGeometry(0.075, 10, 10), skinMat);
  rightHand.position.set(0.32, 0.37, 0.15);
  rightArmPivot.add(rightHand);

  for (const cIdx of [-1, 0, 1]) {
    const finger = new THREE.Mesh(new THREE.ConeGeometry(0.018, 0.065, 7), clawMat);
    finger.position.set(0.32 + cIdx * 0.03, 0.43, 0.16);
    finger.rotation.z = -cIdx * 0.2;
    rightArmPivot.add(finger);
  }

  // Timber lantern pedestal beside SavageZed
  const pedestal = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.85, 0.68), vestMat);
  pedestal.position.set(-0.96, 0.42, 0.2);
  pedestal.rotation.y = 0.2;
  pedestal.castShadow = true;
  pedestal.receiveShadow = true;
  root.add(pedestal);

  const cap = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.08, 0.76), trimMat);
  cap.position.set(-0.96, 0.86, 0.2);
  cap.rotation.y = 0.2;
  root.add(cap);

  const lanternFrame = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.3, 0.24), materials?.metalDark || trimMat);
  lanternFrame.position.set(-0.96, 1.04, 0.2);
  root.add(lanternFrame);

  const lanternGlow = new THREE.Mesh(
    new THREE.BoxGeometry(0.16, 0.2, 0.16),
    materials?.lanternGlass ||
      new THREE.MeshStandardMaterial({ color: 0xffe4ad, emissive: 0xffb347, emissiveIntensity: 1.4 })
  );
  lanternGlow.position.set(-0.96, 1.04, 0.2);
  root.add(lanternGlow);

  const guideLight = new THREE.PointLight(0xffbe6b, 2.0, 11, 1.6);
  guideLight.position.set(-0.96, 1.2, 0.32);
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

  return (elapsed) => {
    upperBody.position.y = 0.92 + Math.sin(elapsed * 2.1) * 0.018;
    tailPivot.rotation.y = Math.sin(elapsed * 2.4) * 0.18;
    headPivot.rotation.y = Math.sin(elapsed * 0.9) * 0.12;
    rightArmPivot.rotation.z = Math.sin(elapsed * 3.8) * 0.2;
  };
}

/**
 * Randomly places Malaysian flags (Jalur Gemilang) on timber flagpoles around the outpost,
 * avoiding trails, stations, SavageZed, and the pond. Returns an animation updater for wind ripple.
 */
export function buildRandomMalaysiaFlags(scene, collisionSystem, flagCount = 9, materials = null) {
  const flagTexture = createMalaysiaFlagTexture();
  const poleMat = materials?.timberDark || new THREE.MeshStandardMaterial({ color: 0x5c4734, roughness: 0.85 });
  const finialMat = new THREE.MeshStandardMaterial({ color: 0xd4a656, roughness: 0.35, metalness: 0.6 });
  const flagMat = new THREE.MeshStandardMaterial({
    map: flagTexture,
    side: THREE.DoubleSide,
    roughness: 0.68
  });

  const baseGeo = new THREE.PlaneGeometry(1.5, 0.75, 14, 6);
  baseGeo.translate(0.75, 0, 0);

  const animatedFlags = [];
  const placedCoords = [];

  let attempts = 0;
  while (animatedFlags.length < flagCount && attempts < 500) {
    attempts++;
    const angle = Math.random() * Math.PI * 2;
    const radius = 8 + Math.random() * 34;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

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

    if (Math.abs(x) < 3.0 && z > 2 && z < 16) continue;

    const y = getTerrainHeight(x, z);
    const poleHeight = 4.2 + Math.random() * 0.9;
    const group = new THREE.Group();
    group.position.set(x, y, z);
    group.rotation.y = Math.random() * Math.PI * 2;

    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.085, poleHeight, 12), poleMat);
    pole.position.y = poleHeight * 0.5;
    pole.castShadow = true;
    group.add(pole);

    const baseCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.18, 0.25, 12), materials?.stone || poleMat);
    baseCollar.position.y = 0.12;
    group.add(baseCollar);

    const finial = new THREE.Mesh(new THREE.SphereGeometry(0.11, 12, 12), finialMat);
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
        const pinFactor = bx / 1.5;
        const wave =
          Math.sin(bx * 4.2 - elapsed * 4.4 + item.phase) * 0.11 * pinFactor +
          Math.cos(by * 3.0 - elapsed * 2.8 + item.phase) * 0.03 * pinFactor;
        pos.setZ(i, wave);
      }
      pos.needsUpdate = true;
      item.geometry.computeVertexNormals();
    }
  };
}
