export interface ShipmentData {
  ShipmentID: number;
  Weight: number;
  FromAddress: string;
  FromZipCode: string;
  ToAddress: string;
  ToZipCode: string;
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
