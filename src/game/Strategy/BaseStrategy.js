import GameScene from '../GameScene/GameScene';

const PATH = 'apoj.herokuapp.com/mechanic';

export default class BaseStrategy {
    constructor(mode) {
        const protocol = 'wss:';
        this._socket = new WebSocket(`${protocol}//${PATH}`);

        this._socket.onopen = () => {
            console.log('opened');
            this.send({
                mode
            });
        };

        this.stage = null;
        this.stages = [];
        this.scene = new GameScene();
        this.scene.setStage(null);
    }

    send(data) {
        this._socket.send(JSON.stringify(data));
    }

    next() {
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
