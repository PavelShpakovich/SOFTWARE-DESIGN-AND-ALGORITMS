import { ShipmentData } from './types';
import { Shipment, ShipmentFactory, WithSpecialCodesDecorator } from './shipment';
import { shipmentData } from './mock';

class Client {
  createShipment(shipmentData: ShipmentData): Shipment {
    return new ShipmentFactory().produceShipment(shipmentData);
  }

  processShipment(shipment: Shipment): void {
    const decoratedShipment = new WithSpecialCodesDecorator(shipment);
    const result = decoratedShipment.ship();
    console.log(result);
  }
}

const client = new Client();

const shipment = client.createShipment(shipmentData);

client.processShipment(shipment);
