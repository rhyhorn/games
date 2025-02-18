import { DisplayMode, Engine } from 'excalibur';
import Start from './scenes/Start';
import { Scenes } from './scenes';
import Test from './scenes/Test';

export default class Game extends Engine {
  constructor() {
    super({
      displayMode: DisplayMode.Fixed,
      resolution: {
        width: 380,
        height: 400,
      },
      viewport: {
        width: 760,
        height: 800,
      },
      antialiasing: false,
      pixelArt: true,
      suppressPlayButton: true,
      scenes: {
        [Scenes.START]: Start,
        [Scenes.TEST]: Test,
      },
    });
  }
}