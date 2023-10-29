import { Queue } from "./datastructures";
import { Graph, Node, retrivePath } from "./graph_types";
import { sleep } from "./utils";
import { printNode, printPath } from "./visualizer";
import {INF, GRID_X, GRID_Y, EXPANSION_SLEEP_TIME } from "./constants";

export async function runBFS(graph: Graph, sourceId: number, targetId: number) {
    graph.clean();
    graph.running = true;
    const q = new Queue();
    const q2 = new Queue();
    q.push(sourceId);
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

        if(graph.id_node[curr].wall === true){
            continue;
        }

        if (currentDist != dist) {
            if (found) {
                break;
            }
            await sleep(EXPANSION_SLEEP_TIME);
            currentDist = dist;
        }

        if (curr != sourceId) printNode(graph.id_node[curr], "normal");
        //await sleep(100);
        for (let edge of graph.id_node[curr].adjList) {
            if (
                graph.id_node[edge.to].visited === true ||
                graph.id_node[edge.to].wall === true
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
    if(graph.id_node[targetId].distance === INF)return;
    const path = retrivePath(par, sourceId, targetId);
    await printPath(graph, path);
    graph.running = false;
}
