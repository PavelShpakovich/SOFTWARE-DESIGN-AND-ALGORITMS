import { IShipment, ShipmentData, Weight } from './types';
import { decoratorsMap, Letter, Package, Oversized } from './shipment';
import {
  AirEastShipperStrategy,
  ChicagoSpirintShipperStrategy,
  PacificParcelShipperStrategy,
  ShipperStrategy,
} from './shipper';
import { ShipperContext } from './context';

export class Client {
  getStrategy(zipCode: string): ShipperStrategy {
    const zipCodeBegins = parseInt(zipCode?.[0] as string);

    if (zipCodeBegins <= 3) {
      return new AirEastShipperStrategy();
    }

    if (zipCodeBegins <= 6) {
      return new ChicagoSpirintShipperStrategy();
    }

    if (zipCodeBegins <= 9) {
      return new PacificParcelShipperStrategy();
    }

    return new AirEastShipperStrategy();
  }

  createShipment(shipmentData: ShipmentData): IShipment {
    let shipment: IShipment;
    const context = new ShipperContext();

    context.setStrategy(this.getStrategy(shipmentData.FromZipCode));

    if (shipmentData.Weight <= Weight.Small) {
      shipment = new Letter(shipmentData, context);
    }

    if (shipmentData.Weight <= Weight.Medium) {
      shipment = new Package(shipmentData, context);
    }

    shipment = new Oversized(shipmentData, context);

    shipmentData.Codes?.forEach((code) => {
      const Decorator = decoratorsMap[code];
      shipment = new Decorator(shipment);
    });

    return shipment;
  }

  processShipment(shipmentData: ShipmentData): void {
    const shipment = this.createShipment(shipmentData);

    const result = shipment.ship();
    console.log(result);
  }
}
