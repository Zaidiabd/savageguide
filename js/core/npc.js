import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
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
 * Loads an image from a URL and resolves when decoded.
 */
function loadImageAsset(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = src;
  });
}

/**
 * Composites Evrima Omniraptor albedo cavity, Adult Pattern 1 mask, and detail mask
 * into a unified sRGB CanvasTexture using Omniraptor.json layer colors.
 */
async function createOmniraptorSkinTexture(templateMap) {
  const [albedoImg, patternImg, detailImg] = await Promise.all([
    loadImageAsset('./models/omniraptor/T_Omniraptor_Albedo.webp'),
    loadImageAsset('./models/omniraptor/T_Omniraptor_Adult_Pattern_1.webp'),
    loadImageAsset('./models/omniraptor/T_Omniraptor_Detail_M.webp')
  ]);

  const size = 1024;
  const makeBuffer = (img) => {
    const c = document.createElement('canvas');
    c.width = size;
    c.height = size;
    const ctx = c.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(img, 0, 0, size, size);
    return { canvas: c, ctx, data: ctx.getImageData(0, 0, size, size).data };
  };

  const albedo = makeBuffer(albedoImg);
  const pattern = makeBuffer(patternImg);
  const detail = makeBuffer(detailImg);

  // Layer & anatomy colors sourced from skin-models-v2/Omniraptor/Omniraptor.json
  const colRed = [0x95, 0x6e, 0x3c];
  const colGreen = [0xaa, 0x98, 0x7f];
  const colBlue = [0x6c, 0x4d, 0x41];
  const colCyan = [0x89, 0x69, 0x4a];
  const colMagenta = [0x38, 0x31, 0x2c];
  const colYellow = [0x24, 0x1e, 0x1a];
  const colTeeth = [0xa0, 0x8a, 0x74];
  const colMouth = [0xaa, 0x82, 0x75];
  const colClaw = [0x59, 0x54, 0x48];

  const out = albedo.ctx.createImageData(size, size);
  const oData = out.data;
  const aData = albedo.data;
  const pData = pattern.data;
  const dData = detail.data;

  for (let i = 0; i < oData.length; i += 4) {
    const pr = pData[i] / 255;
    const pg = pData[i + 1] / 255;
    const pb = pData[i + 2] / 255;

    const wRed = pr * (1 - pg) * (1 - pb);
    const wGreen = (1 - pr) * pg * (1 - pb);
    const wBlue = (1 - pr) * (1 - pg) * pb;
    const wCyan = (1 - pr) * pg * pb;
    const wMagenta = pr * (1 - pg) * pb;
    const wYellow = pr * pg * (1 - pb);
    const wSum = wRed + wGreen + wBlue + wCyan + wMagenta + wYellow;

    let r = colBlue[0];
    let g = colBlue[1];
    let b = colBlue[2];

    if (wSum > 0.01) {
      r =
        (wRed * colRed[0] +
          wGreen * colGreen[0] +
          wBlue * colBlue[0] +
          wCyan * colCyan[0] +
          wMagenta * colMagenta[0] +
          wYellow * colYellow[0]) /
        wSum;
      g =
        (wRed * colRed[1] +
          wGreen * colGreen[1] +
          wBlue * colBlue[1] +
          wCyan * colCyan[1] +
          wMagenta * colMagenta[1] +
          wYellow * colYellow[1]) /
        wSum;
      b =
        (wRed * colRed[2] +
          wGreen * colGreen[2] +
          wBlue * colBlue[2] +
          wCyan * colCyan[2] +
          wMagenta * colMagenta[2] +
          wYellow * colYellow[2]) /
        wSum;
    }

    // Blend teeth (red), mouth/tongue (green), and claws/scutes (blue) from Detail_M
    const dr = dData[i] / 255;
    const dg = dData[i + 1] / 255;
    const db = dData[i + 2] / 255;
    if (dr > 0.25) {
      r = r * (1 - dr) + colTeeth[0] * dr;
      g = g * (1 - dr) + colTeeth[1] * dr;
      b = b * (1 - dr) + colTeeth[2] * dr;
    }
    if (dg > 0.25) {
      r = r * (1 - dg) + colMouth[0] * dg;
      g = g * (1 - dg) + colMouth[1] * dg;
      b = b * (1 - dg) + colMouth[2] * dg;
    }
    if (db > 0.25) {
      r = r * (1 - db) + colClaw[0] * db;
      g = g * (1 - db) + colClaw[1] * db;
      b = b * (1 - db) + colClaw[2] * db;
    }

    // Modulate by detailed scale/cavity albedo luminance
    const lum = (aData[i] * 0.299 + aData[i + 1] * 0.587 + aData[i + 2] * 0.114) / 255;
    const cavityShade = 0.36 + lum * 1.32;

    oData[i] = Math.min(255, Math.max(0, r * cavityShade));
    oData[i + 1] = Math.min(255, Math.max(0, g * cavityShade));
    oData[i + 2] = Math.min(255, Math.max(0, b * cavityShade));
    oData[i + 3] = 255;
  }

  albedo.ctx.putImageData(out, 0, 0);

  const skinTexture = new THREE.CanvasTexture(albedo.canvas);
  skinTexture.colorSpace = THREE.SRGBColorSpace;
  skinTexture.flipY = false;
  skinTexture.anisotropy = 4;

  // Preserve KHR_texture_transform offset/repeat needed by quantized GLB UVs
  if (templateMap) {
    skinTexture.channel = templateMap.channel;
    skinTexture.offset.copy(templateMap.offset);
    skinTexture.repeat.copy(templateMap.repeat);
    skinTexture.center.copy(templateMap.center);
    skinTexture.rotation = templateMap.rotation;
    skinTexture.wrapS = templateMap.wrapS;
    skinTexture.wrapT = templateMap.wrapT;
  }
  skinTexture.needsUpdate = true;
  return skinTexture;
}

