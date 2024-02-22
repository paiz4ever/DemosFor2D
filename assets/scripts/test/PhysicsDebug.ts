import {
  _decorator,
  Component,
  EPhysics2DDrawFlags,
  Node,
  PhysicsSystem2D,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("PhysicsDebug")
export class PhysicsDebug extends Component {
  protected onLoad(): void {
    PhysicsSystem2D.instance.debugDrawFlags =
      EPhysics2DDrawFlags.Aabb |
      EPhysics2DDrawFlags.Pair |
      EPhysics2DDrawFlags.CenterOfMass |
      EPhysics2DDrawFlags.Joint |
      EPhysics2DDrawFlags.Shape;
  }
}
