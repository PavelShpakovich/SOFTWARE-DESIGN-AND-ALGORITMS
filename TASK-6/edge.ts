import { IVertex } from './types';

export class Edge {
  from: IVertex;
  to: IVertex;
  weight: number;

  constructor(from: IVertex, to: IVertex, weight: number) {
    this.from = from;
    this.to = to;
    this.weight = weight;
  }
}
