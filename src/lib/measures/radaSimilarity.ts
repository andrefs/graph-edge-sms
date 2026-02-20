import type { Graph, ExtraOptions } from '../types';
import { getShortestPathLength } from '../helpers';

export function radaSimilarity(
  graph: Graph,
  concept1: string,
  concept2: string,
  options: ExtraOptions = {}
): number {
  const pathLength = getShortestPathLength(graph, concept1, concept2, options.predicates);
  if (pathLength === null) {
    return 0;
  }
  return 1 / (1 + pathLength);
}
