import { Actor, Engine, Random, SpriteSheet } from 'excalibur';
import { Resources } from '../resources';

export default class Block extends Actor {
  type: number = 0;
  private sprites: SpriteSheet;

  onInitialize(engine: Engine) {
    this.sprites = SpriteSheet.fromImageSource({
      image: Resources.Blocks,
      grid: {
        rows: 1,
        columns: 3,
        spriteWidth: 5,
        spriteHeight: 5,
      },
      spacing: {
        originOffset: {
          x: 1,
          y: 1,
        },
        margin: {
          x: 1,
          y: 1,
        },
      },
    });
  }

  onPreUpdate(engine: Engine, delta: number) {
    this.graphics.use(this.sprites.getSprite(this.type, 0));
  }
}