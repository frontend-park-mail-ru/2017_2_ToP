import menu from './Menu.xml';

import TopComponent from '../TopComponent/TopComponent';
import Button from '../Button/Button';

export default class Menu extends TopComponent {
    constructor(data) {
        super('div', {'class': 'menu'}, data);
    }

    render() {
        this.getElement().innerHTML = menu(this.getData());
        this.getData().buttons.forEach(el => {
            const button = new Button(el.text, el.url);
            this.append(button.render());
        });
        return this.getElement();
    }
}
