import type { Graph, ExtraOptions } from '../types';
import { getShortestPathLength } from '../helpers';

export function resnikEdge(
  graph: Graph,
  concept1: string,
  concept2: string,
  options: ExtraOptions = {}
): number {
  const { maxDepth } = options;
  const pathLength = getShortestPathLength(graph, concept1, concept2, options.predicates);
  
  if (pathLength === null || maxDepth === undefined) {
    return 0;
  }
  
  return 2 * maxDepth - pathLength;
}
