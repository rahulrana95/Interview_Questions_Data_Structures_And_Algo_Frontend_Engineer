#include<iostream>

using namespace std;
#define MAX 1000

char menu();
class deqq
{
	int front, rear, size;
	int arr[MAX];
	public:
	deqq(int size){
		front = -1;
		rear = 0;
		this->size = size;
	}
	bool isFull(){
		if((front==0 && rear == size - 1) || front == rear + 1)
			return true;
		return false;
	}
	bool isEmpty(){
		if(front == -1)
			return true;
		else 
			return false;
	}
	void insertFront(int key){
		if(isFull()){
			cout<<"Overflow!\n";
			return ;
		}
		else if(front == -1){
			front = 0;
			rear = 0;
		}
		else if(front==0)
			front = size-1;
		else
			front--;
		arr[front] = key;
	}
	void insertRear(int key){
		if(isFull()){
			cout<<"Overflow!\n";
			return ;
		}
		else if(front == -1){
			front = 0;
			rear = 0;
		}
		else if(rear == size-1)
			rear=0;
		else
			rear++;
		arr[rear] = key;
	}
	void removeFront(){
		if(isEmpty()){
			cout<<"Underflow!\n";
			return ;
		}
		else if(front == rear){
			front = -1;
			rear = -1;
		}
		else if(front == size-1)
			front=0;
		else
			front++;
	}
	void removeRear(){
		if(isEmpty()){
			cout<<"Underflow!\n";
			return ;
		}
		else if(front == rear){
			front = -1;
			rear = -1;
		}
		else if(rear == 0)
			rear=size-1;
		else
			rear--;
	}
	int getFront(){
		if(isEmpty()){
			cout<<"Underflow!\n";
			return -1;
		}
		return arr[front];
	}
	int getRear(){
		if(isEmpty()){
			cout<<"Underflow!\n";
			return -1;
		}
		return arr[rear];
	}
};

int main(){
	deqq dubEndedQ(50);
	int p;
	do{
		char ch = menu();
	switch(ch){
		case '1':cout<<"Enter element to be inserted. ";
		         cin>>p;
		         dubEndedQ.insertFront(p);
				 break;
		case '2':cout<<"Enter element to be inserted. ";
		         cin>>p;
		         dubEndedQ.insertRear(p);
				 break;
		case '3':cout<<"Element removed from the front. ";
		         dubEndedQ.removeFront();
				 break;
		case '4':cout<<"Element removed from the rear. ";
		         dubEndedQ.removeRear();
				 break;
		case '5':cout<<"Element at the front = ";
		         cout<<dubEndedQ.getFront()<<endl;
				 break;
		case '6':cout<<"Element at the rear = ";
		         cout<<dubEndedQ.getRear()<<endl;
				 break;
		default : cout<<"Exiting in #covfefe!\n";
	}
	}while(ch!='7');
	return 0;
}

char menu(){
	char c;
	cout<<"MENU: \n";
	cout<<"1. Insert element in deque from the front.\n";
	cout<<"2. Insert element in deque from the rear.\n";
	cout<<"3. Remove element in deque from the front.\n";
	cout<<"4. Remove element in deque from the rear.\n";
	cout<<"5. Get element in deque from the front.\n";
	cout<<"6. Get element in deque from the rear.\n";\
	cout<<"7. EXIT!\n";	
	cin>>c;
	
	return c;
}
