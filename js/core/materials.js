import * as THREE from 'three';

function makeCanvas(w, h) {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  return { canvas, ctx: canvas.getContext('2d') };
}

function toTexture(canvas, { repeatX = 1, repeatY = 1, srgb = true, anisotropy = 4 } = {}) {
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeatX, repeatY);
  if (srgb) tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = anisotropy;
  return tex;
}

/**
 * Generates weathered horizontal timber planks + matching bump map.
 */
function createWoodTextures(baseHex, grainHex, repeatX = 1, repeatY = 1) {
  const { canvas, ctx } = makeCanvas(256, 256);
  const { canvas: bump, ctx: bctx } = makeCanvas(256, 256);

  ctx.fillStyle = baseHex;
  ctx.fillRect(0, 0, 256, 256);
  bctx.fillStyle = '#808080';
  bctx.fillRect(0, 0, 256, 256);

  // Plank horizontal seams
  const plankCount = 4;
  const plankH = 256 / plankCount;
  for (let p = 0; p < plankCount; p++) {
    const y0 = p * plankH;
    // Slight per-plank brightness shift
    ctx.fillStyle = p % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, y0, 256, plankH);

    // Grain streaks
    for (let i = 0; i < 42; i++) {
      const gy = y0 + Math.random() * (plankH - 4) + 2;
      ctx.strokeStyle = grainHex;
      ctx.globalAlpha = 0.14 + Math.random() * 0.2;
      ctx.lineWidth = 1 + Math.random() * 1.8;
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.bezierCurveTo(85, gy + (Math.random() - 0.5) * 4, 170, gy + (Math.random() - 0.5) * 4, 256, gy);
      ctx.stroke();

      bctx.strokeStyle = Math.random() > 0.5 ? '#9c9c9c' : '#656565';
      bctx.globalAlpha = 0.35;
      bctx.lineWidth = 1.2;
      bctx.beginPath();
      bctx.moveTo(0, gy);
      bctx.lineTo(256, gy);
      bctx.stroke();
    }
    ctx.globalAlpha = 1;
    bctx.globalAlpha = 1;

    // Dark plank groove
    ctx.fillStyle = 'rgba(18, 12, 8, 0.55)';
    ctx.fillRect(0, y0, 256, 3);
    bctx.fillStyle = '#242424';
    bctx.fillRect(0, y0, 256, 4);
  }

  return {
    map: toTexture(canvas, { repeatX, repeatY, srgb: true }),
    bumpMap: toTexture(bump, { repeatX, repeatY, srgb: false })
  };
}

/**
 * Generates overlapping roof shingle albedo + bump textures.
 */
function createShingleTextures() {
  const { canvas, ctx } = makeCanvas(256, 256);
  const { canvas: bump, ctx: bctx } = makeCanvas(256, 256);

  ctx.fillStyle = '#38322b';
  ctx.fillRect(0, 0, 256, 256);
  bctx.fillStyle = '#707070';
  bctx.fillRect(0, 0, 256, 256);

  const rows = 8;
  const cols = 6;
  const rowH = 256 / rows;
  const colW = 256 / cols;

  for (let r = 0; r < rows; r++) {
    const offset = (r % 2) * (colW * 0.5);
    for (let c = -1; c <= cols; c++) {
      const x = c * colW + offset;
      const y = r * rowH;
      const shade = 44 + Math.floor(Math.random() * 18);
      ctx.fillStyle = `rgb(${shade + 6}, ${shade}, ${shade - 5})`;
      ctx.fillRect(x + 1, y + 1, colW - 2, rowH - 2);

      bctx.fillStyle = `rgb(${120 + Math.floor(Math.random() * 30)},120,120)`;
      bctx.fillRect(x + 1, y + 1, colW - 2, rowH - 3);
      bctx.fillStyle = '#252525';
      bctx.fillRect(x, y + rowH - 3, colW, 3);
    }
  }

  return {
    map: toTexture(canvas, { repeatX: 2, repeatY: 2, srgb: true }),
    bumpMap: toTexture(bump, { repeatX: 2, repeatY: 2, srgb: false })
  };
}

