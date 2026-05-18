import {
  Actor,
  Vector,
  vec,
  Engine,
  Rectangle,
  Color,
  GraphicsGroup, Sprite, Graphic,
} from 'excalibur';
import Box from './Box';
import { ActorArgs } from 'excalibur/build/dist/Actor';
import { resources } from '../resources';

export default class Cell extends Actor {
  box: Box = null;
  isCanWalk = true;
  isTarget = false;
  tile: Vector = vec(0, 0);

  constructor({ tileX, tileY, ...other }: {
    tileX: number;
    tileY: number
  } & ActorArgs) {
    super(other);
    this.tile.setTo(tileX, tileY);
  }

  setObject(object: Box) {
    this.box = object;
  }

  onInitialize() {
    const members: Graphic[] = [
      this.isCanWalk
        ? new Rectangle({
          color: Color.Gray,
          width: 16,
          height: 16,
        })
        : Sprite.from(resources.wall),
    ];

    if (this.isTarget) {
      members.push(Sprite.from(resources.target));
    }

    this.graphics.use(
      new GraphicsGroup({
        members,
      }),
    );
  }
}