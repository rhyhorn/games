import { DisplayMode, Engine, SolverStrategy } from 'excalibur';
import { Scenes } from './scenes';
import GameScene from './scenes/Game';

export default class Game extends Engine {
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
      scenes: {
        [Scenes.GAME]: GameScene,
      },
      physics: {
        solver: SolverStrategy.Arcade,
      },
    });
  }
}