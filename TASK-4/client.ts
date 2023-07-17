import { ShipmentData } from './types';
import { Shipment } from './shipment';
import { shipmentData } from './mock';

class Client {
  createShipment(shipmentData: ShipmentData): Shipment {
    return new Shipment(shipmentData);
  }

  processShipment(shipment: Shipment): void {
    const result = shipment.ship();
    console.log(result);
  }
}

const client = new Client();

const shipment = client.createShipment(shipmentData);

client.processShipment(shipment);
