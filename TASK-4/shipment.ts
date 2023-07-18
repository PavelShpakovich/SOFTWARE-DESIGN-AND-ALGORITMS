import { ShipperFactory } from './shipper';
import { Codes, IShipment, ShipmentData, ShipmentType, Weight } from './types';

export abstract class Shipment implements IShipment {
  private static id: number = 0;
  private shipmentID: number;
  private weight: number;
  private fromAddress: string;
  private fromZipCode: string;
  private toAddress: string;
  private toZipCode: string;
  public codes: Codes[] | null;
  abstract type: ShipmentType;

  constructor({ ShipmentID, Weight, FromAddress, FromZipCode, ToAddress, ToZipCode, Codes }: ShipmentData) {
    this.shipmentID = ShipmentID;
    this.weight = Weight;
    this.fromAddress = FromAddress;
    this.fromZipCode = FromZipCode;
    this.toAddress = ToAddress;
    this.toZipCode = ToZipCode;
    this.codes = Codes;
  }

  getShipmentId(): number {
    return this.shipmentID || ++Shipment.id;
  }

  ship(): string {
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

abstract class ShipmentDecorator implements IShipment {
  protected wrappee: Shipment;

  constructor(wrappee: Shipment) {
    this.wrappee = wrappee;
  }

  getShipmentId(): number {
    return this.wrappee.getShipmentId();
  }
  abstract ship(): string;
}

const codeMap = {
  [Codes.Fragile]: '\n**MARK FRAGILE**',
  [Codes.DoNotLeave]: '\n**MARK DO NOT LEAVE IF ADDRESS NOT AT HOME**',
  [Codes.ReturnReceiptRequested]: '\n**MARK RETURN RECEIPT REQUESTED**',
};

export class WithSpecialCodesDecorator extends ShipmentDecorator {
  ship(): string {
    if (this.wrappee.codes) {
      const marks = this.wrappee.codes.reduce((prev, curr) => prev + codeMap[curr], '');
      return `${this.wrappee.ship()}${marks}`;
    }

    return this.wrappee.ship();
  }
}
