import * as THREE from 'three';

/**
 * Creates the first-person perspective camera.
 */
export function createCamera() {
  const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    240
  );
  camera.position.set(0, 1.75, 14);
  return camera;
}
