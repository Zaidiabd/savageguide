import * as THREE from 'three';

/**
 * Procedural Grass, Flying Prehistoric Insects (Dragonflies, Butterflies, Fireflies)
 * & Crawling Wildlife (Iridescent Beetles, Forest Lizards, Armored Millipedes).
 * Uses InstancedMesh + GPU wind vertex animation to keep desktop & mobile framerates high.
 */

function mergeStaticGeometries(geometries) {
  const positions = [];
  const normals = [];
  const colors = [];
  const indices = [];

  for (const g of geometries) {
    const base = positions.length / 3;
    const p = g.attributes.position.array;
    const n = g.attributes.normal.array;
    const c = g.attributes.color ? g.attributes.color.array : null;
    const idx = g.index.array;

    for (let i = 0; i < p.length; i++) positions.push(p[i]);
    for (let i = 0; i < n.length; i++) normals.push(n[i]);
    if (c) {
      for (let i = 0; i < c.length; i++) colors.push(c[i]);
    } else {
      for (let i = 0; i < p.length; i++) colors.push(1);
    }
    for (let i = 0; i < idx.length; i++) indices.push(idx[i] + base);
  }

  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  out.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  out.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  out.setIndex(indices);
  return out;
}

/**
 * Builds a single natural 5-blade curved tapered grass clump geometry with root-to-tip vertex shading.
 */
function buildGrassClumpGeometry() {
  const blades = [];
  const bladeSpecs = [
    { x: 0, z: 0, rot: 0.2, lean: 0.14, h: 0.56, w: 0.065 },
    { x: 0.08, z: 0.05, rot: 1.4, lean: 0.18, h: 0.48, w: 0.058 },
    { x: -0.07, z: 0.06, rot: 2.7, lean: 0.2, h: 0.52, w: 0.06 },
    { x: 0.05, z: -0.08, rot: 4.1, lean: 0.16, h: 0.44, w: 0.054 },
    { x: -0.06, z: -0.05, rot: 5.3, lean: 0.17, h: 0.5, w: 0.056 }
  ];

  const rootCol = new THREE.Color(0x283a1b);
  const tipCol = new THREE.Color(0x7ca345);
  const tmpCol = new THREE.Color();
  const mat4 = new THREE.Matrix4();

  for (const spec of bladeSpecs) {
    const segsY = 3;
    const g = new THREE.PlaneGeometry(spec.w, spec.h, 1, segsY);
    g.translate(0, spec.h * 0.5, 0);

    const pos = g.attributes.position;
    const cols = new Float32Array(pos.count * 3);

    for (let i = 0; i < pos.count; i++) {
      const py = Math.max(0, pos.getY(i));
      const t = py / spec.h;
      const taper = 1 - Math.pow(t, 1.35) * 0.92;
      pos.setX(i, pos.getX(i) * taper);
      pos.setZ(i, pos.getZ(i) + Math.pow(t, 1.8) * spec.lean);

      tmpCol.copy(rootCol).lerp(tipCol, Math.pow(t, 0.85));
      cols[i * 3] = tmpCol.r;
      cols[i * 3 + 1] = tmpCol.g;
      cols[i * 3 + 2] = tmpCol.b;
    }

    g.setAttribute('color', new THREE.BufferAttribute(cols, 3));
    g.computeVertexNormals();

    mat4.makeRotationY(spec.rot);
    mat4.setPosition(spec.x, 0, spec.z);
    g.applyMatrix4(mat4);
    blades.push(g);
  }

  return mergeStaticGeometries(blades);
}

/**
 * Dense GPU-wind-animated procedural grass field spread naturally across the forest floor & glades.
 */
