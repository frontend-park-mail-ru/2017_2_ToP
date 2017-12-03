import SinglePlayerStrategy from '../Strategy/Singleplayer/SinglePlayerStrategy';
import MultiPlayerStrategy from '../Strategy/Multiplayer/MultiPlayerStrategy';

export default class GameManager {
    constructor(type) {
        this._type = type;
        this.strategy = null;
        this.start();
    }

    start() {
        if (this._type === 'singleplayer') {
            this.strategy = new SinglePlayerStrategy();
        } else {
            this.strategy = new MultiPlayerStrategy();
        }

        return null;
    }

    hide() {
        if (this.strategy) {
            this.pause();
        }
    }

    show() {
        if (this.strategy) {
            this.resume();
        } else {
            this.start();
        }
    }

    pause() {
        if (this.strategy.isFinished()) {
            this.finish();
        } else {
            this.strategy.pause();
        }
    }

    resume() {
        if (this.strategy.isFinished()) {
            this.start();
        } else {
            this.strategy.resume();
        }
    }

    finish() {
        delete this.strategy;
    }
}
