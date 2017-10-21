import backButton from './BackButton.xml';
import TopComponent from '../TopComponent/TopComponent';

import './BackButton.scss';

export default class BackButton extends TopComponent {
    constructor(data) {
        super('div', { 'class': 'back-button' }, data);

        this.getElement().innerHTML = backButton(this.getData());
    }
}
