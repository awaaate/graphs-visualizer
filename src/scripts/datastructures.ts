export function random(min:number, max:number):number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const INF: number = 8007199254740991; //normal intmax


class QueueItem {
    value: number;
    nextItem: any;
    constructor(value: number){
        this.value = value;
        this.nextItem = undefined;
    }
}


export class Queue {
    private lastItem: QueueItem;
    private firstItem: QueueItem;
    private _size:number;
    constructor() {
        this.lastItem = undefined;
        this.firstItem = undefined;
        this._size = 0;
    }
    push(value: number): void {
        let newItem: QueueItem = new QueueItem(value);
        if(this._size === 0){
            this.firstItem = newItem;
            this.lastItem = newItem;
        }else{
            this.lastItem.nextItem = newItem;
            this.lastItem = newItem;
        }
        this._size++;
    }
    front(): number{
        if(this._size === 0){
            return undefined;
        }
        return this.firstItem.value;
    }
    pop(): void{
        if(this._size === 0){
            return undefined;
        }
        if(this._size === 1){
            this.firstItem = undefined;
            this.lastItem = undefined;
            this._size = 0;
        }else{
            this.firstItem = this.firstItem.nextItem;
            this._size--;
        }
    }
    size(): number{
        return this._size;
    }
    delete(): void{
        this._size = 0;
    }
    empty(): boolean{
        if(this._size === 0){
            return true;
        }else{
            return false;
        }
    }
}


class HeapItem{
    value: number;
    secondValue:number;
    constructor(value:number, secondValue:number){
        this.secondValue = secondValue;
        this.value = value;
    }
}

function swap(a:any, b:any){
    return [b,a];
}

class BinaryHeap{
    private tree: HeapItem[];
    private _rootIndex: number;
    private _lastIndex: number;
    private _indexToAdd: number;
    constructor(){
        this.tree = [];
        this._rootIndex = 1;
        this._lastIndex = 0;
        this._indexToAdd = 1;
    }
    private getParent(index: number): number{
        return Math.floor(index/2);
    }

    private mount(index: number): void{
        let parentIndex: number = this.getParent(index);
        if(index === this._rootIndex){
            return;
        }
        if(this.tree[index].value <= this.tree[parentIndex].value){
            return;
        }else{

            [this.tree[index].secondValue,this.tree[parentIndex].secondValue] = swap(this.tree[index].secondValue,this.tree[parentIndex].secondValue);
            this.tree[index].value =  this.tree[parentIndex].value ^ this.tree[index].value;
            this.tree[parentIndex].value = this.tree[parentIndex].value ^ this.tree[index].value;
            this.tree[index].value = this.tree[parentIndex].value ^ this.tree[index].value;
            

            this.mount(parentIndex);
        }
        return;
    }

    private unmount(index: number): void{
        if(this.tree[index*2] === undefined && this.tree[index*2 + 1] === undefined){
            return;
        }
        
        if(this.tree[index*2 + 1] === undefined){
            if(this.tree[index].value < this.tree[index * 2].value){

                [this.tree[index * 2].secondValue,this.tree[index].secondValue] = swap(this.tree[index*2].secondValue,this.tree[index].secondValue);
                this.tree[index * 2].value = this.tree[index].value ^ this.tree[index * 2].value;
                this.tree[index].value = this.tree[index].value ^ this.tree[index * 2].value;
                this.tree[index * 2].value = this.tree[index].value ^ this.tree[index * 2].value;

            }
            return;
        }
        if(this.tree[index].value > Math.max(this.tree[index*2].value,this.tree[index*2+1].value)){
            return;
        }
        if(this.tree[index*2].value > this.tree[index*2 + 1].value){

            [this.tree[index * 2].secondValue,this.tree[index].secondValue] = swap(this.tree[index*2].secondValue,this.tree[index].secondValue);
            this.tree[index*2].value = this.tree[index].value ^this.tree[index*2].value;
            this.tree[index].value = this.tree[index].value ^this.tree[index*2].value;
            this.tree[index*2].value = this.tree[index].value ^this.tree[index*2].value;

            this.unmount(index*2);
        }else{

            [this.tree[index*2 + 1].secondValue,this.tree[index].secondValue] = swap(this.tree[index*2 + 1].secondValue,this.tree[index].secondValue);
            this.tree[index*2 + 1].value = this.tree[index].value ^this.tree[index*2 + 1].value;
            this.tree[index].value = this.tree[index].value ^this.tree[index*2 + 1].value;
            this.tree[index*2 + 1].value = this.tree[index].value ^this.tree[index*2 + 1].value;
            
            this.unmount(index*2 + 1);
        }
        return;
    }

