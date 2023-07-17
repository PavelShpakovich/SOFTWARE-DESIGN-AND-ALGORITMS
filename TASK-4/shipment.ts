import { ShipperFactory } from './shipper';
import { ShipmentData } from './types';

export class Shipment {
  protected id: number = 0;
  private shipmentID: number;
  private weight: number;
  private fromAddress: string;
  private fromZipCode: string;
  private toAddress: string;
  private toZipCode: string;

  constructor({ ShipmentID, Weight, FromAddress, FromZipCode, ToAddress, ToZipCode }: ShipmentData) {
    this.shipmentID = ShipmentID;
    this.weight = Weight;
    this.fromAddress = FromAddress;
    this.fromZipCode = FromZipCode;
    this.toAddress = ToAddress;
    this.toZipCode = ToZipCode;
  }

  getShipmentId() {
    return this.shipmentID || ++this.id;
  }

  ship() {
    const shipper = new ShipperFactory().produceShipper(this.weight, this.fromZipCode);
    const cost = shipper.getCost();

    return `Shipment ID: ${this.getShipmentId()}, From: ${this.fromAddress} (${this.fromZipCode}), To: ${
      this.toAddress
    } (${this.toZipCode}), Cost: $${cost.toFixed(2)}`;
  }
}
