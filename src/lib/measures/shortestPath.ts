import type { ExtraOptions, MeasureFunction } from '../types';
import { getShortestPathLength } from '../helpers';

export const shortestPath: MeasureFunction = (graph, concept1, concept2, options = {}) => {
  const pathLength = getShortestPathLength(graph, concept1, concept2, options.predicates);
  return pathLength ?? 0;
};
