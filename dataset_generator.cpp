#include <bits/stdc++.h>
using namespace std;


int main(){
    srand(time(0));
    int n;
    int a,b;
    cin>>n;
    cin>>a>>b;
    vector<pair<int,int>>pt;
    while(n--){
        int epsilon = rand()%20;
        int x = rand()%50;
        pt.push_back({x,a*x + b + epsilon});
    }
    for(auto p:pt){
        cout << "(" << p.first << "," << p.second << ")" << endl;
    }
    for(auto p:pt){
        cout << p.first << " " << p.second << endl;
    }
}