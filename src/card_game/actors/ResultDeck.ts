import Deck from './Deck';
import Card, { Ranks } from './Card';

export default class ResultDeck extends Deck {
  onDrop(cards: Card[]): boolean {
    if (cards.length > 1) {
      return false;
    }

    const [card] = cards;

    if (this.cards.length === 0) {
      return card.rank === Ranks.CA;
    }

    const lastCard = this.cards.at(-1);

    return (lastCard.rank === card.rank - 1)
      && (lastCard.suit === card.suit);
  }
}