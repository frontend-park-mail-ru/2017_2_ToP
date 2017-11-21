import TopComponent from '../../components/TopComponent/TopComponent';
import loading from '../../components/Loading/Loading';

export default class GameScene extends TopComponent {
    constructor() {
        super('div', {'class': 'game'});
        this._stage = null;
        loading.show();
        this._render();
    }

    setStage(stage) {
        loading.show();
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
        loading.hide();
    }


    _rerender() {
        this.clear();
        this._render();
    }
}
