import TopComponent from '../../components/TopComponent/TopComponent';

import RecordingPage from '../../components/Game/Stages/Recording/Recording';
import ListeningPage from '../../components/Game/Stages/Listening/Listening';
import EndingPage from '../../components/Game/Stages/Ending/Ending';
import Menu from '../../components/Menu/Menu';

import UserService from '../../services/UserService/UserService';
import router from '../../modules/Router/Router';

const preGameData = {
    buttons: [
        {
            text: 'Продолжить',
            url: ''
        },
        {
            text: 'Начать новую',
            url: ''
        }
    ]
};

export default class SinglePlayer extends TopComponent {
    constructor() {
        super('div', {}, preGameData);
    }

    show() {
        if (!(UserService.isLoggedIn())) {
            router.go('/');
            return;
        }

        this._initPreGame();

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

    _initPreGame() {
        if (this._endGame || !this._components[0]) {
            return;
        }

        this._previousPage = this._components[0];

        this._components = [new Menu(this.getData())];
        const menu = this._components[0];
        menu.renderTo('content');

        const buttons = menu.getElement().getElementsByClassName('button');
        buttons[0].addEventListener('click', () => {
            menu.remove();
            this._components = [this._previousPage];
            this._components.forEach(element => element.show());
        });
        buttons[1].addEventListener('click', () => {
            menu.remove();
            this._previousPage.remove();
            this._components = [];
            this.build();
        });
    }

    _initRecordingPage() {
        this._endGame = false;
        const recordingPage = this._components[0];

        recordingPage.getSubmitButton().addEventListener('click', () => {
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
        });
    }

    _initListeningPage(listeningPage) {
        listeningPage.getSubmitButton().addEventListener('click', async () => {
            const isWin = await listeningPage.check();
            listeningPage.hide();
            listeningPage.stopPlayer();
            listeningPage.remove();

            this._components = [
                new EndingPage({
                    'isWin': isWin
                })];
            this._components.forEach(element => element.renderTo('content'));
            this._endGame = true;
        });
    }
}
