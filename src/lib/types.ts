import GraphConstructor from 'graphology';

export type Direction = 'UP' | 'DOWN';

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
