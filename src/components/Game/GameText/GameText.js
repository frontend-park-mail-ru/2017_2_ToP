import gameText from './GameText.xml';
import TopComponent from '../../TopComponent/TopComponent';

import './GameText.scss';

export default class GameText extends TopComponent {
    constructor(data) {
        super('div', { 'class': 'game-text' }, data);

        this.getElement().innerHTML = gameText(this.getData());
    }
}
