import { Actor, Engine, Vector } from 'excalibur';
import HealthContainer from './HealthContainer';
import { ActorArgs } from 'excalibur/build/dist/Actor';
import Player from '../Player';
import HealthComponent from '../../components/Health';

export default class HealthIndicator extends Actor {
  player: Player;
  playerHealth: HealthComponent;
  containers: HealthContainer[] = [];

  constructor(args: ActorArgs, player: Player) {
    super(args);
    this.player = player;
  }

  onInitialize(engine: Engine) {
    this.playerHealth = this.player.get(HealthComponent);

    for (let i = 0; i < this.playerHealth.max; i++) {
      this.containers.push(new HealthContainer());
    }

    this.player.on('HealthChanged', () => {
      this.updateHealth();
      console.log('changed Health');
    });

    this.containers.forEach((container, i) => {
      container.pos.setTo(10 + i * 6 + i * 1, 10);
      this.addChild(container);
    });
  }

  updateHealth() {
    for (let i = 0; i < this.playerHealth.max; i++) {
      this.containers[i].graphics.opacity = i > this.playerHealth.current ? 0 : 1;
    }
  }
}