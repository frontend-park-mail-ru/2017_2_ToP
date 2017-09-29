import footer from './Footer.xml';
import TopComponent from '../TopComponent/TopComponent';

import './Footer.scss';

export default class Footer extends TopComponent {
    constructor() {
        super('footer');

        this.getElement().innerHTML = footer();
    }
}
