import menu from './Menu.xml';
import TopComponent from '../TopComponent/TopComponent';

export default class Menu extends TopComponent {
    constructor() {
        super('div', 'menu');
    }
    createMenu(data) {
        this.getElement().innerHTML = menu(data);
    }
}
