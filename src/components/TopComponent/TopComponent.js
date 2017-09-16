export default class TopComponent {
    constructor(tagName = 'div', attrs = {}, data = {}) {
        this._component = document.createElement(tagName);

        for (let name in attrs) {
            this._component.setAttribute(name, attrs[name]);
        }

        this.setData(data);
    }

    setData(data) {
        this._data = data;
    }

    getData() {
        return this._data;
    }

    setText(text) {
        this._component.textContent = text;
    }

    hide() {
        this._component.style.display = 'none';
    }

    show() {
        this._component.style.display = 'block';
    }

    render() {
        return this.getElement();
    }

    remove() {
        this._component.parent.removeChild();
    }

    getElement() {
        return this._component;
    }

    renderTo(className) {
        document.getElementsByClassName(className)[0].appendChild(this.render());
    }

    append(element) {
        this.getElement().appendChild(element);
    }

    _innerHTML(template) {
        this._component.innerHTML = template;
    }
}
