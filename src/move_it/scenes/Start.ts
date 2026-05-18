import { Engine, Keys, Scene, vec } from 'excalibur';
import Level from '../actors/Level';

class Start extends Scene {
  level: Level;

  onInitialize(engine: Engine) {
    this.restart();
  }

  onPreUpdate(engine: Engine) {
    if (engine.input.keyboard.wasPressed(Keys.Space)) {
      this.restart();
    }
  }

  restart() {
    if (this.level) {
      this.level.kill();
      this.remove(this.level);
    }

    this.level = new Level();
    this.add(this.level);
    this.level.on('complete', () => {
      this.restart();
    });
  }

  showCompleteState() {

  }
}

export default Start;