import { describe, it, expect } from 'vitest';
import Graph from 'graphology';
import { radaSimilarity } from './measures';

describe('radaSimilarity', () => {
  const createTaxonomy = () => {
    const g = new Graph();
    g.addNode('animal');
    g.addNode('mammal', { parent: 'animal' });
    g.addNode('bird', { parent: 'animal' });
    g.addNode('dog', { parent: 'mammal' });
    g.addNode('cat', { parent: 'mammal' });
    g.addNode('penguin', { parent: 'bird' });
    g.addEdge('animal', 'mammal', { predicate: 'is-a' });
    g.addEdge('animal', 'bird', { predicate: 'is-a' });
    g.addEdge('mammal', 'dog', { predicate: 'is-a' });
    g.addEdge('mammal', 'cat', { predicate: 'is-a' });
    g.addEdge('bird', 'penguin', { predicate: 'is-a' });
    return g;
  };

  it('returns 1 for same node', () => {
    const g = createTaxonomy();
    const result = radaSimilarity(g, 'dog', 'dog');
    expect(result).toBe(1);
  });

  it('returns 0.5 for direct parent-child', () => {
    const g = createTaxonomy();
    const result = radaSimilarity(g, 'mammal', 'dog');
    expect(result).toBe(0.5);
  });

  it('returns 1/3 for grandparent-grandchild', () => {
    const g = createTaxonomy();
    const result = radaSimilarity(g, 'animal', 'dog');
    expect(result).toBeCloseTo(1 / 3, 5);
  });

  it('returns 1/3 for siblings', () => {
    const g = createTaxonomy();
    const result = radaSimilarity(g, 'dog', 'cat');
    expect(result).toBeCloseTo(1 / 3, 5);
  });

  it('returns 1/5 for cousins (different branches)', () => {
    const g = createTaxonomy();
    const result = radaSimilarity(g, 'dog', 'penguin');
    expect(result).toBe(0.2);
  });

  it('returns 0 when no path exists', () => {
    const g = createTaxonomy();
    g.addNode('plant');
    const result = radaSimilarity(g, 'dog', 'plant');
    expect(result).toBe(0);
  });

  it('handles disconnected nodes gracefully', () => {
    const g = createTaxonomy();
    const result = radaSimilarity(g, 'nonexistent1', 'nonexistent2');
    expect(result).toBe(0);
  });

  it('handles single node graph', () => {
    const g = new Graph();
    g.addNode('only');
    const result = radaSimilarity(g, 'only', 'only');
    expect(result).toBe(1);
  });
});
