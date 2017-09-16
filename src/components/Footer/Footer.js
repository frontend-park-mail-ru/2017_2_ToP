import footer from './Footer.xml';
import TopComponent from '../TopComponent/TopComponent';

export default class Footer extends TopComponent {
    constructor() {
        super('footer');

        this.getElement().innerHTML = footer();
    }
}
