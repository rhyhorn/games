import { Component } from 'excalibur';

class StateMachineComponent extends Component {
  states: Map<string, State> = new Map<string, State>();
  currentState: string = null;

  addState(name: string, state: State) {
    this.states.set(name, state);
  }

  changeState(name: string) {
    if (this.currentState) {
      this.states.get(name).onLeave() ;
    }
  }
}