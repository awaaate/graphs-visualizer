import { Graph } from "./graph_types";
import { getId, random, valid } from "./utils";
import { paintWall } from "./visualizer";
import {GRID_X, GRID_Y} from "./constants";





function generate(x:number, y:number):number[][]{
    const adder:number[][] = [[2,0],[0,2],[-2,0],[0,-2]];
    let res:number[][] = [];
    const checker:boolean[] = [false,false,false,false];
    let randomPer:number[] = [];

    let counter = 0;
    while(counter != 4){
        let a = random(0,3);
        if(!checker[a]){
            checker[a] = true;
            counter++;
            randomPer.push(a);
        }
    }

    for(let index of randomPer){
        if(valid(x + adder[index][0],y + adder[index][1])){
            res.push([adder[index][0], adder[index][1]]);
        }
    }
    return res;

}


function delWall(graph:Graph, x:number, y:number):void{
    graph.id_node[getId(x,y)].wall = false;
    paintWall(graph.id_node[getId(x,y)]);
}


function dfs(graph:Graph, x:number, y:number):void{
    delWall(graph,x,y);
    graph.id_node[getId(x,y)].visited = true;
    for(let add of generate(x,y)){
        if(!graph.id_node[getId(x + add[0],y + add[1])].visited){
            dfs(graph,x +add[0], y + add[1]);
            delWall(graph, x + add[0]/2, y +add[1]/2);
        }
    }
}



export function maze_generator(graph:Graph){
    graph.clean();

    let wall:boolean[][] = [];

    for(let i=0; i<GRID_X;++i){
        let row:boolean[] = new Array<boolean>();
        for(let j=0; j<GRID_Y;++j){

            graph.id_node[getId(i,j)].wall = true;
            paintWall(graph.id_node[getId(i,j)]);

            if(j%2 == 1 || i%2 == 1){
                row.push(true);
            }else{
                row.push(false);
            }
        }
        wall.push(row);
    }

    let sX = 1;
    let sY = 1;

    while(wall[sX][sY]){
        sX = random(0,GRID_X-1);
        sY = random(0, GRID_Y-1);
    }
    
    dfs(graph, sX, sY);
    return;
}