/**
 * Generates furrowed conifer bark albedo + bump textures.
 */
function createBarkTextures() {
  const { canvas, ctx } = makeCanvas(128, 256);
  const { canvas: bump, ctx: bctx } = makeCanvas(128, 256);

  ctx.fillStyle = '#473627';
  ctx.fillRect(0, 0, 128, 256);
  bctx.fillStyle = '#7c7c7c';
  bctx.fillRect(0, 0, 128, 256);

  for (let i = 0; i < 95; i++) {
    const x = Math.random() * 128;
    const y = Math.random() * 256;
    const h = 24 + Math.random() * 68;
    const w = 2 + Math.random() * 5;
    ctx.fillStyle = Math.random() > 0.45 ? 'rgba(30, 20, 13, 0.55)' : 'rgba(104, 82, 58, 0.35)';
    ctx.fillRect(x, y, w, h);

    bctx.fillStyle = Math.random() > 0.5 ? '#3a3a3a' : '#b8b8b8';
    bctx.fillRect(x, y, w, h);
  }

  return {
    map: toTexture(canvas, { repeatX: 1, repeatY: 2, srgb: true }),
    bumpMap: toTexture(bump, { repeatX: 1, repeatY: 2, srgb: false })
  };
}

/**
 * Generates craggy natural rock texture + bump map with subtle moss patches.
 */
function createStoneTextures() {
  const { canvas, ctx } = makeCanvas(256, 256);
  const { canvas: bump, ctx: bctx } = makeCanvas(256, 256);

  ctx.fillStyle = '#62665f';
  ctx.fillRect(0, 0, 256, 256);
  bctx.fillStyle = '#808080';
  bctx.fillRect(0, 0, 256, 256);

  for (let i = 0; i < 240; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    const r = 4 + Math.random() * 18;
    const light = 76 + Math.floor(Math.random() * 44);
    ctx.fillStyle = `rgba(${light}, ${light + 3}, ${light - 2}, 0.28)`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();

    const bVal = 60 + Math.floor(Math.random() * 140);
    bctx.fillStyle = `rgba(${bVal}, ${bVal}, ${bVal}, 0.35)`;
    bctx.beginPath();
    bctx.arc(x, y, r, 0, Math.PI * 2);
    bctx.fill();
  }

  // Subtle lichen/moss flecks
  for (let i = 0; i < 28; i++) {
    ctx.fillStyle = 'rgba(72, 95, 52, 0.25)';
    ctx.beginPath();
    ctx.arc(Math.random() * 256, Math.random() * 256, 6 + Math.random() * 14, 0, Math.PI * 2);
    ctx.fill();
  }

  return {
    map: toTexture(canvas, { repeatX: 1, repeatY: 1, srgb: true }),
    bumpMap: toTexture(bump, { repeatX: 1, repeatY: 1, srgb: false })
  };
}

/**
 * Generates fine soil/leaf-litter micro-detail bump map for the terrain.
 */
function createTerrainDetailBump() {
  const { canvas, ctx } = makeCanvas(256, 256);
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, 256, 256);

  for (let i = 0; i < 900; i++) {
    const v = 70 + Math.floor(Math.random() * 115);
    ctx.fillStyle = `rgba(${v},${v},${v},0.45)`;
    ctx.fillRect(Math.random() * 256, Math.random() * 256, 2 + Math.random() * 4, 2 + Math.random() * 4);
  }
  return toTexture(canvas, { repeatX: 26, repeatY: 26, srgb: false });
}

/**
 * Generates reptilian scale bump texture for SavageZed.
 */
