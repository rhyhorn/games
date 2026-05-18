import { Engine, Keys, Scene, vec } from 'excalibur';
import Player from '../actors/Player';
import HealthIndicator from '../actors/ui/HealthIndicator';
import Spike from '../actors/Spike';
import MedKit from '../actors/MedKit';
import Box from '../actors/Box';

class Start extends Scene {
  player: Player;

  constructor() {
    super();

    this.player = new Player({
      pos: vec(10, 60),
    });

  }

  onInitialize(engine: Engine) {
    this.add(new HealthIndicator({
      pos: vec(0, 0),
    }, this.player));

    this.add(new MedKit({
      pos: vec(30, 60),
    }));

    this.add(new Box({
      pos: vec(10, 80),
    }));


    this.add(this.player);

    // this.add(new Enemy({
    //   pos: vec(64, 20),
    // }));
    //
    // this.add(new Enemy({
    //   pos: vec(64, 40),
    // }));

    this.add(new Spike({
      pos: vec(100, 100),
    }));

    this.add(new Spike({
      pos: vec(116, 100),
    }));

  }
}

export default Start;