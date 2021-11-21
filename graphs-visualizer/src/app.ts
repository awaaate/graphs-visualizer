import { generateMaze } from "./scripts/better_maze-generator";
import { Graph } from "./scripts/graph_types";
import { runBFS } from "./scripts/runBFS";
import { createGridGraph, makeGrid } from "./scripts/visualizer";
const appElement = document.getElementById("app");
const graph = generateMaze(createGridGraph((new Graph())));

appElement.appendChild(graph.element);

const sourceInput = document.getElementById("sourceInput") as HTMLInputElement;
const targetInput = document.getElementById("targetInput") as HTMLInputElement;
const bfsForm = document.getElementById("bfsForm");

bfsForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (graph.running) {
        return;
    }
    console.log(graph);
    runBFS(graph, sourceInput.valueAsNumber, targetInput.valueAsNumber);
});

const o = { name: "tomas" };

function hello(func) {
    console.log(func());
    return func;
}
const modifedHello1 = hello((a) => o.name);

o.name = "eloi";
const modifedHello2 = hello((a) => o.name);

modifedHello1();
modifedHello2();
