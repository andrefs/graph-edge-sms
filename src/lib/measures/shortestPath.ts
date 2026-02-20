import type { Graph, ExtraOptions } from '../types';
import { getShortestPathLength } from '../helpers';

export function shortestPath(
  graph: Graph,
  concept1: string,
  concept2: string,
  options: ExtraOptions = {}
): number {
  const pathLength = getShortestPathLength(graph, concept1, concept2, options.predicates);
  return pathLength ?? 0;
}
