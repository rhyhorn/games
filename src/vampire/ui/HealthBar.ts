import {
  Engine,
  GraphicsGroup,
  Rectangle,
  ScreenElement, vec,
  Vector,
  Color, Graphic,
} from 'excalibur';
import { ActorArgs } from 'excalibur/build/dist/Actor';

export default class HealthBar extends ScreenElement {
  max: number;
  current: number;
  paddingX: number;
  paddingY: number;

  private containerGraphic: Graphic;
  private progressGraphic: Graphic;

  constructor(params: ActorArgs & {
    max?: number;
    current?: number;
    paddingX?: number,
    paddingY?: number,
  }) {
    super(params);

    const {
      max = 100,
      current = 0,
      paddingX = 1,
      paddingY = 1,
    } = params;

    this.max = max;
    this.current = current;
    this.paddingX = paddingX;
    this.paddingY = paddingY;
  }

  onInitialize(engine: Engine) {
    this.containerGraphic = new Rectangle({
      width: this.width,
      height: this.height,
      color: Color.Red,
    });

    this.progressGraphic = new Rectangle({
      width: this.width - this.paddingX * 2,
      height: this.height - this.paddingY * 2,
      color: Color.Green,
    });

    this.graphics.use(new GraphicsGroup({
      members: [{
        graphic: this.containerGraphic,
        offset: Vector.Zero,
      }, {
        graphic: this.progressGraphic,
        offset: vec(this.paddingX, this.paddingY),
      }],
    }));
  }

  setValues(current: number, max: number) {
    this.current = current;
    this.max = max;
  }

  onPostUpdate(engine: Engine, delta: number) {
    const maxWidth = this.width - this.paddingX * 2;
    this.progressGraphic.width = (maxWidth * this.current) / 100;
  }
}