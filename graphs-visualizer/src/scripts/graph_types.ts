import { PriorityQueue, Queue, Stack } from "./datastructures";
import {printNode} from "./visualizer";

export const INF: number = 8007199254740991; //normal intmax

export function retrivePath(par: number[], targetId: number, sourceId: number):number[] {
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
    public wall:boolean;
    public visited: boolean;
    public distance: number;
    constructor(id: number, parentElement: HTMLElement) {
        //this.element = document.createElement("span");
        //this.element.id = id.toString();
        //this.element.textContent = id.toString();

        this.adjList = [];
        this.id = id;
        this.wall = false;
        this.visited = false;
        this.distance = INF;


        const element = document.createElement("div");
        element.classList.add("node");
        element.id = id.toString();
        
        this.element = element;
        parentElement.appendChild(this.element);
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
    cleanBool: boolean;
    type: string;
    element: HTMLElement;
    id_node: Node[]; //means gives and id, returns node;

    constructor(n: number = 0, type: string = "grid") {
        this.cleanBool = false;
        this.id_node = [];
        this.size = n;
        this.type = type;

        const element = document.createElement("div");
        element.classList.add("graph");
        this.element = element;
        this.clean();
    }

    addNode(id:number):void{
        this.id_node[id] = new Node(id,this.element);
    }

    addEdge(a: number, b: number, undirected: boolean = true, w = 1) {
        //Adds a node to the graph;
        this.id_node[a].adjList.push(new Edge(b, w));
        if (undirected) {
            this.id_node[b].adjList.push(new Edge(a, w));
        }
    }

    clean(): void {
        //Resets the every node of the graph to 0 distance and not visited;
        //sets clean to true;
        if (this.cleanBool) return;
        for (let i = 0; i < this.size; ++i) {
            this.id_node[i].visited = false;
            this.id_node[i].distance = INF;
        }
        this.cleanBool = true;
    }
   
}