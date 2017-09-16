import TopComponent from '../TopComponent/TopComponent';
import Button from '../Button/Button';

export default class Menu extends TopComponent {
    constructor() {
        super('div', 'menu');
        // this.buttons = [];
    }
    createMenu(data) {
        data.buttons.forEach(el => {
            const button = new Button(el.text, el.url);
            this.append(button.render());
        });
    }
}
