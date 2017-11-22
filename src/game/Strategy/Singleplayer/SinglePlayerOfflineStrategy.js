import BaseStrategy from '../BaseStrategy';
import Recording from '../../../components/Game/Stages/Recording/Recording';
import Listening from '../../../components/Game/Stages/Listening/Listening';
import Ending from '../../../components/Game/Stages/Ending/Ending';

const music = [
    'badtrip',
    'Владимирский централ'
];

export default class SinglePlayerOfflineStrategy extends BaseStrategy {
    constructor() {
        super();
    }

    init() {
        const fileId = Math.floor(Math.random() * Object.keys(music).length);
        this.title = music[fileId];
        this.file = `/static/music/${this.title}.mp3`;

        this._initRecordingPage(this.file);
    }

    _initRecordingPage(data) {
        const recordingPage = new Recording({musicSource: data});
        recordingPage.getSubmitButton().addEventListener('click', () => {
            recordingPage.hide();
            recordingPage.stopPlayer();

            const musicURL = recordingPage.getMusicURL();

            this._initListeningPage(musicURL);
        });
        this.stages.push(recordingPage);
        this.next();
    }

    _initListeningPage(data) {
        const listeningPage = new Listening({musicSource: data});
        listeningPage.getSubmitButton().addEventListener('click', () => {
            listeningPage.hide();
            listeningPage.stopPlayer();

            const answer = listeningPage.getUserInput();
            const isWin = this.title.toLowerCase() === answer.toLowerCase() ? 'right' : 'wrong';

            const result = {
                message: isWin
            };

            this._initEndingPage(result);
        });
        this.stages.push(listeningPage);
        this.next();
    }

    _initEndingPage(data) {
        const endingPage = new Ending({isWin: data.message === 'right', isOffline: true});
        endingPage.getBackButton().addEventListener('click', () => {
            this.finish();
        });
        this.stages.push(endingPage);
        this.next();
    }

    _initPreGame(data) {
        // TODO: сделать компоненту PreGame
        // if (this._endGame || !this._components[0]) {
        //     return;
        // }
        //
        // this._previousPage = this._components[0];
        //
        // this._components = [new Menu(this.getData())];
        // const menu = this._components[0];
        // menu.renderTo('content');
        //
        // const buttons = menu.getElement().getElementsByClassName('button');
        // buttons[0].addEventListener('click', () => {
        //     menu.remove();
        //     this._components = [this._previousPage];
        //     this._components.forEach(element => element.show());
        // });
        // buttons[1].addEventListener('click', () => {
        //     menu.remove();
        //     this._previousPage.remove();
        //     this._components = [];
        //     this.build();
        // });
    }
}
