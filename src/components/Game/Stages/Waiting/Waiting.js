import TopComponent from '../../../TopComponent/TopComponent';
import AudioPlayer from '../../AudioPlayer/AudioPlayer';
import GameText from '../../GameText/GameText';
import Button from '../../../Button/Button';

import {READY_BUTTON} from '../../../../constants/Stages';

import './Waiting.scss';

export default class Waiting extends TopComponent {
    constructor(data) {
        super('div', {class: 'waiting-stage'}, data);
        this.status = null;
        this._build();
    }

    render() {
        return this.getElement();
    }

    addAudio(data, text) {
        this._components.push(
            new GameText({text}),
            new AudioPlayer({musicBase64: data})
        );
        this._rerender();
    }

    setStatus(text) {
        this.status.setText({text});
    }

    ready() {
        this.resultButton = new Button(READY_BUTTON);
        this._components.push(this.resultButton);
        this._rerender();
    }

    getResultButton() {
        return this.resultButton.getElement();
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
