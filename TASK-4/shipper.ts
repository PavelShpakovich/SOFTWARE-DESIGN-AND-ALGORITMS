import { ShipmentType } from './types';

abstract class Shipper {
  abstract rate: number;

  getCost(weight: number): number {
    return weight * this.rate;
  }
}

class AirEastShipper extends Shipper {
  rate: number;
  type: ShipmentType;
  constructor(type: ShipmentType) {
    super();
    this.type = type;
    switch (type) {
      case ShipmentType.Letter:
        this.rate = 0.39;
        break;
      case ShipmentType.Package:
      case ShipmentType.Oversized:
        this.rate = 0.25;
        break;
    }
  }

  getCost(weight: number): number {
    if (this.type === ShipmentType.Oversized) {
      return super.getCost(weight) + 10;
    }

    return super.getCost(weight);
  }
}

class ChicagoSpirintShipper extends Shipper {
  rate: number;
  type: ShipmentType;
  constructor(type: ShipmentType) {
    super();
    this.type = type;
    switch (type) {
      case ShipmentType.Letter:
        this.rate = 0.42;
        break;
      case ShipmentType.Package:
        this.rate = 0.2;
      case ShipmentType.Oversized:
        this.rate = 0;
        break;
    }
  }
}

class PacificParcelShipper extends Shipper {
  rate: number;
  type: ShipmentType;
  constructor(type: ShipmentType) {
    super();
    this.type = type;
    switch (type) {
      case ShipmentType.Letter:
        this.rate = 0.51;
        break;
      case ShipmentType.Package:
        this.rate = 0.19;
      case ShipmentType.Oversized:
        this.rate = 0.21;
        break;
    }
  }
}

export class ShipperFactory {
  produceShipper(type: ShipmentType, zipCode?: string) {
    const zipCodeBegins = parseInt(zipCode?.[0] as string);

    if (zipCodeBegins <= 3) {
      return new AirEastShipper(type);
    }

    if (zipCodeBegins <= 6) {
      return new ChicagoSpirintShipper(type);
    }

    if (zipCodeBegins <= 9) {
      return new PacificParcelShipper(type);
    }

    return new AirEastShipper(type);
  }
}
