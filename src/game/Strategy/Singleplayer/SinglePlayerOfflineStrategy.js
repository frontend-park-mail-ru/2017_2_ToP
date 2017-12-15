import BaseStrategy from '../BaseStrategy';
import Recording from '../../../components/Game/Stages/Recording/Recording';
import Listening from '../../../components/Game/Stages/Listening/Listening';
import Ending from '../../../components/Game/Stages/Ending/Ending';

import {RIGHT, WRONG} from '../../Constants/Game';
import MUSIC_LIST from '../../Constants/Singleplayer';

export default class SinglePlayerOfflineStrategy extends BaseStrategy {
    constructor() {
        super();
    }

    init() {
        const fileId = Math.floor(Math.random() * Object.keys(MUSIC_LIST).length);
        this.title = MUSIC_LIST[fileId];
        this.file = `/static/music/${this.title}.mp3`;

        this._initRecordingPage(this.file);
    }

    _initRecordingPage(data) {
        const recordingPage = new Recording({musicSource: data}, true);
        recordingPage.getSubmitButton().addMultiEvents('click touchend', () => {
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
        listeningPage.getSubmitButton().addMultiEvents('click touchend', () => {
            listeningPage.hide();
            listeningPage.stopPlayer();

            const answer = listeningPage.getUserInput();
            const isWin = this.title.toLowerCase() === answer.toLowerCase() ? RIGHT : WRONG;

            const result = {
                message: isWin
            };

            this._initEndingPage(result);
        });
        this.stages.push(listeningPage);
        this.next();
    }

    _initEndingPage(data) {
        const endingPage = new Ending({isWin: data.message === RIGHT, isOffline: true});
        endingPage.getBackButton().addMultiEvents('click touchend', () => {
            this.finish();
        });
        this.stages.push(endingPage);
        this.next();
    }
}
