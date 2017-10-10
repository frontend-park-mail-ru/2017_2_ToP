import {mergeBuffers, interleave, encodeWAV} from '../WavConverter/WavConverter';

export default class Recorder {
    constructor() {
        this.recLength = 0;
        this.recBuffersL = [];
        this.recBuffersR = [];

        this.recording = false;

        this.bufferLen = 4096;
    }

    init(source) {
        this.context = source.context;
        this.sampleRate = this.context.sampleRate;

        if (!this.context.createScriptProcessor) {
            this.node = this.context.createJavaScriptNode(this.bufferLen, 2, 2);
        } else {
            this.node = this.context.createScriptProcessor(this.bufferLen, 2, 2);
        }

        this.node.onaudioprocess = e => {
            if (!this.recording) return;

            this.recBuffersL.push(e.inputBuffer.getChannelData(0));
            this.recBuffersR.push(e.inputBuffer.getChannelData(1));
            this.recLength++;
        };

        source.connect(this.node);
        this.node.connect(this.context.destination);
    }

    record() {
        this.recording = true;
    }

    stop() {
        this.recording = false;
    }

    clear() {
        this.recLength = 0;
        this.recBuffersL = [];
        this.recBuffersR = [];
    }

    exportWAV() {
        const type = 'audio/wav';
        const bufferL = mergeBuffers(this.recBuffersL, this.recLength);
        const bufferR = mergeBuffers(this.recBuffersR, this.recLength);
        const interleaved = interleave(bufferL, bufferR);
        const dataview = encodeWAV(interleaved, null, this.sampleRate);
        const audioBlob = new Blob([dataview], {type: type});

        return audioBlob;
    }
}
