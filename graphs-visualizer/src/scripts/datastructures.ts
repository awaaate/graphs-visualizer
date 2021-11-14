class Item{
    public value: number;
    public nextItem: any;
    constructor(value:number){
        this.value = value;
        this.nextItem = null;
    }
}

export class Queue {
    private lastItem: Item;
    private firstItem:Item;
    private _size:number;
    constructor(
    ) {
        this.lastItem = null;
        this.firstItem = null;
        this._size = 0;
    }
    push(value):void {
        let newItem:Item = new Item(value);
        if(this._size == 0){
            this.firstItem = newItem;
            this.lastItem = newItem;
        }else{
            this.lastItem.nextItem = newItem;
            this.lastItem = newItem;
        }
        this._size++;
    }
    front():number{
        if(this._size == 0){
            return null;
        }
        return this.firstItem.value;
    }
    pop():void{
        if(this._size == 0){
            return null;
        }
        if(this._size == 1){
            this.firstItem = null;
            this.lastItem = null;
            this._size = 0;
        }else{
            const Returner:Item = this.firstItem;
            this.firstItem = this.firstItem.nextItem;
            this._size--;
        }
    }
    size():number{
        return this._size;
    }
    delete():void{
        this._size = 0;
    }
    empty():boolean{
        if(this._size == 0){
            return true;
        }else{
            return false;
        }
    }
}


class HeapItem{
    public value:number;
    public items:any[];
    constructor(value){
        this.items = [];
        this.value = value;
    }
}

class BinaryHeap{
    private tree:HeapItem[];
    private _rootIndex:number;
    private _lastIndex:number;
    constructor(){
        this.tree = [];
        this._rootIndex = 1;
        this._lastIndex = 1;
    }
    private getParent(index:number):number{
        return Math.floor(index/2);
    }

    private mount(index:number):void{
        let parentIndex:number = this.getParent(index);
        if(this.tree[index].value <= this.tree[parentIndex].value || index == this._rootIndex){
            return;
        }else{
            const middle:number = this.tree[index].value;//REVISAR PER LA COPIA DE VARIABLES
            this.tree[index].value = this.tree[parentIndex].value;
            this.tree[parentIndex].value = middle;
            this.mount(parentIndex);
        }
        return;
    }

    private unmount(index:number):void{
        if(this.tree[index].value > Math.max(this.tree[index*2].value,this.tree[index*2+1].value)){
            return;
        }else{
            if(this.tree[index*2].value > this.tree[index*2 + 1].value){

                const middle:number = this.tree[index*2].value;
                this.tree[index*2].value = this.tree[index].value;
                this.tree[index].value = middle;

                this.unmount(index*2);
            }else{

                const middle:number = this.tree[index*2 + 1].value;
                this.tree[index*2 + 1].value = this.tree[index].value;
                this.tree[index].value = middle;
                
                this.unmount(index*2 + 1);
            }
        }
        return;
    }

    insert(value:number):void{
        this.tree[this._lastIndex] = new HeapItem(value);
        this.mount(this._lastIndex);
        this._lastIndex++;
    }

    remove(index:number):void{
        this.tree[index].value = this.tree[this._lastIndex].value;
        this.tree[this._lastIndex] = null;
        this._lastIndex--;
        this.unmount(index);
    }

    root():number{
        return this.tree[this._rootIndex].value;
    }

    lastIndex():number{
        return this._lastIndex;
    }
}


export class PriorityQueue{
    private Heap:BinaryHeap;
    private _size:number;
    constructor(){
        this.Heap = new BinaryHeap();
        this._size = 0;
    }
    push(value:number):void{
        this.Heap.insert(value);
        this._size++;
    }
    
    pop():void{
        if(this._size == 0){
            return;
        }
        this.Heap.remove(this.Heap.root());
        this._size--;
    }

    front():number{
        if(this._size == 0){
            return null;
        }
        return this.Heap.root();
    }

    empty():boolean{
        if(this._size == 0){
            return true;
        }else{
            return false;
        }
    }

    size():number{
        return this._size;
    }
}




const q = new PriorityQueue();

for(let a = 1; a<10; ++a){
    q.push(a);
    console.log(q.front());
    console.log(q.empty());
    console.log(q.size());
}
q.pop();
q.pop();
q.pop();

console.log(q.front());