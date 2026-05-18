import { Actor, Engine, Entity, TransformComponent } from 'excalibur';

export enum Align {
  BEGIN,
  CENTER,
  END,
}

export default class VBox extends Actor {
  private align: Align.BEGIN;

  private spacing: 0;

  private paddingTop: 0;
  private paddingBottom: 0;
  private paddingRight: 0;
  private paddingLeft: 0;

  constructor({ children = [] }: { children?: Actor[] }) {
    super();
    children.forEach((child) => {
      this.addChild(child);
    });
  }

  onPostUpdate(engine: Engine, elapsed: number) {
    this.children.forEach((child) => {
      // child.hasAll([TransformComponent])
    });
  }
}