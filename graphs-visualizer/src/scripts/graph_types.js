"use strict";
exports.__esModule = true;
exports.Graph = exports.Node = exports.INF = void 0;
var datastructures_1 = require("./datastructures");
exports.INF = 8007199254740991; //normal intmax 
var Edge = /** @class */ (function () {
    function Edge(to, weight) {
        this.to = to;
        this.weight = weight;
    }
    return Edge;
}());
var Node = /** @class */ (function () {
    function Node(id) {
        //this.element = document.createElement("span");
        //this.element.id = id.toString();
        //this.element.textContent = id.toString();
        this.adjList = [];
        this.id = id;
        this.visited = false;
        this.distance = exports.INF;
    }
    return Node;
}());
exports.Node = Node;
//EVERYTHING WORKS WITH 0 INDEXATION;
var Graph = /** @class */ (function () {
    function Graph(n) {
        this.clean = false;
        this.id_node = [];
        this.size = n;
        this.create(n);
        this.cleanGraph();
    }
    Graph.prototype.create = function (n) {
        //created the graph of size n;
        //pushes all nodes to the node list;
        this.size = n;
        for (var i = 0; i < n; ++i) {
            this.id_node.push(new Node(i));
        }
    };
    Graph.prototype.cleanGraph = function () {
        //Resets the every node of the graph to 0 distance and not visited;
        //sets clean to true;
        if (this.clean)
            return;
        for (var i = 0; i < this.size; ++i) {
            this.id_node[i].visited = false;
            this.id_node[i].distance = exports.INF;
        }
        this.clean = true;
    };
    Graph.prototype.addEdge = function (a, b, undirected, w) {
        if (undirected === void 0) { undirected = true; }
        if (w === void 0) { w = 1; }
        //Adds a node to the graph;
        this.id_node[a].adjList.push(new Edge(b, w));
        if (undirected) {
            this.id_node[b].adjList.push(new Edge(a, w));
        }
    };
    Graph.prototype.runBFS = function (sourceId, targetId) {
        //runs BFS
        this.cleanGraph();
        this.clean = false;
        var q = new datastructures_1.Queue();
        var q2 = new datastructures_1.Queue();
        var par = [];
        for (var i = 0; i < this.size; ++i) {
            par[i] = i;
        }
        q2.push(0);
        q.push(sourceId);
        this.id_node[sourceId].distance = 0;
        var currentStage = 1;
        var found = false;
        while (!q.empty()) {
            var curr = q.front();
            console.log(curr);
            if (currentStage != q2.front()) {
                currentStage = q2.front();
                if (found) {
                    console.log("FOUND");
                    break;
                }
            }
            this.id_node[curr].visited = true;
            q.pop();
            for (var _i = 0, _a = this.id_node[curr].adjList; _i < _a.length; _i++) {
                var to = _a[_i];
                if (this.id_node[to.to].visited === false) {
                    this.id_node[to.to].distance = this.id_node[curr].distance + 1;
                    par[to.to] = curr;
                    if (to.to == targetId) {
                        found = true;
                    }
                    q.push(to.to);
                    q2.push(currentStage + 1);
                }
            }
            q2.pop();
        }
        console.log(this.id_node[targetId].distance);
    };
    Graph.prototype.runDjikstra = function (sourceId, targetId) {
        var _a;
        this.cleanGraph();
        this.clean = false;
        var q = new datastructures_1.PriorityQueue();
        var par = [];
        for (var i = 0; i < this.size; ++i) {
            par[i] = i;
        }
        q.push(0, sourceId);
        this.id_node[sourceId].distance = 0;
        while (!q.empty()) {
            var curr = void 0, w = void 0;
            console.log("START");
            _a = q.front(), w = _a[0], curr = _a[1];
            w = -w;
            if (curr === targetId) {
                break;
            }
            q.pop();
            if (this.id_node[curr].distance != w)
                continue;
            for (var _i = 0, _b = this.id_node[curr].adjList; _i < _b.length; _i++) {
                var edge = _b[_i];
                if (w + edge.weight < this.id_node[edge.to].distance) {
                    this.id_node[edge.to].distance = w + edge.weight;
                    par[edge.to] = curr;
                    console.log(-this.id_node[edge.to].distance);
                    console.log(q);
                    q.push(-this.id_node[edge.to].distance, edge.to);
                }
            }
        }
        console.log(this.id_node[targetId].distance);
    };
    return Graph;
}());
exports.Graph = Graph;
