export default class TopComponent {
    constructor() {
        this._component = document.createElement('div');
    }

    hide() {
        this._component.style.display = 'none';
    }

    show() {
        this._component.style.display = 'block';
    }

    render() {
        return this._component;
    }

    remove() {
        this._component.parent.removeChild();
    }

    getElement() {
        return this._component;
    }
}

