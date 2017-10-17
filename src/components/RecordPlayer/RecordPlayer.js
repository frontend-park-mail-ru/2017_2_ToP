import recordPlayer from './RecordPlayer.xml';
import TopComponent from '../TopComponent/TopComponent';

import './RecordPlayer.scss';

export default class AudioPlayer extends TopComponent {
    constructor(data) {
        super('div', {}, data);
    }

    render() {
        this._innerHTML(recordPlayer(this.getData()));
        this._init();

        return this.getElement();
    }

    _init() {
        this.button = this.getElement().querySelector('.record-player__button');
        this.startButton = this.getElement().querySelector('.record-player__button_start');
        this.stopButton = this.getElement().querySelector('.record-player__button_stop');

        this.isRecording = false;

        this.button.addEventListener('click', () => {

            if (this.isRecording) {
                this.isRecording = false;
                this.stopButton.style.display = 'none';
                this.startButton.style.display = 'block';
                return;
            }

            this.isRecording = true;
            this.stopButton.style.display = 'block';
            this.startButton.style.display = 'none';
        });
    }
}
