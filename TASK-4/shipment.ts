import { ShipperContext } from './context';
import { ShipperStrategy } from './shipper';
import { Codes, IShipment, ShipmentData, ShipmentType, Weight } from './types';

export abstract class Shipment implements IShipment {
  private static id: number = 0;
  private shipmentID: number;
  private weight: number;
  private fromAddress: string;
  private fromZipCode: string;
  private toAddress: string;
  private toZipCode: string;
  abstract type: ShipmentType;

  private context: ShipperContext;

  constructor(
    { ShipmentID, Weight, FromAddress, FromZipCode, ToAddress, ToZipCode }: ShipmentData,
    context: ShipperContext
  ) {
    this.shipmentID = ShipmentID;
    this.weight = Weight;
    this.fromAddress = FromAddress;
    this.fromZipCode = FromZipCode;
    this.toAddress = ToAddress;
    this.toZipCode = ToZipCode;
    this.context = context;
  }

  getShipmentId(): number {
    return this.shipmentID || ++Shipment.id;
  }

  ship(): string {
    const cost = this.context.getCost(this.weight, this.type);

    return `Shipment ID: ${this.getShipmentId()}, From: ${this.fromAddress} (${this.fromZipCode}), To: ${
      this.toAddress
    } (${this.toZipCode}), Cost: $${cost?.toFixed(2)}`;
  }
}

export class Letter extends Shipment {
  type: ShipmentType = ShipmentType.Letter;
}

export class Package extends Shipment {
  type: ShipmentType = ShipmentType.Package;
}

export class Oversized extends Shipment {
  type: ShipmentType = ShipmentType.Oversized;
}

abstract class ShipmentDecorator implements IShipment {
  protected wrappee: IShipment;

  constructor(wrappee: IShipment) {
    this.wrappee = wrappee;
  }

  getShipmentId(): number {
    return this.wrappee.getShipmentId();
  }
  abstract ship(): string;
}

class WithFragileCodeDecorator extends ShipmentDecorator {
  ship(): string {
    return `${this.wrappee.ship()}\n**MARK FRAGILE**`;
  }
}
class WithDoNotLeaveCodeDecorator extends ShipmentDecorator {
  ship(): string {
    return `${this.wrappee.ship()}\n**MARK DO NOT LEAVE IF ADDRESS NOT AT HOME**`;
  }
}
class WithReturnReceiptRequestedCodeDecorator extends ShipmentDecorator {
  ship(): string {
    return `${this.wrappee.ship()}\n**MARK RETURN RECEIPT REQUESTED**`;
  }
}

export const decoratorsMap = {
  [Codes.Fragile]: WithFragileCodeDecorator,
  [Codes.DoNotLeave]: WithDoNotLeaveCodeDecorator,
  [Codes.ReturnReceiptRequested]: WithReturnReceiptRequestedCodeDecorator,
};
