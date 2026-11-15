/**
 * Lightweight 2D/3D AABB circle-vs-box collision system.
 * Prevents the player from walking through cabins, desks, boulders, or gate posts
 * while allowing smooth wall sliding.
 */
export class CollisionSystem {
  constructor(worldRadius = 62) {
    this.colliders = [];
    this.worldRadius = worldRadius;
  }

  /**
   * Registers an axis-aligned solid obstacle in XZ space.
   */
  addBox(centerX, centerZ, width, depth, label = 'obstacle') {
    const halfW = width * 0.5;
    const halfD = depth * 0.5;
    this.colliders.push({
      minX: centerX - halfW,
      maxX: centerX + halfW,
      minZ: centerZ - halfD,
      maxZ: centerZ + halfD,
      label
    });
  }

  /**
   * Registers a square/circular-approximated obstacle such as a tree trunk or boulder.
   */
  addCylinder(centerX, centerZ, radius, label = 'trunk') {
    this.addBox(centerX, centerZ, radius * 2, radius * 2, label);
  }

  /**
   * Resolves player horizontal position against all registered colliders and world bounds.
   */
  resolve(position, playerRadius = 0.55) {
    for (const box of this.colliders) {
      const closestX = Math.max(box.minX, Math.min(position.x, box.maxX));
      const closestZ = Math.max(box.minZ, Math.min(position.z, box.maxZ));

      const dx = position.x - closestX;
      const dz = position.z - closestZ;
      const distSq = dx * dx + dz * dz;

      if (distSq < playerRadius * playerRadius) {
        const dist = Math.sqrt(distSq);
        if (dist > 0.0001) {
          const push = playerRadius - dist;
          position.x += (dx / dist) * push;
          position.z += (dz / dist) * push;
        } else {
          // Player center inside box: push out along nearest edge
          const penLeft = Math.abs(position.x - box.minX);
          const penRight = Math.abs(box.maxX - position.x);
          const penTop = Math.abs(position.z - box.minZ);
          const penBottom = Math.abs(box.maxZ - position.z);
          const minPen = Math.min(penLeft, penRight, penTop, penBottom);

          if (minPen === penLeft) position.x = box.minX - playerRadius;
          else if (minPen === penRight) position.x = box.maxX + playerRadius;
          else if (minPen === penTop) position.z = box.minZ - playerRadius;
          else position.z = box.maxZ + playerRadius;
        }
      }
    }

    // Clamp to outpost perimeter
    const rSq = position.x * position.x + position.z * position.z;
    const maxR = this.worldRadius;
    if (rSq > maxR * maxR) {
      const r = Math.sqrt(rSq);
      position.x = (position.x / r) * maxR;
      position.z = (position.z / r) * maxR;
    }
  }
}
