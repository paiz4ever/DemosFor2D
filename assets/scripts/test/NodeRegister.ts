import { _decorator, CCString, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("NodeRegister")
export class NodeRegister extends Component {
  @property(CCString)
  windowName: string = "";

  protected onLoad(): void {
    window[this.windowName] = this.node;
  }
}
