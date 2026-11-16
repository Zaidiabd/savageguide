import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';
import { getTerrainHeight } from './world.js';
import { DESTINATIONS, SAVAGEZED_NPC, STATION_GUIDES } from '../data/tutorialContent.js';

/**
 * Species catalog mapping Evrima GLB models, skin textures, and official .json palettes.
 */
const SPECIES_CATALOG = {
  omniraptor: {
    basePath: './models/omniraptor',
    glb: 'Omniraptor.glb',
    albedo: 'T_Omniraptor_Albedo.webp',
    mask: 'T_Omniraptor_Detail_M.webp',
    patterns: { adult1: 'T_Omniraptor_Adult_Pattern_1.webp' },
    colors: {
      red: [0x95, 0x6e, 0x3c],
      green: [0xaa, 0x98, 0x7f],
      blue: [0x6c, 0x4d, 0x41],
      cyan: [0x89, 0x69, 0x4a],
      magenta: [0x38, 0x31, 0x2c],
      yellow: [0x24, 0x1e, 0x1a],
      mouth: [0xaa, 0x82, 0x75],
      claw: [0x59, 0x54, 0x48],
      teeth: [0xa0, 0x8a, 0x74]
    }
  },
  pteranodon: {
    basePath: './models/pteranodon',
    glb: 'Pteranodon.glb',
    albedo: 'T_Pteranodon_Albedo.webp',
    mask: 'T_Pteranodon_Detail_M.webp',
    patterns: { adult1: 'T_Pteranodon_Adult_Pattern_1.webp' },
    colors: {
      red: [0xaa, 0xa2, 0x88],
      green: [0xbc, 0xb1, 0x9e],
      blue: [0x6c, 0x5f, 0x42],
      cyan: [0xe1, 0xb0, 0x5e],
      magenta: [0x34, 0x30, 0x2b],
      yellow: [0x4f, 0x42, 0x30],
      mouth: [0xaa, 0x82, 0x75],
      claw: [0x59, 0x54, 0x48],
      teeth: [0xa0, 0x8a, 0x74]
    }
  },
  triceratops: {
    basePath: './models/triceratops',
    glb: 'Triceratops.glb',
    albedo: 'T_Triceratops_Albedo.webp',
    mask: 'T_Triceratops_Detail_M.webp',
    patterns: { adult1: 'T_Triceratops_Adult_Pattern_1.webp' },
    colors: {
      red: [0xd8, 0x6b, 0x35],
      green: [0xbf, 0xa8, 0x7e],
      blue: [0x69, 0x58, 0x4c],
      cyan: [0xab, 0x80, 0x53],
      magenta: [0x42, 0x3e, 0x38],
      yellow: [0x5b, 0x48, 0x34],
      mouth: [0xaa, 0x82, 0x75],
      claw: [0x59, 0x54, 0x48],
      teeth: [0xa0, 0x8a, 0x74]
    }
  },
  maiasaura: {
    basePath: './models/maiasaura',
    glb: 'Maiasaura.glb',
    albedo: 'T_Maiasaura_Albedo.webp',
    mask: 'T_Maiasaura_M.webp',
    patterns: { adult1: 'T_Maiasaura_Pattern_Adult_1.webp' },
    colors: {
      red: [0x93, 0x7f, 0x66],
      green: [0xdc, 0xb5, 0x89],
      blue: [0x57, 0x3f, 0x33],
      cyan: [0x86, 0x5a, 0x38],
      magenta: [0x38, 0x30, 0x32],
      yellow: [0x4c, 0x3d, 0x32],
      mouth: [0xaa, 0x82, 0x75],
      claw: [0x59, 0x54, 0x48],
      teeth: [0xa0, 0x8a, 0x74]
    }
  },
  tyrannosaurus: {
    basePath: './models/tyrannosaurus',
    glb: 'Tyrannosaurus.glb',
    albedo: 'T_Tyrannosaurus_Albedo.webp',
    mask: 'T_Tyrannosaurus_Mask_TMC.webp',
    patterns: {
      adult1: 'T_Tyrannosaurus_Adult_Pattern_1.webp',
      adult2: 'T_Tyrannosaurus_Adult_Pattern_2.webp',
      adult3: 'T_Tyrannosaurus_Adult_Pattern_3.webp'
    },
    colors: {
      red: [0x6c, 0x37, 0x29],
      green: [0xd3, 0xb4, 0x8b],
      blue: [0x59, 0x49, 0x34],
      cyan: [0x89, 0x75, 0x59],
      magenta: [0x34, 0x2f, 0x29],
      yellow: [0x44, 0x35, 0x27],
      mouth: [0x7c, 0x58, 0x59],
      claw: [0x59, 0x54, 0x48],
      teeth: [0xa0, 0x8a, 0x74]
    }
  },
  allosaurus: {
    basePath: './models/allosaurus',
    glb: 'Allosaurus.glb',
    albedo: 'T_Allosaurus_Albedo.webp',
    mask: 'T_Allosaurus_M.webp',
    patterns: { adult1: 'T_Allosaurus_Adult_Pattern_1.webp' },
    colors: {
      red: [0x5e, 0x39, 0x3e],
      green: [0x83, 0x76, 0x6e],
      blue: [0x4a, 0x44, 0x41],
      cyan: [0x75, 0x5f, 0x44],
      magenta: [0x25, 0x25, 0x26],
      yellow: [0xff, 0xe8, 0xc4],
      mouth: [0x8e, 0x5e, 0x5c],
      claw: [0x4d, 0x49, 0x43],
      teeth: [0xa5, 0x92, 0x7d]
    }
  },
  dilophosaurus: {
    basePath: './models/dilophosaurus',
    glb: 'Dilophosaurus.glb',
    albedo: 'T_Dilo_Base_Albedo.webp',
    mask: 'T_Dilophosaurus_M.webp',
    patterns: { adult1: 'T_Dilophosaurus_Adult_Pattern_Default.webp' },
    colors: {
      red: [0x72, 0x47, 0x18],
      green: [0x89, 0x65, 0x57],
      blue: [0x56, 0x2e, 0x33],
      cyan: [0x65, 0x45, 0x33],
      magenta: [0x2d, 0x20, 0x2a],
      yellow: [0x3a, 0x2b, 0x26],
      mouth: [0x92, 0x5f, 0x5b],
      claw: [0x4c, 0x47, 0x3f],
      teeth: [0xa0, 0x8a, 0x74]
    }
  },
  ceratosaurus: {
    basePath: './models/ceratosaurus',
    glb: 'Ceratosaurus.glb',
    albedo: 'T_Cerato_Adult_Albedo.webp',
    mask: 'T_Cerato_Adult_Mouth-Teeth-Claws.webp',
    patterns: { adult1: 'T_Ceratosaurus_Adult_Pattern_1.webp' },
    colors: {
      red: [0xba, 0x5f, 0x4a],
      green: [0xe9, 0xc8, 0xaf],
      blue: [0xa5, 0x84, 0x71],
      cyan: [0xe3, 0xaf, 0x81],
      magenta: [0x5d, 0x4e, 0x47],
      yellow: [0x3b, 0x2c, 0x26],
      mouth: [0x9e, 0x5d, 0x58],
      claw: [0x54, 0x4e, 0x46],
      teeth: [0xa6, 0x92, 0x7a]
    }
  }
};

