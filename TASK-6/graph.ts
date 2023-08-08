import { IVertex, IWeightedGraph } from './types';

export class WeightedGraph implements IWeightedGraph<IVertex> {
  adjacencylist: Map<string, Map<string, number>>;

  constructor() {
    this.adjacencylist = new Map<string, Map<string, number>>();
  }

  addVertex(key: string): void {
    this.adjacencylist.set(key, new Map());
  }
  addEdge(from: IVertex, to: IVertex, weight: number): void {
    this.adjacencylist.get(from.value)?.set(to.value, weight);
    this.adjacencylist.get(to.value)?.set(from.value, weight);
  }
}
