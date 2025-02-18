import { Actor, Engine, Random, SpriteSheet, vec, Vector } from 'excalibur';
import Card, { Sides } from './Card';
import { resources } from '../resources';
import random from '../modules/random';

export default class Deck extends Actor {
  private sprites: SpriteSheet;
  cards: Card[] = [];

  constructor(params = {}) {
    super({
      ...params,
      anchor: vec(0, 0),
    });
    this.collider.useBoxCollider(42, 60, vec(0, 0));
  }

  onInitialize(engine: Engine) {
    this.sprites = SpriteSheet.fromImageSource({
      image: resources.cards,
      grid: {
        rows: 4,
        columns: 14,
        spriteWidth: 42,
        spriteHeight: 60,
      },
      spacing: {
        originOffset: { x: 11, y: 2 },
        margin: { x: 23, y: 5 },
      },
    });

    this.graphics.use(this.sprites.getSprite(13, 0));
  }

  addCard(card: Card) {
    card.pos = this.pos.clone();
    card.z = this.cards.length;
    card.deck = this;
    this.cards.push(card);
    this.updateView();
  }

  removeTopCard() {
    const card = this.cards.pop();
    this.updateView();
    return card;
  }

  onDrop(card: Card[]) {
    return true;
  }

  onDrag(pos: Vector): Card[] {
    return this.cards.length === 0 ? [] : [this.cards.at(-1)];
  }

  shuffle() {
    this.cards = random.shuffle(this.cards);
    this.updateView();
  }

  updateView() {
    this.cards.forEach((card, index) => {
      card.pos = this.pos.clone();
      card.z = index;
    });
  }
};