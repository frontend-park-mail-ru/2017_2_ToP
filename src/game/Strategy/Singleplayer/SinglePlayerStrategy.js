import BaseStrategy from '../BaseStrategy';
import PreGame from '../../../components/Game/Stages/PreGame/PreGame';
import Recording from '../../../components/Game/Stages/Recording/Recording';
import Listening from '../../../components/Game/Stages/Listening/Listening';
import Ending from '../../../components/Game/Stages/Ending/Ending';
import SinglePlayerOfflineStrategy from './SinglePlayerOfflineStrategy';

import {PREGAME_DATA, RECORDING, LISTENING, RESULT} from '../../Constants/WebsocketTypes';
import {RIGHT, CONTINUE, NEWGAME} from '../../Constants/Game';

export default class SinglePlayerStrategy extends BaseStrategy {
    constructor() {
        super('apoj.herokuapp.com/singleplayer');

        this._socket.onopen = () => {
            this._socket.onmessage = this.onMessage;
        };

        this._socket.onclose = event => {
            if (event.code === 1006) {
                delete this._socket;
                Object.setPrototypeOf(this, SinglePlayerOfflineStrategy.prototype);
                this.init();
            }
        };
    }

    onMessage(event) {
        switch (event.data.type) {
            case PREGAME_DATA:
                return this._initPreGame();
            case RECORDING:
                return this._initRecordingPage(event.data.data);
            case LISTENING:
                return this._initListeningPage(event.data.data);
            case RESULT:
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
                type: RECORDING,
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
                type: LISTENING,
                data: listeningPage.getUserInput()
            };

            this._socket.send(result);
        });
        this.stages.push(listeningPage);
        this.next();
    }

    _initEndingPage(data) {
        const endingPage = new Ending({isWin: data.message === RIGHT, score: data.score});
        endingPage.getBackButton().addEventListener('click', () => {
            this.finish();
        });
        this.stages.push(endingPage);
        this.next();
    }

    _initPreGame() {
        const preGamePage = new PreGame();
        preGamePage.getNewGameButton().addEventListener('click', () => {
            const result = {
                message: NEWGAME
            };

            this._socket.send(result);
        });
        preGamePage.getContinueButton().addEventListener('click', () => {
            const result = {
                message: CONTINUE
            };

            this._socket.send(result);
        });
        this.stages.push(preGamePage);
        this.next();
    }
}
