import { Client } from './client';
import { shipmentData } from './mock';

const client = new Client();

client.processShipment(shipmentData);
