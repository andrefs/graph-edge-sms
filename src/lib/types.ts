import GraphConstructor from 'graphology';


export type Graph = InstanceType<typeof GraphConstructor>;

export interface ExtraOptions {
  predicates?: string | string[];
  maxDepth?: number;
  [key: string]: any; // Allow additional options
}

export type MeasureFunction = (
  graph: Graph,
  concept1: string,
  concept2: string,
  options?: ExtraOptions
) => number;
