#include <bits/stdc++.h>
#include <fstream>
using namespace std;
#define int long long

vector<vector<int>>dataset_X;
vector<int>dataset_Y;

vector<vector<int>>matrix;
vector<int>vec;
vector<vector<int>>adjoint;

vector<int>dp;//dp[i][j] means that determinant of the matrix deleting A_{ij}; rowns and cols;
vector<bool>dp_bool;
int n,m;

//IMPRTANT;
// matrix[0] is the equation of deriving beta
// matrix[k][0] is the independent therm coefficient. 
// vec is the result vector
// matrix[i][j] is the ith alpha derivated and the jth coeficient of this alpha.
//result = [beta, alpha_1,alpha_2... alpha_m]; vertical

int det_two(int a,int b, int c, int d){
    return a*d - b*c;
}
void printer(vector<vector<int>>ma){
    for(auto i:ma){
        for(int j:i){
            cout << j << " ";
        }
        cout << endl;
    }
}
//size starts at the actual size;
int new_calc_determinant(int row, int size, int mask, int bad_row){//this is a 0 indexed function. A_{ij};i >=0, j>=0;
    if(dp_bool[mask])return dp[mask];
    if(size == 2){
        int c = 0;
        int cols[2];
        for(int i=0; i<=m;++i){
            if (c==2)break;
            if(!((mask >> i) & 1)){
                cols[c] = i;
                c++;
            }
        }
        int a = 1;
        int b = 0;
        if(bad_row == m){
            b = 1;
            a = 2;
        }
        if(bad_row == m-1){
            a = 2;
        }
        return dp[mask] = det_two(matrix[m-a][cols[0]],matrix[m-a][cols[1]],matrix[m - b][cols[0]],matrix[m- b][cols[1]]);
    }
    int counter = 0;
    for(int i=0; i<=m;++i){
        if((mask >> i) & 1)continue;
        dp[mask] += matrix[row][i] * new_calc_determinant(row + (row == bad_row?2:1), size - 1, mask | (1<<i),bad_row) * (counter % 2==0?1:-1);
        counter++;
    }
    dp_bool[mask] = true;
    return dp[mask];
}

int old_calc_determinant(int size, int mask,vector<vector<int>>&new_matrix){//this is a 0 indexed function. A_{ij};i >=0, j>=0;
    //THIS FUNCTION SEEMS TO BE WORKING PROPERLY!
    if(dp_bool[mask])return dp[mask];
    if(size == 2){
        int c = 0;
        int cols[2];
        for(int i=0; i<=m;++i){
            if (c==2)break;
            if(!((mask >> i) & 1)){
                cols[c] = i;
                c++;
            }
        }
        dp_bool[mask] == true;
        return dp[mask] = det_two(new_matrix[m-1][cols[0]],new_matrix[m-1][cols[1]],new_matrix[m][cols[0]],new_matrix[m][cols[1]]);
    }
    int counter = 0;
    for(int i=0; i<=m;++i){
        if((mask >> i) & 1)continue;
        if(counter % 2 == 0){
            dp[mask] += new_matrix[m+1 - size][i] * old_calc_determinant(size-1, mask | (1<<i),new_matrix);
        }else{
            dp[mask] -= new_matrix[m+1 - size][i] * old_calc_determinant(size-1, mask | (1<<i),new_matrix);
        }
        counter++;
    }
    dp_bool[mask] = true;
    return dp[mask];
}


//this deletes the_precalculation_of_all_determinants_of_the_big_determinant;
//this deletes the_precalculation_of_all_determinants_of_the_big_determinant;
vector<vector<int>> calc_adjoint(){
    vector<vector<int>>adj(m+1,vector<int>(m+1));
    if(m==1){
        adj[0][0] = matrix[1][1];
        adj[1][1] = matrix[0][0];
        adj[0][1] = -matrix[0][1];
        adj[1][0] = -matrix[1][0];
        return adj;
    }
    for(int row=0; row<=m;++row){
        for(int i=0; i<=m;++i){
            int det = new_calc_determinant(0,m,(1<<i),row);
            adj[i][row] = det*pow(-1,row + i + 2);
        }
        fill(dp_bool.begin(),dp_bool.end(),false);
    }
    printer(adj);
    return adj;
}


signed main(){

    fstream input_file;
    input_file.open("input.txt",ios::in);
    input_file>>m;
    int n= m;
    dataset_X.resize(n+1,vector<int>(m+1));
    dataset_Y.resize(n+1);

    matrix.resize(m +1,vector<int>(m+1));
    vec.resize(n+1);
    dp.resize((1<<m+1));
    dp_bool.resize((1<<m+1),false);
    adjoint.resize(m+1,vector<int>(m+1));

    for(int i=0; i<=m;++i){
        for(int j=0; j<=m;++j){
            input_file >> matrix[i][j];
        }
    }

    input_file.close();
    cout << "----------------" << endl;    
    calc_adjoint();
    cout << "----------------" << endl;
    int mop =m;
    m--;
    for(int i=0; i<=mop;++i){
        for(int j=0; j<=mop;++j){
            vector<vector<int>>new_matrix;
            for(int a =0; a<=mop;++a){
                vector<int>row;
                for(int b=0; b<=mop;++b){
                    if(a == i|| b==j)continue;
                    row.push_back(matrix[a][b]);
                }
                if(row.size() != 0)
                    new_matrix.push_back(row);
            }
            cout << endl;
            fill(dp_bool.begin(),dp_bool.end(),false);
            printer(new_matrix);
            cout << endl;
            cout << old_calc_determinant(m+1,0,new_matrix) << endl;
            
        }

        cout << endl;
    }
    
    cout << "ended" << endl;
}

/*
int calc_determinant(int size, int mask, int bad_row, int actual_row){//this is a 0 indexed function. A_{ij};i >=0, j>=0;
    //THIS FUNCTION SEEMS TO BE WORKING PROPERLY!
    //call on bad_row = -1 for not bad_row selected;
    if(dp_bool[mask])return dp[mask];
    if(size == 2){
        int c = 0;
        int cols[2];
        for(int i=0; i<=m;++i){
            if (c==2)break;
            if(!((mask >> i) & 1)){
                cols[c] = i;
                c++;
            }
        }
        dp_bool[mask] = true;
        //this has to be adapted for row_deletion;
        int a = 1;
        int b = 0;
        if(bad_row == m){
            a++;
            b++;
        }
        if(bad_row == m - 1){
            a++;
        }
        return dp[mask] = det_two(matrix[m - a][cols[0]],matrix[m - a][cols[1]],matrix[m - b][cols[0]],matrix[m - b][cols[1]]);
    }
    int counter = 0;
    for(int i=0; i<=m;++i){
        if((mask >> i) & 1)continue;
        if(counter % 2 == 0){
            dp[mask] += matrix[m+1 - size][i] * calc_determinant(size-(actual_row + 1 == bad_row?2:1) , mask | (1<<i), bad_row, actual_row + 1);
        }else{
            dp[mask] -= matrix[m+1 - size][i] * calc_determinant(size-(actual_row + 1 == bad_row?2:1), mask | (1<<i), bad_row, actual_row +1);
        }
        counter++;
    }
    dp_bool[mask] = true;
    return dp[mask];
}*/