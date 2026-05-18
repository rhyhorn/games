import { Component } from 'excalibur';

export default class Health extends Component {
  max: number = 0;
  current: number = 0;
  isInvisible: boolean = false;
  invisibleTime: number = 1_000;
  currentInvisible: number = 0;

  constructor(
    max: number,
    current?: number,
  ) {
    super();

    this.max = max;
    this.current = current || max;
  }

  doDamage(amount: number) {
    if (this.isInvisible) {
      return;
    }

    this.current -= amount;
    this.current = Math.max(0, this.current);
    this.owner.events.emit('HealthChanged');

    this.isInvisible = true;
  }

  doHeal(amount: number) {
    this.current += amount;
    this.current = Math.min(this.current, this.max);

    this.owner.events.emit('HealthChanged');
  }

  checkInvisible(delta: number) {
    if (!this.isInvisible) {
      return;
    }

    this.currentInvisible += delta;
    if (this.invisibleTime <= this.currentInvisible) {
      this.isInvisible = false;
      this.currentInvisible = 0;
    }
  }
}