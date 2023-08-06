import { IDijkstra, IVertex, IWeightedGraph, Path } from './types';

export class Dijkstra implements IDijkstra<IVertex> {
  private graph: IWeightedGraph<IVertex>;

  constructor(graph: IWeightedGraph<IVertex>) {
    this.graph = graph;
  }

  private findNearestVertex(distances: Record<string, number>, visited: string[]): string | null {
    let minDistance: number = Infinity;
    let nearestVertex: string | null = null;

    Object.keys(distances).forEach((vertex) => {
      if (!visited.includes(vertex) && distances[vertex] < minDistance) {
        minDistance = distances[vertex];
        nearestVertex = vertex;
      }
    });

    return nearestVertex;
  }

  findShortestPath(vertex1: IVertex, vertex2: IVertex): Path {
    if (vertex1.value === vertex2.value) {
      return {
        path: [vertex1.value],
        distance: 0,
      };
    }

    return this.findAllShortestPaths(vertex1)?.[vertex2.value];
  }

  findAllShortestPaths({ value }: IVertex): Record<string, Path> {
    const visited: string[] = [];
    const distances: Record<string, number> = {};
    const previous: Record<string, string | null> = {};

    const vertices = Object.keys(this.graph.adjacencylist);

    vertices.forEach((vertex) => {
      distances[vertex] = vertex === value ? 0 : Infinity;
      previous[vertex] = null;
    });

    let currentVertex = this.findNearestVertex(distances, visited);

    while (currentVertex) {
      const currentVertexDistance = distances[currentVertex];

      const neighbourVertices = this.graph.adjacencylist[currentVertex];

      Object.keys(neighbourVertices).forEach((neighbourVertex) => {
        const currentNeighbourVertexDistance = distances[neighbourVertex];

        const newNeighbourVertexDistance = currentVertexDistance + neighbourVertices[neighbourVertex];

        if (newNeighbourVertexDistance < currentNeighbourVertexDistance) {
          distances[neighbourVertex] = newNeighbourVertexDistance;
          previous[neighbourVertex] = currentVertex;
        }
      });

      visited.push(currentVertex);

      currentVertex = this.findNearestVertex(distances, visited);
    }

    const getPath = (previous: Record<string, string | null>, step: string | null): Array<string> => {
      if (!step) return [];
      return [...getPath(previous, previous[step]), step];
    };

    return Object.keys(distances).reduce((prev, curr) => {
      const distance = distances[curr];

      if (distance) {
        prev[curr] = {
          path: Number.isFinite(distance) ? getPath(previous, curr) : [],
          distance: distance,
        };
      }

      return prev;
    }, {} as Record<string, Path>);
  }
}
