import { PriorityQueue } from "./datastructures";
import { Graph, Node, retrivePath } from "./graph_types";
import {runBFS} from "./runBFS";
import {INF} from "./constants";
import {printPath} from "./visualizer";

export async function runDjikstra(graph:Graph, sourceId:number, targetId:number){
    graph.running = true;
    if(!graph.weighted){
        runBFS(graph, sourceId, targetId);
        return;
    }
    graph.clean();
    
    const q = new PriorityQueue();
    q.push(0,sourceId);
    graph.id_node[sourceId].distance = 0;
    
    let par:number[];
    for(let node of graph.id_node){
        par[node.id] = node.id;
    }


    while(!q.empty()){
        let curr:number,cost:number;
        [cost,curr] = q.front();

        if(curr === targetId){
            break;
        }
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