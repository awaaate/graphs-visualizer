import { GRID_Y, GRID_X } from "./constants";
import { Graph } from "./graph_types";
import { getCoords, getId } from "./utils";

let count = 0;
function next(indx: number, visited: number[]) {
    count++;
    const [x, y] = getCoords(indx);
    let notVisitedNeighbours = [];
    const neighbours: number[][] = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1],
    ];

    for (let neighbour of neighbours) {
        const newIdx = getId(x + neighbour[0], y + neighbour[1]);
        if (visited[newIdx] === 0) {
            notVisitedNeighbours.push(newIdx);
        }
    }
    if (notVisitedNeighbours[0]) {
        const randomIndx = Math.floor(
            Math.random() * (notVisitedNeighbours.length - 1)
        );
        visited[notVisitedNeighbours[randomIndx]] = 1;
        if (count < GRID_X * GRID_Y) {
            next(notVisitedNeighbours[randomIndx], visited);
            return visited;
        }
    } else {
        return visited;
    }
}
export function generateMaze(graph: Graph) {
    const visited = next(
        1,
        Array.from({ length: GRID_X * GRID_Y }, () => 0)
    );
    for (let i in graph.id_node) {
        graph.id_node[i].wall = !!visited[i];
        if (graph.id_node[i].wall) {
            graph.id_node[i].element.style.background = "black";
        }
    }
    return graph;
}
