import { Graph, Node } from "./graph_types";
import { createElement } from "./utils";

//20
//columnas
// 7
//row 2
export const gridX:number = 100;
export const gridY:number = 50;



function getCoords(id:number): number[]{
    return [id%gridX, Math.floor(id/gridX)];
}

function getId(x:number, y:number):number{
    return y + x*gridX;
}


function createGridGraph(graph:Graph, weighted:boolean = false){
    for(let X=0; X<gridX;++X){
        for(let Y=0; Y<gridY; ++Y){
            const id = Y + gridX *  X;
            graph.addNode(id);
            //graph.id_node[id].element = whatever XD;
        }
    }
    const adder:number[][] = [[1,0],[0,1],[-1,0],[0,-1]];

    for(let X=0; X<gridX;++X){
        for(let Y=0; Y<gridY;++Y){
            const id:number = getId(Y,X*gridX);
            for(let add of adder){
                const newId:number = getId(Y + add[1], X+add[0]);
                if(weighted){
                    const w = 1;//GENERATE RANDOM NUMBER;
                    graph.addEdge(id,newId,true,w);
                }else{
                    graph.addEdge(id,newId, true);
                }
            }
        }
    }
    return graph;
}


function getCoordFromGrid(gridSize: number, i: number):number[] {
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

export function printNode(vertex: Node) {
    return;
}

