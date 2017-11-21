import TopComponent from '../../components/TopComponent/TopComponent';

export default class GameScene extends TopComponent {
    constructor() {
        super('div', {'class': 'game'});
        this._stage = null;
        this.render();
    }

    setStage(stage) {
        this._stage = stage;
        this._rerender();
    }

    render() {
        if (this._stage) {
            this.append(this._stage.render());
        }
        this.renderTo('content');
    }

    destroy() {
        this._stage = null;
        this.remove();
    }

    _rerender() {
        this.clear();
        this.render();
    }
}
