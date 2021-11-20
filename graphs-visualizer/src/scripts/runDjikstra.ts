import { PriorityQueue } from "./datastructures";
import { Graph, Node, retrivePath } from "./graph_types";


function runDjikstra(graph:Graph, sourceId:number, targetId:number):void{
    graph.clean();

    graph.id_node[sourceId].distance = 0;
    const q = new PriorityQueue();
    q.push(0,sourceId);
    
    let par:number[];
    for(let node of graph.id_node){
        par[node.id] = node.id;
    }


    while(!q.empty()){
        let curr:number,cost:number;
        if(curr === targetId){
            break;
        }
        [cost,curr] = q.front();
        cost = Math.abs(cost);
        q.pop();
        if(graph.id_node[curr].distance != cost || graph.id_node[curr].wall)continue;
        for(let edge of graph.id_node[curr].adjList){  
            if(cost +  edge.weight < graph.id_node[edge.to].distance ){
                graph.id_node[edge.to].distance = cost + edge.weight;
                par[edge.to] = curr;
                q.push(-graph.id_node[edge.to].distance, edge.to);
            }
        }
    }
    const path:number[] = retrivePath(par, sourceId, targetId);

}