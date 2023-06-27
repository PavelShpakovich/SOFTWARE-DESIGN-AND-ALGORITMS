import { Consumable } from "./Consumable";

export class Pizza extends Consumable {
  readonly numberOfSlices: number;
  private numberOfEatenSlices: number = 0;

  constructor(value: number, weight: number, numberOfSlices: number, isSpoiled: boolean = false) {
    super("pizza", value, weight, isSpoiled);
    this.numberOfSlices = numberOfSlices;
    this.isConsumed = !numberOfSlices;
  }

  use(): string {
    if (!(this.isConsumed || this.isSpoiled())) {
      this.isConsumed = ++this.numberOfEatenSlices === this.numberOfSlices;

      return `You consumed a slice of the ${this.name}.`;
    }

    return super.use();
  }

  getNumberOfEatenSlices(): number {
    return this.numberOfEatenSlices;
  }
}
