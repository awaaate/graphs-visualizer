export function createElement(
    tag: keyof HTMLElementTagNameMap,
    { className, id = null }
) {
    const element = document.createElement(tag);
    element.classList.add(className);
    if (id) {
        element.id = id;
    }
    return element
}
