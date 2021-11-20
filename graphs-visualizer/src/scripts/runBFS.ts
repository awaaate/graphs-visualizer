import { Queue } from "./datastructures";
import { Graph, Node, retrivePath } from "./graph_types";
import { sleep } from "./utils";
import { printNode, printPath } from "./visualizer";

export async function runBFS(graph: Graph, sourceId: number, targetId: number) {
    graph.clean();

    const q = new Queue();

    const q2 = new Queue();
    q2.push(0);

    graph.id_node[sourceId].distance = 0;
    graph.id_node[sourceId].visited = true;

    let found: boolean = false;

    let par: number[] = [];

    for (let node of graph.id_node) {
        par[node.id] = node.id;
    }

    printNode(graph.id_node[sourceId], "source");
    printNode(graph.id_node[targetId], "target");

    let currentDist = 0;

    while (!q.empty()) {
        let curr = q.front();
        q.pop();

        let dist = q2.front();
        q2.pop();

        if (currentDist != dist) {
            if (found) {
                break;
            }
            await sleep(100);
            currentDist = dist;
        }

        if (curr != sourceId) printNode(graph.id_node[curr], "normal");
        //await sleep(100);
        for (let edge of graph.id_node[curr].adjList) {
            if (
                graph.id_node[edge.to].visited === true ||
                graph.id_node[edge.to].wall
            )
                continue;
            else {
                par[edge.to] = curr;
                graph.id_node[edge.to].distance =
                    graph.id_node[curr].distance + 1;
                graph.id_node[edge.to].visited = true;
                q.push(edge.to);
                q2.push(graph.id_node[edge.to].distance);
                if (edge.to === targetId) {
                    found = true;
                }
            }
        }
    }
    const path = retrivePath(par, sourceId, targetId);
    printPath(graph, path);
}
