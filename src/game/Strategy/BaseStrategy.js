import GameScene from '../GameScene/GameScene';

const PATH = 'localhost:8081/mechanic';

export default class BaseStrategy {
    constructor(mode) {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        this._socket = new WebSocket(`${protocol}//${PATH}`);

        this._socket.onopen = () => {
            console.log('opened');
            this._socket.send({
                mode
            });
        };

        this.stage = null;
        this.stages = [];
        this.scene = new GameScene();
        this.scene.setStage(null);
    }

    next() {
        if (this.stages.length === 0) {
            this.finish();
            return;
        }

        this.stage = this.stages.shift();
        this.scene.setStage(this.stage);
    }

    pause() {
        if (!this.isFinished()) {
            this.scene.pause();
        }
    }

    resume() {
        this.scene.resume();
    }

    isFinished() {
        return !this.scene;
    }

    finish() {
        this.scene.destroy();
        delete this.scene;
        if (this._socket) {
            this._socket.close();
        }
    }
}
