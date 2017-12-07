import BaseStrategy from '../BaseStrategy';
import Recording from '../../../components/Game/Stages/Recording/Recording';
import Listening from '../../../components/Game/Stages/Listening/Listening';
import Ending from '../../../components/Game/Stages/Ending/Ending';
import Waiting from '../../../components/Game/Stages/Waiting/Waiting';
import {b64toBlob, BlobToB64} from '../../../modules/Base64Converter/Base64Converter';


import {PREGAME_DATA, RECORDING, SECOND_RECORDING, LISTENING, RESULT} from '../../Constants/WebsocketTypes';
import {SINGER, LISTENER, RECORDNG_MESSAGE, READY_MESSAGE1, READY_MESSAGE2} from '../../Constants/Multiplayer';
import {MULTIPLAYER} from '../../../constants/Game';

export default class MultiPlayerStrategy extends BaseStrategy {
    constructor() {
        super(MULTIPLAYER);

        this._socket.onmessage = this.onMessage.bind(this);

        this.role = null;
        this.secondUser = null;
    }

    onMessage({data: message_string}) {
        const message = JSON.parse(message_string);
        console.log(message);
        switch (message.type) {
            case PREGAME_DATA:
                return this._initPreGame(message);
            case RECORDING:
                return this._initRecordingPage(message.data);
            case SECOND_RECORDING:
                return this._recording(message.data);
            case LISTENING:
                return this._listening(message.data);
            case RESULT:
                return this._initEndingPage(message);
            default:
                console.log('Unexpected message', message);
                return null;
        }
    }

    _initPreGame(data) {
        this.role = data.role;
        this.secondUser = data.secondUser;
        if (this.role === LISTENER) {
            this._initWaitingPage();
        }
    }

    _initWaitingPage() {
        const waitingPage = new Waiting(RECORDNG_MESSAGE);
        this.stages.push(waitingPage);
        this.next();
    }

    _initRecordingPage(data) {
        const blob = b64toBlob(data, 'audio/wav');
        const src = (window.URL || window.webkitURL).createObjectURL(blob);

        const recordingPage = new Recording({musicSource: src});
        recordingPage.getSubmitButton().addEventListener('click', async () => {
            if (!recordingPage.haveRecord()) {
                return;
            }

            recordingPage.stopPlayer();
            this.next();

            const musicBlob = recordingPage.getMusicBlob();
            const musicBase64 = await BlobToB64(musicBlob);

            const result = {
                type: this.role === SINGER ? RECORDING : SECOND_RECORDING,
                data: musicBase64
            };

            this.send(result);

            if (this.role === SINGER) {
                this._initWaitingPage();
            }
        });
        this.stages.push(recordingPage);
        this.next();
    }

    _recording(data) {
        const blob = b64toBlob(data, 'audio/wav');
        const src = (window.URL || window.webkitURL).createObjectURL(blob);

        if (this.role === SINGER) {
            this.stage.addAudio(src, READY_MESSAGE1);
        } else {
            this._initRecordingPage(data);
        }
    }

    _listening(data) {
        const blob = b64toBlob(data, 'audio/wav');
        const src = (window.URL || window.webkitURL).createObjectURL(blob);

        if (this.role === SINGER) {
            this.stage.addAudio(src, READY_MESSAGE2);
        } else {
            this._initListeningPage(src);
        }
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

            this.send(result);
        });
        this.stages.push(listeningPage);
        this.next();
    }

    _initEndingPage(data) {
        const endingPage = new Ending({isWin: data.result, score: data.score});
        endingPage.getBackButton().addEventListener('click', () => {
            this.finish();
        });

        const nextStage = () => {
            this.stages.push(endingPage);
            this.next();
        };

        if (this.role === SINGER) {
            this.stage.ready();
            this.getResultButton.addEventListener('click', nextStage.bind(this));
        } else {
            nextStage();
        }
    }
}
