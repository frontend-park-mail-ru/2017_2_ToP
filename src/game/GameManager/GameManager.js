import SinglePlayerStrategy from '../Strategy/Singleplayer/SinglePlayerStrategy';
import MultiPlayerStrategy from '../Strategy/Multiplayer/MultiPlayerStrategy';
import {MULTIPLAYER, SINGLEPLAYER} from '../../constants/Game';

export default class GameManager {
    constructor(type) {
        this._type = type;
        this.strategy = null;
        this.start();
    }

    start() {
        switch (this._type) {
            case SINGLEPLAYER:
                this.strategy = new SinglePlayerStrategy();
                break;
            case MULTIPLAYER:
                this.strategy = new MultiPlayerStrategy();
                break;
            default:
                console.log(`Unexpected type: ${this._type}`);
        }
    }

    hide() {
        if (this.strategy) {
            this.pause();
        }
    }

    show() {
        return this.strategy ? this.resume() : this.start();
    }

    pause() {
        return this.strategy.isFinished() ? this.finish() : this.strategy.pause();
    }

    resume() {
        return this.strategy.isFinished() ? this.start() : this.strategy.resume();
    }

    finish() {
        delete this.strategy;
    }
}
