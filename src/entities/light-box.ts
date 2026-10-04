import * as THREE from "three";

export default class LightBox {

  hemiLight: THREE.HemisphereLight;
  directionalLight: THREE.DirectionalLight;

  constructor(color: number, intensity: number) {

    this.directionalLight = new THREE.DirectionalLight(color, intensity);
    this.hemiLight = new THREE.HemisphereLight(0x87ceeb, 0x443322, 0.6);
  }

  init(scene: THREE.Scene, pos: any): void {
    this.directionalLight.position.set(pos.x, pos.y, pos.z);
    scene.add(this.hemiLight, this.directionalLight);
  }
}
