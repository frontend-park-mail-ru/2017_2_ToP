import GameScene from '../GameScene/GameScene';

export default class BaseStrategy {
    constructor(path = null) {
        if (path) {
            const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
            this._socket = new WebSocket(`${protocol}//${path}`);
        }

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
        this._socket.close();
    }
}
