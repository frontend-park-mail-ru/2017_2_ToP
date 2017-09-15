import menu from './menu.xml';
import TopComponent from '../TopComponent/topComponent';

export default class Menu extends TopComponent {
    constructor() {
        super('div', 'menu');
    }
    createMenu(data) {
        this.getElement().innerHTML = menu(data);
    }
}
