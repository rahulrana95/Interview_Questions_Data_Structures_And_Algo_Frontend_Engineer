#include <bits/stdc++.h>

using namespace std;

int main()
{
    string s;
    cin>>s; // Taking postfix expression.
    char *cstr = new char [s.length()];
    strcpy(cstr, s.c_str()); //Converting it into a char array
    stack<int> st; // initializing stack
    for(int i=0; cstr[i]; i++){
        if(cstr[i]>='0' && cstr[i]<='9'){
            st.push(cstr[i]-'0'); // If we get a numeric character, then the digit gets pushed into the stack.
        }
        else {
            int v1 = st.top();
            st.pop();
            int v2 = st.top();
            st.pop();
            switch(cstr[i]){ // Performing the operation according to the operand.
                case '+':st.push(v2+v1);
                         break;
                case '-':st.push(v2-v1);
                         break;
                case '*':st.push(v2*v1);
                         break;
                case '/':st.push(v2/v1);
            }
        }
    }
    cout<<st.top(); //Final answer.
    st.pop();
	return 0;
}
