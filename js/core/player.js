import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { getTerrainHeight } from './world.js';

const EYE_HEIGHT = 1.72;
const WALK_SPEED = 6.2;
const SPRINT_SPEED = 10.6;

/**
 * First-person player controller with PointerLockControls, WASD + Shift sprint,
 * ground clamping, collision resolution, and a drag-to-look fallback if pointer lock
 * is unavailable or blocked.
 */
export class PlayerController {
  constructor(camera, domElement, collisionSystem) {
    this.camera = camera;
    this.domElement = domElement;
    this.collision = collisionSystem;

    this.controls = new PointerLockControls(camera, domElement);
    this.enabled = false;
    this.isDraggingFallback = false;
    this.lastPointer = { x: 0, y: 0 };
    this.lookTouchId = null;
    this.lastTouch = { x: 0, y: 0 };
    this.isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      Boolean(window.matchMedia?.('(pointer: coarse)').matches);

    this.keys = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      sprint: false
    };
    this.analogMove = { x: 0, z: 0 };
    this.touchSprint = false;

    this.velocity = new THREE.Vector3();
    this.direction = new THREE.Vector3();
    this.forwardVec = new THREE.Vector3();
    this.rightVec = new THREE.Vector3();
    this.euler = new THREE.Euler(0, 0, 0, 'YXZ');

