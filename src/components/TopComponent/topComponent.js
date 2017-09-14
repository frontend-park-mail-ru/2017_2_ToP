export default class TopComponent {
    constructor(name = 'div') {
        this._component = document.createElement(name);
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
}

