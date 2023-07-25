export default class HTMLElementFactory {
  static create(tagName: string, classes: string[], innerHTML?: string): HTMLElement {
    const element = document.createElement(tagName);

    if (classes && classes.length > 0) {
      element.classList.add(...classes);
    }

    if (innerHTML) {
      element.innerHTML = innerHTML;
    }

    return element;
  }
}
