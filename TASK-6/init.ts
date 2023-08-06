import { Edge } from './edge';
import { WeightedGraph } from './graph';
import { Vertex } from './vertex';

export const vertex1 = new Vertex('1');
export const vertex2 = new Vertex('2');
export const vertex3 = new Vertex('3');
export const vertex4 = new Vertex('4');
export const vertex5 = new Vertex('5');

const vertices = [vertex1, vertex2, vertex3, vertex4, vertex5];
const edges = [
  new Edge(vertex1, vertex4, 3),
  new Edge(vertex1, vertex2, 5),
  new Edge(vertex1, vertex3, 4),
  new Edge(vertex2, vertex4, 6),
  new Edge(vertex2, vertex3, 5),
];

export const graph: WeightedGraph = new WeightedGraph();

vertices.forEach((verticle) => graph.addVertex(verticle.value));
edges.forEach((edge) => graph.addEdge(edge.from, edge.to, edge.weight));