function createScaleBumpTexture() {
  const { canvas, ctx } = makeCanvas(128, 128);
  ctx.fillStyle = '#707070';
  ctx.fillRect(0, 0, 128, 128);

  const step = 10;
  for (let y = 0; y < 128 + step; y += step * 0.85) {
    const offset = (Math.round(y / (step * 0.85)) % 2) * (step * 0.5);
    for (let x = -step; x < 128 + step; x += step) {
      ctx.fillStyle = '#b4b4b4';
      ctx.beginPath();
      ctx.arc(x + offset, y, step * 0.42, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#383838';
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }
  }
  return toTexture(canvas, { repeatX: 3, repeatY: 3, srgb: false });
}

/**
 * Alpha-cutout feathery conifer pine branch cluster texture.
 */
function createConiferBoughTexture() {
  const { canvas, ctx } = makeCanvas(256, 256);
  ctx.clearRect(0, 0, 256, 256);

  // Central woody twig
  ctx.strokeStyle = '#3b2b1d';
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(128, 248);
  ctx.lineTo(128, 22);
  ctx.stroke();

  // Radiating sub-twigs & dense pine needles
  const branches = 11;
  for (let b = 0; b < branches; b++) {
    const t = b / (branches - 1);
    const yBase = 232 - t * 196;
    const span = (1 - t * 0.65) * 98;

    for (const side of [-1, 1]) {
      const tipX = 128 + side * span;
      const tipY = yBase - 24 - Math.random() * 14;

      ctx.strokeStyle = '#3d2d1e';
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(128, yBase);
      ctx.lineTo(tipX, tipY);
      ctx.stroke();

      // Pine needles along sub-branch
      const needleCount = 26;
      for (let n = 0; n < needleCount; n++) {
        const nt = n / needleCount;
        const nx = 128 + (tipX - 128) * nt;
        const ny = yBase + (tipY - yBase) * nt;
        const angle = Math.atan2(tipY - yBase, tipX - 128) + (Math.random() - 0.5) * 1.45;
        const len = 11 + Math.random() * 11;
        const g = 58 + Math.floor(Math.random() * 34);
        ctx.strokeStyle = `rgb(${Math.floor(g * 0.56)}, ${g + 16}, ${Math.floor(g * 0.48)})`;
        ctx.lineWidth = 2.0;
        ctx.beginPath();
        ctx.moveTo(nx, ny);
        ctx.lineTo(nx + Math.cos(angle) * len, ny + Math.sin(angle) * len);
        ctx.stroke();
      }
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/**
 * Alpha-cutout pinnate prehistoric fern frond texture.
 */
function createFernFrondTexture() {
  const { canvas, ctx } = makeCanvas(192, 256);
  ctx.clearRect(0, 0, 192, 256);

  // Central stem
  ctx.strokeStyle = '#4e6f31';
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(96, 252);
  ctx.lineTo(96, 10);
  ctx.stroke();

  // Paired pinnate leaflets tapering smoothly toward tip & base
  const pairs = 20;
  for (let i = 0; i < pairs; i++) {
    const t = i / (pairs - 1);
    const y = 236 - t * 218;
    const widthProfile = Math.sin(Math.pow(t, 0.72) * Math.PI);
    const len = 14 + widthProfile * 74;

    for (const side of [-1, 1]) {
      const tipX = 96 + side * len;
      const tipY = y - 10 - (1 - t) * 5;
      const g = 88 + Math.floor(t * 28 + Math.random() * 14);
      ctx.fillStyle = `rgb(${Math.floor(g * 0.58)}, ${g + 18}, ${Math.floor(g * 0.42)})`;
      ctx.beginPath();
      ctx.moveTo(96, y + 3);
      ctx.quadraticCurveTo(96 + side * len * 0.55, y - 8, tipX, tipY);
      ctx.quadraticCurveTo(96 + side * len * 0.45, y + 5, 96, y - 3);
      ctx.closePath();
      ctx.fill();
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/**
 * Alpha-cutout meadow grass tuft texture.
 */
function createGrassTuftTexture() {
  const { canvas, ctx } = makeCanvas(128, 128);
  ctx.clearRect(0, 0, 128, 128);

  for (let i = 0; i < 24; i++) {
    const xBase = 24 + Math.random() * 80;
    const h = 48 + Math.random() * 68;
    const lean = (Math.random() - 0.5) * 44;
    const g = 84 + Math.floor(Math.random() * 36);
    ctx.strokeStyle = `rgb(${Math.floor(g * 0.68)}, ${g + 12}, ${Math.floor(g * 0.45)})`;
    ctx.lineWidth = 2.4 + Math.random() * 1.4;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(xBase, 126);
    ctx.quadraticCurveTo(xBase + lean * 0.35, 126 - h * 0.55, xBase + lean, 126 - h);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * Creates shared PBR material library for structures, terrain, flora, and props.
 */
export function createOutpostMaterials() {
  const darkWood = createWoodTextures('#4f3a29', '#2b1d12', 1, 1);
  const weatheredWood = createWoodTextures('#72563d', '#44301f', 2, 1);
  const lightPlank = createWoodTextures('#8d6f4e', '#59422b', 1, 1);
  const shingles = createShingleTextures();
  const bark = createBarkTextures();
  const stone = createStoneTextures();
  const terrainBump = createTerrainDetailBump();
  const scaleBump = createScaleBumpTexture();

  const pineBoughMap = createConiferBoughTexture();
  const fernFrondMap = createFernFrondTexture();
  const grassTuftMap = createGrassTuftTexture();

  return {
    timberDark: new THREE.MeshStandardMaterial({
      map: darkWood.map,
      bumpMap: darkWood.bumpMap,
      bumpScale: 0.04,
      roughness: 0.9
    }),
    timberWeathered: new THREE.MeshStandardMaterial({
      map: weatheredWood.map,
      bumpMap: weatheredWood.bumpMap,
      bumpScale: 0.05,
      roughness: 0.86
    }),
    plankLight: new THREE.MeshStandardMaterial({
      map: lightPlank.map,
      bumpMap: lightPlank.bumpMap,
      bumpScale: 0.04,
      roughness: 0.84
    }),
    shingle: new THREE.MeshStandardMaterial({
      map: shingles.map,
      bumpMap: shingles.bumpMap,
      bumpScale: 0.07,
      roughness: 0.92
    }),
    stone: new THREE.MeshStandardMaterial({
      map: stone.map,
      bumpMap: stone.bumpMap,
      bumpScale: 0.08,
      roughness: 0.92
    }),
    metalDark: new THREE.MeshStandardMaterial({ color: 0x2b302c, roughness: 0.45, metalness: 0.55 }),
    screenGlow: new THREE.MeshStandardMaterial({
      color: 0x244230,
      emissive: 0x4f9968,
      emissiveIntensity: 0.85,
      roughness: 0.24
    }),
    boardSlate: new THREE.MeshStandardMaterial({ color: 0x222723, roughness: 0.82 }),
    noticePaper: new THREE.MeshStandardMaterial({ color: 0xdcd5c2, roughness: 0.88 }),
    noticeAmber: new THREE.MeshStandardMaterial({ color: 0xc99646, roughness: 0.7 }),
    lanternGlass: new THREE.MeshStandardMaterial({
      color: 0xffe7b8,
      emissive: 0xffb347,
      emissiveIntensity: 1.55,
      roughness: 0.18
    }),
    trunk: new THREE.MeshStandardMaterial({
      map: bark.map,
      bumpMap: bark.bumpMap,
      bumpScale: 0.09,
      roughness: 0.95
    }),
    coniferBough: new THREE.MeshStandardMaterial({
      map: pineBoughMap,
      alphaTest: 0.36,
      side: THREE.DoubleSide,
      roughness: 0.85
    }),
    fernFrond: new THREE.MeshStandardMaterial({
      map: fernFrondMap,
      alphaTest: 0.38,
      side: THREE.DoubleSide,
      roughness: 0.8
    }),
    cycadFrond: new THREE.MeshStandardMaterial({
      map: fernFrondMap,
      color: 0x99b36b,
      alphaTest: 0.38,
      side: THREE.DoubleSide,
      roughness: 0.78
    }),
    grassTuft: new THREE.MeshStandardMaterial({
      map: grassTuftMap,
      alphaTest: 0.36,
      side: THREE.DoubleSide,
      roughness: 0.88
    }),
    terrainBump,
    scaleBump
  };
}
