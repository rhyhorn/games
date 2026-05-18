import { DisplayMode, Engine } from 'excalibur';
import { Scenes } from './scenes';
import Start from './scenes/Start';

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
        [Scenes.START]: Start,
      },
    });
  }
}