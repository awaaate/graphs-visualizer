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
