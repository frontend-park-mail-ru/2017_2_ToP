export default class TopComponent {
    constructor(name = 'div', _class = '') {
        this._component = document.createElement(name);
        if (_class) {
            this._component.classList.add(_class);
        }
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
}

