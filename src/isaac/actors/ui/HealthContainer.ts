import { Actor, Color, Engine, Rectangle, vec } from 'excalibur';

export default class HealthContainer extends Actor {
  isEmpty: boolean = false;

  onInitialize(engine: Engine) {
    this.graphics.use(new Rectangle({
      width: 6,
      height: 8,
      color: new Color(0, 0, 0),
    }));
  }
};
