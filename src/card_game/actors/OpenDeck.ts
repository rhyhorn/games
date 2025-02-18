import Deck from './Deck';
import { HEIGHT_OFFSET, WIDTH_OFFSET } from '../consts';

export default class OpenDeck extends Deck {
  // updateView() {
  //   this.cards.forEach((card, index) => {
  //     card.pos = this.pos.clone();
  //     card.z = index;
  //
  //     const position = Math.min(3 - (this.cards.length - 1 - index), this.cards.length - 1);
  //     if (position > 0) {
  //       card.pos.x += position * WIDTH_OFFSET;
  //     }
  //   });
  // }
}