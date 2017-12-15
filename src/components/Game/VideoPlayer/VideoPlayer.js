import videoPlayer from './VideoPlayer.xml';
import TopComponent from '../../TopComponent/TopComponent';

import './VideoPlayer.scss';

export default class VideoPlayer extends TopComponent {
    constructor(data) {
        super('div', {class: 'video-player'}, data);

        this._innerHTML(videoPlayer(this.getData()));

        this.video = this.getElement().querySelector('.video');

        this.video.addEventListener('ended', this._hide.bind(this), false);
        this.video.addEventListener('canplay', this._show.bind(this), false);
    }

    _show() {
        setTimeout(() => {
            this.video.pause();
            this.getElement().style.opacity = 1;
            this.getElement().style.maxHeight = '1000px';
            setTimeout(() => { this.video.play(); }, 700);
        }, 500);
    }

    _hide() {
        this.getElement().style.opacity = 0;
        this.getElement().style.maxHeight = '0px';
        setTimeout(this.hide.bind(this), 700);
    }
}
