import BaseStrategy from '../BaseStrategy';
import Recording from '../../../components/Game/Stages/Recording/Recording';
import Listening from '../../../components/Game/Stages/Listening/Listening';
import Ending from '../../../components/Game/Stages/Ending/Ending';

import {RIGHT, WRONG} from '../../Constants/Game';

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
        endingPage.getBackButton().addEventListener('click', () => {
            this.finish();
        });
        this.stages.push(endingPage);
        this.next();
    }
}
