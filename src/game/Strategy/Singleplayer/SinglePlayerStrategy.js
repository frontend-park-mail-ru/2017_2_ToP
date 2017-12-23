import BaseStrategy from '../BaseStrategy';
import PreGame from '../../../components/Game/Stages/PreGame/PreGame';
import Recording from '../../../components/Game/Stages/Recording/Recording';
import Listening from '../../../components/Game/Stages/Listening/Listening';
import Ending from '../../../components/Game/Stages/Ending/Ending';
import SinglePlayerOfflineStrategy from './SinglePlayerOfflineStrategy';
import {BlobToB64} from '../../../modules/Base64Converter/Base64Converter';

import {PREGAME_DATA, RECORDING, LISTENING, RESULT} from '../../Constants/WebsocketTypes';
import {CONTINUE, NEWGAME, NO_INTERNET_ERROR} from '../../Constants/Game';
import {SINGLEPLAYER} from '../../../constants/Game';
import UserService from '../../../services/UserService/UserService';

export default class SinglePlayerStrategy extends BaseStrategy {
    constructor() {
        super(SINGLEPLAYER);

        if (!UserService.isLoggedIn()) {
            return this._startOffline();
        }

        this._socket.onmessage = this.onMessage.bind(this);

        this._socket.onclose = event => {
            console.log('closed');
            if (event.code === NO_INTERNET_ERROR) {
                this._startOffline();
            }
        };
    }

    onMessage({data: messageString}) {
        const message = JSON.parse(messageString);
        switch (message.type) {
            case PREGAME_DATA:
                return this._initPreGame();
            case RECORDING:
                return this._initRecordingPage(message.data);
            case LISTENING:
                return this._initListeningPage(message.data);
            case RESULT:
                return this._initEndingPage(message);
            default:
                console.log('Unexpected message', message);
                return null;
        }
    }

    _initRecordingPage(data) {
        const recordingPage = new Recording({musicBase64: data});
        recordingPage.getSubmitButton().addMultiEvents('click touchend', async () => {

            recordingPage.stopPlayer();
            this.next();

            const musicBlob = recordingPage.getMusicBlob();
            const musicBase64 = await BlobToB64(musicBlob);

            const result = {
                type: RECORDING,
                data: musicBase64
            };

            this.send(result);
        });
        this.stages.push(recordingPage);
        this.next();
    }

    _initListeningPage(data) {
        const listeningPage = new Listening({musicBase64: data});
        listeningPage.getSubmitButton().addMultiEvents('click touchend', () => {
            listeningPage.stopPlayer();
            this.next();

            const result = {
                type: LISTENING,
                data: listeningPage.getUserInput()
            };

            this.send(result);
        });
        this.stages.push(listeningPage);
        this.next();
    }

    _initEndingPage(data) {
        const endingPage = new Ending({isWin: data.result, score: data.score});
        endingPage.getBackButton().addMultiEvents('click touchend', () => {
            this.finish();
        });
        this.stages.push(endingPage);
        this.next();
    }

    _initPreGame() {
        const preGamePage = new PreGame();
        preGamePage.getNewGameButton().addMultiEvents('click touchend', () => {
            const result = {
                message: NEWGAME
            };

            this.send(result);
        });
        preGamePage.getContinueButton().addMultiEvents('click touchend', () => {
            const result = {
                message: CONTINUE
            };

            this.send(result);
        });
        this.stages.push(preGamePage);
        this.next();
    }

    _startOffline() {
        this._socket.close();
        Object.setPrototypeOf(this, SinglePlayerOfflineStrategy.prototype);
        this.init();
    }
}
