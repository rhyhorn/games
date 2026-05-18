import { Actor, Collider, CollisionType, Engine, Sprite } from 'excalibur';
import { ActorArgs } from 'excalibur/build/dist/Actor';
import { resources } from '../resoures';
import Player from './Player';
import Health from '../components/Health';

export default class MedKit extends Actor {
  constructor(args: ActorArgs) {
    super({ ...args, collisionType: CollisionType.Passive });
  }

  onInitialize(engine: Engine) {
    this.graphics.use(Sprite.from(resources.medkit));
    this.collider.useBoxCollider(16, 16);
  }

  onCollisionStart(self: Collider, other: Collider) {
    if (!(other.owner instanceof Player)) {
      return;
    }

    const health = other.owner.get(Health);
    if (!health) {
      return;
    }

    if (health.max !== health.current) {
      health.doHeal(1);
      this.kill();
    }
  }
}