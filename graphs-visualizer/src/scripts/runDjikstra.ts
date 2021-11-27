import { PriorityQueue } from "./datastructures";
import { Graph, Node, retrivePath } from "./graph_types";
import {runBFS} from "./runBFS";
import {EXPANSION_SLEEP_TIME, INF} from "./constants";
import {printPath, printNode} from "./visualizer";
import { sleep } from "./utils";

export async function runDjikstra(graph:Graph, sourceId:number, targetId:number){
    graph.clean();
    graph.running = true;
    //graph.setRandomCosts(100);
    /*if(!graph.weighted){
        runBFS(graph, sourceId, targetId);
        return;
    }
    */
    printNode(graph.id_node[sourceId], "source");
    printNode(graph.id_node[targetId], "target");

    const q = new PriorityQueue();
    q.push(0,sourceId);
    graph.id_node[sourceId].distance = 0;
    
    let par:number[] = [];
    for(let node of graph.id_node){
        par[node.id] = node.id;
    }


    while(!q.empty()){
        let curr:number,cost:number;
        [cost,curr] = q.front();
        if(curr === targetId){
            break;
        }
        await sleep(EXPANSION_SLEEP_TIME/10);
        printNode(graph.id_node[curr], "normal");
        cost = Math.abs(cost);
        q.pop();

        if(graph.id_node[curr].distance != cost || graph.id_node[curr].wall)continue;
        for(let edge of graph.id_node[curr].adjList){  
            if(graph.id_node[edge.to].wall === true)continue;
            if(cost +  edge.weight < graph.id_node[edge.to].distance ){
                graph.id_node[edge.to].distance = cost + edge.weight;
                par[edge.to] = curr;
                q.push(-graph.id_node[edge.to].distance, edge.to);
            }
        }
    }

    if(graph.id_node[targetId].distance === INF)return;
    const path:number[] = retrivePath(par, sourceId, targetId);
    await printPath(graph, path);
    graph.running = false;
}