// Shared loader & promise caches so duplicate species (e.g., 3x Tyrannosaurus) load only once
let sharedGltfLoader = null;
const gltfCache = new Map();
const imageCache = new Map();
const skinTextureCache = new Map();

function getSharedGltfLoader(renderer) {
  if (sharedGltfLoader) return sharedGltfLoader;
  const ktx2Loader = new KTX2Loader();
  ktx2Loader.setTranscoderPath('./basis/');
  if (renderer) {
    ktx2Loader.detectSupport(renderer);
  }
  const loader = new GLTFLoader();
  loader.setKTX2Loader(ktx2Loader);
  loader.setMeshoptDecoder(MeshoptDecoder);
  sharedGltfLoader = loader;
  return loader;
}

function loadSpeciesGLTF(speciesKey, renderer) {
  const spec = SPECIES_CATALOG[speciesKey];
  const url = `${spec.basePath}/${spec.glb}`;
  if (!gltfCache.has(url)) {
    const loader = getSharedGltfLoader(renderer);
    gltfCache.set(
      url,
      new Promise((resolve, reject) => {
        loader.load(url, resolve, undefined, reject);
      })
    );
  }
  return gltfCache.get(url);
}

function loadImageCached(src) {
  if (!imageCache.has(src)) {
    imageCache.set(
      src,
      new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
        img.src = src;
      })
    );
  }
  return imageCache.get(src);
}

