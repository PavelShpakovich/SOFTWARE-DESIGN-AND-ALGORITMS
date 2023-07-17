import { ShipmentData } from './types';

export class Shipment {
  protected id: number = 0;
  private rate: number = 0.39;
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
    const cost = this.weight * this.rate;
    return `Shipment ID: ${this.getShipmentId()}, From: ${this.fromAddress} (${this.fromZipCode}), To: ${
      this.toAddress
    } (${this.toZipCode}), Cost: $${cost.toFixed(2)}`;
  }
}
