import { Actor, Engine, Random, vec } from 'excalibur';
import Block from './Block';

export default class Figure extends Actor {
  initPositions: number[][];
  blocks: Block[][] = [];

  constructor(params) {
    super({
      ...params,
      anchor: vec(0, 0),
    });

    this.initPositions = [
      [1, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
  }

  onInitialize(engine: Engine) {
    const random = new Random();
    const type = random.integer(0, 2);

    this.initPositions.forEach((row, j) => {
      this.blocks[j] = [];
      row.forEach((value, i) => {
        if (value !== 1) {
          return;
        }

        const block = new Block({
          pos: vec(i * 5 + i, j * 5 + j),
          anchor: vec(0, 0),
        });
        block.type = type;

        this.addChild(block);
        this.blocks[j][i] = block;
      });
    });

  }
}