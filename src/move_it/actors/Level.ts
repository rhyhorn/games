import {
  Actor,
  Circle,
  Rectangle,
  Color,
  Engine,
  GraphicsGroup, Graphic, vec,
} from 'excalibur';
import Cell from './Cell';
import Box from './Box';
import Player from './Player';

export default class Level extends Actor {
  private grid = [
    [0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 4, 1, 0, 0, 0],
    [0, 0, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 3, 0, 3, 4, 1],
    [1, 4, 0, 3, 2, 1, 1, 1],
    [1, 1, 1, 1, 3, 1, 0, 0],
    [0, 0, 0, 1, 4, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0],
  ];

  cells: Cell[] = [];
  player: Player;

  constructor() {
    super({ pos: vec(64, 64) });
    this.restart();
  }

  restart() {
    if (this.player) {
      this.player.kill();
      this.removeChild(this.player);
    }

    this.player = new Player({ tileX: 4, tileY: 4, z: 10 });
    this.player.setLevel(this);
    this.player.on('stopMoving', () => {
      if (this.checkWin()) {
        this.emit('complete');
      }
    });
    this.addChild(this.player);
  }

  getCell(x: number, y: number) {
    if (x < 0 || x >= this.grid[0].length) {
      return null;
    }

    if (y < 0 || y >= this.grid.length) {
      return null;
    }

    return this.cells[y * this.grid[0].length + x];
  }

  getPosition(x: number, y: number) {
    return vec(x * 16, y * 16);
  }

  checkWin() {
    return !this.cells.some((cell) => cell.isTarget && !cell.box);
  }

  onInitialize() {
    this.cells = this.grid.reduce<Cell[]>((acc, row, posY) => {
      return acc.concat(row.map((tileId, posX) => {
        const cell = new Cell({
          tileX: posX,
          tileY: posY,
          pos: vec(posX * 16, posY * 16),
        });
        cell.isTarget = tileId === 4;
        cell.isCanWalk = tileId !== 1;
        this.addChild(cell);

        if (tileId === 3) {
          const box = new Box({
            level: this,
            cell,
            pos: vec(posX * 16, posY * 16),
            z: 10,
          });
          cell.setObject(box);
          this.addChild(box);
        }

        return cell;
      }));
    }, []);
  }
}