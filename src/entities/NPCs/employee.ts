import * as THREE from "three";
import Character from "../characters";

export default class Employee extends Character<THREE.Mesh> {

  // x y z
  private geometry = new THREE.BoxGeometry(1, 1, 1);
  private material = new THREE.MeshStandardMaterial({ color: 0x00ff00 }, );


  constructor() {
    super();

    this.character = new THREE.Mesh(this.geometry, this.material);
  }

  // override init(scene: THREE.Scene, pos: any): void {
  //   this.character.position.set(pos.x, pos.y, pos.z);
  //   scene.add(this.character);
  // }

  update(time: number) {
    this.character.rotation.x = time / 4000;
    this.character.rotation.y = time / 3000;

    this.character.position.set(Math.cos(time / 1000) * 1, Math.cos(time / 2000) * 1);
  }
}
