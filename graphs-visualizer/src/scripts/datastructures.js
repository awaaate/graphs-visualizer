"use strict";
exports.__esModule = true;
exports.PriorityQueue = exports.Queue = void 0;
var Item = /** @class */ (function () {
    function Item(value) {
        this.value = value;
        this.nextItem = undefined;
    }
    return Item;
}());
var Queue = /** @class */ (function () {
    function Queue() {
        this.lastItem = undefined;
        this.firstItem = undefined;
        this._size = 0;
    }
    Queue.prototype.push = function (value) {
        var newItem = new Item(value);
        if (this._size == 0) {
            this.firstItem = newItem;
            this.lastItem = newItem;
        }
        else {
            this.lastItem.nextItem = newItem;
            this.lastItem = newItem;
        }
        this._size++;
    };
    Queue.prototype.front = function () {
        if (this._size == 0) {
            return undefined;
        }
        return this.firstItem.value;
    };
    Queue.prototype.pop = function () {
        if (this._size == 0) {
            return undefined;
        }
        if (this._size == 1) {
            this.firstItem = undefined;
            this.lastItem = undefined;
            this._size = 0;
        }
        else {
            this.firstItem = this.firstItem.nextItem;
            this._size--;
        }
    };
    Queue.prototype.size = function () {
        return this._size;
    };
    Queue.prototype["delete"] = function () {
        this._size = 0;
    };
    Queue.prototype.empty = function () {
        if (this._size == 0) {
            return true;
        }
        else {
            return false;
        }
    };
    return Queue;
}());
exports.Queue = Queue;
var HeapItem = /** @class */ (function () {
    function HeapItem(value) {
        this.items = [];
        this.value = value;
    }
    return HeapItem;
}());
var BinaryHeap = /** @class */ (function () {
    function BinaryHeap() {
        this.tree = [];
        this._rootIndex = 1;
        this._lastIndex = 0;
        this._indexToAdd = 1;
    }
    BinaryHeap.prototype.getParent = function (index) {
        return Math.floor(index / 2);
    };
    BinaryHeap.prototype.mount = function (index) {
        var parentIndex = this.getParent(index);
        if (index == this._rootIndex) {
            return;
        }
        if (this.tree[index].value <= this.tree[parentIndex].value) {
            return;
        }
        else {
            this.tree[index].value = this.tree[parentIndex].value ^ this.tree[index].value;
            this.tree[parentIndex].value = this.tree[parentIndex].value ^ this.tree[index].value;
            this.tree[index].value = this.tree[parentIndex].value ^ this.tree[index].value;
            this.mount(parentIndex);
        }
        return;
    };
    BinaryHeap.prototype.unmount = function (index) {
        if (typeof (this.tree[index * 2].value) == undefined && typeof (this.tree[index * 2 + 1].value) == undefined) {
            return;
        }
        if (typeof (this.tree[index * 2 + 1].value) == undefined) {
            if (this.tree[index].value < this.tree[index * 2].value) {
                this.tree[index * 2].value = this.tree[index].value ^ this.tree[index * 2].value;
                this.tree[index].value = this.tree[index].value ^ this.tree[index * 2].value;
                this.tree[index * 2].value = this.tree[index].value ^ this.tree[index * 2].value;
            }
            return;
        }
        if (this.tree[index].value > Math.max(this.tree[index * 2].value, this.tree[index * 2 + 1].value)) {
            return;
        }
        if (this.tree[index * 2].value > this.tree[index * 2 + 1].value) {
            this.tree[index * 2].value = this.tree[index].value ^ this.tree[index * 2].value;
            this.tree[index].value = this.tree[index].value ^ this.tree[index * 2].value;
            this.tree[index * 2].value = this.tree[index].value ^ this.tree[index * 2].value;
            this.unmount(index * 2);
        }
        else {
            this.tree[index * 2 + 1].value = this.tree[index].value ^ this.tree[index * 2 + 1].value;
            this.tree[index].value = this.tree[index].value ^ this.tree[index * 2 + 1].value;
            this.tree[index * 2 + 1].value = this.tree[index].value ^ this.tree[index * 2 + 1].value;
            this.unmount(index * 2 + 1);
        }
        return;
    };
    BinaryHeap.prototype.insert = function (value) {
        this.tree[this._indexToAdd] = new HeapItem(value);
        this.mount(this._indexToAdd);
        this._indexToAdd++;
        this._lastIndex++;
    };
    BinaryHeap.prototype.remove = function (index) {
        if (this._lastIndex == 0) {
            return;
        }
        if (this._lastIndex = 1) {
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
    };
    BinaryHeap.prototype.rootIndex = function () {
        return this._rootIndex;
    };
    BinaryHeap.prototype.rootValue = function () {
        return this.tree[this._rootIndex].value;
    };
    BinaryHeap.prototype.lastIndex = function () {
        return this._lastIndex;
    };
    return BinaryHeap;
}());
var PriorityQueue = /** @class */ (function () {
    function PriorityQueue() {
        this.Heap = new BinaryHeap();
        this._size = 0;
    }
    PriorityQueue.prototype.push = function (value) {
        this.Heap.insert(value);
        this._size++;
    };
    PriorityQueue.prototype.pop = function () {
        if (this._size == 0) {
            return;
        }
        this.Heap.remove(this.Heap.rootIndex());
        this._size--;
    };
    PriorityQueue.prototype.front = function () {
        if (this._size == 0) {
            return undefined;
        }
        return this.Heap.rootValue();
    };
    PriorityQueue.prototype.empty = function () {
        if (this._size == 0) {
            return true;
        }
        else {
            return false;
        }
    };
    PriorityQueue.prototype.size = function () {
        return this._size;
    };
    return PriorityQueue;
}());
exports.PriorityQueue = PriorityQueue;
var q = new PriorityQueue();
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
q.pop();
console.log(q.front());
