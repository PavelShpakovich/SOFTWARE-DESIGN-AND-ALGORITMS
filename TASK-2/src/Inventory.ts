import { Item } from "./Item";
import { ItemComparator } from "./ItemComparator";

export class Inventory {
  private items: Item[] = [];

  addItem(item: Item): void {
    this.items.push(item);
  }

  sort(): void;
  sort(comparator: ItemComparator): void;
  sort(comparator?: ItemComparator) {
    this.items.sort(comparator?.compare || ((a, b) => a.value - b.value));
  }

  toString(): string {
    return this.items.map((item) => item.toString()).join(", ");
  }
}
