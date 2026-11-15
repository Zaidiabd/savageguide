import * as THREE from 'three';

/**
 * Creates the core Three.js scene, renderer, atmospheric fog, and natural lighting.
 */
export function createSceneContext(container) {
  const scene = new THREE.Scene();

  // Warm Mesozoic misty forest sky & exponential fog
  const fogColor = new THREE.Color(0x8fa38f);
  scene.background = fogColor;
  scene.fog = new THREE.FogExp2(fogColor.getHex(), 0.0155);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  container.appendChild(renderer.domElement);

  // Natural hemisphere sky/forest-floor bounce light
  const hemiLight = new THREE.HemisphereLight(0xd9e8d2, 0x3b422d, 0.72);
  hemiLight.position.set(0, 50, 0);
  scene.add(hemiLight);

  // Warm late-morning directional sunlight with soft shadows
  const sunLight = new THREE.DirectionalLight(0xffe9c4, 1.85);
  sunLight.position.set(42, 64, 28);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.set(2048, 2048);
  sunLight.shadow.camera.near = 5;
  sunLight.shadow.camera.far = 160;
  const shadowBounds = 68;
  sunLight.shadow.camera.left = -shadowBounds;
  sunLight.shadow.camera.right = shadowBounds;
  sunLight.shadow.camera.top = shadowBounds;
  sunLight.shadow.camera.bottom = -shadowBounds;
  sunLight.shadow.bias = -0.0005;
  scene.add(sunLight);

  return { scene, renderer, sunLight, hemiLight };
}
