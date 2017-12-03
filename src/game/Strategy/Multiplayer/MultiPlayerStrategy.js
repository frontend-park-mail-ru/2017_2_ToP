import BaseStrategy from '../BaseStrategy';
import Recording from '../../../components/Game/Stages/Recording/Recording';
import Listening from '../../../components/Game/Stages/Listening/Listening';
import Ending from '../../../components/Game/Stages/Ending/Ending';
import Waiting from '../../../components/Game/Stages/Waiting/Waiting';

import {RECORDNG_MESSAGE, READY_MESSAGE1, READY_MESSAGE2, GOT_RESULT} from '../../Constants/Multiplayer';

export default class MultiPlayerStrategy extends BaseStrategy {
    constructor() {
        super('apoj.herokuapp.com/multiplayer');

        this._socket.onopen = () => {
            this._socket.onmessage = this.onMessage;
        };

        this.role = null;
        this.secondUser = null;
    }

    onMessage({data: message}) {
        switch (message.type) {
            case 'preGameData':
                return this._initPreGame(message.data);
            case 'Recording':
                return this._initRecordingPage(message.data);
            case 'Listening':
                return this._listening(message.data);
            case 'SecondListening':
                return this._secondListening(message.data);
            case 'Result':
                return this._initEndingPage(message.data);
            default:
                return null;
        }
    }

    _initPreGame(data) {
        this.role = data.role;
        this.secondUser = data.secondUser;
        if (this.role === 'listener') {
            this._initWaitingPage();
        }
    }

    _initWaitingPage() {
        const waitingPage = new Waiting(RECORDNG_MESSAGE);
        this.stages.push(waitingPage);
        this.next();
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

            if (this.role === 'singer') {
                this._initWaitingPage();
            }
        });
        this.stages.push(recordingPage);
        this.next();
    }

    _listening(data) {
        if (this.role === 'singer') {
            this.stage.addAudio(data, READY_MESSAGE1);
        } else {
            this._initListeningPage();
        }
    }

    _secondListening(data) {
        this.stage.addAudio(data, READY_MESSAGE2);
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
}
