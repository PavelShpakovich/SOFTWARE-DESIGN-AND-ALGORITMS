export interface IWeightedGraph<T> {
  adjacencylist: Record<string, Record<string, number>>;
  addVertex(key: string): void;
  addEdge(from: T, to: T, weight: number): void;
}

export interface IVertex {
  value: string;
}

export interface Path {
  path: string[];
  distance: number;
}

export interface IDijkstra<T> {
  findShortestPath(vertex1: T, vertex2: T): Path;
  findAllShortestPaths(vertex: T): Record<string, Path>;
}
