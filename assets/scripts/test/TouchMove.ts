import { _decorator, Component, EventTouch, Input } from "cc";
const { ccclass, property } = _decorator;

@ccclass("TouchMove")
export class TouchMove extends Component {
  protected onLoad(): void {
    this.addTouchListener();
  }

  addTouchListener() {
    this.node.on(Input.EventType.TOUCH_START, this.setPos, this);
    this.node.on(Input.EventType.TOUCH_MOVE, this.setPos, this);
  }

  setPos(event: EventTouch) {
    const pos = event.getUILocation();
    this.node.setWorldPosition(pos.x, pos.y, 0);
  }
}
