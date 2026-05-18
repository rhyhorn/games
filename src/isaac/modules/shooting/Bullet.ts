import { Actor, CollisionType, Engine, Sprite, Vector } from 'excalibur';
import { ActorArgs } from 'excalibur/build/dist/Actor';
import { resources } from '../../resoures';

export default class Bullet extends Actor {
  direction: Vector;
  lifetime: number = 1_000;
  currentLifeTime: number = 0;
  speed: number = 0.1;

  constructor({ direction, ...params }: ActorArgs & {
    direction: Vector,
  }) {
    super({ ...params, collisionType: CollisionType.Passive });
    this.direction = direction;
  }

  onInitialize(engine: Engine) {
    this.graphics.use(Sprite.from(resources.bullet));
  }

  onPreUpdate(engine: Engine, elapsed: number) {
    this.currentLifeTime += elapsed;
    if (this.currentLifeTime >= this.lifetime) {
      this.kill();
    }

    this.pos.addEqual(this.direction.scale(this.speed));
  }
}