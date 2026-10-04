import Character from "./characters";
import * as THREE from "three";

export default class Player extends Character<THREE.Mesh> {

  private geometry = new THREE.BoxGeometry(1, 1, 1);
  private material = new THREE.MeshStandardMaterial({ color: 0x999eff}, );

  constructor() {
    super();

    this.character = new THREE.Mesh(this.geometry, this.material);
  }

  update(time: number): void {

  }
}
