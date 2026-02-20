import GraphConstructor from 'graphology';

export type Graph = InstanceType<typeof GraphConstructor>;

/**
 * Extra options for semantic measures
 */
export interface ExtraOptions {
  /** Predicate(s) to use for filtering edges */
  predicates?: string | string[];
  /** Maximum depth of the taxonomy (D) */
  maxDepth?: number;
}

// ============== Helper Functions ==============

/**
 * BFS-based shortest path with edge filtering
 */
export function bfsShortestPath(
  graph: Graph,
  source: string,
  target: string,
  predicates?: string | string[]
): string[] | null {
  if (!graph.hasNode(source) || !graph.hasNode(target)) {
    return null;
  }

  const predArray = predicates
    ? Array.isArray(predicates) ? predicates : [predicates]
    : null;

  const filter = predArray ? (edge: unknown) => {
    const edgePred = (edge as { predicate?: string }).predicate;
    if (!edgePred) return false;
    return predArray.includes(edgePred);
  } : undefined;

  // BFS
  const visited = new Set<string>();
  const queue: string[] = [source];
  const parent = new Map<string, string>();
  visited.add(source);

  while (queue.length > 0) {
    const current = queue.shift()!;
    
    if (current === target) {
      // Reconstruct path
      const path: string[] = [];
      let node: string | undefined = target;
      while (node) {
        path.unshift(node);
        node = parent.get(node);
      }
      return path;
    }

    // Check both inbound and outbound neighbors (taxonomy is directed but we want shortest path either way)
    const neighbors = [
      ...graph.outboundNeighbors(current),
      ...graph.inboundNeighbors(current)
    ];

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        // Check edge passes filter
        const edge = graph.edge(current, neighbor) || graph.edge(neighbor, current);
        if (!edge || (filter && !filter(edge))) continue;
        
        visited.add(neighbor);
        parent.set(neighbor, current);
        queue.push(neighbor);
      }
    }
  }

  return null;
}

export function getShortestPathLength(
  graph: Graph,
  source: string,
  target: string,
  predicates?: string | string[]
): number | null {
  const path = bfsShortestPath(graph, source, target, predicates);
  return path ? path.length - 1 : null;
}

export function getDepth(graph: Graph, node: string, predicates?: string | string[]): number {
  if (!graph.hasNode(node)) {
    return 0;
  }

  const predArray = predicates
    ? Array.isArray(predicates) ? predicates : [predicates]
    : null;

  const filter = predArray ? (edge: unknown) => {
    const edgePred = (edge as { predicate?: string }).predicate;
    if (!edgePred) return false;
    return predArray.includes(edgePred);
  } : undefined;

  let maxDepth = 0;
  const visited = new Set<string>();
  const queue: [string, number][] = [[node, 0]];
  visited.add(node);

  while (queue.length > 0) {
    const [current, depth] = queue.shift()!;
    maxDepth = Math.max(maxDepth, depth);

    graph.forEachOutNeighbor(current, (neighbor) => {
      if (!visited.has(neighbor)) {
        const edge = graph.edge(current, neighbor);
        if (!edge || (filter && !filter(edge))) return;
        visited.add(neighbor);
        queue.push([neighbor, depth + 1]);
      }
    });
  }

  return maxDepth;
}

export function findLCAs(
  graph: Graph,
  node1: string,
  node2: string,
  predicates?: string | string[]
): string[] {
  if (!graph.hasNode(node1) || !graph.hasNode(node2)) {
    return [];
  }

  const predArray = predicates
    ? Array.isArray(predicates) ? predicates : [predicates]
    : null;

  const filter = predArray ? (edge: unknown) => {
    const edgePred = (edge as { predicate?: string }).predicate;
    if (!edgePred) return false;
    return predArray.includes(edgePred);
  } : undefined;

  // Get ancestors of node1
  const ancestors1 = new Set<string>();
  const queue1: string[] = [node1];
  while (queue1.length > 0) {
    const current = queue1.shift()!;
    ancestors1.add(current);
    graph.forEachOutNeighbor(current, (neighbor) => {
      if (!ancestors1.has(neighbor)) {
        const edge = graph.edge(current, neighbor);
        if (!edge || (filter && !filter(edge))) return;
        queue1.push(neighbor);
      }
    });
  }

  // Find ancestors of node2 that are also ancestors of node1
  const lcas = new Set<string>();
  const queue2: string[] = [node2];
  const visited2 = new Set<string>();
  visited2.add(node2);

  while (queue2.length > 0) {
    const current = queue2.shift()!;
    if (ancestors1.has(current)) {
      lcas.add(current);
    }
    graph.forEachOutNeighbor(current, (neighbor) => {
      if (!visited2.has(neighbor)) {
        const edge = graph.edge(current, neighbor);
        if (!edge || (filter && !filter(edge))) return;
        visited2.add(neighbor);
        queue2.push(neighbor);
      }
    });
  }

  return Array.from(lcas);
}

export function getPathLengthToAncestor(
  graph: Graph,
  node: string,
  ancestor: string,
  predicates?: string | string[]
): number | null {
  const predArray = predicates
    ? Array.isArray(predicates) ? predicates : [predicates]
    : null;

  const filter = predArray ? (edge: unknown) => {
    const edgePred = (edge as { predicate?: string }).predicate;
    if (!edgePred) return false;
    return predArray.includes(edgePred);
  } : undefined;

  const visited = new Set<string>();
  const queue: [string, number][] = [[node, 0]];
  visited.add(node);

  while (queue.length > 0) {
    const [current, dist] = queue.shift()!;
    if (current === ancestor) {
      return dist;
    }

    graph.forEachOutNeighbor(current, (neighbor) => {
      if (!visited.has(neighbor)) {
        const edge = graph.edge(current, neighbor);
        if (!edge || (filter && !filter(edge))) return;
        visited.add(neighbor);
        queue.push([neighbor, dist + 1]);
      }
    });
  }

  return null;
}
