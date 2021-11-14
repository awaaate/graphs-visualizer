import { Edge, Graph, Node } from "./graph_types";

export function createGraph(): Graph {
    const graph = new Graph();
    return graph;
}

export function addNode(graph: Graph, _in: Edge[], _out: Edge[]) {
    const id = graph.nodeList.length + 1;
    const node = new Node(id, _out, { x: 0, y: 0 });

    graph.nodeList = graph.nodeList.map((node) => {
        for (let nodeIn of _in) {
            if (nodeIn.to === node.id) {
                node.adjList.push(nodeIn);
            }
        }
        return node;
    });
    graph.nodeList.push(node);
}
