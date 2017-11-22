import TopComponent from '../../../TopComponent/TopComponent';

import GameText from '../../GameText/GameText';
import TopImage from '../../../TopImage/TopImage';
import BackButton from '../../../BackButton/BackButton';
import VideoPlayer from '../../VideoPlayer/VideoPlayer';

import UserService from '../../../../services/UserService/UserService';

import './Ending.scss';

export default class Ending extends TopComponent {
    constructor(data) {
        super('div', {'class': 'ending-stage'}, data);
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
                    text: 'Победа!',
                    title: true
                }),
                new VideoPlayer({
                    src: '/static/video/win.mp4',
                    type: 'video/mp4'
                }),
                new GameText({
                    text: `Ваш новый счет ${this.getData().score}`
                })
            ];
        } else {
            this._components = [
                new GameText({
                    text: 'Вы проиграли',
                    title: true
                }),
                new TopImage({
                    src: `../static/img/results/${Math.floor((Math.random() * 5) + 1)}.png`
                })
            ];
        }

        const content = new TopComponent('div', {'class': 'ending-stage__content'});
        const backButton = new BackButton();

        this._components.forEach(element => {
            content.append(element.render());
        });

        this.append(content.render());
        this.append(backButton.render());
    }
}
