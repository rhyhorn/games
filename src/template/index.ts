import { Loader } from 'excalibur';
import Game from './Game';
import { resources } from './resoures';
import { Scenes } from './scenes';

const game = new Game();
const loader = new Loader(Object.values(resources));

game.start(loader)
  .then(() => game.goToScene(Scenes.START));