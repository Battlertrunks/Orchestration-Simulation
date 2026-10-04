import * as THREE from "three";

enum Movement {
  None = 0,
  FORWARD = "FORWARD",
  BACK = "BACK",
  LEFT = "LEFT",
  RIGHT = "RIGHT"
};


export default class InputHandler {

  currentState = {
    forward: false, backward: false, left: false, right: false
  };

  private keyMap = {
    KeyW: "forward", KeyS: "backward", KeyA: "left", KeyD: "right"
  } as const;

  pollingInput() {
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      const action = this.keyMap[e.code] || null;
      if (action) this.currentState[action] = true;
    });

    window.addEventListener('keyup', (e: KeyboardEvent) => {
      const action = this.keyMap[e.code] || null;
      if (action) this.currentState[action] = false;
    });

    return this.currentState;
  }
}