/**
 * Composites Evrima albedo cavity, CMYRGB pattern mask, and detail mask into a CanvasTexture
 * and clones glTF quantized UV transform attributes onto the generated texture.
 */
async function getSpeciesSkinTexture(speciesKey, variantKey, templateMap, canvasSize = 512) {
  const spec = SPECIES_CATALOG[speciesKey];
  const patternFile = spec.patterns[variantKey] || spec.patterns.adult1;
  const cacheKey = `${speciesKey}:${variantKey}:${canvasSize}`;

  if (!skinTextureCache.has(cacheKey)) {
    const [albedoImg, patternImg, detailImg] = await Promise.all([
      loadImageCached(`${spec.basePath}/${spec.albedo}`),
      loadImageCached(`${spec.basePath}/${patternFile}`),
      loadImageCached(`${spec.basePath}/${spec.mask}`)
    ]);

    const makeBuffer = (img) => {
      const c = document.createElement('canvas');
      c.width = canvasSize;
      c.height = canvasSize;
      const ctx = c.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(img, 0, 0, canvasSize, canvasSize);
      return { canvas: c, ctx, data: ctx.getImageData(0, 0, canvasSize, canvasSize).data };
    };

    const albedo = makeBuffer(albedoImg);
    const pattern = makeBuffer(patternImg);
    const detail = makeBuffer(detailImg);
    const c = spec.colors;

    const out = albedo.ctx.createImageData(canvasSize, canvasSize);
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

      let r = c.blue[0];
      let g = c.blue[1];
      let b = c.blue[2];

      if (wSum > 0.01) {
        r =
          (wRed * c.red[0] +
            wGreen * c.green[0] +
            wBlue * c.blue[0] +
            wCyan * c.cyan[0] +
            wMagenta * c.magenta[0] +
            wYellow * c.yellow[0]) /
          wSum;
        g =
          (wRed * c.red[1] +
            wGreen * c.green[1] +
            wBlue * c.blue[1] +
            wCyan * c.cyan[1] +
            wMagenta * c.magenta[1] +
            wYellow * c.yellow[1]) /
          wSum;
        b =
          (wRed * c.red[2] +
            wGreen * c.green[2] +
            wBlue * c.blue[2] +
            wCyan * c.cyan[2] +
            wMagenta * c.magenta[2] +
            wYellow * c.yellow[2]) /
          wSum;
      }

      const dr = dData[i] / 255;
      const dg = dData[i + 1] / 255;
      const db = dData[i + 2] / 255;
      if (dr > 0.25) {
        r = r * (1 - dr) + c.teeth[0] * dr;
        g = g * (1 - dr) + c.teeth[1] * dr;
        b = b * (1 - dr) + c.teeth[2] * dr;
      }
      if (dg > 0.25) {
        r = r * (1 - dg) + c.mouth[0] * dg;
        g = g * (1 - dg) + c.mouth[1] * dg;
        b = b * (1 - dg) + c.mouth[2] * dg;
      }
      if (db > 0.25) {
        r = r * (1 - db) + c.claw[0] * db;
        g = g * (1 - db) + c.claw[1] * db;
        b = b * (1 - db) + c.claw[2] * db;
      }

      const lum = (aData[i] * 0.299 + aData[i + 1] * 0.587 + aData[i + 2] * 0.114) / 255;
      const cavityShade = 0.36 + lum * 1.32;

      oData[i] = Math.min(255, Math.max(0, r * cavityShade));
      oData[i + 1] = Math.min(255, Math.max(0, g * cavityShade));
      oData[i + 2] = Math.min(255, Math.max(0, b * cavityShade));
      oData[i + 3] = 255;
    }

    albedo.ctx.putImageData(out, 0, 0);

    const tex = new THREE.CanvasTexture(albedo.canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.flipY = false;
    tex.anisotropy = 4;
    if (templateMap) {
      tex.channel = templateMap.channel;
      tex.offset.copy(templateMap.offset);
      tex.repeat.copy(templateMap.repeat);
      tex.center.copy(templateMap.center);
      tex.rotation = templateMap.rotation;
      tex.wrapS = templateMap.wrapS;
      tex.wrapT = templateMap.wrapT;
    }
    tex.needsUpdate = true;
    skinTextureCache.set(cacheKey, tex);
  }

  return skinTextureCache.get(cacheKey);
}

