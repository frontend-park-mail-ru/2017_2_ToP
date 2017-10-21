import gameInput from './GameInput.xml';
import TopComponent from '../../TopComponent/TopComponent';

import './GameInput.scss';

export default class GameInput extends TopComponent {
    constructor(data) {
        super('div', {'class': 'game-input'}, data);

        this.getElement().innerHTML = gameInput(this.getData());
    }
}