import { type PlayerState } from "../types/player-state";

export default class InputHandler {

  currentState: PlayerState = {
    forward: false, backward: false, left: false, right: false
  };

  private keyMap = {
    KeyW: "forward", KeyS: "backward", KeyA: "left", KeyD: "right"
  } as const;

  pollingInput(): PlayerState {
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      const action = this.keyMap[e.code] || null;
      if (action) this.currentState[action] = true;
    });

    window.addEventListener('keyup', (e: KeyboardEvent) => {
      const action = this.keyMap[e.code] || null;
      if (action) this.currentState[action] = false;
    });

    // Does not continue the state if switching tabs or windows while holding key
    document.addEventListener('focus', () => {
      for (const state in this.currentState) {
        this.currentState[state] = false;
      }
    });

    return this.currentState;
  }
}
