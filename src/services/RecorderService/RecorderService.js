import Recorder from '../../modules/Recorder/Recorder';

class RecordService {
    constructor() {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.context = new AudioContext();
        this.audioRecorder = new Recorder();

        this.node = null;
        this.source = null;

        this.initAudio();
    }

    gotStream(stream) {
        const inputPoint = this.context.createGain();
        const audioInput = this.context.createMediaStreamSource(stream);
        audioInput.connect(inputPoint);

        this.audioRecorder.init(audioInput);
    }

    initAudio() {
        if (!navigator.getUserMedia) {
            navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia ||
                navigator.msGetUserMedia;
        }

        navigator.getUserMedia({
            'audio': {
                'mandatory': {
                    'googEchoCancellation': 'false',
                    'googAutoGainControl': 'false',
                    'googNoiseSuppression': 'false',
                    'googHighpassFilter': 'false'
                },
                'optional': []
            },
        }, this.gotStream.bind(this), e => {
            console.log(e);
        });
    }
}