/**
 * Generates a compact wooden-slate floating nameplate sprite displayed above a dinosaur guide.
 */
function createNameplateSprite(name, speciesLabel) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, 512, 128);

  // Dark translucent plate with muted gold border
  ctx.fillStyle = 'rgba(18, 24, 19, 0.84)';
  ctx.beginPath();
  ctx.roundRect(18, 14, 476, 98, 18);
  ctx.fill();

  ctx.strokeStyle = 'rgba(218, 165, 75, 0.85)';
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#f3ebd8';
  ctx.font = 'bold 42px "Segoe UI", Arial, sans-serif';
  ctx.fillText(name, 256, 62);

  ctx.fillStyle = '#d4a656';
  ctx.font = '600 24px "Segoe UI", Arial, sans-serif';
  ctx.fillText(speciesLabel.toUpperCase(), 256, 95);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
  const sprite = new THREE.Sprite(mat);
  sprite.center.set(0.5, 0);
  sprite.scale.set(2.15, 0.54, 1);
  return sprite;
}

/**
 * Shared loader attaching an Evrima dinosaur GLB, Adult proportions, composite skin,
 * nameplate sprite, Idle skeletal animation, collision cylinder, and interaction target.
 */
function mountDinoAvatar({
  scene,
  collisionSystem,
  interactables,
  renderer,
  materials = null,
  speciesKey,
  patternVariant = 'adult1',
  displayName,
  speciesLabel,
  position,
  lookAt,
  targetHeight,
  interactDestination,
  colliderTag,
  canvasSize = 512,
  phaseOffset = 0,
  sittingPose = false,
  setupExtra = null
}) {
  const y = getTerrainHeight(position.x, position.z);
  const root = new THREE.Group();
  root.position.set(position.x, y, position.z);

  const yaw = Math.atan2(lookAt.x - position.x, lookAt.z - position.z);
  root.rotation.y = yaw;

  const hitProxy = new THREE.Mesh(
    new THREE.BoxGeometry(
      Math.max(1.5, targetHeight * 0.82),
      Math.max(1.85, targetHeight * 1.05),
      Math.max(2.8, targetHeight * 1.45)
    ),
    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })
  );
  hitProxy.position.set(0, targetHeight * 0.52, 0);
  root.add(hitProxy);

  const nameplate = createNameplateSprite(displayName, speciesLabel);
  nameplate.position.set(0, (sittingPose ? targetHeight * 0.72 : targetHeight) + 0.35, 0);
  root.add(nameplate);

  if (sittingPose) {
    // Cozy resting leaf-litter & log hollow outside Training Camp for seated/crouched Shanks
    const hollowMat =
      materials?.timberDark || new THREE.MeshStandardMaterial({ color: 0x3b2f22, roughness: 0.96 });
    const rimMat =
      materials?.stone || new THREE.MeshStandardMaterial({ color: 0x4e5249, roughness: 0.92 });
    const pad = new THREE.Mesh(new THREE.CylinderGeometry(1.55, 1.85, 0.24, 14), hollowMat);
    pad.position.set(0, 0.12, 0);
    pad.receiveShadow = true;
    root.add(pad);

    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const stone = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 1), rimMat);
      stone.position.set(Math.cos(a) * 1.45, 0.16, Math.sin(a) * 1.45);
      stone.scale.set(1.2, 0.65, 1.0);
      stone.receiveShadow = true;
      root.add(stone);
    }
  }

  if (setupExtra) {
    setupExtra(root);
  }

  scene.add(root);
  root.updateMatrixWorld(true);

  const colliderRadius = Math.max(0.75, Math.min(1.45, targetHeight * 0.42));
  collisionSystem.addCylinder(position.x, position.z, colliderRadius, colliderTag);

  const worldPos = new THREE.Vector3();
  hitProxy.getWorldPosition(worldPos);
  interactables.push({
    ...interactDestination,
    type: 'npc',
    destination: interactDestination,
    group: root,
    target: hitProxy,
    worldPosition: worldPos
  });

  let mixer = null;

  loadSpeciesGLTF(speciesKey, renderer)
    .then(async (gltf) => {
      const model = SkeletonUtils.clone(gltf.scene);
      let bodyMaterial = null;
      let templateBodyMap = null;

      model.traverse((obj) => {
        if (obj.isMesh || obj.isSkinnedMesh) {
          obj.castShadow = true;
          obj.receiveShadow = true;
          obj.frustumCulled = false;

          if (obj.morphTargetDictionary && obj.morphTargetInfluences) {
            obj.morphTargetInfluences.fill(0);
            if (obj.morphTargetDictionary.Adult !== undefined) {
              obj.morphTargetInfluences[obj.morphTargetDictionary.Adult] = 1.0;
            }
          }

          if (obj.material && obj.material.name === 'DinoBody') {
            obj.material = obj.material.clone();
            obj.material.color.setHex(0xffffff);
            bodyMaterial = obj.material;
            templateBodyMap = obj.material.map;
          }
        }
      });

      if (gltf.animations && gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(model);
        const idleClip =
          THREE.AnimationClip.findByName(gltf.animations, 'Idle') || gltf.animations[0];
        const action = mixer.clipAction(idleClip);
        action.play();
        mixer.update(0.1 + phaseOffset);
      }

      const holder = new THREE.Group();
      holder.add(model);
      holder.updateMatrixWorld(true);

      model.traverse((obj) => {
        if (obj.isSkinnedMesh && obj.skeleton) {
          obj.skeleton.update();
        }
      });

      // Align tail -> head axis cleanly onto local +Z
      const headBone =
        model.getObjectByName('DinoHead') || model.getObjectByName('PreviewHead');
      const tailBone = [
        'DinoTail07',
        'DinoTail06',
        'DinoTail05',
        'DinoTail04',
        'DinoTail02',
        'DinoTail01',
        'DinoPelvis'
      ]
        .map((n) => model.getObjectByName(n))
        .find(Boolean);

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

      // Normalize height & plant feet cleanly on local y = 0
      const box = new THREE.Box3().setFromObject(holder);
      const size = new THREE.Vector3();
      box.getSize(size);
      if (size.y > 0.001) {
        const normScale = targetHeight / size.y;
        holder.scale.setScalar(normScale);
        holder.updateMatrixWorld(true);

        const scaledBox = new THREE.Box3().setFromObject(holder);
        const scaledCenter = new THREE.Vector3();
        const scaledSize = new THREE.Vector3();
        scaledBox.getCenter(scaledCenter);
        scaledBox.getSize(scaledSize);
        holder.position.x -= scaledCenter.x;
        holder.position.z -= scaledCenter.z;
        holder.position.y -= scaledBox.min.y + (sittingPose ? scaledSize.y * 0.24 : 0);
      }

      root.add(holder);
      root.updateMatrixWorld(true);

      try {
        const compositedMap = await getSpeciesSkinTexture(
          speciesKey,
          patternVariant,
          templateBodyMap,
          canvasSize
        );
        if (bodyMaterial) {
          bodyMaterial.map = compositedMap;
          bodyMaterial.roughness = 0.72;
          bodyMaterial.needsUpdate = true;
        }
      } catch (err) {
        console.warn(`Skin composite fallback for ${displayName}:`, err);
      }
    })
    .catch((err) => {
      console.error(`Failed to load ${speciesKey} avatar for ${displayName}:`, err);
    });

  return (dt) => {
    if (mixer && dt > 0) {
      mixer.update(dt);
    }
  };
}

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
 * Places SavageZed (Evrima Omniraptor) near Central Camp with his warm lantern pedestal.
 */
