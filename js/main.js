import * as THREE from 'three';
import { createSceneContext } from './core/scene.js';
import { createCamera } from './core/camera.js';
import { createPrehistoricWorld } from './core/world.js';
import { PlayerController } from './core/player.js';
import { InteractionSystem } from './core/interaction.js';
import { CollisionSystem } from './systems/collision.js';
import { NavigationSystem } from './systems/navigation.js';
import { ProgressSystem } from './systems/progress.js';
import { InterfaceController } from './ui/interface.js';

function init() {
  const container = document.getElementById('viewport-container');
  const { scene, renderer, isTouchDevice, updateAtmosphere } = createSceneContext(container);
  const camera = createCamera();

  const collisionSystem = new CollisionSystem(60);
  const { interactables, animatedUpdaters } = createPrehistoricWorld(scene, collisionSystem, {
    isTouchDevice,
    renderer
  });

  const player = new PlayerController(camera, renderer.domElement, collisionSystem);
  const interaction = new InteractionSystem(camera, interactables);
  const navigation = new NavigationSystem(player);
  const progress = new ProgressSystem();
  const ui = new InterfaceController({ player, navigation, progress });

  // Click canvas to re-acquire pointer lock during exploration
  renderer.domElement.addEventListener('click', () => {
    if (ui.hasEnteredWorld && !ui.hasOpenOverlay && !player.isPointerLocked) {
      player.lockPointer();
    }
  });

  // Global E (Interact) and ESC (Close Panel / NPC Dialog) hotkeys
  window.addEventListener('keydown', (e) => {
    if (e.target?.tagName === 'INPUT' || e.target?.tagName === 'TEXTAREA') return;
    if (!ui.hasEnteredWorld) return;

    if (e.code === 'KeyE' && !ui.hasOpenOverlay) {
      const { activeStation } = interaction.update();
      if (activeStation) {
        e.preventDefault();
        ui.openInteraction(activeStation);
      }
    } else if (e.code === 'Escape' && ui.hasOpenOverlay) {
      e.preventDefault();
      ui.closeActiveOverlay(false);
    }
  });

  // Responsive viewport resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Main render loop
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    const elapsed = clock.elapsedTime;

    updateAtmosphere(elapsed);

    for (const updateFn of animatedUpdaters) {
      updateFn(elapsed, delta);
    }

    player.update(delta);
    const state = interaction.update();
    ui.updateHud(state);

    renderer.render(scene, camera);
  }

  animate();
}

init();
