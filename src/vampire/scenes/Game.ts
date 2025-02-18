import { Actor, Engine, Scene, vec } from 'excalibur';
import Player from '../actors/Player';
import Monster from '../actors/Monster';
import HealthBar from '../ui/HealthBar';
import ExperienceBar from '../ui/ExperienceBar';

export default class Game extends Scene {
  hpBar: HealthBar;
  xpBar: ExperienceBar;
  player: Player;

  onInitialize(engine: Engine) {
    this.player = new Player({
      pos: vec(100, 100),
      radius: 4,
    });
    this.add(this.player);

    for (let i = 0; i < 20; i++) {
      const monster = new Monster({
        pos: vec(40 * i, 100),
        radius: 4,
      });

      monster.setTarget(this.player);
      this.add(monster);
    }

    this.hpBar = new HealthBar({
      pos: vec(4, 4),
      width: 100,
      height: 8,
      current: 50,
    });
    this.add(this.hpBar);
  }

  onPreUpdate(engine: Engine, delta: number) {
    this.hpBar.setValues(
      this.player.health.current,
      this.player.health.max,
    );
  }
}