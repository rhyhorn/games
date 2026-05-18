import { Engine, Scene } from 'excalibur';
import Menu from '../actors/UI/Menu';

export default class MainMenu extends Scene {
  onInitialize(engine: Engine) {
    this.add(new Menu());
  }
}