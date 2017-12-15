import TopComponent from '../../../TopComponent/TopComponent';

import GameText from '../../GameText/GameText';
import TopImage from '../../../TopImage/TopImage';
import BackButton from '../../../BackButton/BackButton';
import VideoPlayer from '../../VideoPlayer/VideoPlayer';

import {WIN, WIN_OFFLINE, WIN_VIDEO, LOSE, NEW_SCORE} from '../../../../constants/Stages';

import './Ending.scss';

export default class Ending extends TopComponent {
    constructor(data) {
        super('div', {class: 'ending-stage'}, data);
        this._build();
    }

    getBackButton() {
        return this.getElement().querySelector('.back-button');
    }

    render() {
        return this.getElement();
    }

    _build() {
        if (this.getData().isWin) {
            this._components = [
                new GameText({
                    text: WIN,
                    title: true
                }),
                new VideoPlayer(WIN_VIDEO),
                new GameText({
                    text: this.getData().isOffline ? WIN_OFFLINE : NEW_SCORE + this.getData().score
                })
            ];
        } else {
            this._components = [
                new GameText({
                    text: LOSE,
                    title: true
                }),
                new TopImage({
                    src: `../static/img/results/${Math.floor((Math.random() * 5) + 1)}.png`
                })
            ];
        }

        const content = new TopComponent('div', {class: 'ending-stage__content'});
        const backButton = new BackButton();

        this._components.forEach(element => {
            content.append(element.render());
        });

        this.append(content.render());
        this.append(backButton.render());
    }
}
