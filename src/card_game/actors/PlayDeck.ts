import Deck from './Deck';
import { vec, Vector } from 'excalibur';
import Card, { Ranks, Sides, Suits } from './Card';
import { CARD_HEIGHT, CARD_WIDTH, HEIGHT_OFFSET } from '../consts';

const isOppositeColor = (card1: Card, card2: Card) => {
  if ([Suits.DIAMONDS, Suits.HEARTS].includes(card1.suit)) {
    return [Suits.CLUBS, Suits.SPADES].includes(card2.suit);
  }

  if ([Suits.CLUBS, Suits.SPADES].includes(card1.suit)) {
    return [Suits.DIAMONDS, Suits.HEARTS].includes(card2.suit);
  }
};

export default class PlayDeck extends Deck {
  removeTopCard(): Card {
    const card = super.removeTopCard();
    const lastCard = this.cards.at(-1);
    if (card && lastCard) {
      lastCard.side = Sides.FRONT;
    }

    return card;
  }

  updateView() {
    this.collider.useBoxCollider(
      CARD_WIDTH,
      CARD_HEIGHT + HEIGHT_OFFSET * (this.cards.length - 1),
      vec(0, 0),
    );

    this.cards.forEach((card, index) => {
      card.pos = this.pos.clone();
      card.pos.y += index * HEIGHT_OFFSET;
      card.z = index;
    });
  }

  onDrop(cards: Card[]): boolean {
    const firstCard = cards[0];

    if (this.cards.length === 0) {
      return firstCard.rank === Ranks.CK;
    }

    const topCard = this.cards.at(-1);
    return (firstCard.rank === topCard.rank - 1) && (isOppositeColor(topCard, firstCard));
  }

  onDrag(pos: Vector): Card [] {
    const dragOffset = pos.sub(this.pos);
    const clickPosition = Math.floor(dragOffset.y / HEIGHT_OFFSET);
    const cardIndex = Math.min(clickPosition, this.cards.length - 1);

    if (this.cards[cardIndex].side === Sides.BACK) {
      return [];
    }

    const result: Card[] = [];

    for (let i = cardIndex; i < this.cards.length; i++) {
      result.push(this.cards[i]);
    }

    return result;
  }
}