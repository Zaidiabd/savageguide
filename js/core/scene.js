import * as THREE from 'three';

function createSkyDome(sunDirection) {
  const skyGeo = new THREE.SphereGeometry(210, 32, 20);
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {
      topColor: { value: new THREE.Color(0x4b6968) },
      horizonColor: { value: new THREE.Color(0x9fb299) },
      sunColor: { value: new THREE.Color(0xffe7ba) },
      sunDir: { value: sunDirection.clone().normalize() }
    },
    vertexShader: `
      varying vec3 vWorldDir;
      void main() {
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldDir = normalize(worldPos.xyz);
        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `,
    fragmentShader: `
      uniform vec3 topColor;
      uniform vec3 horizonColor;
      uniform vec3 sunColor;
      uniform vec3 sunDir;
      varying vec3 vWorldDir;
      void main() {
        float h = clamp(vWorldDir.y, 0.0, 1.0);
        vec3 col = mix(horizonColor, topColor, pow(h, 0.65));
        float sunAmt = max(dot(normalize(vWorldDir), sunDir), 0.0);
        col += sunColor * (pow(sunAmt, 24.0) * 0.38 + pow(sunAmt, 160.0) * 0.45);
        gl_FragColor = vec4(col, 1.0);
      }
    `
  });
  return new THREE.Mesh(skyGeo, skyMat);
}

function createDustMotes(isTouchDevice) {
  const count = isTouchDevice ? 140 : 280;
  const positions = new Float32Array(count * 3);
  const phases = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 78;
    positions[i * 3 + 1] = 0.8 + Math.random() * 8.5;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 78;
    phases[i] = Math.random() * Math.PI * 2;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const mat = new THREE.PointsMaterial({
    color: 0xfff0cc,
    size: 0.11,
    transparent: true,
    opacity: 0.42,
    depthWrite: false
  });

  const points = new THREE.Points(geo, mat);
  const baseY = Float32Array.from(positions.filter((_, idx) => idx % 3 === 1));

  const update = (elapsed) => {
    const pos = geo.attributes.position;
    for (let i = 0; i < count; i++) {
      pos.setY(i, baseY[i] + Math.sin(elapsed * 0.55 + phases[i]) * 0.35);
    }
    pos.needsUpdate = true;
  };

  return { points, update };
}

/**
 * Creates the Three.js scene, renderer, atmospheric sky dome, fog, sunlit motes, and lighting.
 */
export function createSceneContext(container) {
  const scene = new THREE.Scene();

  const fogColor = new THREE.Color(0x93a68f);
  scene.background = fogColor;
  scene.fog = new THREE.FogExp2(fogColor.getHex(), 0.0135);

  const isTouchDevice =
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    Boolean(window.matchMedia?.('(pointer: coarse)').matches);

  const renderer = new THREE.WebGLRenderer({
    antialias: !isTouchDevice,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isTouchDevice ? 1.5 : 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;

  container.appendChild(renderer.domElement);

  const sunPos = new THREE.Vector3(44, 62, 26);
  scene.add(createSkyDome(sunPos));

  // Natural hemisphere sky/forest-floor bounce light
  const hemiLight = new THREE.HemisphereLight(0xdbe8d6, 0x3b442c, 0.78);
  hemiLight.position.set(0, 50, 0);
  scene.add(hemiLight);

  // Warm late-morning directional sunlight with soft shadows
  const sunLight = new THREE.DirectionalLight(0xffebd0, 2.05);
  sunLight.position.copy(sunPos);
  sunLight.castShadow = true;
  const shadowSize = isTouchDevice ? 1024 : 2048;
  sunLight.shadow.mapSize.set(shadowSize, shadowSize);
  sunLight.shadow.camera.near = 5;
  sunLight.shadow.camera.far = 165;
  const shadowBounds = 68;
  sunLight.shadow.camera.left = -shadowBounds;
  sunLight.shadow.camera.right = shadowBounds;
  sunLight.shadow.camera.top = shadowBounds;
  sunLight.shadow.camera.bottom = -shadowBounds;
  sunLight.shadow.bias = -0.0004;
  scene.add(sunLight);

  // Subtle cool forest fill light from opposite horizon
  const fillLight = new THREE.DirectionalLight(0x88a89a, 0.35);
  fillLight.position.set(-38, 24, -32);
  scene.add(fillLight);

  const motes = createDustMotes(isTouchDevice);
  scene.add(motes.points);

  return {
    scene,
    renderer,
    sunLight,
    hemiLight,
    isTouchDevice,
    updateAtmosphere: motes.update
  };
}
