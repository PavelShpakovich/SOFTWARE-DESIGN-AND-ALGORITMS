import { Dijkstra } from './dijkstra';
import { graph, vertex3, vertex4 } from './init';

const dijkstra = new Dijkstra(graph);

console.log(dijkstra.findAllShortestPaths(vertex4));
console.log(dijkstra.findShortestPath(vertex4, vertex3));
