import TopComponent from '../../components/TopComponent/TopComponent';

import RecordingPage from '../../components/Game/RecordingPage/RecordingPage';
import ListeningPage from '../../components/Game/ListeningPage/ListeningPage';
import GameText from '../../components/Game/GameText/GameText';

export default class SinglePlayer extends TopComponent {
    constructor() {
        super('div', {});
    }

    show() {
        if (this._endGame) {
            this._components.forEach(element => element.remove());
            this._components = [];
            this.build();
        } else if (this._components) {
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
        this._endGame = false;
        const recordingPage = this._components[0];

        recordingPage.getSubmitButton().addEventListener('click', () => {
            //  Всякие проверки на есть ли запись и вывод ошибок осуществлять в самом RecordingPage
            if (recordingPage.check()) {
                recordingPage.hide();

                const musicURL = recordingPage.getMusicURL();
                recordingPage.remove();

                this._components = [
                    new ListeningPage({
                        musicSource: musicURL
                    })];

                const listeningPage = this._components[0];
                listeningPage.renderTo('content');
                this._initListeningPage(listeningPage);
            }
        });
    }

    _initListeningPage(listeningPage) {
        listeningPage.getSubmitButton().addEventListener('click', () => {
            if (listeningPage.check()) {
                listeningPage.hide();
                listeningPage.remove();

                this._components = [
                    new GameText({
                        text: 'Спасибо, что прошли нашу игру!'
                    })];
                this._components[0].renderTo('content');
                this._endGame = true;
            }
        });
    }
}