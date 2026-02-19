import type { Graph, ExtraOptions } from './helpers';
import { getShortestPathLength, getDepth, findLCAs, getPathLengthToAncestor } from './helpers';

/**
 * Shortest path (Rada Distance)
 * m(c1,c2) = length(sp(c1,c2))
 * 
 * Source: Definition 1, p. 20 in Rada et al. (1989)
 */
export function shortestPath(
  graph: Graph,
  concept1: string,
  concept2: string,
  options: ExtraOptions = {}
): number {
  const pathLength = getShortestPathLength(graph, concept1, concept2, options.predicates);
  return pathLength ?? 0;
}

/**
 * Rada Similarity
 * m(c1,c2) = 1 / (1 + length(sp(c1,c2)))
 * 
 * Source: Equation (1), p. 334 in Rezgui et al. (2013)
 */
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

/**
 * Resnik (Edge)
 * m(c1,c2) = 2 * D - length(sp(c1,c2))
 * 
 * Source: Equation (5), p. 101 in Resnik (1999)
 */
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

/**
 * Wu-Palmer
 * m(c1,c2) = (2 * depth(LCS)) / (2 * depth(LCS) + length(sp(c1,LCS)) + length(sp(c2,LCS)))
 * 
 * Source: Wu & Palmer (1994)
 */
export function wuPalmer(
  graph: Graph,
  concept1: string,
  concept2: string,
  options: ExtraOptions = {}
): number {
  const lcas = findLCAs(graph, concept1, concept2, options.predicates);
  
  if (lcas.length === 0) {
    return 0;
  }

  let bestScore = 0;

  for (const lca of lcas) {
    const depthLCA = getDepth(graph, lca, options.predicates);
    const path1 = getPathLengthToAncestor(graph, concept1, lca, options.predicates);
    const path2 = getPathLengthToAncestor(graph, concept2, lca, options.predicates);

    if (depthLCA > 0 && path1 !== null && path2 !== null) {
      const score = (2 * depthLCA) / (2 * depthLCA + path1 + path2);
      bestScore = Math.max(bestScore, score);
    }
  }

  return bestScore;
}

/**
 * Leacock-Chodorow
 * m(c1,c2) = log(2 * D) - log(N)
 * 
 * Source: Leacock & Chodorow (1998)
 */
export function leacockChodorow(
  graph: Graph,
  concept1: string,
  concept2: string,
  options: ExtraOptions = {}
): number {
  const { maxDepth } = options;
  
  if (maxDepth === undefined || maxDepth <= 0) {
    return 0;
  }

  const lcas = findLCAs(graph, concept1, concept2, options.predicates);
  
  if (lcas.length === 0) {
    return 0;
  }

  let shortestPath = Infinity;

  for (const lca of lcas) {
    const path1 = getPathLengthToAncestor(graph, concept1, lca, options.predicates);
    const path2 = getPathLengthToAncestor(graph, concept2, lca, options.predicates);

    if (path1 !== null && path2 !== null) {
      shortestPath = Math.min(shortestPath, path1 + path2);
    }
  }

  if (shortestPath === Infinity || shortestPath === 0) {
    return 0;
  }

  const n = shortestPath + 1;
  
  return Math.log(2 * maxDepth) - Math.log(n);
}
