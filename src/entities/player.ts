import Character from "./characters";
import * as THREE from "three";

type PlayerState = {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
}

export default class Player extends Character<THREE.Mesh> {

  private geometry = new THREE.BoxGeometry(1, 1, 1);
  private material = new THREE.MeshStandardMaterial({ color: 0x999eff}, );

  velocity: number = 8;
  moveDir: THREE.Vector3 = new THREE.Vector3();

  constructor() {
    super();

    this.character = new THREE.Mesh(this.geometry, this.material);
  }

  override update(deltaTime: number, currentState?: PlayerState): void {
    if (currentState) this.moving(deltaTime, currentState)

  }

  private moving(deltaTime: number, currentState): void {
    if (currentState) {
      this.moveDir.set(
        (currentState.left ? 1 : 0) - (currentState.right ? 1 : 0),
        0,
        (currentState.forward ? 1 : 0) - (currentState.backward ? 1 : 0)
      );

      if (this.moveDir.lengthSq() > 0) this.moveDir.normalize();

      // The delta-time math position += direction * speed * deltaTime
      this.character.position.addScaledVector(this.moveDir, this.velocity * deltaTime);
    }
  }
}
