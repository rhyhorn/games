import { ImageSource } from 'excalibur';

import playerImg from './images/player.png';
import spikeImg from './images/spike.png';
import medkitImg from './images/medkit.png';
import boxImg from './images/box.png';
import bulletsImg from './images/bullet.png';

const resources = {
  player: new ImageSource(playerImg),
  spike: new ImageSource(spikeImg),
  medkit: new ImageSource(medkitImg),
  box: new ImageSource(boxImg),
  bullet: new ImageSource(bulletsImg),
};

export { resources };