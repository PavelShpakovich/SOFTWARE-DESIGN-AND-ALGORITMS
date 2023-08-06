import { IVertex } from './types';

export class Vertex implements IVertex {
  value: string;

  constructor(value: string) {
    this.value = value;
  }
}
