import { Graph, Node } from "./types";

type BfsNodes = Record<number, number[]>;

export function prepareForBfs(graph: Graph) {
    const nodes = graph.nodeList;
    const nodesForBfs: BfsNodes = {};
    for (let node of nodes) {
        nodesForBfs[node.id] = node.adjList.map((edge) => edge.to);
    }
    bfs(nodesForBfs);
}

export function bfs(nodes: BfsNodes) {
    const ids = Object.keys(nodes);
    const dist: number[] = Array.from({ length: ids.length });
}
