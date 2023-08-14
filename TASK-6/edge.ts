import { IVertex } from './types';

export class Edge {
  constructor(public from: IVertex, public to: IVertex, public weight: number) {
    this.from = from;
    this.to = to;
    this.weight = weight;
  }
}