export function buildSavageZedNPC(scene, collisionSystem, interactables, materials, renderer = null) {
  let guideLight = null;
  let lastElapsed = null;

  const updateMixer = mountDinoAvatar({
    scene,
    collisionSystem,
    interactables,
    renderer,
    speciesKey: 'omniraptor',
    patternVariant: 'adult1',
    displayName: 'SavageZed',
    speciesLabel: 'Omniraptor • Outpost Guide',
    position: SAVAGEZED_NPC.position,
    lookAt: SAVAGEZED_NPC.approach,
    targetHeight: 1.88,
    interactDestination: SAVAGEZED_NPC,
    colliderTag: 'npc-savagezed',
    canvasSize: 768,
    phaseOffset: 0,
    setupExtra: (root) => {
      const vestMat =
        materials?.timberWeathered || new THREE.MeshStandardMaterial({ color: 0x6b5139, roughness: 0.86 });
      const trimMat =
        materials?.timberDark || new THREE.MeshStandardMaterial({ color: 0x4b3827, roughness: 0.9 });

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

      const lanternFrame = new THREE.Mesh(
        new THREE.BoxGeometry(0.24, 0.3, 0.24),
        materials?.metalDark || trimMat
      );
      lanternFrame.position.set(pedX, 1.04, pedZ);
      root.add(lanternFrame);

      const lanternGlow = new THREE.Mesh(
        new THREE.BoxGeometry(0.16, 0.2, 0.16),
        materials?.lanternGlass ||
          new THREE.MeshStandardMaterial({ color: 0xffe4ad, emissive: 0xffb347, emissiveIntensity: 1.4 })
      );
      lanternGlow.position.set(pedX, 1.04, pedZ);
      root.add(lanternGlow);

      guideLight = new THREE.PointLight(0xffbe6b, 2.2, 12, 1.55);
      guideLight.position.set(pedX, 1.24, pedZ + 0.12);
      root.add(guideLight);
    }
  });

  return (elapsed, delta = null) => {
    const dt =
      delta !== null
        ? Math.min(0.05, delta)
        : lastElapsed === null
          ? 0
          : Math.min(0.05, Math.max(0, elapsed - lastElapsed));
    lastElapsed = elapsed;

    updateMixer(dt);
    if (guideLight) {
      guideLight.intensity = 2.1 + Math.sin(elapsed * 3.1) * 0.14;
    }
  };
}

