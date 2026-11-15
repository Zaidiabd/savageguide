import { DESTINATIONS, SAVAGEZED_NPC } from '../data/tutorialContent.js';

/**
 * Alternative direct destination navigation system (Quick Jump).
 * Teleports the player directly to a destination's approach point facing the station.
 */
export class NavigationSystem {
  constructor(player) {
    this.player = player;
  }

  getDestinations() {
    return [SAVAGEZED_NPC, ...DESTINATIONS];
  }

  jumpTo(destinationId) {
    const dest = this.getDestinations().find((d) => d.id === destinationId);
    if (!dest) return null;

    this.player.teleportTo(dest.approach.x, dest.approach.z, dest.approach.lookAt);
    return dest;
  }
}
