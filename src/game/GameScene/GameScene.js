import TopComponent from '../../components/TopComponent/TopComponent';

export default class GameScene extends TopComponent {
    constructor() {
        super('div', {'class': 'game'});
        this._stage = null;
        this._render();
    }

    setStage(stage) {
        this._stage = stage;
        this._rerender();
    }

    destroy() {
        this._stage = null;
        this.remove();
    }

    _render() {
        if (this._stage) {
            this.append(this._stage.render());
        }
        this.renderTo('content');
    }


    _rerender() {
        this.clear();
        this._render();
    }
}
