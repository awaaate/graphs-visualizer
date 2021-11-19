
let dataset_size:number;
let number_of_variables:number;
let matrix_size:number;

let datasetX:number[][];
let datasetY:number[][];

let matrix:number[][];


function det_two(a:number, b:number, c:number, d:number):number{
    return a*d - b*c;
}


function printer(matrix:number[][]):void{
    for(let row of matrix){
        for(let item of row){
            console.log(item, " ");
        }
        console.log("\n");
    }
    return;
}


let dp:number[];
let dp_bool:boolean[];

function calculate_determiant(row:number, size:number, mask:number, bad_row:number):number{
    //MATRIX INTEXED 0;
    if(dp_bool[mask])return dp[mask]
    if(size === 2){
        let counter = 0;
        let a:number;
        let b:number;
        for(let i=matrix_size-1, col_eval = 0; i >= 0;--i,col_eval++){
            if(((mask >> i) & 1 )){    
                if(counter === 0){
                    a = col_eval;
                    counter++;
                }else{
                    b = col_eval;
                    counter++;
                    break;
                }
            }
        }



    }else{
        let counter = 0;
        for(let i=0; i < matrix_size; ++i){
            if((mask >> i) & 1)continue;
            dp[mask] += matrix[row][i] * calculate_determiant(row + (row + 1 == bad_row?2:1), size - 1, mask | (1<<i),bad_row) * (counter % 2==0?1:-1);
            counter++;
        }
        dp_bool[mask] = true;
        return dp[mask];
    }


}

number_of_variables = 4;



function calc_adjoint():number[][]{
    let adj:number[][];
    if(number_of_variables == 1){
        adj[0][0] = matrix[1][1];
        adj[1][1] = matrix[0][0];
        adj[0][1] = -matrix[0][1];
        adj[1][0] = -matrix[1][0];
        return adj;
    }
    for(let row=0; row<=number_of_variables;++row){
        for(let i=0; i<=number_of_variables;++i){
            let det = calculate_determiant(0,number_of_variables,(1>>i),row);
            adj[i][row] = det*Math.pow(-1,row+1 + 2);
        }
        for(let i=0; i<=(1<<number_of_variables);++i){
            dp_bool[i] = false;
        }
    }
    return adj;
}