/**
 * Spawns all 8 named community station dinosaur guides (kift90, kenzy, apollo,
 * mapotofu, kmy, Zapicy, sai, Dom), each interactive and linked to their assigned station.
 */
export function buildStationGuides(scene, collisionSystem, interactables, materials, renderer = null) {
  const updaters = [];
  let lastElapsed = null;

  STATION_GUIDES.forEach((guide, idx) => {
    const dest = DESTINATIONS.find((d) => d.id === guide.stationId);
    const shortStation = dest ? dest.badge.replace('DESTINATION ', 'S') : '';
    const stationTag = guide.badgeRole
      ? guide.badgeRole
      : guide.stationId === 'survival-training'
        ? 'Survival Camp'
        : shortStation;

    const interactDestination = {
      id: `guide-${guide.id}`,
      isNpc: true,
      isStationGuide: true,
      guideId: guide.id,
      stationId: guide.stationId,
      displayName: guide.displayName,
      initials: guide.initials,
      speciesLabel: guide.speciesLabel,
      title: guide.displayName,
      interactRadius: guide.interactRadius,
      promptLabel: `Talk to ${guide.displayName}`,
      zoneLabel: `${guide.displayName.toUpperCase()} — ${guide.speciesLabel.toUpperCase()} (${stationTag})`
    };

    const mixerUpdater = mountDinoAvatar({
      scene,
      collisionSystem,
      interactables,
      renderer,
      materials,
      speciesKey: guide.species,
      patternVariant: guide.patternVariant,
      displayName: guide.displayName,
      speciesLabel: `${guide.speciesLabel} • ${stationTag}`,
      position: guide.position,
      lookAt: guide.lookAt,
      targetHeight: guide.targetHeight,
      interactDestination,
      colliderTag: `npc-guide-${guide.id}`,
      canvasSize: 512,
      phaseOffset: idx * 0.43,
      sittingPose: Boolean(guide.sittingPose)
    });

    updaters.push(mixerUpdater);
  });

  return (elapsed, delta = null) => {
    const dt =
      delta !== null
        ? Math.min(0.05, delta)
        : lastElapsed === null
          ? 0
          : Math.min(0.05, Math.max(0, elapsed - lastElapsed));
    lastElapsed = elapsed;

    for (const fn of updaters) {
      fn(dt);
    }
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
      const clearance = dest.id === 'survival-training' ? 12.0 : 6.2;
      if (Math.hypot(x - dest.position.x, z - dest.position.z) < clearance) {
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
