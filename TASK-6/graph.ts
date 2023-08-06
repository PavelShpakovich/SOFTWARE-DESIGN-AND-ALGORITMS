import { IVertex, IWeightedGraph } from './types';

export class WeightedGraph implements IWeightedGraph<IVertex> {
  adjacencylist: Record<string, Record<string, number>>;

  constructor() {
    this.adjacencylist = {};
  }

  addVertex(key: string): void {
    this.adjacencylist[key] = {};
  }
  addEdge(from: IVertex, to: IVertex, weight: number): void {
    this.adjacencylist[from.value][to.value] = weight;
    this.adjacencylist[to.value][from.value] = weight;
  }
}
