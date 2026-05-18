import {
  Actor,
  Engine,
  Sprite,
  Keys,
  CollisionType, Vector,
} from 'excalibur';
import { resources } from '../resoures';
import { ActorArgs } from 'excalibur/build/dist/Actor';
import HealthComponent from '../components/Health';
import BulletEmitter from '../modules/shooting/BulletEmitter';

export default class Player extends Actor {
  currentOpacity: 1;
  health: HealthComponent;
  bulletEmitter: BulletEmitter;

  constructor(params: ActorArgs) {
    super({ ...params, collisionType: CollisionType.Active });
    this.collider.useBoxCollider(16, 16);
    this.health = new HealthComponent(10);
    this.bulletEmitter = new BulletEmitter();

    this.addComponent(this.health);
    this.addChild(this.bulletEmitter);
  }

  onInitialize(engine: Engine) {
    this.graphics.use(Sprite.from(resources.player));
  }

  onPreUpdate(engine: Engine, elapsed: number) {
    this.vel.x = 0;
    this.vel.y = 0;

    if (engine.input.keyboard.isHeld(Keys.Space)) {
      this.bulletEmitter.shoot();
    }

    if (engine.input.keyboard.isHeld(Keys.Left)) {
      this.vel.x = -200;
      this.bulletEmitter.direction = Vector.Left;
    } else if (engine.input.keyboard.isHeld(Keys.Right)) {
      this.bulletEmitter.direction = Vector.Right;
      this.vel.x = 200;
    }

    if (engine.input.keyboard.isHeld(Keys.Up)) {
      this.vel.y = -200;
      this.bulletEmitter.direction = Vector.Up;
    } else if (engine.input.keyboard.isHeld(Keys.Down)) {
      this.vel.y = +200;
      this.bulletEmitter.direction = Vector.Down;
    }
  }

  onPostUpdate(engine: Engine, delta: number) {
    this.health.checkInvisible(delta);
    this.graphics.opacity = this.health.isInvisible ? 0.5 : 1;
  }
}