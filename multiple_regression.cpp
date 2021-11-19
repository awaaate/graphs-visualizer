#include <bits/stdc++.h>
#include <fstream>
using namespace std;
#define float double
vector<vector<float>>dataset_X;
vector<float>dataset_Y;

vector<vector<float>>matrix;
vector<float>vec;
vector<vector<float>>adjoint;

int n,m;

float det_two(float a,float b, float c, float d){
    return a*d - b*c;
}


void printer(vector<vector<float>>ma){
    for(auto i:ma){
        for(float j:i){
            cout << j << " ";
        }
        cout << endl;
    }
}

//size starts at the actual size;
vector<float>dp;//dp[i][j] means that determinant of the matrix deleting A_{ij}; rowns and cols;
vector<bool>dp_bool;

float new_calc_determinant(int row, int size, int mask, int bad_row){//this is a 0 indexed function. A_{ij};i >=0, j>=0;
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
        dp[mask] += matrix[row][i] * new_calc_determinant(row + (row + 1    == bad_row?2:1), size - 1, mask | (1<<i),bad_row) * (counter % 2==0?1:-1);
        counter++;
    }
    dp_bool[mask] = true;
    return dp[mask];
}


vector<vector<float>> calc_adjoint(){
    vector<vector<float>>adj(m+1,vector<float>(m+1));
    if(m==1){
        adj[0][0] = matrix[1][1];
        adj[1][1] = matrix[0][0];
        adj[0][1] = -matrix[0][1];
        adj[1][0] = -matrix[1][0];
        return adj;
    }
    for(int row=0; row<=m;++row){
        for(int i=0; i<=m;++i){
            float det = new_calc_determinant(0,m,(1<<i),row);
            adj[i][row] = det*pow(-1,row + i + 2);
        }
        fill(dp_bool.begin(),dp_bool.end(),false);
    }
    return adj;
}


void calc_sum(int k, vector<vector<float>>&all_sums,vector<float>&indep){//calculate sum all sums of the derivative of k.
    //ALL is passed by reference to the arguments
    //is the coef of alpha i for the kth derivative all_sum[k][j] = x_ij * x_ik
    //THIS FUNCION SEEMS TO BE WORKING PROPERLY!
    for(int i=1; i<=n;++i){//0 is for the B
        for(int j=1; j<=m;++j){
            if(k==0){
                all_sums[k][j] += dataset_X[i][j];
            }else{
                all_sums[k][j] += dataset_X[i][j] * dataset_X[i][k];
            }
        }
    }
    if(k==0){
        all_sums[k][0] = n;
    }else{
        for(int i=1; i<=n;++i){//Assining the kth beta therm
            all_sums[k][0] += dataset_X[i][k];
        }
    }
    for(int i=1; i<=n;++i){
        if(k==0){
            indep[k] += dataset_Y[i];
        }else{
            indep[k] += dataset_Y[i]*dataset_X[i][k];
        }
    }
}


void fill_matrix(){
    for(int i=0; i<=m;++i){
        calc_sum(i,matrix,vec);
    }
}


vector<float>matrix_vector_mult(vector<vector<float>>a, vector<float>b){
    int x = a[0].size();
    int y = a.size();
    int z = b.size();
    vector<float>result;
    if(x != z)return {{0.0}};
    for(int i=0; i<y;++i){
        float res = 0;
        for(int j=0; j<x;++j){
            res += a[i][j] * b[j];
        }
        result.push_back(res);
    }
    return result;
}


vector<vector<float>>const_matrix_div(vector<vector<float>>b, float k){
    for(int i=0; i<b.size();++i){
        for(int j=0; j<b[0].size();++j){
            b[i][j] /=k;
        }
    }
    return b;
}


signed main(){
    fstream input_file;
    input_file.open("input.txt",ios::in);

    input_file>>n>>m;
    dataset_X.resize(n+1,vector<float>(m+1));
    dataset_Y.resize(n+1);

    matrix.resize(m +1,vector<float>(m+1));
    vec.resize(m+1);
    dp.resize((1<<m+1));
    dp_bool.resize((1<<m+1),false);
    adjoint.resize(m+1,vector<float>(m+1));

    for(int i=1; i<=n;++i){
        input_file>>dataset_Y[i];
        for(int j=1; j<=m;++j){
            input_file>>dataset_X[i][j];
        }
    }
    fill_matrix();
    cout << "sumation matrix: " << endl;
    printer(matrix);

    int det = new_calc_determinant(0,m+1,0,-1);
    if(det == 0){
        cout << "unpredictable set of points, delete the variable that may be irrelevant" << endl;
    }else{
        cout << setprecision(5) << endl;
        cout << setprecision(5) << "determinant: " << det << endl;

        adjoint = calc_adjoint();
        cout << "adjoint matrix :" << endl;
        printer(adjoint);
        cout << endl;

        auto inverse = const_matrix_div(adjoint,det);
        cout << "inverse matrix : " << endl;
        printer(inverse);
        cout << endl;
        cout << "vector of independant" << endl;
        for(int i:vec){
            cout << i << " ";
        }
        cout << endl;

        vector<float>coefs = matrix_vector_mult(inverse,vec);
        cout << "coefs are: "<< setprecision(5) << endl;
        for(int i=0; i<=m;++i){
            if(i==0)cout << "B = " << coefs[i] << endl;
            else cout << "A" << i << "= " << coefs[i] << endl;
        }

        cout << endl;
    }
}
