import TopComponent from '../../../TopComponent/TopComponent';
import GameText from '../../GameText/GameText';
import AudioPlayer from '../../AudioPlayer/AudioPlayer';
import GameInput from '../../GameInput/GameInput';
import Button from '../../../Button/Button';

import {LISTENING_TEXT1, LISTENING_TEXT2, TITLE_INPUT, SEND_BUTTON} from '../../../../constants/Stages';

import './Listening.scss';

const textData = {
    fields: [TITLE_INPUT]
};

export default class Listening extends TopComponent {
    constructor(data) {
        super('div', {class: 'listening-stage'}, data);
        this._textData = textData;
        this._build();
    }

    getUserInput() {
        return this.getElement().querySelector('.game-input__form_song-input').value;
    }

    getSubmitButton() {
        return this._components[4].getElement();
    }

    stopPlayer() {
        this._components[1].remove();
    }

    render() {
        return this.getElement();
    }

    _build() {
        this._components = [
            new GameText({text: LISTENING_TEXT1}),
            new AudioPlayer(this.getData()),
            new GameText({text: LISTENING_TEXT2}),
            new GameInput(this._textData),
            new Button(SEND_BUTTON)
        ];

        this._components.forEach(element => {
            this.append(element.render());
        });

        this._initInput();
    }

    _initInput() {
        const gameInput = this._components[3].getElement();
        const submitButton = this._components[4].getElement();

        gameInput.addEventListener('keydown', event => {
            if (event.keyCode === 13) {
                event.preventDefault();
                submitButton.click();
            }
        });
    }
}