import BaseStrategy from '../BaseStrategy';
import Recording from '../../../components/Game/Stages/Recording/Recording';
import Listening from '../../../components/Game/Stages/Listening/Listening';
import Ending from '../../../components/Game/Stages/Ending/Ending';

export default class SinglePlayerStrategy extends BaseStrategy {
    constructor() {
        super('apoj.herokuapp.com/singleplayer');
        this._socket.onmessage = this.onMessage;
    }

    onMessage(event) {
        switch (event.data.type) {
            case 'preGameData':
                return this._initPreGame(event.data.data);
            case 'Recording':
                return this._initRecordingPage(event.data.data);
            case 'Listening':
                return this._initListeningPage(event.data.data);
            case 'Result':
                return this._initEndingPage(event.data.data);
            default:
                return null;
        }
    }

    _initRecordingPage(data) {
        const recordingPage = new Recording({musicSource: data});
        recordingPage.getSubmitButton().addEventListener('click', () => {
            recordingPage.hide();
            recordingPage.stopPlayer();

            const musicBlob = recordingPage.getMusicBlob();

            const result = {
                type: 'Recording',
                data: musicBlob
            };

            this._socket.send(result);
        });
        this.stages.push(recordingPage);
        this.next();
    }

    _initListeningPage(data) {
        const listeningPage = new Listening({musicSource: data});
        listeningPage.getSubmitButton().addEventListener('click', () => {
            listeningPage.hide();
            listeningPage.stopPlayer();

            const result = {
                type: 'Listening',
                data: listeningPage.getUserInput()
            };

            this._socket.send(result);
        });
        this.stages.push(listeningPage);
        this.next();
    }

    _initEndingPage(data) {
        const endingPage = new Ending({isWin: data.message === 'right', score: data.score});
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
