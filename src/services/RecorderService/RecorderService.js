import Recorder from '../../modules/Recorder/Recorder';

class RecordService {
    constructor() {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.context = new AudioContext();
        this.audioRecorder = new Recorder();

        this.node = null;
        this.source = null;

        this.hasMedia = false;

        this.initAudio();
    }

    start() {
        if (!this.audioRecorder) {
            return;
        }
        this.audioRecorder.clear();
        this.audioRecorder.record();
    }

    stop(reverse) {
        this.audioRecorder.stop();

        this.audioRecorder.exportWAV(Recorder.setupDownload, reverse);
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

        if (!navigator.getUserMedia) {
            return;
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
            }
        }, this.gotStream.bind(this), e => {
            console.log(e);
        });

        this.hasMedia = true;
    }

    getMusicURL() {
        return this.audioRecorder.getMusicURL();
    }

    getMusicBlob() {
        return this.audioRecorder.getMusicBlob();
    }
}

const recordService = new RecordService();
export default recordService;
