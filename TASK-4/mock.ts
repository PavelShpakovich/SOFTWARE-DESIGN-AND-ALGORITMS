import { Codes, ShipmentData } from './types';

export const shipmentData: ShipmentData = {
  ShipmentID: 0,
  Weight: 16,
  FromAddress: '123 Main St, Springfield, IL',
  FromZipCode: '62704',
  ToAddress: '456 Elm St, Chicago, IL',
  ToZipCode: '60601',
  Codes: [Codes.Fragile, Codes.ReturnReceiptRequested],
};
