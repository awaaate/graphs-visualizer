import { NODE_SIZE } from "./constants";
import { Graph } from "./graph_types";
import { GRID_X, GRID_Y } from "./constants";
export function createElement(
    tag: keyof HTMLElementTagNameMap,
    { className, id = null }
) {
    const element = document.createElement(tag);
    element.classList.add(...className.split(" "));
    if (id) {
        element.id = id;
    }
    return element;
}
export function getCoords(id: number): number[] {
    return [Math.floor(id / GRID_Y), id % GRID_Y];
}

export function getId(x: number, y: number): number {
    return y + x * GRID_Y;
}
export function inGrid(x: number, y: number): boolean {
    if (x >= 0 && x < GRID_Y && y >= 0 && y < GRID_Y) return true;
    return false;
}
export function createNode(id: number) {
    const element = createElement("div", {
        className: "border-2 border-black pointer bg-white",
        id: id,
    });
    element.style.width = NODE_SIZE + "px";
    element.style.height = NODE_SIZE + "px";
    return element;
}

export function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("resolved");
        }, ms);
    });
}

export function getGridItemByPosition(x, y) {
    /*     const { x: graphX, y: graphY } = graph.element.getBoundingClientRect();
    const [x, y] = getCoords(id); */
    const element = document.elementFromPoint(x, y);
    return element;
}



export function random(min:number, max:number):number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function valid(x:number, y:number):boolean{
    if(0<=x && x < GRID_X && 0 <= y &&  y<GRID_Y){
        return true;
    }else{
        return false;
    }
}

//might be buggy
export function randomGraphGenerator(size:number, numberOfEdges:number, directed = true, weighted = false, maxNodeDegree = 5):Graph{
    const graph = new Graph("graph", directed, weighted);

    for(let id=0; id<size;++id){
        graph.addNode(id);
        graph.id_node[id].element = createNode(id);
        graph.id_node[id].element.setAttribute(
            "ondragstart",
            "return false;"
        );
        graph.id_node[id].element.draggable = false;
        graph.element.appendChild(graph.id_node[id].element);

    }
    
    let iterations = 10000;
    for(let i =0; i<numberOfEdges && iterations > 0;++i){
        iterations--;
        const sId = random(0,size-1);
        let tId = sId;
        while(tId === sId){
            tId = random(0,size-1);
        }
        if(graph.id_node[tId].inDegree >= maxNodeDegree || graph.id_node[sId].outDegree >= maxNodeDegree){
            i--;
            continue;
        }else{
            let w = 1;
            if(weighted){
                w = random(1,50);
            }
            graph.addEdge(sId, tId,w);
        }   
    }
    return graph;
}