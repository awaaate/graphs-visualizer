#include <bits/stdc++.h>
#include <fstream>
using namespace std;


signed main(){
    ios::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    int n;
    cin>>n;
    for(int i=0; i<n;++i){
        float a,b;
        cin>>a>>b;
        cout <<setprecision(2)<< "(" <<  b << "- x*" << a << "- y";
        if(i != n-1)
            cout <<  ")^2+";
    }
}