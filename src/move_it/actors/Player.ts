import {
  Actor,
  Engine,
  Sprite,
  Keys, Vector, vec, toRadians,
} from 'excalibur';
import { resources } from '../resources';
import Level from './Level';
import { ActorArgs } from 'excalibur/build/dist/Actor';

const step = 16;

class Player extends Actor {
  private isMoving = false;
  private destPos: Vector = vec(0, 0);
  private moveDir: Vector = vec(0, 0);
  private level: Level;

  private tail: Vector = vec(0, 0);

  constructor({ tileX, tileY, ...others }: {
    tileX: number,
    tileY: number,
  } & ActorArgs) {
    super(others);
    this.tail.setTo(tileX, tileY);
  }

  setLevel(level: Level) {
    this.level = level;

    const { x, y } = this.level.getPosition(this.tail.x, this.tail.y);
    this.pos.setTo(x, y);
  }

  onInitialize(engine: Engine) {
    this.graphics.use(Sprite.from(resources.player));
  }

  onPostUpdate(engine: Engine, elapsed: number) {
    if (this.isMoving) {
      this.pos.addEqual(this.moveDir);

      if (!this.pos.equals(this.destPos)) {
        return;
      }
      this.emit('stopMoving');
      this.isMoving = false;
    }

    let dir = null;
    if (engine.input.keyboard.isHeld(Keys.Right)) {
      dir = Vector.Right;
    } else if (engine.input.keyboard.isHeld(Keys.Left)) {
      dir = Vector.Left;
    } else if (engine.input.keyboard.isHeld(Keys.Up)) {
      dir = Vector.Up;
    } else if (engine.input.keyboard.isHeld(Keys.Down)) {
      dir = Vector.Down;
    }

    if (!dir) {
      return;
    }

    this.rotation = Math.atan2(dir.y, dir.x);
    const newPosition = this.tail.add(dir);
    const cell = this.level.getCell(newPosition.x, newPosition.y);

    if (!cell || !cell.isCanWalk) {
      return;
    }

    if (cell.box && !cell.box.isCanPush(dir)) {
      return;
    }

    if (cell.box && cell.box.isCanPush(dir)) {
      cell.box.push(dir);
    }

    this.moveDir = dir;
    this.tail = newPosition;
    this.destPos.setTo(
      this.pos.x + this.moveDir.x * step,
      this.pos.y + this.moveDir.y * step,
    );
    this.pos.addEqual(this.moveDir);
    this.isMoving = true;
  }
}

export default Player;