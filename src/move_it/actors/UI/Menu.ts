import { Engine, Label, ScreenElement, Text, vec } from 'excalibur';
import MenuItem from './MenuItem';

export default class Menu extends ScreenElement {
  private spacing: number = 20;

  constructor() {
    super({
      pos: vec(100, 200),
    });

    this.pointer.useGraphicsBounds = true;

    this.addChild(new MenuItem('Start'));
    this.addChild(new MenuItem('Exit'));
    this.addChild(new Label({
      text: 'Label',
    }));

    this.children.forEach((child, index) => {
      (child as MenuItem).pos.y = index * this.spacing;
      console.log( (child as MenuItem).graphics.bounds.width);
    });
  }

  onInitialize(engine: Engine) {

  }

  onPreUpdate(engine: Engine, elapsed: number) {
    const direction = vec(0.5, 1);
    this.pos.x = engine.screen.width / 2 - this.graphics.bounds.width / 2;
    this.pos.y = engine.screen.height / 2 - this.graphics.bounds.height / 2;
  }

  onStart() {

  }
}
