import { Engine, Scene, vec } from 'excalibur';
import PlayDeck from '../actors/PlayDeck';
import Card, { Ranks, Sides, Suits } from '../actors/Card';

export default class Test extends Scene {
  onInitialize(engine: Engine) {
    const playDeck = new PlayDeck({
      pos: vec(10, 10),
    });
    this.add(playDeck);

    for (let i = 0; i < 10; i++) {
      const card = new Card(Suits.DIAMONDS, Ranks.CA, Sides.FRONT, {});
      this.add(card);
      playDeck.addCard(card);
    }
  }
}