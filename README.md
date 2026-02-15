# Graph Edge SMS

Path-based semantic similarity and relatedness measures using graphology graphs.

## Installation

```bash
npm install
```

## Semantic Measures

This package implements well-known edge-based semantic similarity and relatedness measures from the literature.

### Shortest Path (Rada Distance)

Rada et al. define the conceptual distance between two concepts based on the shortest path between them in a taxonomy:

$$\mathrm{m}(c_1,c_2) = \mathrm{length}(\mathrm{sp}(c_1,c_2))$$

**Source:** Definition 1, p. 20 in Rada et al. (1989). Also Equation (1), p. 2 in Harispe et al. (2014), Equation (3.12), p. 88 in Harispe et al. (2015).

### Rada Similarity

Often Rada's distance is converted to a similarity measure using the formula:

$$\mathrm{m}(c_1,c_2) = \frac{1}{1 + \mathrm{length}(\mathrm{sp}(c_1,c_2))}$$

**Source:** Equation (1), p. 334 in Rezgui et al. (2013). Also Equation (1), p. 6 in Chandrasekaran & Mago (2022), Equation (3.13), p. 88 in Harispe et al. (2015).

### Resnik (Edge)

While Resnik's original paper focuses on information-based measures, it also includes an edge-based measure defined as:

$$\mathrm{m}(c_1,c_2) = 2 \times \mathrm{D}-\mathrm{length}(sp(c1,c2))$$

where:
- $\mathrm{D}$ is the depth of the taxonomy
- $\mathrm{sp}(c1,c2)$ is the shortest path between concepts $c1$ and $c2$

**Source:** Equation (5), p. 101 in Resnik (1999). Also Equation (3.14), p. 89 in Harispe et al. (2015).

### WuPalmer

Wu and Palmer define a similarity measure based on the depth of the least common subsumer (LCS) of two concepts and the lengths of the shortest paths from each concept to the LCS:

$$\mathrm{m}(c_1,c_2) = \frac{2 \times \mathrm{depth}(LCS(c_1,c_2))}{2 \times \mathrm{depth}(LCS(c_1,c_2)) + \mathrm{length}(\mathrm{sp}(c_1,LCS(c_1,c_2))) + \mathrm{length}(\mathrm{sp}(c_2,LCS(c_1,c_2)))}$$

**Source:** Unnumbered equation in p. 136 in Wu & Palmer (1994). Also Equation (3), p. 3 in Harispe et al. (2014), Equation (3.16), p. 89 in Harispe et al. (2015).

### LeacockChodorow

Defined as the negative log of the shortest path distance normalized by the taxonomy depth:

$$\mathrm{m}(c_1,c_2) = \log (2 \times D) - \log(N)$$

where:
- $D$ is the depth of the taxonomy
- $N$ is the cardinality of the union of sets of nodes involved in the shortest paths $sp(c_1, LCA(c_1,c_2))$ and $sp(c_2, LCA(c_1,c_2))$

**Source:** Unnumbered equation in p. 275 in Leacock & Chodorow (1998). Also Equation (3.15), p. 89 in Harispe et al. (2015).

## References

- [1] P. Resnik, "Semantic similarity in a taxonomy: An information-based measure and its application to problems of ambiguity in natural language", Journal of artificial intelligence research, vol. 11, pp. 95–130, 1999.
- [2] S. Harispe, D. Sánchez, S. Ranwez, S. Janaqi, and J. Montmain, "A framework for unifying ontology-based semantic similarity measures: A study in the biomedical domain", Journal of biomedical informatics, vol. 48, pp. 38–53, 2014.
- [3] R. Rada, H. Mili, E. Bicknell, and M. Blettner, "Development and application of a metric on semantic Nets", IEEE transactions on systems, man, and cybernetics, vol. 19, no. 1, pp. 17–30, 1989.
- [4] K. Rezgui, H. Mhiri, and K. Ghédira, "Theoretical formulas of semantic measure: a survey", Journal of Emerging Technologies in Web Intelligence, vol. 5, no. 4, pp. 333–342, 2013.
- [5] D. Chandrasekaran and V. Mago, "Evolution of Semantic Similarity -- A Survey", ACM Comput. Surv., vol. 54, no. 2, pp. 1–37, Mar. 2022, doi: 10.1145/3440755.
- [6] S. Harispe, S. Ranwez, S. Janaqi, and J. Montmain, "Semantic similarity from natural language and ontology analysis", Synthesis Lectures on Human Language Technologies, vol. 8, no. 1, pp. 1–254, 2015.
- [7] Z. Wu and M. Palmer, "Verb Semantics and Lexical Selection", in 32nd Annual Meeting of the Association for Computational Linguistics, 1994, pp. 133–138.
- [8] C. Leacock and M. Chodorow, "Combining Local Context and WordNet Similarity for Word Sense", WordNet: An electronic lexical database, p. 265, 1998.
