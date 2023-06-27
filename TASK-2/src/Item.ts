import { Comparable } from "./Comparable";

export abstract class Item implements Comparable<Item> {
  static idCounter: number = 0;
  static resetIdCounter(): void {
    this.idCounter = 0;
  }
  readonly name: string;
  value: number;
  weight: number;
  private readonly id: number;

  constructor(name: string, value: number, weight: number) {
    this.name = name;
    this.value = value;
    this.weight = weight;
    this.id = ++Item.idCounter;
  }

  abstract use(): void;

  compareTo(other: Item): number {
    if (this.value === other.value) {
      return this.name.localeCompare(other.name);
    }

    return this.value > other.value ? 1 : -1;
  }

  toString(): string {
    return `${this.name} − Value: ${this.value.toFixed(2)}, Weight: ${this.weight.toFixed(2)}`;
  }

  getId(): number {
    return this.id;
  }
}
