import {PriorityQueue, Queue} from "./datastructures"
export const INT_MAX:number = 8007199254740991//normal intmax 
export interface Edge {
    weight: number;
    to: number;
}

interface Coords {
    x: number;
    y: number;
}

class Node {
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
    nodeList:Node[];
    visited:boolean[];
    distance:number[];
    constructor(){
        this.size = 0;
        this.clean = false;
    }
    create(n){
        this.size = n;
    }
    reset(){
        this.visited = Array.from({length:this.size});
        this.distance = Array.from({length: this.size});
        this.clean = true;
    }

    runBFS(sourceId:number, targetId:number):void{
        if(!this.clean){
            this.reset();
        }
        const q = new Queue();
        q.push(sourceId);
        this.distance[sourceId] = INT_MAX;
        while(!q.empty()){
            let curr = q.pop
        }

    }

}
