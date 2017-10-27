import recordPlayer from './RecordPlayer.xml';
import TopComponent from '../../TopComponent/TopComponent';
import RecordService from '../../../services/RecorderService/RecorderService';

import './RecordPlayer.scss';

function pad0(value, count) {
    let result = value.toString();
    for (; result.length < count; --count) {
        result = `0${result}`;
    }
    return result;
}

export default class AudioPlayer extends TopComponent {
    constructor(data) {
        super('div', {'class': 'record-player'}, data);
    }

    render() {
        this._innerHTML(recordPlayer(this.getData()));
        this._init();

        return this.getElement();
    }

    getMusicURL() {
        return RecordService.getMusicURL();
    }

    getButton() {
        return this.button;
    }

    resetTimer() {
        this.times = [0, 0];
    }

    startTimer() {
        if (!this.time) {
            this.time = performance.now();
        }
        if (!this.running) {
            this.running = true;
            requestAnimationFrame(this.step.bind(this));
        }
    }

    stop() {
        if (!this.isRecording) {
            return;
        }

        this.isRecording = false;

        this.stopButton.style.display = 'none';
        this.startButton.style.display = 'block';

        this.stopTimer();
        RecordService.stop();
    }

    start() {
        this.isRecording = true;

        this.stopButton.style.display = 'block';
        this.startButton.style.display = 'none';

        this.timeElement.style.opacity = 1;

        if (this.time === null) {
            this.resetTimer();
        }

        this.startTimer();
        RecordService.start();
    }

    stopTimer() {
        this.running = false;
        this.time = null;
    }

    step(timestamp) {
        if (!this.running) {
            return;
        }
        this.calculate(timestamp);
        this.time = timestamp;
        this.printTimer();
        requestAnimationFrame(this.step.bind(this));
    }

    calculate(timestamp) {
        const diff = timestamp - this.time;
        // Hundreds of a second
        this.times[1] += diff / 10;
        // Seconds
        if (this.times[1] >= 100) {
            this.times[0] += 1;
            this.times[1] -= 100;
        }
    }

    printTimer() {
        this.timeElement.innerText = this.format(this.times);
    }

    format(times) {
        return `\
            ${pad0(times[0], 2)}:\
            ${pad0(Math.floor(times[1]), 2)}`;
    }

    _init() {
        this.button = this.getElement().querySelector('.record-player__button');
        this.startButton = this.getElement().querySelector('.record-player__button_start');
        this.stopButton = this.getElement().querySelector('.record-player__button_stop');
        this.timeElement = this.getElement().querySelector('.record-player__time');

        this.isRecording = false;
        this.running = false;

        this.resetTimer();
        this.printTimer(this.times);

        this.button.addEventListener('click', () => {
            if (this.isRecording) {
                this.stop();
                return;
            }

            this.start();
        });
    }
}
