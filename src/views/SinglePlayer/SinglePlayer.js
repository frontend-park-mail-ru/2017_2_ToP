import TopComponent from '../../components/TopComponent/TopComponent';

import RecordingPage from '../../components/Game/RecordingPage/RecordingPage';
import ListeningPage from '../../components/Game/ListeningPage/ListeningPage';
import GameText from '../../components/Game/GameText/GameText';

import UserService from '../../services/UserService/UserService';
import router from '../../modules/Router/Router';

export default class SinglePlayer extends TopComponent {
    constructor() {
        super('div', {});
    }

    show() {
        if (!(UserService.isLoggedIn())) {
            router.go('/');
        } else if (this._endGame) {
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
        if (!(UserService.isLoggedIn())) {
            router.go('/');
            return;
        }
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
            if (recordingPage.check()) {
                recordingPage.hide();
                recordingPage.stopPlayer();

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
                listeningPage.stopPlayer();
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