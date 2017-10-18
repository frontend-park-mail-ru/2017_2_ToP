import TopComponent from '../../components/TopComponent/TopComponent';

import RecordingPage from '../../components/Game/RecordingPage/RecordingPage';
import ListeningPage from '../../components/Game/ListeningPage/ListeningPage';
import GameText from '../../components/Game/GameText/GameText';

export default class SinglePlayer extends TopComponent {
    constructor() {
        super('div', {});
    }

    show() {
        if (this._components) {
            this._components.forEach(element => element.show());
        } else {
            this.build();
        }
    }

    hide() {
        if (this._components) {
            this._components.forEach(element => element.hide());
        }
    }

    build() {
        this._components = [
            new RecordingPage()
        ];
        this._components[0].renderTo('content');
        this._initRecordingPage();
    }

    _initRecordingPage() {
        this._recordingPage = this._components[0];
        this._listeningPage;

        this._recordingPage.getSubmitButton().addEventListener('click', () => {
            //  Всякие проверки на есть ли запись и вывод ошибок осуществлять в самом RecordingPage
            if (this._recordingPage.check()) {
                this._recordingPage.hide();

                const musicURL = this._recordingPage.getMusicURL();
                this._components.push(new ListeningPage({
                    musicSource: musicURL
                }));

                this._listeningPage = this._components[1];
                this._listeningPage.renderTo('content');
                this._initListeningPage();
            }
        });
    }

    _initListeningPage() {
        this._listeningPage.getSubmitButton().addEventListener('click', () => {
            if (this._listeningPage.check()) {
                this._listeningPage.hide();

                this._components.push(new GameText({
                    text: 'Спасибо, что прошли нашу игру!'
                }));
                this._components[2].renderTo('content');
            }
        });
    }
}