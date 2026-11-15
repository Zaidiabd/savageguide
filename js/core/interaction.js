import * as THREE from 'three';

/**
 * Detects nearby interactive stations using both distance and camera view alignment
 * (plus raycast fallback) so stations feel effortless to trigger in first-person.
 */
export class InteractionSystem {
  constructor(camera, interactables) {
    this.camera = camera;
    this.interactables = interactables;
    this.activeStation = null;

    this.raycaster = new THREE.Raycaster();
    this.centerNdc = new THREE.Vector2(0, 0);
    this.lookDir = new THREE.Vector3();
    this.toTarget = new THREE.Vector3();
  }

  /**
   * Evaluates closest valid station in front of the player and nearest overall zone.
   */
  update() {
    this.camera.getWorldDirection(this.lookDir);

    let bestStation = null;
    let bestScore = Infinity;
    let nearestZone = null;
    let nearestDist = Infinity;

    for (const item of this.interactables) {
      const dist = this.camera.position.distanceTo(item.worldPosition);

      if (dist < nearestDist) {
        nearestDist = dist;
        nearestZone = item.destination;
      }

      if (dist > item.destination.interactRadius) continue;

      this.toTarget.subVectors(item.worldPosition, this.camera.position).normalize();
      const facingDot = this.lookDir.dot(this.toTarget);

      // Allow interaction when reasonably facing the station or standing very close
      if (facingDot > 0.25 || dist < 2.4) {
        const score = dist - facingDot * 1.5;
        if (score < bestScore) {
          bestScore = score;
          bestStation = item.destination;
        }
      }
    }

    // Raycast check as extra precision helper
    if (!bestStation) {
      this.raycaster.setFromCamera(this.centerNdc, this.camera);
      const targets = this.interactables.map((i) => i.target);
      const hits = this.raycaster.intersectObjects(targets, false);
      if (hits.length > 0 && hits[0].distance <= 5.2) {
        const matched = this.interactables.find((i) => i.target === hits[0].object);
        if (matched) bestStation = matched.destination;
      }
    }

    this.activeStation = bestStation;

    return {
      activeStation: this.activeStation,
      nearestZone: nearestDist < 16 ? nearestZone : null
    };
  }
}
