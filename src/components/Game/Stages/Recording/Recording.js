import TopComponent from '../../../TopComponent/TopComponent';
import GameText from '../../GameText/GameText';
import AudioPlayer from '../../AudioPlayer/AudioPlayer';
import RecordPlayer from '../../RecordPlayer/RecordPlayer';
import Button from '../../../Button/Button';

import './Recording.scss';

const textData = {
    texts: [
        'Прослушайте фрагмент песни, вам необходимо его спеть. Когда будете готовы, начните запись.',
        'Постарайтесь уложиться в 10 секунд.'
    ],
    buttons: [
        {
            url: '',
            text: 'Отправить',
            class: 'button-form'
        }
    ]
};

export default class Recording extends TopComponent {
    constructor(data) {
        super('div', {'class': 'recording-stage'}, data);
        this._textData = textData;
        this._build();
    }

    getMusicURL() {
        return this._components[3].getMusicURL();
    }

    getMusicBlob() {
        return this._components[3].getMusicBlob();
    }

    getSubmitButton() {
        return this._components[4].getElement();
    }

    stopPlayer() {
        this._components[1].remove();
        this._components[3].stop();
    }

    getMusic() {
        this._components[1].setSource(this.getData().musicSource);
    }

    render() {
        return this.getElement();
    }

    _build() {
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
                this._textData.buttons[0].url,
                this._textData.buttons[0].class
            )
        ];

        this._components.forEach(element => {
            this.append(element.render());
        });
        this.getMusic();

        this._initPlayers();

    }

    _initPlayers() {
        const audioButton = this._components[1].getButton();
        const recordButton = this._components[3].getButton();

        audioButton.addEventListener('click', () => {
            this._components[3].stop();
        });

        recordButton.addEventListener('click', () => {
            this._components[1].stop();
        });
    }
}