import { IShipment, ShipmentData, Weight } from './types';
import { decoratorsMap, Letter, Package, Oversized, Shipment, ShipmentDecorator } from './shipment';
import { AirEastShipper, ChicagoSpirintShipper, PacificParcelShipper, Shipper } from './shipper';

export class Client {
  getStrategy(zipCode: string): Shipper {
    const zipCodeBegins = parseInt(zipCode?.[0] as string);

    if (zipCodeBegins <= 3) {
      return new AirEastShipper();
    }

    if (zipCodeBegins <= 6) {
      return new ChicagoSpirintShipper();
    }

    if (zipCodeBegins <= 9) {
      return new PacificParcelShipper();
    }

    return new AirEastShipper();
  }

  createShipment(shipmentData: ShipmentData): IShipment {
    let shipment: Shipment;

    if (shipmentData.Weight <= Weight.Small) {
      shipment = new Letter(shipmentData);
    } else if (shipmentData.Weight <= Weight.Medium) {
      shipment = new Package(shipmentData);
    } else {
      shipment = new Oversized(shipmentData);
    }

    shipment.setShipper(this.getStrategy(shipmentData.FromZipCode));

    let decoratedShipment: IShipment = new ShipmentDecorator(shipment);
    shipmentData.Codes?.forEach((code) => {
      const Decorator = decoratorsMap[code];
      decoratedShipment = new Decorator(decoratedShipment);
    });

    return decoratedShipment;
  }

  processShipment(shipmentData: ShipmentData): void {
    const shipment = this.createShipment(shipmentData);

    const result = shipment.ship();
    console.log(result);
  }
}
