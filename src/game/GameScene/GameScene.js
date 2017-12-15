import TopComponent from '../../components/TopComponent/TopComponent';
import loading from '../../components/Loading/Loading';

import './GameScene.scss';

export default class GameScene extends TopComponent {
    constructor() {
        super('div', {class: 'content__game__scene'});
        if (GameScene.__instance) {
            return GameScene.__instance;
        }

        this._stage = null;
        GameScene.__instance = this;
    }

    setStage(stage) {
        this._stage = stage;
        this._rerender();
    }

    destroy() {
        this._stage = null;
        this.remove();
    }

    pause() {
        this.hide();
    }

    resume() {
        this.show();
    }

    _render() {
        if (this._stage) {
            this.append(this._stage.render());
            loading.hide();
        }
        this.renderTo('content__game');
    }

    _rerender() {
        loading.show();
        this.clear();
        this._render();
    }
}
