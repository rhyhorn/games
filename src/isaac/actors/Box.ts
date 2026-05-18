import { Actor, Collider, CollisionType, Engine, Sprite } from 'excalibur';
import { ActorArgs } from 'excalibur/build/dist/Actor';
import { resources } from '../resoures';
import Bullet from '../modules/shooting/Bullet';

export default class Box extends Actor {
  constructor(args: ActorArgs) {
    super({ ...args, collisionType: CollisionType.Fixed });
  }

  onInitialize(engine: Engine) {
    this.graphics.use(Sprite.from(resources.box));
    this.collider.useBoxCollider(16, 16);
  }

  onCollisionStart(self: Collider, other: Collider) {
    if (!(other.owner instanceof Bullet)) {
      return;
    }

    this.kill();
  }
}