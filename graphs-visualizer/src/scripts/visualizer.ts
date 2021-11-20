import { classNames } from "./classNames";
import { Graph, Node, retrivePath } from "./graph_types";
import { createElement, createNode } from "./utils";

//20
//columnas
// 7
//row 2
export const gridX: number = 10;
export const gridY: number = 10;
export const nodeSize: number = 75;
/*
window.document
createElement("tag");
div.classList.classList
div.id;
div.style

<div class=""  id="" style="color:red;" ></div>
<p></p>
*/

export function printNode(
    vertex: Node,
    type: "source" | "target" | "path" | "normal"
): void {
    let newClass = "";
    if (type === "source") {
        newClass = "bg-red-500";
    } else if (type === "target") {
        newClass = "bg-red-500";
    } else if (type === "path") {
        newClass = "bg-blue-500";
    } else {
        newClass = "bg-green-500";
    }
    vertex.element.classList.add(newClass);
    return;
}

export function printPath(graph: Graph, path: number[]): void {
    let counter = 0;
    for (let id of path) {
        if (counter === 0 || counter === path.length - 1){
            counter++;
            continue
        }
        counter++;
        printNode(graph.id_node[id], "path");
    }
}

function getCoords(id: number): number[] {
    return [Math.floor(id / gridX), id % gridX];
}

function getId(x: number, y: number): number {
    return y + x * gridX;
}
function inGrid(x: number, y: number): boolean {
    if (x >= 0 && x < gridX && y >= 0 && y < gridY) return true;
    return false;
}

export function createGridGraph(graph: Graph, weighted: boolean = false) {
    graph.element.style.width = gridX * nodeSize + "px";
    graph.element.style.height = gridY * nodeSize + "px";
    graph.element.classList.add(
        ...`bg-black grid grid-cols-${gridX}`.split(" ")
    );
    for (let X = 0; X < gridX; ++X) {
        for (let Y = 0; Y < gridY; ++Y) {
            const id = getId(X, Y);
            graph.addNode(id);
            graph.id_node[id].element = createNode(id);
            graph.id_node[id].element.textContent = id.toString();
            graph.element.appendChild(graph.id_node[id].element);
        }
    }
    const adder: number[][] = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1],
    ];

    for (let X = 0; X < gridX; ++X) {
        for (let Y = 0; Y < gridY; ++Y) {
            const id: number = getId(X, Y);
            for (let add of adder) {
                if (!inGrid(X + add[0], Y + add[1])) continue;
                const newId: number = getId(X + add[0], Y + add[1]);
                if (weighted) {
                    const w = 1; //GENERATE RANDOM NUMBER;
                    graph.addEdge(id, newId, true, w);
                } else {
                    graph.addEdge(id, newId, true);
                }
            }
        }
    }
    return graph;
}
let i = 0;

// gridX, gridY //
export function makeGrid(graph: Graph) {
    if (i === 0) {
        document.body.appendChild(graph.element);
        i = 1;
    }
}
