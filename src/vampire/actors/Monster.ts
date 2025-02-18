import {
  Actor,
  ActorArgs,
  Circle,
  CollisionType,
  Color,
  Engine,
} from 'excalibur';
import HealthComponent from '../components/Health';
import DamageComponent from '../components/Damage';

export default class Monster extends Actor {
  private target: Actor = null;

  health: HealthComponent = new HealthComponent(100);
  damage: DamageComponent = new DamageComponent();

  onInitialize(engine: Engine) {
    this.graphics.use(new Circle({
      radius: 4,
      color: Color.Green,
    }));

    this.collider.useCircleCollider(4);
    this.body.collisionType = CollisionType.Active;

    this.addComponent(this.health);
    this.addComponent(this.damage);
  }

  setTarget(target: Actor) {
    this.target = target;
  }

  onPreUpdate(engine: Engine, delta: number) {
    if (!this.target) {
      return;
    }

    this.pos.addEqual(this.target.pos.sub(this.pos).normalize());
  }
}