    remove(index: number): void{
        if(this._lastIndex === 0){
            return;
        }
        if(this._lastIndex === 1){
            delete this.tree[this._lastIndex];
            this._lastIndex--;
            this._indexToAdd--;
            return;
        }
        [this.tree[index].secondValue,this.tree[this._lastIndex].secondValue] = swap(this.tree[index].secondValue,this.tree[this._lastIndex].secondValue);

        this.tree[index].value = this.tree[index].value ^ this.tree[this._lastIndex].value;
        this.tree[this._lastIndex].value = this.tree[index].value ^ this.tree[this._lastIndex].value;
        this.tree[index].value = this.tree[index].value ^ this.tree[this._lastIndex].value;

        delete this.tree[this._lastIndex];
        this._lastIndex--;
        this._indexToAdd--;
        this.unmount(index);
    }

    insert(value: number,secondValue:number): void{
        this.tree[this._indexToAdd] = new HeapItem(value,secondValue);
        this.mount(this._indexToAdd);
        this._indexToAdd++;
        this._lastIndex++;
    }

    rootIndex(): number{
        return this._rootIndex;
    }
    rootValue(): number{
        return this.tree[this._rootIndex].value;
    }
    rootSecondValue(): number{
        return this.tree[this._rootIndex].secondValue;
    }
    lastIndex(): number{
        return this._lastIndex;
    }
}

export class PriorityQueue{
    private Heap: BinaryHeap;
    private _size: number;
    constructor(){
        this.Heap = new BinaryHeap();
        this._size = 0;
    }
    push(value: number,secondValue: number = undefined): void{
        this.Heap.insert(value, secondValue);
        this._size++;
    }
    
    pop(): void{
        if(this._size === 0){
            return;
        }
        this.Heap.remove(this.Heap.rootIndex());
        this._size--;
    }

    front(): number[]{
        if(this._size === 0){
            return undefined;
        }
        return [this.Heap.rootValue(), this.Heap.rootSecondValue()];
    }

    empty(): boolean{
        if(this._size === 0){
            return true;
        }else{
            return false;
        }
    }

    size(): number{
        return this._size;
    }
}

class StackItem{
    value:any;
    items:any[];
    constructor(item:any){
        this.items = [];
        this.value = item;
    }
}

export class Stack{
    array:StackItem[];
    _size:number;
    constructor(){
        this.array = [];
        this._size = 0;
    }
    push(item:any,...values){
        this.array.push(new StackItem(item));
        this.array[this._size].items = values;
        this._size++;
    }
    pop():void{
        if(this._size === 0)return;
        this.array.pop();
        this._size--;
    }
    top():any{
        if(this._size === 0)return undefined;
        return this.array[this._size -1];
    }
    empty():boolean{
        if(this._size === 0){
            return false;
        }else{
            return true;
        }
    }
    size(){
        return this._size;
    }

}

export class DSU{
    par: number[];
    constructor(n:number){
        for(let i=0; i<n + 10;++i){
            this.par[i] = i;
        }
    }

    find(i:number):number{
        if(this.par[i] === i){
            return i;
        }else{
            return this.par[i] = this.find(this.par[i]);
        }
    }
    
    add(i:number, j:number):void{
        this.par[this.find(j)] = this.find(i);
    }
    checkSame(i:number, j:number):boolean{
        if(this.find(i) === this.find(j)){
            return true;
        }else{
            return false;
        }
    }
}


/*
PRIORITY QUEUE TESTER
const q = new PriorityQueue();

q.push(-1,26);
q.push(-2,34);
q.push(-6,62);
q.push(-4, 1);
for(let i=0; i<100;++i){
    q.push(-random(1,500),random(1,10000));
}

let prev = 100;
let exit = true;
while(!q.empty()){
    console.log(q.front());
    if(prev < q.front()[0]){
        exit = false;
    }
    prev = q.front()[0];
    q.pop();

}
if(exit)
console.log("EXIT");
else    
console.log("CACA");

*/