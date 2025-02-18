import { Engine, Scene, vec, Vector, EasingFunctions } from 'excalibur';
import Card, { Ranks, Sides, Suits } from '../actors/Card';
import Deck from '../actors/Deck';
import OpenDeck from '../actors/OpenDeck';
import ResultDeck from '../actors/ResultDeck';
import PlayDeck from '../actors/PlayDeck';
import { CARD_WIDTH, HEIGHT_OFFSET } from '../consts';

export default class Start extends Scene {
  resultDecks: Deck[] = [];
  playDecks: Deck[] = [];
  closeDeck: Deck;
  openDeck: Deck;

  dragOffset: Vector = vec(0, 0);
  startPosition: Vector = vec(0, 0);

  dragCards: Card[] = [];
  droppableDecks: Deck[] = [];

  onInitialize(engine: Engine) {
    this.initResultDecks();
    this.initPlayDecks();

    this.closeDeck = new Deck({
      pos: vec(28, 50),
    });
    this.closeDeck.on('pointerup', this.handleOpenDeckClick.bind(this));
    this.add(this.closeDeck);


    this.openDeck = new OpenDeck({
      pos: vec(72, 50),
    });
    this.openDeck.on('pointerdown', (event) => this.handleDrag(this.openDeck, event.worldPos));
    this.add(this.openDeck);

    engine.input.pointers.primary.on('up', this.handleDrop.bind(this));
    this.initTable();
  }

  initTable() {
    for (let i = Suits.HEARTS; i <= Suits.CLUBS; i++) {
      for (let j = Ranks.CA; j <= Ranks.CK; j++) {
        const card = new Card(i, j, Sides.FRONT, {});
        card.side = Sides.BACK;
        this.add(card);
        this.closeDeck.addCard(card);
      }
    }

    this.closeDeck.shuffle();

    for (let i = 0; i < 7; i++) {
      for (let j = 0; j <= i; j++) {
        const card = this.closeDeck.removeTopCard();
        card.side = i === j ? Sides.FRONT : Sides.BACK;
        this.playDecks[i].addCard(card);
      }
    }
  }

  initResultDecks() {
    for (let i = 0; i < 4; i++) {
      const deck = new ResultDeck({
        pos: vec(160 + CARD_WIDTH * i + i * 2, 50),
      });
      this.add(deck);
      this.resultDecks.push(deck);
      this.droppableDecks.push(deck);
      deck.on('pointerdown', (event) => this.handleDrag(deck, event.worldPos));
    }
  }

  initPlayDecks() {
    for (let i = 0; i < 7; i++) {
      const deck = new PlayDeck({
        pos: vec(28 + CARD_WIDTH * i + i * 2, 120),
      });
      this.add(deck);
      this.playDecks.push(deck);
      this.droppableDecks.push(deck);
      deck.on('pointerdown', (event) => this.handleDrag(deck, event.worldPos));
    }
  }

  onPreUpdate(engine: Engine, delta: number) {
    super.onPreUpdate(engine, delta);

    if (this.dragCards.length === 0) {
      return;
    }

    this.dragCards.map((card, index) => {
      card.pos = engine.input.pointers.primary.lastWorldPos
        .clone().add(this.dragOffset);

      card.pos.y = card.pos.y + index * HEIGHT_OFFSET;
      card.z = 100;
    });
  }

  handleDrag(deck: Deck, position: Vector) {
    this.dragCards = deck.onDrag(position);
    if (this.dragCards.length === 0) {
      return;
    }

    this.startPosition = this.dragCards[0].pos.clone();
    this.dragOffset = this.startPosition.sub(position);
    this.dragCards.forEach((card) => card.z = 100);
  }

  handleDrop({ worldPos }) {
    if (this.dragCards.length === 0) {
      return;
    }

    let dropDeck = null;
    this.droppableDecks.forEach((deck) => {
      if (deck.collider.bounds.contains(worldPos)
        && deck.onDrop(this.dragCards)
      ) {
        dropDeck = deck;
      }
    });

    if (dropDeck) {
      this.dragCards.forEach((card) => {
        card.deck.removeTopCard();
        dropDeck.addCard(card);
      });
    } else {
      this.dragCards.map((card, index) => {
        const { x, y } = this.startPosition;
        card.actions
          .easeTo(vec(x, y + index * HEIGHT_OFFSET), 100, EasingFunctions.EaseInOutCubic)
          .callMethod(() => card.deck.updateView());
      });
    }
    this.dragCards = [];
  }


  handleOpenDeckClick() {
    const card = this.closeDeck.removeTopCard();

    if (card) {
      card.side = Sides.FRONT;
      this.openDeck.addCard(card);

      return;
    }

    for (let i = this.openDeck.cards.length - 1; i >= 0; i--) {
      const openCard = this.openDeck.cards[i];
      openCard.side = Sides.BACK;
      this.closeDeck.addCard(openCard);
    }
    this.openDeck.cards = [];
  }
}