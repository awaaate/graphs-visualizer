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
    public id: number;
    public adjList: Edge[];

    public coords: Coords;

    public visited: boolean;
    public distance: number;
    constructor(id:number) {
        this.element = document.createElement("span");
        this.element.id = id.toString();
        this.element.textContent = id.toString();

        this.adjList = [];
        this.id = id;

        this.visited = false;
        this.distance = INF;
    }
}
//EVERYTHING WORKS WITH 0 INDEXATION;
export class Graph{
    size:number;
    clean:boolean;

    id_node:Node[]; //means gives and id, returns node;
    constructor(n:number){
        this.size = 0;
        this.clean = false;
        this.size = n;
        this.create(n);
    }
    create(n:number){
        this.size = n;
        for(let i=0; i<n;++i){
            this.id_node.push(new Node(i));
        }
    }
    reset(){
        for(let i = 0; i<this.size; ++i){
            this.id_node[i].visited = false;
            this.id_node[i].distance = INF;
        }
        this.clean = true;
    }
    addNode(a:number,b:number,w=1, undirected:boolean = true){
        this.id_node[a].adjList.push({weight: w, to:b});
        if(undirected){
            this.id_node[b].adjList.push({weight:w, to:a});
        }
        this.size++;
    }
    runBFS(sourceId:number, targetId:number):void{
        if(!this.clean){
            this.reset();
        }
        this.clean = false;
        const q = new Queue();
        const q2 = new Queue();

        q2.push(1);
        q.push(sourceId);
        this.id_node[sourceId].distance = 1;

        let currentStage:number = 1;
        let found:boolean = false;

        while(!q.empty()){
            let curr = q.front();
            if(currentStage != q2.front()){
                currentStage = q2.front();
                if(found){
                    break;
                }
            }
            this.id_node[curr].visited = true;
            q.pop();
            for(let to of this.id_node[curr].adjList){
                if(!this.id_node[curr].visited){
                    this.id_node[to.to].distance = this.id_node[curr].distance;
                    if(to.to == targetId){
                        found = true;
                    }
                    q.push(to.to);
                    q2.push(q2.front() + 1);
                }
            }
            q2.pop();
        }

        console.log(this.id_node[targetId].distance);
    }
}



