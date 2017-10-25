import TopComponent from '../../../TopComponent/TopComponent';
import GameText from '../../GameText/GameText';
import AudioPlayer from '../../AudioPlayer/AudioPlayer';
import RecordPlayer from '../../RecordPlayer/RecordPlayer';
import Button from '../../../Button/Button';

import './Recording.scss';

const textData = {
    texts: [
        'Прослушайте фрагмент песни и когда будете готовы, начните его запись.',
        'Постарайтесь уложиться в 10 секунд.'
    ],
    buttons: [
        {
            url: '',
            text: 'Отправить!'
        }
    ]
};

export default class Recording extends TopComponent {
    constructor(data) {
        super('div', {'class': 'recording-page'}, data);
        this._textData = textData;
    }

    getMusicURL() {
        return this._components[3].getMusicURL();
    }

    getSubmitButton() {
        return this._components[4].getElement();
    }

    stopPlayer() {
        this._components[1].remove();
        this._components[3].stop();
    }

    //  TODO : Проверка на существование записи и вывод ошибок
    check() {
        return true;
    }

    getMusic() {
        this._components[1].setSource('/music');
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
            new RecordPlayer(),
            new Button(
                this._textData.buttons[0].text,
                this._textData.buttons[0].url
            )
        ];

        this._components.forEach(element => {
            this.append(element.render());
        });
        this.getMusic();

        return this.getElement();
    }
}