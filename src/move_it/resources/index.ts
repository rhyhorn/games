import { ImageSource } from 'excalibur';
import cards from './images/cards.png';
import player from './images/player.png';
import box from './images/box.png';
import target from './images/target.png';
import wall from './images/wall.png';

const resources = {
  cards: new ImageSource(cards),
  player: new ImageSource(player),
  box: new ImageSource(box),
  target: new ImageSource(target),
  wall: new ImageSource(wall),
};
export { resources };