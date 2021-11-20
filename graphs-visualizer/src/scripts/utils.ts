import { nodeSize } from "./visualizer";

export function createElement(
    tag: keyof HTMLElementTagNameMap,
    { className, id = null }
) {
    const element = document.createElement(tag);
    element.classList.add(...className.split(" "));
    if (id) {
        element.id = id;
    }
    return element;
}

export function createNode(id: number) {
    const element = createElement("div", {
        className: "border-2 border-black pointer bg-white",
        id: id,
    });
    element.style.width = nodeSize + "px";
    element.style.height = nodeSize + "px";
    return element;
}

export function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("resolved");
        }, ms);
    });
}
