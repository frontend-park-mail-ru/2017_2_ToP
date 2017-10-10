export default class Recorder {
    constructor() {
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
        this.recBuffersL = [];
        this.recBuffersR = [];
    }
}
