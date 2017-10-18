import audioPlayer from './AudioPlayer.xml';
import TopComponent from '../TopComponent/TopComponent';

import './AudioPlayer.scss';

export default class AudioPlayer extends TopComponent {
    constructor(data) {
        super('div', {}, data);
    }

    render() {
        this._innerHTML(audioPlayer(this.getData()));
        this._init();

        return this.getElement();
    }

    _init() {
        this.button = this.getElement().querySelector('.audio-player__button');
        this.canvas = this.getElement().querySelector('.audio-player__visualizer');
        this.playButton = this.getElement().querySelector('.audio-player__button_play');
        this.pauseButton = this.getElement().querySelector('.audio-player__button_pause');
        this.canvasContext = this.canvas.getContext('2d');
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.src = undefined;

        this.audio = new Audio();

        this.isPlaying = false;

        this.button.addEventListener('click', () => {
            const analyser = this.audioContext.createAnalyser();

            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            const width = this.canvas.width;
            const height = this.canvas.height;

            let barWidth = (width / bufferLength) * 20;
            let barHeight;

            const renderFrame = () => {
                this.canvasContext.clearRect(0, 0, width, height);
                requestAnimationFrame(renderFrame);

                let x = 0;

                analyser.getByteFrequencyData(dataArray);

                this.canvasContext.fillStyle = 'rgba(200, 200, 200, 0)';
                this.canvasContext.fillRect(0, 0, width, height);

                for (let i = 0; i < bufferLength; i++) {
                    barHeight = dataArray[i];

                    this.canvasContext.fillStyle = 'rgb(255, 255, 255)';
                    this.canvasContext.fillRect(
                        x,
                        height - (barHeight / 2),
                        barWidth, barHeight / 2
                    );

                    x += barWidth + 1;
                }
            };

            if (this.isPlaying) {
                this.isPlaying = false;
                this.audio.pause();
                this.pauseButton.style.display = 'none';
                this.playButton.style.display = 'block';
                cancelAnimationFrame(renderFrame);
                return;
            }

            if (this.src === undefined) {
                this.src = this.audioContext.createMediaElementSource(this.audio);
            }

            //  URL вида blob:http://localhost:8080/e5214da8-48e0-431c-8bbb-91948999259c
            //  Передавая файл, создать его можно URL.createObjectURL(file)
            this.audio.src = this.getData().musicURL;

            this.src.connect(analyser);
            analyser.connect(this.audioContext.destination);

            analyser.fftSize = 256;

            this.pauseButton.style.display = 'block';
            this.playButton.style.display = 'none';
            this.isPlaying = true;

            this.audio.play();
            renderFrame();
        });
    }
}