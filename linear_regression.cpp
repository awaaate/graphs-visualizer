#include <bits/stdc++.h>
using namespace std;


signed main(){
    int n;
    cin>>n;
    double dataset[n][2];
    double x_sum =0;
    double y_sum =0;
    double xs_sum =0;
    double xy_sum =0;
    for(int i=0; i<n;++i){
        for(int j=0; j<2;++j){
            double num;
            cin>>num;
            if(j==0){
                xs_sum += pow(num,2);
                x_sum += num;
            }else{
                xy_sum += num * dataset[i][0];
                y_sum += num;
            }
            dataset[i][j] = num;
        }
    }
    cout << x_sum << " " << xy_sum << " " << xs_sum << " " << y_sum << " " << endl;
    double determinant = n*xs_sum - x_sum*x_sum;
    cout << "determinant" << endl;
    cout << determinant << endl;
    double a = (n*xy_sum - x_sum * y_sum);
    a/=determinant;
    double b = xs_sum * y_sum - x_sum * xy_sum;
    cout << b << endl;
    b/= determinant;
    cout << "Y = " << a << "x +" << b << endl;
}   
