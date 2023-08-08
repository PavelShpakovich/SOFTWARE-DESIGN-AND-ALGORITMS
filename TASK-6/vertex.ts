import { IVertex } from './types';

export class Vertex implements IVertex {
  constructor(public value: string) {
    this.value = value;
  }
}
