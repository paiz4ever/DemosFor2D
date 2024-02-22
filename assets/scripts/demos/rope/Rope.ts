/**
 * 模拟绳子以及切割绳子
 * 思路：
 * 使用HingeJoint2D连接两个RigidBody2D，实现绳子的运动
 * 使用BoxCollider2D，实现切割绳子
 * 注意：
 * 绳子的弹性通过BoxCollider2D的Density属性控制
 * 绳子动态创建时会出现短暂分离，现象就是绳子会回弹一下（？？？）
 * 绳子如果没有挂重物则会出现绞在一起的情况（BoxCollider2D导致）
 * 取消绳子与绳子之间的碰撞会让绳子平滑向下展开（但是由于会出现短暂分离，绳子展开完成动作慢）
 */

import {
  _decorator,
  Component,
  EventTouch,
  HingeJoint2D,
  Input,
  input,
  instantiate,
  Node,
  PhysicsSystem2D,
  Prefab,
  RigidBody2D,
  Vec2,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("Rope")
export class Rope extends Component {
  @property(RigidBody2D)
  firstLink: RigidBody2D;
  @property(Prefab)
  linkPrefab: Prefab;
  @property(Node)
  weightNode: Node;

  /** 链接数 */
  private linksCount = 20;
  private startPoint: Vec2;

  protected start(): void {
    this.generateRope();
    this.listenCutRope();
  }

  /** 生成绳子 */
  generateRope(): void {
    for (let i = 0; i < this.linksCount; i++) {
      const link = instantiate(this.linkPrefab);
      let joint = link.getComponent(HingeJoint2D);
      joint.connectedBody = this.firstLink;
      this.node.addChild(link);
      this.firstLink = link.getComponent(RigidBody2D);
    }
    let joint = this.weightNode.getComponent(HingeJoint2D);
    joint.connectedBody = this.firstLink;
    this.weightNode.active = true;
  }

  /** 监听切割绳子事件 */
  listenCutRope() {
    input.on(Input.EventType.TOUCH_START, (e: EventTouch) => {
      this.startPoint = e.getUILocation();
    });
    input.on(Input.EventType.TOUCH_END, (e: EventTouch) => {
      if (!this.startPoint) return;
      let results = PhysicsSystem2D.instance.raycast(
        this.startPoint,
        e.getUILocation()
      );
      console.log(results);
      if (results.length > 0) {
        results[0].collider.node.destroy();
      }
    });
  }
}
