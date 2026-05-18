import { Actor, Engine, Sprite, vec, Vector } from 'excalibur';
import { resources } from '../resources';
import Level from './Level';
import Cell from './Cell';
import { ActorArgs } from 'excalibur/build/dist/Actor';

export default class Box extends Actor {
  private isMoving = false;
  private destPos: Vector = vec(0, 0);
  private moveDir: Vector = vec(0, 0);
  private level: Level;
  cell: Cell;

  constructor({ level, cell, ...other }: {
    level: Level,
    cell: Cell;
  } & ActorArgs) {
    super(other);
    this.level = level;
    this.cell = cell;
  }

  onInitialize(engine: Engine) {
    this.graphics.use(Sprite.from(resources.box));
  }

  isCanPush(direction: Vector): boolean {
    const cell = this.level.getCell(
      this.cell.tile.x + direction.x,
      this.cell.tile.y + direction.y,
    );

    if (!cell || !cell.isCanWalk || cell.box) {
      return false;
    }

    return true;
  }

  push(direction: Vector) {
    const cell = this.level.getCell(
      this.cell.tile.x + direction.x,
      this.cell.tile.y + direction.y,
    );

    this.cell.setObject(null);
    cell.setObject(this);
    this.cell = cell;

    this.destPos.setTo(cell.tile.x * 16, cell.tile.y * 16);
    this.moveDir = direction;
    this.isMoving = true;
  }

  onPostUpdate(engine: Engine, elapsed: number) {
    if (this.isMoving) {
      this.pos.addEqual(this.moveDir);

      if (!this.pos.equals(this.destPos)) {
        return;
      }
      this.isMoving = false;
    }
  }
}