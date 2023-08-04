import { ShipmentType } from './types';

export interface Shipper {
  getCost(weight: number, type: ShipmentType): number;
}

export class AirEastShipper implements Shipper {
  getCost(weight: number, type: ShipmentType): number {
    let rate: number;
    switch (type) {
      case ShipmentType.Letter:
        rate = 0.39;
        break;
      case ShipmentType.Package:
      case ShipmentType.Oversized:
        rate = 0.25;
        break;
    }
    if (type === ShipmentType.Oversized) {
      return weight * rate + 10;
    }

    return weight * rate;
  }
}

export class ChicagoSpirintShipper implements Shipper {
  getCost(weight: number, type: ShipmentType): number {
    let rate: number;
    switch (type) {
      case ShipmentType.Letter:
        rate = 0.42;
        break;
      case ShipmentType.Package:
        rate = 0.2;
        break;
      case ShipmentType.Oversized:
        rate = 0;
        break;
    }

    return weight * rate;
  }
}

export class PacificParcelShipper implements Shipper {
  getCost(weight: number, type: ShipmentType): number {
    let rate: number;
    switch (type) {
      case ShipmentType.Letter:
        rate = 0.51;
        break;
      case ShipmentType.Package:
        rate = 0.19;
      case ShipmentType.Oversized:
        rate = 0.21;
        break;
    }

    return weight * rate;
  }
}
