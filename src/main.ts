import Camera from "./entities/camera";
import Employee from "./entities/NPCs/employee";

import type { Position } from "./entities/camera";

// import { devWorldScene } from "./scenes/dev-world"
import * as THREE from "three";
import LightBox from "./entities/light-box";
import OfficeScene from "./scenes/dev-world";
import Player from "./entities/player";
import InputHandler from "./entities/input-handler";

class GameLoop {

  private employee: Employee;
  private player: Player;
  private mainCamera: Camera;
  renderer: THREE.WebGLRenderer;
  officeScene: OfficeScene;
  lighting: LightBox;
  timer: THREE.Timer;

  playerInput = new InputHandler();

  public run(): void {
    console.log("Starting Three.js...");

    this.init();


    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // SHADOWs
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    document.body.appendChild(this.renderer.domElement);

    this.renderer.setAnimationLoop((time) => this.loop(time));
  }

  private init(): void {
    this.officeScene = new OfficeScene();
    this.employee = new Employee();
    this.player = new Player();
    this.mainCamera = new Camera(70, this.player.character);
    this.lighting = new LightBox(0xffffff, 1);

    this.lighting.init(this.officeScene.scene, { x: 10, y: 20, z: 5 });
    this.employee.init(this.officeScene.scene, { x: 0, y: 0, z: 0 });
    this.player.init(this.officeScene.scene, { x: 2, y: 0, z: -2 })

    this.timer = new THREE.Timer();
    this.playerInput.pollingInput();
  }

  private loop(time: any): void {
    const deltaTime: number = Math.min(this.timer.getDelta(), 0.1);
    // Input

    this.update(deltaTime);

    this.timer.update(time);

    this.render();

  }

  private update(deltaTime: number): void {
    this.employee.update(deltaTime);

    this.player.update(deltaTime, this.playerInput.currentState);

    this.mainCamera.update(this.player.character);
  }

  private render(): void {
    this.renderer.render(this.officeScene.scene, this.mainCamera.camera);
  }
}

(() => {
  const loop = new GameLoop();

  loop.run();
})();
