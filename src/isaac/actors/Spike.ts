import {
  Actor,
  Collider,
  CollisionType,
  Sprite,
} from 'excalibur';
import { resources } from '../resoures';
import { ActorArgs } from 'excalibur/build/dist/Actor';
import Player from './Player';
import Health from '../components/Health';

export default class Spike extends Actor {
  damageAmount: number = 1;

  constructor(args: ActorArgs) {
    super({ ...args, collisionType: CollisionType.Passive });
  }

  onInitialize() {
    this.graphics.use(Sprite.from(resources.spike));
    this.collider.useBoxCollider(16, 16);
  }

  onPreCollisionResolve(self: Collider, other: Collider) {
    if (!(other.owner instanceof Player)) {
      return;
    }

    const health = other.owner.get(Health);
    if (!health) {
      return;
    }

    health.doDamage(this.damageAmount);
  }
}