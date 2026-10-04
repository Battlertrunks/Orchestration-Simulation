import * as THREE from "three";
import { EntityKind } from "../state/entity-kind";

export default class Character<T extends THREE.Object3D> {

  private _name: string = "";
  private _entityKind: number = null;

  character: T;

  get name(): string {
    return this._name;
  }

  set name(val: string) {
    if (!val.trim().length) {
      throw new Error("Invalid entity name");
    }

    this._name = val;
  }

  get entityKind(): number {
    return this._entityKind;
  }

  set entityKind(val: string) {
    this._entityKind = EntityKind[val] as const;
  }


  init(scene: THREE.Scene, pos: any): void {
    this.character.position.set(pos.x, pos.y, pos.z);
    scene.add(this.character);
  }

  update(time: number): void { }
}
