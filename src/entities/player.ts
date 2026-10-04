import Character from "./characters";
import * as THREE from "three";
import { type PlayerState } from "../types/player-state";

export default class Player extends Character<THREE.Mesh> {

  private geometry = new THREE.BoxGeometry(1, 1, 1);
  private material = new THREE.MeshStandardMaterial({ color: 0x999eff}, );

  velocity: number = 8;
  moveDir: THREE.Vector3 = new THREE.Vector3();

  constructor() {
    super();

    this.character = new THREE.Mesh(this.geometry, this.material);
  }

  override update(dt: number, state?: PlayerState): void {
    if (!state) return;

    this.moving(dt, state)
  }

  private moving(dt: number, state: PlayerState): void {
    if (state) {
      this.moveDir.set(
        (state.left ? 1 : 0) - (state.right ? 1 : 0),
        0,
        (state.forward ? 1 : 0) - (state.backward ? 1 : 0)
      );

      if (this.moveDir.lengthSq() > 0) this.moveDir.normalize();

      // The delta-time math position += direction * speed * deltaTime
      this.character.position.addScaledVector(this.moveDir, this.velocity * dt);
    }
  }
}
