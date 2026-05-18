import {
  Actor,
  Circle,
  CollisionType,
  Engine,
  Rectangle,
  Sprite,
} from 'excalibur';
import { ActorArgs } from 'excalibur/build/dist/Actor';

export default class Enemy extends Actor {
  constructor(params: ActorArgs) {
    super({ ...params, collisionType: CollisionType.Fixed });
    this.collider.useCircleCollider(8);
  }


  onInitialize(engine: Engine) {
    this.graphics.use(new Circle({
      radius: 8,
    }));
  }
}