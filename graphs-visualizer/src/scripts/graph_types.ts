import {PriorityQueue, Queue} from "./datastructures"
export const INF:number = 8007199254740991//normal intmax 
export interface Edge {
    weight: number;
    to: number;
}

interface Coords {
    x: number;
    y: number;
}

export class Node {
    element?: HTMLElement;
    constructor(
        public id: number,
        public adjList: Edge[],
        public coords: Coords
    ) {
        this.element = document.createElement("span");
        this.element.id = id.toString();
        this.element.textContent = id.toString();
    }
}

export class Graph{
    size:number;
    clean:boolean;
    visited:boolean[];
    distance:number[];

    id_node:Node[]; //means gives and id, returns node;
    constructor(){
        this.size = 0;
        this.clean = false;
    }
    create(n){
        this.size = n;
    }
    reset(){
        this.visited = Array.from({length: this.size});
        this.distance = Array.from({length: this.size});
        this.distance.map((item,index)=> {return INF});
        this.clean = true;
    }

    runBFS(sourceId:number, targetId:number):void{
        if(!this.clean){
            this.reset();
        }
        const par:number[] = Array.from({length: this.size});
        const q = new Queue();
        q.push(sourceId);
        this.distance[sourceId] = 1;
        while(!q.empty()){
            let curr = q.front();
            q.pop();
            for(const edge of this.id_node[curr].adjList){
                if(this.distance[edge.to] != INF){
                    this.distance[edge.to] = this.distance[curr] + 1;
                    par[edge.to] = curr;
                    q.push(edge.to);
                    if(edge.to == targetId){
                        q.delete();
                        break;
                    }
                }
            }
        }
    }
}
