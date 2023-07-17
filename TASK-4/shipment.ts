import { ShipperFactory } from './shipper';
import { ShipmentData, ShipmentType, Weight } from './types';

export abstract class Shipment {
  private static id: number = 0;
  private shipmentID: number;
  private weight: number;
  private fromAddress: string;
  private fromZipCode: string;
  private toAddress: string;
  private toZipCode: string;
  abstract type: ShipmentType;

  constructor({ ShipmentID, Weight, FromAddress, FromZipCode, ToAddress, ToZipCode }: ShipmentData) {
    this.shipmentID = ShipmentID;
    this.weight = Weight;
    this.fromAddress = FromAddress;
    this.fromZipCode = FromZipCode;
    this.toAddress = ToAddress;
    this.toZipCode = ToZipCode;
  }

  getShipmentId() {
    return this.shipmentID || ++Shipment.id;
  }

  ship() {
    const shipper = new ShipperFactory().produceShipper(this.type, this.fromZipCode);
    const cost = shipper.getCost(this.weight);

    return `Shipment ID: ${this.getShipmentId()}, From: ${this.fromAddress} (${this.fromZipCode}), To: ${
      this.toAddress
    } (${this.toZipCode}), Cost: $${cost.toFixed(2)}`;
  }
}

export class Letter extends Shipment {
  type: ShipmentType = ShipmentType.Letter;
  constructor(shipmentData: ShipmentData) {
    super(shipmentData);
  }
}

export class Package extends Shipment {
  type: ShipmentType = ShipmentType.Package;
  constructor(shipmentData: ShipmentData) {
    super(shipmentData);
  }
}

export class Oversized extends Shipment {
  type: ShipmentType = ShipmentType.Oversized;
  constructor(shipmentData: ShipmentData) {
    super(shipmentData);
  }
}

export class ShipmentFactory {
  produceShipment(shipmentData: ShipmentData) {
    if (shipmentData.Weight <= Weight.Small) {
      return new Letter(shipmentData);
    }

    if (shipmentData.Weight <= Weight.Medium) {
      return new Package(shipmentData);
    }

    return new Oversized(shipmentData);
  }
}
