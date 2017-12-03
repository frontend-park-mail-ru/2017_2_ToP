import TopComponent from '../../../TopComponent/TopComponent';
import AudioPlayer from '../../AudioPlayer/AudioPlayer';
import GameText from '../../GameText/GameText';
import Button from '../../../Button/Button';

import {READY_BUTTON} from '../../../../Constants/stages';

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

    ready() {
        this.status.remove();
        this.resultBbutton = new Button(READY_BUTTON);
        this._components.push(this.resultBbutton);
        this._rerender();
    }

    getResultButton() {
        return this.resultBbutton.getElement();
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
