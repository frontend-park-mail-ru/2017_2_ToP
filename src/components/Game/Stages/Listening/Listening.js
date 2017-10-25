import TopComponent from '../../../TopComponent/TopComponent';
import GameText from '../../GameText/GameText';
import AudioPlayer from '../../AudioPlayer/AudioPlayer';
import GameInput from '../../GameInput/GameInput';
import Button from '../../../Button/Button';
import Transport from '../../../../modules/Transport/Transport';
import UserService from '../../../../services/UserService/UserService';

import './Listening.scss';

const textData = {
    method: 'post',
    fields: [
        {
            type: 'text',
            placeholder: 'Введите название песни...',
            class: 'song-input'
        }
    ],
    texts: [
        'Записи склеены и перевернуты!',
        'Сможете ли угадать оригинал?'
    ],
    buttons: [
        {
            url: '',
            text: 'Отправить!'
        }
    ]
};

export default class Listening extends TopComponent {
    constructor(data) {
        super('div', {'class': 'listening-page'}, data);
        this._textData = textData;
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

    async check() {
        const response = await Transport.post('/music', {'title': this.getUserInput()});

        if (response.message === 'right') {
            UserService.setScore('single', response.score);
            return true;
        }

        return false;
    }

    render() {
        this._components = [
            new GameText({
                text: this._textData.texts[0]
            }),
            new AudioPlayer(this.getData()),
            new GameText({
                text: this._textData.texts[1]
            }),
            new GameInput(this._textData),
            new Button(
                this._textData.buttons[0].text,
                this._textData.buttons[0].url
            )
        ];

        this._components.forEach(element => {
            this.append(element.render());
        });

        return this.getElement();
    }
}