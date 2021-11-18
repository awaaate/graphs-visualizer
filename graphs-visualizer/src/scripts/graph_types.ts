import {PriorityQueue, Queue} from "./datastructures"
export const INF:number = 8007199254740991//normal intmax 

export function retrivePath(par:number[], targetId:number, sourceId:number){
    const path:number[] = [];
    let curr = targetId;
    path.push(curr);
    while(curr != sourceId){
        curr = par[curr];
        path.push(curr);
    }
    path.reverse();
    return path;
}


class Edge{
    public weight:number;
    public to:number;
    constructor(to:number, weight:number){
        this.to = to;
        this.weight = weight;
    }
}

interface Coords {
    x: number;
    y: number;
}

export class Node {
    //element?: HTMLElement;
    /*
    *NODE CLASS
    [Class of node, holds every node information]
    @id: needs id to get initiated, unique identification mark for each node;
    @adjList: All adjacent nodes to it, full of Edges;
    */
    public id: number;
    public adjList: Edge[];

    public coords: Coords;

    public visited: boolean;
    public distance: number;
    constructor(id:number) {
        //this.element = document.createElement("span");
        //this.element.id = id.toString();
        //this.element.textContent = id.toString();

        this.adjList = [];
        this.id = id;

        this.visited = false;
        this.distance = INF;
    }
}
//EVERYTHING WORKS WITH 0 INDEXATION;
export class Graph{
    /*
    GRAPH CLASS
    [Class of the graph, holds the graph information and the methods, algorithms]
    @gets initiated with the size fo the graph, and the array of nodes full of Node;

    */
    size:number;
    clean:boolean;
    id_node:Node[]; //means gives and id, returns node;
    constructor(n:number){
        this.clean = false;
        this.id_node = [];
        this.size = n;

        this.create(n);
        this.cleanGraph();
    }
    create(n:number){
        //created the graph of size n;
        //pushes all nodes to the node list;
        this.size = n;
        for(let i=0; i<n;++i){
            this.id_node.push(new Node(i));
        }
    }
    cleanGraph():void{
        //Resets the every node of the graph to 0 distance and not visited;
        //sets clean to true;
        if(this.clean)return;
        for(let i = 0; i<this.size; ++i){
            this.id_node[i].visited = false;
            this.id_node[i].distance = INF;
        }
        this.clean = true;
    }
    addEdge(a:number,b:number, undirected:boolean = true, w=1 ){
        //Adds a node to the graph;
        this.id_node[a].adjList.push(new Edge(b,w));
        if(undirected){
            this.id_node[b].adjList.push(new Edge(a,w));
        }
    }
    runBFS(sourceId:number, targetId:number):void{
        //runs BFS
        this.cleanGraph();

        this.clean = false;
        const q = new Queue();
        const q2 = new Queue();

        let par = [];
        for(let i=0; i<this.size; ++i){
            par[i] = i;
        }

        q2.push(0);
        q.push(sourceId);
        this.id_node[sourceId].distance = 0;

        let currentStage:number = 1;
        let found:boolean = false;

        while(!q.empty()){
            let curr = q.front();
            console.log(curr);
            if(currentStage != q2.front()){
                currentStage = q2.front();
                if(found){
                    console.log("FOUND");
                    break;
                }
            }
            this.id_node[curr].visited = true;
            q.pop();
            for(let to of this.id_node[curr].adjList){
                if(this.id_node[to.to].visited === false){
                    this.id_node[to.to].distance = this.id_node[curr].distance + 1;
                    par[to.to] = curr;
                    if(to.to == targetId){
                        found = true;
                    }
                    q.push(to.to);
                    q2.push(currentStage + 1);
                }      
            }
            q2.pop();
        }

        console.log(this.id_node[targetId].distance);
    }
    runDjikstra(sourceId:number, targetId:number): void{
        this.cleanGraph();
        this.clean = false;
        const q = new PriorityQueue();
        let par = [];
        for(let i=0; i<this.size; ++i){
            par[i] = i;
        }
        q.push(0,sourceId);
        this.id_node[sourceId].distance = 0;
        
        while(!q.empty()){
            let curr:number, w:number;
            console.log("START");
            [w,curr] = q.front();
            w = -w;
            if(curr === targetId){
                break;
            }
            q.pop();
            if(this.id_node[curr].distance != w)continue;
            for(let edge of this.id_node[curr].adjList){
                if(w + edge.weight < this.id_node[edge.to].distance){
                    this.id_node[edge.to].distance = w + edge.weight;
                    par[edge.to] = curr;
                    console.log(-this.id_node[edge.to].distance);
                    console.log(q);
                    q.push(-this.id_node[edge.to].distance,edge.to);
                }
            }

        }
        console.log(this.id_node[targetId].distance);
    }

    runDFS(sourceId:number):void{
        this.cleanGraph();
        this.clean = false;

        let stack:number[] = [];

        stack.push(sourceId);
        this.id_node[sourceId].visited = true;

        while(stack.length != 0){
            let curr = stack.pop();
            for(let edge of this.id_node[curr].adjList){
                if(!this.id_node[edge.to].visited){
                    stack.push(edge.to);
                    this.id_node[edge.to].visited = true;
                }
            }
        }
    }
}