/**
 * Loads the Evrima Omniraptor GLB avatar for SavageZed with KTX2 + Meshopt decoding,
 * Adult morph + composite skin textures, Idle skeletal animation, and lantern pedestal.
 */
export function buildSavageZedNPC(scene, collisionSystem, interactables, materials, renderer = null) {
  const { x, z } = SAVAGEZED_NPC.position;
  const y = getTerrainHeight(x, z);

  const root = new THREE.Group();
  root.position.set(x, y, z);
  root.rotation.y = -0.35;

  const vestMat = materials?.timberWeathered || new THREE.MeshStandardMaterial({ color: 0x6b5139, roughness: 0.86 });
  const trimMat = materials?.timberDark || new THREE.MeshStandardMaterial({ color: 0x4b3827, roughness: 0.9 });

  // Timber lantern pedestal beside SavageZed (positioned cleanly to the left flank)
  const pedX = -1.35;
  const pedZ = 0.35;
  const pedestal = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.85, 0.68), vestMat);
  pedestal.position.set(pedX, 0.42, pedZ);
  pedestal.rotation.y = 0.2;
  pedestal.castShadow = true;
  pedestal.receiveShadow = true;
  root.add(pedestal);

  const cap = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.08, 0.76), trimMat);
  cap.position.set(pedX, 0.86, pedZ);
  cap.rotation.y = 0.2;
  root.add(cap);

  const lanternFrame = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.3, 0.24), materials?.metalDark || trimMat);
  lanternFrame.position.set(pedX, 1.04, pedZ);
  root.add(lanternFrame);

  const lanternGlow = new THREE.Mesh(
    new THREE.BoxGeometry(0.16, 0.2, 0.16),
    materials?.lanternGlass ||
      new THREE.MeshStandardMaterial({ color: 0xffe4ad, emissive: 0xffb347, emissiveIntensity: 1.4 })
  );
  lanternGlow.position.set(pedX, 1.04, pedZ);
  root.add(lanternGlow);

  const guideLight = new THREE.PointLight(0xffbe6b, 2.2, 12, 1.55);
  guideLight.position.set(pedX, 1.24, pedZ + 0.12);
  root.add(guideLight);

  // Invisible raycast/interaction proxy so interaction works immediately & accurately across the raptor body
  const hitProxy = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 1.85, 3.2),
    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })
  );
  hitProxy.position.set(0, 0.95, 0);
  root.add(hitProxy);

  scene.add(root);
  root.updateMatrixWorld(true);

  collisionSystem.addCylinder(x, z, 0.78, 'npc-savagezed');

  const worldPos = new THREE.Vector3();
  hitProxy.getWorldPosition(worldPos);
  interactables.push({
    type: 'npc',
    destination: SAVAGEZED_NPC,
    group: root,
    target: hitProxy,
    worldPosition: worldPos
  });

  // Load Omniraptor.glb + KTX2/Meshopt decoders and Evrima skin textures
  let mixer = null;
  let lastElapsed = null;

  const ktx2Loader = new KTX2Loader();
  ktx2Loader.setTranscoderPath('./basis/');
  if (renderer) {
    ktx2Loader.detectSupport(renderer);
  }

  const gltfLoader = new GLTFLoader();
  gltfLoader.setKTX2Loader(ktx2Loader);
  gltfLoader.setMeshoptDecoder(MeshoptDecoder);

  let bodyMaterial = null;
  let templateBodyMap = null;

  gltfLoader.load(
    './models/omniraptor/Omniraptor.glb',
    async (gltf) => {
      const model = gltf.scene;

      model.traverse((obj) => {
        if (obj.isMesh || obj.isSkinnedMesh) {
          obj.castShadow = true;
          obj.receiveShadow = true;
          obj.frustumCulled = false;

          // Apply full-grown Adult morph target
          if (obj.morphTargetDictionary && obj.morphTargetInfluences) {
            obj.morphTargetInfluences.fill(0);
            if (obj.morphTargetDictionary.Adult !== undefined) {
              obj.morphTargetInfluences[obj.morphTargetDictionary.Adult] = 1.0;
            }
          }

          if (obj.material && obj.material.name === 'DinoBody') {
            bodyMaterial = obj.material;
            templateBodyMap = obj.material.map;
            obj.material.color.setHex(0xffffff);
          }
        }
      });

      // Start native skeletal Idle animation right away so bone transforms match stance
      if (gltf.animations && gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(model);
        const idleClip =
          THREE.AnimationClip.findByName(gltf.animations, 'Idle') || gltf.animations[0];
        const action = mixer.clipAction(idleClip);
        action.play();
        mixer.update(0.1);
      }

      const holder = new THREE.Group();
      holder.add(model);
      holder.updateMatrixWorld(true);

      model.traverse((obj) => {
        if (obj.isSkinnedMesh && obj.skeleton) {
          obj.skeleton.update();
        }
      });

      // Align Omniraptor tail -> head axis toward local +Z (facing the player trail)
      const headBone = model.getObjectByName('DinoHead');
      const tailBone = model.getObjectByName('DinoTail06') || model.getObjectByName('DinoPelvis');
      if (headBone && tailBone) {
        const headPos = new THREE.Vector3();
        const tailPos = new THREE.Vector3();
        headBone.getWorldPosition(headPos);
        tailBone.getWorldPosition(tailPos);
        const dx = headPos.x - tailPos.x;
        const dz = headPos.z - tailPos.z;
        if (Math.hypot(dx, dz) > 0.001) {
          holder.rotation.y = -Math.atan2(dx, dz);
          holder.updateMatrixWorld(true);
        }
      }

      // Normalize height to ~1.88m and plant feet cleanly at local y = 0
      const box = new THREE.Box3().setFromObject(holder);
      const size = new THREE.Vector3();
      box.getSize(size);
      if (size.y > 0.001) {
        const normScale = 1.88 / size.y;
        holder.scale.setScalar(normScale);
        holder.updateMatrixWorld(true);

        const scaledBox = new THREE.Box3().setFromObject(holder);
        const scaledCenter = new THREE.Vector3();
        scaledBox.getCenter(scaledCenter);
        holder.position.x -= scaledCenter.x;
        holder.position.z -= scaledCenter.z;
        holder.position.y -= scaledBox.min.y;
      }

      root.add(holder);
      root.updateMatrixWorld(true);

      // Apply composited Evrima skin map onto DinoBody
      try {
        const compositedMap = await createOmniraptorSkinTexture(templateBodyMap);
        if (bodyMaterial) {
          bodyMaterial.map = compositedMap;
          bodyMaterial.roughness = 0.72;
          bodyMaterial.needsUpdate = true;
        }
      } catch (err) {
        console.warn('Omniraptor composite skin fallback:', err);
      } finally {
        ktx2Loader.dispose();
      }
    },
    undefined,
    (err) => {
      ktx2Loader.dispose();
      console.error('Failed to load Omniraptor.glb for SavageZed:', err);
    }
  );

  return (elapsed, delta = null) => {
    const dt =
      delta !== null
        ? Math.min(0.05, delta)
        : lastElapsed === null
          ? 0
          : Math.min(0.05, Math.max(0, elapsed - lastElapsed));
    lastElapsed = elapsed;

    if (mixer && dt > 0) {
      mixer.update(dt);
    }

    guideLight.intensity = 2.1 + Math.sin(elapsed * 3.1) * 0.14;
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
