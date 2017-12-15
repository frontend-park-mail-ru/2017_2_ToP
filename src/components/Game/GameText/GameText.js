import gameText from './GameText.xml';
import TopComponent from '../../TopComponent/TopComponent';

import './GameText.scss';

export default class GameText extends TopComponent {
    constructor(data) {
        super('div', {class: 'game-text'}, data);

        this.setText(this.getData());
    }

    setText(text) {
        this.getElement().innerHTML = gameText(text);
    }
}
