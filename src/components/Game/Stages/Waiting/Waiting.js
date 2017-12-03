import TopComponent from '../../../TopComponent/TopComponent';
import AudioPlayer from '../../AudioPlayer/AudioPlayer';
import GameText from '../../GameText/GameText';

export default class Waiting extends TopComponent {
    constructor(data) {
        super('div', {'class': 'waiting-stage'}, data);
        this._build();
        this.status = null;
    }

    render() {
        return this.getElement();
    }

    addAudio(source, text) {
        this._components.unshift(
            new GameText({text}),
            new AudioPlayer({musicSource: source})
        );
        this._rerender();
    }

    changeStatus(text) {
        this.status.setText(text);
    }

    _build() {
        this.status = new GameText({text: this.getData()});
        this._components = [this.status];

        this._rerender();
    }

    _rerender() {
        this.clear();
        this._components.forEach(element => {
            this.append(element.render());
        });
    }
}
