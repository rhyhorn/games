import { Actor, Engine, SpriteSheet, vec } from 'excalibur';
import { resources } from '../resources';
import Deck from './Deck';

export enum Sides {
  FRONT,
  BACK
}

export enum Suits {
  HEARTS = 0,
  DIAMONDS = 1,
  SPADES = 2,
  CLUBS = 3,
}

export enum Ranks {
  CA = 0,
  C2 = 1,
  C3 = 2,
  C4 = 3,
  C5 = 4,
  C6 = 5,
  C7 = 6,
  C8 = 7,
  C9 = 8,
  C10 = 9,
  CJ = 10,
  CQ = 11,
  CK = 12,
}

export default class Card extends Actor {
  private sprites: SpriteSheet;
  private pointerDown: boolean = false;

  deck: Deck = null;
  side: Sides = Sides.FRONT;
  suit: Suits = Suits.DIAMONDS;
  rank: Ranks = Ranks.CA;

  constructor(suit: Suits, rank: Ranks, side: Sides, args) {
    super({
      ...args,
      anchor: vec(0, 0),
    });

    this.side = side;
    this.rank = rank;
    this.suit = suit;
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

    this.updateSprite();
  }

  onPreUpdate(engine: Engine, delta: number) {
    super.onPreUpdate(engine, delta);

    if (this.pointerDown) {
      this.pos = engine.input.pointers.primary.lastWorldPos.clone();
    }

    this.updateSprite();
  }

  flip(side?: Sides) {
    if (side) {
      this.side = side;
    } else {
      this.side = this.side === Sides.FRONT ? Sides.BACK : Sides.FRONT;
    }
    this.updateSprite();
  }

  updateSprite() {
    if (this.side === Sides.BACK) {
      this.graphics.use(this.sprites.getSprite(13, 1));
      return;
    }

    this.graphics.use(this.sprites.getSprite(this.rank, this.suit));
  }
}