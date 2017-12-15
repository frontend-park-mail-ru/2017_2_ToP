import TopComponent from '../../../TopComponent/TopComponent';
import Menu from '../../../Menu/Menu';

import {NEWGAME_BUTTON, CONTINUE_BUTTON} from '../../../../constants/Stages';

const preGameData = {
    buttons: [
        CONTINUE_BUTTON,
        NEWGAME_BUTTON
    ]
};

export default class PreGame extends TopComponent {
    constructor() {
        super('div', {class: 'preGame-stage'}, preGameData);
        this._build();
    }

    getSubmitButton() {
        return this._components[4].getElement();
    }

    render() {
        return this.getElement();
    }

    _build() {
        this.menu = new Menu(this.getData());
        this.menu.renderTo('content');

        this.append(this.menu.render());
    }

    getNewGameButton() {
        const buttons = this.menu.getElement().getElementsByClassName('button');
        return buttons[0];
    }

    getContinueButton() {
        const buttons = this.menu.getElement().getElementsByClassName('button');
        return buttons[1];
    }
}
