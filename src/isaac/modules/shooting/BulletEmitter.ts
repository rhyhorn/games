import { Actor, Engine, Line, vec, Vector } from 'excalibur';
import Bullet from './Bullet';

export default class BulletEmitter extends Actor {
  private line: Line;
  private engine: Engine;

  reloadTime: number = 1_000;
  currentReloadTime: number = 1_000;

  private _direction: Vector = Vector.Up;
  public get direction() {
    return this._direction;
  }

  public set direction(direction: Vector) {
    this._direction = direction;
    const newDirection = this.direction.scaleEqual(10);
    this.line.end.setTo(newDirection.x, newDirection.y);
  }

  onInitialize(engine: Engine) {
    this.engine = engine;
    this.line = new Line({
      start: vec(0, 0),
      end: this.direction.scaleEqual(10),
    });
    this.graphics.use(this.line);
  }

  onPreUpdate(engine: Engine, delta: number) {
    if (this.reloadTime > this.currentReloadTime) {
      this.currentReloadTime += delta;
    }
  }

  shoot() {
    if (this.reloadTime > this.currentReloadTime) {
      return;
    }

    this.currentReloadTime = 0;

    this.engine.currentScene.add(new Bullet({
      pos: vec(this.transform.globalPos.x, this.transform.globalPos.y),
      direction: this.direction,
    }));
  }
}