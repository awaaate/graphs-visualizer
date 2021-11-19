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


void calc_sum(int k, vector<vector<int>>&all_sums,vector<int>&indep){//calculate sum all sums of the derivative of k.
    //ALL is passed by reference to the arguments
    //is the coef of alpha i for the kth derivative all_sum[k][j] = x_ij * x_ik
    cout << "we went it " << endl;
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


signed main(){
    fstream input_file;
    input_file.open("input.txt",ios::in);
    input_file>>n>>m;

    dataset_X.resize(n+1,vector<int>(m+1));
    dataset_Y.resize(n+1);

    matrix.resize(m +1,vector<int>(m+1));
    vec.resize(n+1);
    dp.resize((1<<m+1));
    dp_bool.resize((1<<m+1),false);
    adjoint.resize(m+1,vector<int>(m+1));
    cout << n << " " << m << endl;
    for(int i=1; i<=n;++i){
        input_file>>dataset_Y[i];
        for(int j=1; j<=m;++j){
            input_file>>dataset_X[i][j];
        }
    }

    input_file.close();
    cout << "hola" << endl;
    fill_matrix();

    for(int i=0; i<=m;++i){
        for(int j=0; j<=m;++j){
            cout << matrix[i][j] << " ";
        }
        cout << endl;
    }
}
