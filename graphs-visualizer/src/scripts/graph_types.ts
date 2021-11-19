import { PriorityQueue, Queue, Stack } from "./datastructures";
export const INF: number = 8007199254740991; //normal intmax



export function retrivePath(par: number[], targetId: number, sourceId: number) {
    const path: number[] = [];
    let curr = targetId;
    path.push(curr);
    while (curr != sourceId) {
        curr = par[curr];
        path.push(curr);
    }
    path.reverse();
    return path;
}

class Edge {
    public weight: number;
    public to: number;
    constructor(to: number, weight: number = 1) {
        this.to = to;
        this.weight = weight;
    }
}

interface Coords {
    x: number;
    y: number;
}

export class Node {
    /*
    *NODE CLASS
    [Class of node, holds every node information]
    @id: needs id to get initiated, unique identification mark for each node;
    @adjList: All adjacent nodes to it, full of Edges;
    */
    public element?: HTMLElement;
    public id: number;
    public adjList: Edge[];

    public coords: Coords;

    public visited: boolean;
    public distance: number;
    constructor(id: number, parentElement: HTMLElement) {
        //this.element = document.createElement("span");
        //this.element.id = id.toString();
        //this.element.textContent = id.toString();

        this.adjList = [];
        this.id = id;

        this.visited = false;
        this.distance = INF;
        this.coords.x = -1;
        this.coords.y = -1;


        const element = document.createElement("div");
        element.classList.add("node");
        element.id = id.toString();
        
        this.element = element;
        parentElement.appendChild(this.element);
    }

    compareCoords(coord:number[]):boolean{
        if(this.coords.x === coord[0] && this.coords.y === coord[1]){
            return true;
        }else{
            return false;
        }
    }
}
//EVERYTHING WORKS WITH 0 INDEXATION;
export class Graph {
    /*
    GRAPH CLASS
    [Class of the graph, holds the graph information and the methods, algorithms]
    @gets initiated with the size fo the graph, and the array of nodes full of Node;

    */
    size: number;
    clean: boolean;
    type: string;
    element: HTMLElement;
    id_node: Node[]; //means gives and id, returns node;
    coord_id:number[][];
    constructor(n: number, type: string = "grid") {
        this.clean = false;
        this.id_node = [];
        this.size = n;
        this.type = type;
        this.coord_id = [[]];
        const element = document.createElement("div");
        element.classList.add("graph");
        this.element = element;
        this.create(n);
        this.cleanGraph();
    }
    getId(x:number, y:number){
        return this.coord_id[x][y];
    }
    update(id:number, x:number, y:number){
        this.coord_id[x][y] = id;
        this.coord_id[y][x] = id;
    }
    addEdge(a: number, b: number, undirected: boolean = true, w = 1) {
        //Adds a node to the graph;
        this.id_node[a].adjList.push(new Edge(b, w));
        if (undirected) {
            this.id_node[b].adjList.push(new Edge(a, w));
        }
    }

    create(n: number) {
        //created the graph of size n;
        //pushes all nodes to the node list;
        if(this.type == "graph"){
            this.size = n;
            for (let i = 0; i < n; ++i) {
                this.id_node.push(new Node(i, this.element));
            }
        }
    }

    generateAdj(id:number, x:number, y:number):void{
        //GIVEN AN ID AND COORDS OF THE ID VERTEX, ADDS THE CORRESPONDING VERTICES TO THE GRAPH;

        if(this.type === "grid"){
            const array:number[][] = [[1,0],[0,1],[-1,0],[0,-1]];
            for(const coord of array){
                this.id_node.push(new Node(this.size, this.element));
                this.addEdge(id,this.size);
                this.update(this.size, x +coord[0],y + coord[1]);
                this.id_node[this.size].coords.x = x +coord[0];
                this.id_node[this.size++].coords.y = y + coord[1];
            }
        }
    }
    cleanGraph(): void {
        //Resets the every node of the graph to 0 distance and not visited;
        //sets clean to true;
        if (this.clean) return;
        for (let i = 0; i < this.size; ++i) {
            this.id_node[i].visited = false;
            this.id_node[i].distance = INF;
        }
        this.clean = true;
    }



    runBFS({sourceId=undefined, targetId=undefined,sourceCoords = [undefined,undefined], targetCoords =[undefined,undefined]} ): void {
        //runs BFS
        this.cleanGraph();
        this.clean = false;
        const q = new Queue();
        if(this.type === "grid"){
            sourceId = this.getId(sourceCoords[0],sourceCoords[1]);
            targetId = this.getId(targetCoords[0],targetCoords[1]);
        }
        let par = [];
        for (let i = 0; i < this.size; ++i) {
            par[i] = i;
        }

        q.push(sourceId);
        this.id_node[sourceId].distance = 0;

        //let currentStage: number = 1;
        let found: boolean = false;

        while (!q.empty()) {
            let curr = q.front();
            if(found){
                break;
            }
            this.id_node[curr].visited = true;
            q.pop();
            this.generateAdj(curr, this.id_node[curr].coords.x, this.id_node[curr].coords.y);
            for (let to of this.id_node[curr].adjList) {
                if (this.id_node[to.to].visited === false) {
                    this.id_node[to.to].distance =
                        this.id_node[curr].distance + 1;
                    par[to.to] = curr;
                    if (to.to === targetId) {
                        found = true;
                        break;
                    }
                    q.push(to.to);
                }
            }
        }

        console.log(this.id_node[targetId].distance);
    }

    runDjikstra(sourceId: number, targetId: number): void {
        this.cleanGraph();
        this.clean = false;
        const q = new PriorityQueue();
        let par = [];
        for (let i = 0; i < this.size; ++i) {
            par[i] = i;
        }
        q.push(0, sourceId);
        this.id_node[sourceId].distance = 0;

        while (!q.empty()) {
            let curr: number, w: number;
            console.log("START");
            [w, curr] = q.front();
            w = -w;
            if (curr === targetId) {
                break;
            }
            q.pop();
            if (this.id_node[curr].distance != w) continue;
            for (let edge of this.id_node[curr].adjList) {
                if (w + edge.weight < this.id_node[edge.to].distance) {
                    this.id_node[edge.to].distance = w + edge.weight;
                    par[edge.to] = curr;
                    console.log(-this.id_node[edge.to].distance);
                    console.log(q);
                    q.push(-this.id_node[edge.to].distance, edge.to);
                }
            }
        }
        console.log(this.id_node[targetId].distance);
    }

    runDFS(sourceId: number): void {
        this.cleanGraph();
        this.clean = false;

        const stack = new Stack();
        stack.push(sourceId);
        this.id_node[sourceId].visited = true;

        while (!stack.empty()) {
            let curr = stack.top();
            stack.pop();
            for (let edge of this.id_node[curr].adjList) {
                if (!this.id_node[edge.to].visited) {
                    stack.push(edge.to);
                    this.id_node[edge.to].visited = true;
                }
            }
        }
    }
}
