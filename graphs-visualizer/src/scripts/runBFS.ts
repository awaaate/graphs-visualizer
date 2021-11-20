import { Queue } from "./datastructures";
import { Graph, Node, retrivePath } from "./graph_types";



function runBFS(graph:Graph, sourceId:number, targetId:number):void{
    graph.clean();

    const q = new Queue();
    q.push(sourceId);
    graph.id_node[sourceId].distance = 0;
    graph.id_node[sourceId].visited = true;
    let found:boolean = false;

    let par:number[];
    for(let node of graph.id_node){
        par[node.id] = node.id;
    }

    while(!q.empty()){
        let curr = q.front();
        q.pop();
        if(found){
            break;
        }
        for(let edge of graph.id_node[curr].adjList){
            if(graph.id_node[edge.to].visited === true)continue;
            else{
                if(edge.to === targetId){
                    found = true;
                    break;
                }
                graph.id_node[edge.to].distance = graph.id_node[curr].distance + 1;
                graph.id_node[edge.to].visited = true;
                par[edge.to] = curr;
                q.push(edge.to);
            }
        }
    }
    
    const path = retrivePath(par, sourceId, targetId);
}