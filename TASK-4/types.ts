export interface ShipmentData {
  ShipmentID: number;
  Weight: number;
  FromAddress: string;
  FromZipCode: string;
  ToAddress: string;
  ToZipCode: string;
  Codes: Codes[] | null;
}

export enum Codes {
  Fragile,
  DoNotLeave,
  ReturnReceiptRequested,
}

export enum ShipmentType {
  Letter,
  Package,
  Oversized,
}

export enum Weight {
  Small = 15,
  Medium = 160,
}

export interface IShipment {
  getShipmentId(): number;
  ship(): string;
}
