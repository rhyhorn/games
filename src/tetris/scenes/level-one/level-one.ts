import { Actor, Engine, Scene, vec } from 'excalibur';
import Figure from '../../actors/Figure';
import { Resources } from '../../resources';

/**
 * Managed scene
 */
export class LevelOne extends Scene {
  public onInitialize(engine: Engine) {

    const field = new Actor({
      pos: vec(10, 10),
      anchor: vec(0, 0),
    });

    field.graphics.use(Resources.Field.toSprite());
    this.add(field);

    for (let i = 0; i < 13; i++) {
      for (let j = 0; j < 26; j++) {
        this.add(new Figure({
          pos: vec(19 + i * 5 + i, 20 + j * 5 + j),
        }));
      }
    }
  }

  public onActivate() {

  }

  public onDeactivate() {

  }
}
