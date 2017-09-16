import header from './Header.xml';
import TopComponent from '../TopComponent/TopComponent';

export default class Header extends TopComponent {
    constructor() {
        super('div', { 'class': 'header' });

        this.getElement().innerHTML = header();
    }
}
