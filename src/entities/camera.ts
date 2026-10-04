import * as THREE from "three";

export type Position = {
  x: number;
  y: number;
  z: number;
}

export default class Camera {

  private _camera: THREE.PerspectiveCamera;

  set camera(fov: number) {
    this._camera = new THREE.PerspectiveCamera(
      fov,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
  }

  private offset: THREE.Vector3 = new THREE.Vector3(0, 2, -5);

  get camera(): THREE.PerspectiveCamera {
    return this._camera;
  }

  constructor(fov: number, player: THREE.Mesh) {
    this.camera = fov;

    // this._camera.position.set(pos.x, pos.y, pos.z);
  }

  init(pos: any): void {
    this._camera.position.set(pos.x, pos.y, pos.z);
  }

  update(playerPos: THREE.Mesh): void {

    // Aligh offset with player rotation
    this.offset.applyQuaternion(playerPos.quaternion);
    this._camera.position.copy(playerPos.position).add(this.offset)

    this._camera.lookAt(playerPos.position)
  }
}