function buildProceduralGrass(scene, { rand, getTerrainHeight, minTrailDistance, isNearStation, isTouchDevice }) {
  const clumpCount = isTouchDevice ? 1350 : 2700;
  const geo = buildGrassClumpGeometry();

  const windUniforms = { uWindTime: { value: 0 } };
  const mat = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.84,
    metalness: 0.02,
    side: THREE.DoubleSide
  });

  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uWindTime = windUniforms.uWindTime;
    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        `#include <common>
         uniform float uWindTime;`
      )
      .replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
         vec4 instOrigin = vec4(0.0, 0.0, 0.0, 1.0);
         #ifdef USE_INSTANCING
           instOrigin = instanceMatrix * instOrigin;
         #endif
         float hFactor = clamp(position.y / 0.56, 0.0, 1.2);
         float bend = hFactor * hFactor;
         float gust = sin(uWindTime * 2.1 + instOrigin.x * 0.24 + instOrigin.z * 0.19) * 0.14
                    + sin(uWindTime * 4.4 + instOrigin.x * 0.55 - instOrigin.z * 0.42) * 0.045;
         transformed.x += gust * bend;
         transformed.z += gust * 0.65 * bend;`
      );
  };

  const inst = new THREE.InstancedMesh(geo, mat, clumpCount);
  inst.receiveShadow = true;

  const dummy = new THREE.Object3D();
  const color = new THREE.Color();
  const tintLow = new THREE.Color(0x88a363);
  const tintHigh = new THREE.Color(0xc2d67a);

  let placed = 0;
  let attempts = 0;

  while (placed < clumpCount && attempts < clumpCount * 4) {
    attempts++;
    const x = (rand() - 0.5) * 124;
    const z = (rand() - 0.5) * 124;

    if (minTrailDistance(x, z) < 1.35) continue;
    if (Math.hypot(x + 22, z - 20) < 7.0) continue; // Pond water
    if (isNearStation(x, z, 3.6)) continue;

    const y = getTerrainHeight(x, z);
    const scaleXZ = 0.8 + rand() * 0.75;
    const scaleY = 0.68 + rand() * 0.88;

    dummy.position.set(x, y - 0.03, z);
    dummy.rotation.set(0, rand() * Math.PI * 2, 0);
    dummy.scale.set(scaleXZ, scaleY, scaleXZ);
    dummy.updateMatrix();
    inst.setMatrixAt(placed, dummy.matrix);

    color.copy(tintLow).lerp(tintHigh, rand());
    inst.setColorAt(placed, color);
    placed++;
  }

  inst.count = placed;
  inst.instanceMatrix.needsUpdate = true;
  if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
  scene.add(inst);

  return (elapsed) => {
    windUniforms.uWindTime.value = elapsed;
  };
}

/**
 * Creates hovering Meganeura dragonflies, fluttering forest butterflies, and glowing twilight fireflies.
 */
function buildFlyingInsects(scene, { rand, getTerrainHeight, isTouchDevice }) {
  const dragonflyCount = isTouchDevice ? 14 : 24;
  const butterflyCount = isTouchDevice ? 18 : 30;
  const fireflyCount = isTouchDevice ? 85 : 150;

  // 1. Prehistoric Dragonflies (body + wing pairs instanced separately for crisp wingbeat)
  const bodyGeo = new THREE.CylinderGeometry(0.014, 0.008, 0.24, 6);
  bodyGeo.rotateX(Math.PI / 2);
  const wingGeo = new THREE.PlaneGeometry(0.18, 0.045);
  wingGeo.translate(0.09, 0, 0);

  const dfBodyMat = new THREE.MeshStandardMaterial({
    color: 0x2cb5c4,
    roughness: 0.28,
    metalness: 0.65
  });
  const dfWingMat = new THREE.MeshBasicMaterial({
    color: 0xdff8ff,
    transparent: true,
    opacity: 0.55,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const dfBodies = new THREE.InstancedMesh(bodyGeo, dfBodyMat, dragonflyCount);
  const dfWingsL = new THREE.InstancedMesh(wingGeo, dfWingMat, dragonflyCount);
  const dfWingsR = new THREE.InstancedMesh(wingGeo, dfWingMat, dragonflyCount);

  const dragonflies = [];
  for (let i = 0; i < dragonflyCount; i++) {
    // Cluster half around the pond, half across sunlit forest trails
    const nearPond = i < dragonflyCount * 0.55;
    const cx = nearPond ? -22 + (rand() - 0.5) * 14 : (rand() - 0.5) * 56;
    const cz = nearPond ? 20 + (rand() - 0.5) * 14 : (rand() - 0.5) * 56;
    dragonflies.push({
      cx,
      cz,
      rx: 1.5 + rand() * 3.8,
      rz: 1.5 + rand() * 3.8,
      baseHeight: 0.75 + rand() * 1.35,
      speed: 0.7 + rand() * 0.85,
      phase: rand() * Math.PI * 2,
      flapSpeed: 28 + rand() * 14
    });
  }
  scene.add(dfBodies, dfWingsL, dfWingsR);

  // 2. Forest Butterflies (golden-amber, emerald & azure)
  const bWingGeo = new THREE.PlaneGeometry(0.095, 0.11);
  bWingGeo.translate(0.048, 0, 0);
  const bWingMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide
  });

  const bWingsL = new THREE.InstancedMesh(bWingGeo, bWingMat, butterflyCount);
  const bWingsR = new THREE.InstancedMesh(bWingGeo, bWingMat, butterflyCount);

  const bPalette = [
    new THREE.Color(0xf6b93b),
    new THREE.Color(0xff9f43),
    new THREE.Color(0xe5e0b8),
    new THREE.Color(0x7bed9f),
    new THREE.Color(0x70a1ff)
  ];

  const butterflies = [];
  for (let i = 0; i < butterflyCount; i++) {
    const col = bPalette[i % bPalette.length];
    bWingsL.setColorAt(i, col);
    bWingsR.setColorAt(i, col);
    butterflies.push({
      cx: (rand() - 0.5) * 78,
      cz: (rand() - 0.5) * 78,
      radius: 1.8 + rand() * 4.5,
      height: 0.85 + rand() * 1.8,
      speed: 0.45 + rand() * 0.55,
      phase: rand() * Math.PI * 2,
      flapSpeed: 12 + rand() * 6
    });
  }
  if (bWingsL.instanceColor) bWingsL.instanceColor.needsUpdate = true;
  if (bWingsR.instanceColor) bWingsR.instanceColor.needsUpdate = true;
  scene.add(bWingsL, bWingsR);

  // 3. Soft Glowing Forest Fireflies / Midges
  const ffPositions = new Float32Array(fireflyCount * 3);
  const ffData = [];
  for (let i = 0; i < fireflyCount; i++) {
    const x = (rand() - 0.5) * 86;
    const z = (rand() - 0.5) * 86;
    const y = getTerrainHeight(x, z) + 0.45 + rand() * 2.2;
    ffPositions[i * 3] = x;
    ffPositions[i * 3 + 1] = y;
    ffPositions[i * 3 + 2] = z;
    ffData.push({
      bx: x,
      by: y,
      bz: z,
      phase: rand() * Math.PI * 2,
      speed: 0.6 + rand() * 0.9
    });
  }
  const ffGeo = new THREE.BufferGeometry();
  ffGeo.setAttribute('position', new THREE.BufferAttribute(ffPositions, 3));
  const ffMat = new THREE.PointsMaterial({
    color: 0xe6ff85,
    size: 0.14,
    transparent: true,
    opacity: 0.78,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const fireflies = new THREE.Points(ffGeo, ffMat);
  scene.add(fireflies);

  const dummy = new THREE.Object3D();

  return (elapsed) => {
    // Animate Dragonflies
    for (let i = 0; i < dragonflyCount; i++) {
      const df = dragonflies[i];
      const t = elapsed * df.speed + df.phase;
      const x = df.cx + Math.sin(t) * df.rx;
      const z = df.cz + Math.sin(t * 2.0) * (df.rz * 0.55);
      const vx = Math.cos(t) * df.rx * df.speed;
      const vz = Math.cos(t * 2.0) * df.rz * 1.1 * df.speed;
      const yaw = Math.atan2(vx, vz);
      const y = getTerrainHeight(x, z) + df.baseHeight + Math.sin(elapsed * 3.1 + df.phase) * 0.16;

      dummy.position.set(x, y, z);
      dummy.rotation.set(0, yaw, 0);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      dfBodies.setMatrixAt(i, dummy.matrix);

      const flap = Math.sin(elapsed * df.flapSpeed + df.phase) * 0.48;
      dummy.rotation.set(0, yaw, flap);
      dummy.updateMatrix();
      dfWingsR.setMatrixAt(i, dummy.matrix);

      dummy.rotation.set(0, yaw + Math.PI, -flap);
      dummy.updateMatrix();
      dfWingsL.setMatrixAt(i, dummy.matrix);
    }
    dfBodies.instanceMatrix.needsUpdate = true;
    dfWingsL.instanceMatrix.needsUpdate = true;
    dfWingsR.instanceMatrix.needsUpdate = true;

    // Animate Butterflies
    for (let i = 0; i < butterflyCount; i++) {
      const b = butterflies[i];
      const t = elapsed * b.speed + b.phase;
      const x = b.cx + Math.cos(t) * b.radius + Math.sin(t * 2.3) * 0.6;
      const z = b.cz + Math.sin(t * 1.3) * b.radius;
      const y = getTerrainHeight(x, z) + b.height + Math.sin(elapsed * 4.2 + b.phase) * 0.25;
      const yaw = Math.atan2(-Math.sin(t), Math.cos(t * 1.3));
      const flap = Math.sin(elapsed * b.flapSpeed + b.phase) * 0.85;

      dummy.position.set(x, y, z);
      dummy.scale.setScalar(1);
      dummy.rotation.set(0.15, yaw, flap);
      dummy.updateMatrix();
      bWingsR.setMatrixAt(i, dummy.matrix);

      dummy.rotation.set(-0.15, yaw + Math.PI, -flap);
      dummy.updateMatrix();
      bWingsL.setMatrixAt(i, dummy.matrix);
    }
    bWingsL.instanceMatrix.needsUpdate = true;
    bWingsR.instanceMatrix.needsUpdate = true;

    // Animate Fireflies
    const pArr = ffGeo.attributes.position.array;
    for (let i = 0; i < fireflyCount; i++) {
      const f = ffData[i];
      pArr[i * 3] = f.bx + Math.sin(elapsed * f.speed + f.phase) * 0.9;
      pArr[i * 3 + 1] = f.by + Math.cos(elapsed * (f.speed * 1.3) + f.phase) * 0.35;
      pArr[i * 3 + 2] = f.bz + Math.cos(elapsed * f.speed + f.phase * 1.4) * 0.9;
    }
    ffGeo.attributes.position.needsUpdate = true;
    ffMat.opacity = 0.55 + Math.sin(elapsed * 2.6) * 0.24;
  };
}

/**
 * Builds crawling ground wildlife hugging terrain elevation:
 * 1. Iridescent prehistoric beetles
 * 2. Agile darting forest lizards / geckos
 * 3. Segmented armored millipedes
 */
function buildCrawlingWildlife(scene, { rand, getTerrainHeight, isTouchDevice }) {
  const beetleCount = isTouchDevice ? 16 : 28;
  const lizardCount = isTouchDevice ? 10 : 18;
  const millipedeCount = isTouchDevice ? 8 : 14;

  // 1. Prehistoric Beetles
  const shellGeo = new THREE.SphereGeometry(0.08, 8, 6);
  shellGeo.scale(0.85, 0.55, 1.35);
  const headGeo = new THREE.SphereGeometry(0.04, 6, 5);
  headGeo.translate(0, 0, 0.11);
  const beetleGeo = mergeStaticGeometries([shellGeo, headGeo]);

  const beetleMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.25,
    metalness: 0.72
  });
  const beetleInst = new THREE.InstancedMesh(beetleGeo, beetleMat, beetleCount);
  beetleInst.castShadow = true;

  const beetleColors = [
    new THREE.Color(0x287855),
    new THREE.Color(0x36648b),
    new THREE.Color(0x7c482b),
    new THREE.Color(0x523b6e)
  ];

  const beetles = [];
  for (let i = 0; i < beetleCount; i++) {
    beetleInst.setColorAt(i, beetleColors[i % beetleColors.length]);
    beetles.push({
      cx: (rand() - 0.5) * 84,
      cz: (rand() - 0.5) * 84,
      rx: 0.9 + rand() * 2.6,
      rz: 0.9 + rand() * 2.6,
      speed: 0.35 + rand() * 0.45,
      phase: rand() * Math.PI * 2,
      scale: 0.8 + rand() * 0.55
    });
  }
  if (beetleInst.instanceColor) beetleInst.instanceColor.needsUpdate = true;
  scene.add(beetleInst);

  // 2. Agile Forest Lizards (head + torso + splayed limbs + long tail)
  const lizParts = [];
  const torso = new THREE.CapsuleGeometry(0.042, 0.18, 4, 6);
  torso.rotateX(Math.PI / 2);
  lizParts.push(torso);

  const lHead = new THREE.ConeGeometry(0.038, 0.1, 6);
  lHead.rotateX(Math.PI / 2);
  lHead.translate(0, 0.008, 0.16);
  lizParts.push(lHead);

  const lTail = new THREE.ConeGeometry(0.028, 0.28, 6);
  lTail.rotateX(-Math.PI / 2);
  lTail.translate(0, -0.004, -0.22);
  lizParts.push(lTail);

  for (const [lx, lz, rz] of [
    [-0.07, 0.06, 0.75],
    [0.07, 0.06, -0.75],
    [-0.07, -0.07, 0.75],
    [0.07, -0.07, -0.75]
  ]) {
    const leg = new THREE.CylinderGeometry(0.012, 0.009, 0.09, 5);
    leg.rotateZ(rz);
    leg.translate(lx, -0.018, lz);
    lizParts.push(leg);
  }

  const lizardGeo = mergeStaticGeometries(lizParts);
  const lizardMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.62
  });
  const lizardInst = new THREE.InstancedMesh(lizardGeo, lizardMat, lizardCount);
  lizardInst.castShadow = true;

  const lizardColors = [
    new THREE.Color(0x52803c),
    new THREE.Color(0x7c8f43),
    new THREE.Color(0x8c6d46),
    new THREE.Color(0x4b7766)
  ];

  const lizards = [];
  for (let i = 0; i < lizardCount; i++) {
    lizardInst.setColorAt(i, lizardColors[i % lizardColors.length]);
    lizards.push({
      cx: (rand() - 0.5) * 76,
      cz: (rand() - 0.5) * 76,
      radius: 2.2 + rand() * 4.5,
      speed: 0.55 + rand() * 0.55,
      phase: rand() * Math.PI * 2,
      scale: 0.85 + rand() * 0.55
    });
  }
  if (lizardInst.instanceColor) lizardInst.instanceColor.needsUpdate = true;
  scene.add(lizardInst);

  // 3. Armored Forest Millipedes (6 articulated-looking segmented beads)
  const segParts = [];
  for (let s = 0; s < 6; s++) {
    const seg = new THREE.SphereGeometry(0.042 - s * 0.002, 6, 5);
    seg.scale(0.9, 0.72, 1.0);
    seg.translate(0, 0, -s * 0.068);
    segParts.push(seg);
  }
  const millipedeGeo = mergeStaticGeometries(segParts);
  const millipedeMat = new THREE.MeshStandardMaterial({
    color: 0x4b2921,
    roughness: 0.45,
    metalness: 0.18
  });
  const millipedeInst = new THREE.InstancedMesh(millipedeGeo, millipedeMat, millipedeCount);

  const millipedes = [];
  for (let i = 0; i < millipedeCount; i++) {
    millipedes.push({
      cx: -14 + (rand() - 0.5) * 44,
      cz: 10 + (rand() - 0.5) * 44,
      radius: 1.4 + rand() * 3.0,
      speed: 0.22 + rand() * 0.22,
      phase: rand() * Math.PI * 2,
      scale: 0.9 + rand() * 0.45
    });
  }
  scene.add(millipedeInst);

  const dummy = new THREE.Object3D();
  const clampOutsidePond = (px, pz, minR = 7.3) => {
    const dx = px + 22;
    const dz = pz - 20;
    const d = Math.hypot(dx, dz);
    if (d < minR && d > 0.001) {
      return [-22 + (dx / d) * minR, 20 + (dz / d) * minR];
    }
    return [px, pz];
  };

  return (elapsed) => {
    for (let i = 0; i < beetleCount; i++) {
      const b = beetles[i];
      const t = elapsed * b.speed + b.phase;
      const [x, z] = clampOutsidePond(
        b.cx + Math.cos(t) * b.rx,
        b.cz + Math.sin(t) * b.rz,
        7.3
      );

      const vx = -Math.sin(t) * b.rx;
      const vz = Math.cos(t) * b.rz;
      const y = getTerrainHeight(x, z) + 0.04 * b.scale;

      dummy.position.set(x, y, z);
      dummy.rotation.set(0, Math.atan2(vx, vz), Math.sin(elapsed * 18 + b.phase) * 0.06);
      dummy.scale.setScalar(b.scale);
      dummy.updateMatrix();
      beetleInst.setMatrixAt(i, dummy.matrix);
    }
    beetleInst.instanceMatrix.needsUpdate = true;

    for (let i = 0; i < lizardCount; i++) {
      const l = lizards[i];
      // Periodic dart-and-pause movement cycle
      const burst = Math.max(0, Math.sin(elapsed * 1.1 + l.phase));
      const t = elapsed * l.speed + l.phase + burst * 0.35;
      const [x, z] = clampOutsidePond(
        l.cx + Math.sin(t) * l.radius,
        l.cz + Math.sin(t * 1.5 + 0.8) * (l.radius * 0.72),
        7.5
      );

      const vx = Math.cos(t) * l.radius;
      const vz = Math.cos(t * 1.5 + 0.8) * l.radius * 1.08;
      const y = getTerrainHeight(x, z) + 0.045 * l.scale;

      dummy.position.set(x, y, z);
      dummy.rotation.set(0, Math.atan2(vx, vz) + Math.sin(elapsed * 9 + l.phase) * 0.08 * burst, 0);
      dummy.scale.setScalar(l.scale);
      dummy.updateMatrix();
      lizardInst.setMatrixAt(i, dummy.matrix);
    }
    lizardInst.instanceMatrix.needsUpdate = true;

    for (let i = 0; i < millipedeCount; i++) {
      const mp = millipedes[i];
      const t = elapsed * mp.speed + mp.phase;
      const [x, z] = clampOutsidePond(
        mp.cx + Math.cos(t) * mp.radius,
        mp.cz + Math.sin(t) * mp.radius,
        7.3
      );

      const vx = -Math.sin(t) * mp.radius;
      const vz = Math.cos(t) * mp.radius;
      const y = getTerrainHeight(x, z) + 0.032 * mp.scale;

      dummy.position.set(x, y, z);
      dummy.rotation.set(0, Math.atan2(vx, vz) + Math.sin(elapsed * 5 + mp.phase) * 0.1, 0);
      dummy.scale.setScalar(mp.scale);
      dummy.updateMatrix();
      millipedeInst.setMatrixAt(i, dummy.matrix);
    }
    millipedeInst.instanceMatrix.needsUpdate = true;
  };
}

/**
 * Populates the entire environment with procedural GPU-animated grass, flying insects,
 * and crawling ground wildlife, returning an animation update callback.
 */
export function createPrehistoricWildlife(scene, options) {
  const updateGrass = buildProceduralGrass(scene, options);
  const updateInsects = buildFlyingInsects(scene, options);
  const updateCrawlers = buildCrawlingWildlife(scene, options);

  return (elapsed) => {
    updateGrass(elapsed);
    updateInsects(elapsed);
    updateCrawlers(elapsed);
  };
}
