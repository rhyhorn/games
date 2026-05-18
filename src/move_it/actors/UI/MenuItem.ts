import { Actor, Engine, Text } from 'excalibur';

export default class MenuItem extends Actor {
  private text: string = '';

  constructor(text: string) {
    super();
    this.text = text;
    this.graphics
  }

  onInitialize(engine: Engine) {
    const text = new Text({
      text: this.text,
    });

    this.graphics.use(
      text,
    );
  }

  onBeforeRender(engine: Engine) {

  }
}