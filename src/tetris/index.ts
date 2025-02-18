import { Engine, Loader, DisplayMode } from 'excalibur';
import { LevelOne } from './scenes/level-one/level-one';
import { Resources } from './resources';

/**
 * Managed game class
 */
class Game extends Engine {
  constructor() {
    super({
      displayMode: DisplayMode.Fixed,
      resolution: {
        width: 320,
        height: 240,
      },
      viewport: {
        width: 640,
        height: 480,
      },
      antialiasing: false,
      pixelArt: true,
      suppressPlayButton: true,
    });
  }

  public start() {
    game.add('levelOne', new LevelOne());
    const loader = new Loader(Object.values(Resources));

    return super.start(loader);
  }
}

const game = new Game();
game.start().then(() => {
  game.goToScene('levelOne');
});
