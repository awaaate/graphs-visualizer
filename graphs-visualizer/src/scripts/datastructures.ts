class Item {
    value: number;
    nextItem: any;
    constructor(value: number){
        this.value = value;
        this.nextItem = undefined;
    }
}


export class Queue {
    private lastItem: Item;
    private firstItem: Item;
    private _size:number;
    constructor() {
        this.lastItem = undefined;
        this.firstItem = undefined;
        this._size = 0;
    }
    push(value: number): void {
        let newItem: Item = new Item(value);
        if(this._size == 0){
            this.firstItem = newItem;
            this.lastItem = newItem;
        }else{
            this.lastItem.nextItem = newItem;
            this.lastItem = newItem;
        }
        this._size++;
    }
    front(): number{
        if(this._size == 0){
            return undefined;
        }
        return this.firstItem.value;
    }
    pop(): void{
        if(this._size == 0){
            return undefined;
        }
        if(this._size == 1){
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
        if(this._size == 0){
            return true;
        }else{
            return false;
        }
    }
}


class HeapItem{
    value: number;
    items: any[];
    constructor(value){
        this.items = [];
        this.value = value;
    }
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
        if(index == this._rootIndex){
            return;
        }
        if(this.tree[index].value <= this.tree[parentIndex].value){
            return;
        }else{

            this.tree[index].value =  this.tree[parentIndex].value ^ this.tree[index].value;
            this.tree[parentIndex].value = this.tree[parentIndex].value ^ this.tree[index].value;
            this.tree[index].value = this.tree[parentIndex].value ^ this.tree[index].value;
            
            this.mount(parentIndex);
        }
        return;
    }

    private unmount(index: number): void{

        if(typeof(this.tree[index*2].value) == undefined && typeof(this.tree[index*2 + 1].value) == undefined){
            return;
        }
        
        if(typeof(this.tree[index*2 + 1].value) == undefined){
            if(this.tree[index].value < this.tree[index * 2].value){

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

            this.tree[index*2].value = this.tree[index].value ^this.tree[index*2].value;
            this.tree[index].value = this.tree[index].value ^this.tree[index*2].value;
            this.tree[index*2].value = this.tree[index].value ^this.tree[index*2].value;

            this.unmount(index*2);
        }else{

            this.tree[index*2 + 1].value = this.tree[index].value ^this.tree[index*2 + 1].value;
            this.tree[index].value = this.tree[index].value ^this.tree[index*2 + 1].value;
            this.tree[index*2 + 1].value = this.tree[index].value ^this.tree[index*2 + 1].value;
            
            this.unmount(index*2 + 1);
        }
        return;
    }

    remove(index: number): void{
        if(this._lastIndex == 0){
            return;
        }
        if(this._lastIndex = 1){
            delete this.tree[this._lastIndex];
            this._lastIndex--;
            return;
        }
        this.tree[index].value = this.tree[index].value ^ this.tree[this._lastIndex].value;
        this.tree[this._lastIndex].value = this.tree[index].value ^ this.tree[this._lastIndex].value;
        this.tree[index].value = this.tree[index].value ^ this.tree[this._lastIndex].value;

        delete this.tree[this._lastIndex].value;

        this._lastIndex--;
        this.unmount(index);
    }

    insert(value: number): void{
        this.tree[this._indexToAdd] = new HeapItem(value);
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
    push(value: number): void{
        this.Heap.insert(value);
        this._size++;
    }
    
    pop(): void{
        if(this._size == 0){
            return;
        }
        this.Heap.remove(this.Heap.rootIndex());
        this._size--;
    }

    front(): number{
        if(this._size == 0){
            return undefined;
        }
        return this.Heap.rootValue();
    }

    empty(): boolean{
        if(this._size == 0){
            return true;
        }else{
            return false;
        }
    }

    size(): number{
        return this._size;
    }
}


const q = new PriorityQueue();

q.push(1);
q.push(2);
q.push(3);
console.log(q.front());
q.push(4);
q.push(5);
console.log(q.front());
q.push(3);
q.push(4);
console.log(q.front());
q.push(6);
console.log(q.front());
console.log(q.front());
