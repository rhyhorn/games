import { Loader } from 'excalibur';
import Game from './Game';
import { resources } from './resources';
import { Scenes } from './scenes';

const game = new Game();
const loader = new Loader([]);

game.start(loader)
  .then(() => game.goToScene(Scenes.GAME));
