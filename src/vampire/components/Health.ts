import { Component, Entity, GraphicsComponent } from 'excalibur';

export default class HealthComponent extends Component {
  max: number = 0;
  private _current: number = 0;

  invincibilityDuration: number = 1_000;
  private invincibilityTimer: number = 0;
  isInvincible: boolean = false;

  constructor(health: number) {
    super();

    this.max = health;
    this.current = health;
  }

  onAdd(owner: Entity) {
    owner.on('preupdate', this.update.bind(this));
  }

  public get current() {
    return this._current;
  }

  public set current(value: number) {
    this._current = value > 0 ? value : 0;
    if (this._current === 0) {
      this.owner.emit('kill');
    }
  }

  damage(damageAmount: number) {
    if (this.isInvincible) {
      return false;
    }

    this.current -= damageAmount;
    this.isInvincible = true;
    this.invincibilityTimer = 0;
    //

    this.owner.get(GraphicsComponent).opacity = 0.5;
    console.log(this.current, '/', this.max);
  }

  update({ delta }) {
    if (!this.isInvincible) {
      return;
    }

    this.invincibilityTimer += delta;
    if (this.invincibilityTimer < this.invincibilityDuration) {
      return;
    }

    this.isInvincible = false;
    this.invincibilityTimer = 0;
    this.owner.get(GraphicsComponent).opacity = 1;
  }
}