import {
  Actor,
  Circle,
  Color,
  Engine,
  Keys,
  Vector,
  CollisionType, Collider, Side, CollisionContact,
} from 'excalibur';
import HealthComponent from '../components/Health';
import Monster from './Monster';

export default class Player extends Actor {
  health: HealthComponent;

  onInitialize(engine: Engine) {
    this.graphics.use(new Circle({
      radius: 4,
      color: Color.Red,
    }));

    this.collider.useCircleCollider(4);
    this.body.collisionType = CollisionType.Fixed;

    this.health = new HealthComponent(100);
    this.addComponent(this.health);

    this.on('kill', this.onKill.bind(this));
  }

  onPreCollisionResolve(self: Collider, other: Collider, side: Side, contact: CollisionContact) {
    if (other.owner instanceof Monster) {
      this.health.damage(10);
      console.log('monster');
    }
  }

  onPreUpdate(engine: Engine) {
    if (engine.input.keyboard.isHeld(Keys.ArrowLeft)) {
      this.pos.addEqual(Vector.Left);
    } else if (engine.input.keyboard.isHeld(Keys.ArrowRight)) {
      this.pos.addEqual(Vector.Right);
    }

    if (engine.input.keyboard.isHeld(Keys.ArrowUp)) {
      this.pos.addEqual(Vector.Up);
    } else if (engine.input.keyboard.isHeld(Keys.ArrowDown)) {
      this.pos.addEqual(Vector.Down);
    }
  }

  onKill() {
    console.log('kill');
  }
}