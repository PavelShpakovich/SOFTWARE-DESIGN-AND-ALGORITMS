import { ShipperStrategy } from './shipper';

export class ShipperContext {
  private strategy: ShipperStrategy | null = null; // to avoid ts errors

  setStrategy(s: ShipperStrategy): void {
    this.strategy = s;
  }

  getCost(weight: number, type: number) {
    return this.strategy?.getCost(weight, type);
  }
}