    // Initialize player at spawn facing Central Expedition Camp
    this.teleportTo(0, 14, { x: 0, y: 1.7, z: 0 });
    this._bindEvents();
  }

  get isPointerLocked() {
    return document.pointerLockElement === this.domElement;
  }

  lockPointer() {
    if (this.isTouchDevice) return;
    try {
      this.controls.lock();
    } catch {
      // Fallback drag-look stays available automatically
    }
  }

  unlockPointer() {
    if (this.isPointerLocked) {
      this.controls.unlock();
    }
  }

  setEnabled(active) {
    this.enabled = active;
    if (!active) {
      this.resetKeys();
      this.analogMove.x = 0;
      this.analogMove.z = 0;
      this.lookTouchId = null;
      this.velocity.set(0, 0, 0);
    }
  }

  setAnalogMove(x, z) {
    this.analogMove.x = Math.max(-1, Math.min(1, x));
    this.analogMove.z = Math.max(-1, Math.min(1, z));
  }

  setTouchSprint(active) {
    this.touchSprint = Boolean(active);
  }

  resetKeys() {
    this.keys.forward = false;
    this.keys.backward = false;
    this.keys.left = false;
    this.keys.right = false;
    this.keys.sprint = false;
  }

  teleportTo(x, z, lookAtTarget = null) {
    const y = getTerrainHeight(x, z) + EYE_HEIGHT;
    this.camera.position.set(x, y, z);
    if (lookAtTarget) {
      this.camera.lookAt(lookAtTarget.x, y - 0.15, lookAtTarget.z);
    }
    this.velocity.set(0, 0, 0);
  }

  update(delta) {
    if (!this.enabled) return;

    const dt = Math.min(delta, 0.05);
    const analogSprint = Math.hypot(this.analogMove.x, this.analogMove.z) > 0.88;
    const speed = this.keys.sprint || this.touchSprint || analogSprint ? SPRINT_SPEED : WALK_SPEED;

    const keyZ = Number(this.keys.forward) - Number(this.keys.backward);
    const keyX = Number(this.keys.right) - Number(this.keys.left);

    const moveX = keyX !== 0 ? keyX : this.analogMove.x;
    const moveZ = keyZ !== 0 ? keyZ : this.analogMove.z;

    this.direction.set(moveX, 0, moveZ);
    if (this.direction.lengthSq() > 1) {
      this.direction.normalize();
    }

    // Extract horizontal camera basis vectors
    this.camera.getWorldDirection(this.forwardVec);
    this.forwardVec.y = 0;
    if (this.forwardVec.lengthSq() > 0.0001) this.forwardVec.normalize();

    this.rightVec.crossVectors(this.forwardVec, this.camera.up).normalize();

    const targetVx = (this.forwardVec.x * this.direction.z + this.rightVec.x * this.direction.x) * speed;
    const targetVz = (this.forwardVec.z * this.direction.z + this.rightVec.z * this.direction.x) * speed;

    const accel = 14 * dt;
    this.velocity.x += (targetVx - this.velocity.x) * Math.min(1, accel);
    this.velocity.z += (targetVz - this.velocity.z) * Math.min(1, accel);

    this.camera.position.x += this.velocity.x * dt;
    this.camera.position.z += this.velocity.z * dt;

    // Resolve horizontal collisions against buildings, rocks & boundary
    this.collision.resolve(this.camera.position, 0.58);

    // Clamp to terrain height with gentle smoothing
    const targetY = getTerrainHeight(this.camera.position.x, this.camera.position.z) + EYE_HEIGHT;
    this.camera.position.y += (targetY - this.camera.position.y) * Math.min(1, 18 * dt);
  }

  _bindEvents() {
    window.addEventListener('keydown', (e) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          this.keys.forward = true;
          break;
        case 'KeyS':
        case 'ArrowDown':
          this.keys.backward = true;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          this.keys.left = true;
          break;
        case 'KeyD':
        case 'ArrowRight':
          this.keys.right = true;
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          this.keys.sprint = true;
          break;
      }
    });

    window.addEventListener('keyup', (e) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          this.keys.forward = false;
          break;
        case 'KeyS':
        case 'ArrowDown':
          this.keys.backward = false;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          this.keys.left = false;
          break;
        case 'KeyD':
        case 'ArrowRight':
          this.keys.right = false;
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          this.keys.sprint = false;
          break;
      }
    });

    window.addEventListener('blur', () => this.resetKeys());

    // Fallback mouse-drag look when pointer lock is not active
    this.domElement.addEventListener('mousedown', (e) => {
      if (!this.enabled || this.isPointerLocked) return;
      if (e.button === 0) {
        this.isDraggingFallback = true;
        this.lastPointer.x = e.clientX;
        this.lastPointer.y = e.clientY;
      }
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.enabled || this.isPointerLocked || !this.isDraggingFallback) return;
      const dx = e.clientX - this.lastPointer.x;
      const dy = e.clientY - this.lastPointer.y;
      this.lastPointer.x = e.clientX;
      this.lastPointer.y = e.clientY;

      this.euler.setFromQuaternion(this.camera.quaternion);
      this.euler.y -= dx * 0.0032;
      this.euler.x = Math.max(-Math.PI / 2 + 0.08, Math.min(Math.PI / 2 - 0.08, this.euler.x - dy * 0.0032));
      this.camera.quaternion.setFromEuler(this.euler);
    });

    window.addEventListener('mouseup', () => {
      this.isDraggingFallback = false;
    });

    // Multi-touch look on canvas (supports simultaneous left-thumb joystick + right-thumb look)
    this.domElement.addEventListener(
      'touchstart',
      (e) => {
        if (!this.enabled || this.lookTouchId !== null) return;
        const touch = e.changedTouches[0];
        if (!touch) return;
        this.lookTouchId = touch.identifier;
        this.lastTouch.x = touch.clientX;
        this.lastTouch.y = touch.clientY;
      },
      { passive: true }
    );

    this.domElement.addEventListener(
      'touchmove',
      (e) => {
        if (!this.enabled || this.lookTouchId === null) return;
        for (const touch of e.changedTouches) {
          if (touch.identifier === this.lookTouchId) {
            const dx = touch.clientX - this.lastTouch.x;
            const dy = touch.clientY - this.lastTouch.y;
            this.lastTouch.x = touch.clientX;
            this.lastTouch.y = touch.clientY;

            this.euler.setFromQuaternion(this.camera.quaternion);
            this.euler.y -= dx * 0.0046;
            this.euler.x = Math.max(
              -Math.PI / 2 + 0.08,
              Math.min(Math.PI / 2 - 0.08, this.euler.x - dy * 0.0042)
            );
            this.camera.quaternion.setFromEuler(this.euler);
            e.preventDefault();
            break;
          }
        }
      },
      { passive: false }
    );

    const endTouchLook = (e) => {
      for (const touch of e.changedTouches) {
        if (touch.identifier === this.lookTouchId) {
          this.lookTouchId = null;
          break;
        }
      }
    };
    this.domElement.addEventListener('touchend', endTouchLook, { passive: true });
    this.domElement.addEventListener('touchcancel', endTouchLook, { passive: true });
  }
}
