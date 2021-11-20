import { Graph } from "./scripts/graph_types";
import { runBFS } from "./scripts/runBFS";
import { createGridGraph, makeGrid } from "./scripts/visualizer";
const appElement = document.getElementById("app");
const graph = createGridGraph(new Graph());

appElement.appendChild(graph.element);

const sourceInput = document.getElementById("sourceInput") as HTMLInputElement;
const targetInput = document.getElementById("targetInput") as HTMLInputElement;
const bfsForm = document.getElementById("bfsForm");

bfsForm.addEventListener("submit", (e) => {
    e.preventDefault()
    runBFS(graph, sourceInput.valueAsNumber, targetInput.valueAsNumber);
});
