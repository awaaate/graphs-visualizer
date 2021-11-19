import { createGraph } from "./graph";
import { Graph } from "././graph_types";
import { createElement } from "./utils";
//20
//columnas
// 7
//row 2
function getCoordFromGrid(gridSize: number, i: number) {
    const row = Math.floor(i / gridSize);
    const column = i % gridSize;
    return [row, column];
}
export function makeGrid(graphSize: number, gridSize: number) {
    const grid = [];
    const gridElement = createElement("div", {
        className: `grid template-columns-${gridSize}`,
    });
    for (let i = 0; i < graphSize; i++) {
        //check if is in the row
        const gridItem = createElement("div", { className: "grid", id: 1 });

        grid.push(i);
        gridElement.appendChild(gridItem);
    }
    return [
        gridElement,
        [
            getCoordFromGrid(gridSize, 1),
            getCoordFromGrid(gridSize, grid.length),
        ],
    ];
}

function printNode(node: Node) {}
