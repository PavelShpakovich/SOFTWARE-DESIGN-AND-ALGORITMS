import { Item } from "./Item";

export abstract class Consumable extends Item {
  isConsumed: boolean = false;
  private _isSpoiled: boolean;

  constructor(name: string, value: number, weight: number, isSpoiled: boolean = false) {
    super(name, value, weight);
    this._isSpoiled = isSpoiled;
  }

  use(): string {
    if (this.isConsumed) {
      return `There's nothing left of the ${this.name} to consume.`;
    }

    if (this._isSpoiled) {
      return `You consumed the ${this.name}.\nYou feel sick.`;
    }

    return `You consumed the ${this.name}.`;
  }

  isSpoiled() {
    return this._isSpoiled;
  }
}
