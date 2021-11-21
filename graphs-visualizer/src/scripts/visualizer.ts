import { classNames } from "./classNames";
import { Graph, Node, retrivePath } from "./graph_types";
import {
    createElement,
    createNode,
    sleep,
    getCoords,
    getId,
    inGrid,
    getGridItemByPosition,
} from "./utils";
import {
    INF,
    GRID_X,
    GRID_Y,
    EXPANSION_SLEEP_TIME,
    NODE_SIZE,
} from "./constants";
//20
//columnas
// 7
//row 2

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
    type: "source" | "target" | "path" | "normal" | "reset"
): void {
    let newClass = "";
    if (type === "source") {
        newClass = "bg-path";
    } else if (type === "target") {
        newClass = "bg-path";
    } else if (type === "path") {
        newClass = "bg-path";
    } else if (type === "normal") {
        newClass = "bg-normal";
    } else {
        vertex.element.classList.remove(
            "bg-path",
            "bg-normal",
            "bg-green"
        );
        newClass = "bg-white-500";
    }
    vertex.element.classList.add(newClass);
    return;
}

export async function printPath(graph: Graph, path: number[]) {
    let counter = 0;
    for (let id of path) {
        if (counter === 0 || counter === path.length - 1) {
            counter++;
            continue;
        }
        counter++;
        printNode(graph.id_node[id], "path");
        await sleep(EXPANSION_SLEEP_TIME);
    }
}

function paintWall(node: Node): void {
    if (node.wall) {
        // true
        node.element.style.background = "black";
    } else {
        node.element.style.background = "white";
    }
}

export function createGridGraph(graph: Graph, weighted: boolean = false) {
    graph.element.style.width = GRID_Y * NODE_SIZE + "px";
    graph.element.style.height = GRID_Y * NODE_SIZE + "px";
    graph.element.style.gridTemplateColumns = `repeat(${GRID_Y}, 1fr)`;
    graph.element.classList.add(...`bg-black grid`.split(" "));
    for (let X = 0; X < GRID_Y; ++X) {
        for (let Y = 0; Y < GRID_Y; ++Y) {
            const id = getId(X, Y);
            graph.addNode(id);
            graph.id_node[id].element = createNode(id);
            graph.id_node[id].element.setAttribute(
                "ondragstart",
                "return false;"
            );
            graph.id_node[id].element.draggable = false;
           /*  graph.id_node[id].element.textContent = id.toString(); */
            /*  graph.id_node[id].element.addEventListener(
                "mouseenter",
                (event) => {
                    if (graph.clicked !== null) {
                        graph.clicked = id;
                        graph.id_node[id].wall =
                            graph.status === "wall" ? true : false;
                        paintWall(graph.id_node[id]);
                    }
                }
            ); */
            graph.element.appendChild(graph.id_node[id].element);
        }
    }

    graph.element.addEventListener("mousedown", (event) => {
        const target = event.target as HTMLElement;
        const id = parseInt(target.id);
        if (target !== graph.element) {
            graph.clicked = id;
            graph.status = graph.id_node[id].wall ? "not-wall" : "wall";
            graph.id_node[id].wall = !graph.id_node[id].wall;
            paintWall(graph.id_node[id]);
        }
    });

    graph.element.addEventListener("mousemove", (event) => {
        if (graph.clicked !== null) {
            const target = getGridItemByPosition(event.x, event.y);

            console.log("true")
            if (target) {
                const id = parseInt(target.id);
                if (id !== graph.clicked) {
                    //last clicked
                    graph.id_node[id].wall =
                        graph.status === "wall" ? true : false;
                    paintWall(graph.id_node[id]);
                    graph.clicked = id;
                }
            }
        }
    });
    graph.element.addEventListener("mouseup", (event) => {
        graph.clicked = null;
    });

    const adder: number[][] = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1],
    ];

    for (let X = 0; X < GRID_Y; ++X) {
        for (let Y = 0; Y < GRID_Y; ++Y) {
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

// GRID_Y, GRID_Y //
export function makeGrid(graph: Graph) {
    if (i === 0) {
        document.body.appendChild(graph.element);
        i = 1;
    }
}
