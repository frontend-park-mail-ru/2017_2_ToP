import videoPlayer from './VideoPlayer.xml';
import TopComponent from '../../TopComponent/TopComponent';

import './VideoPlayer.scss';

export default class VideoPlayer extends TopComponent {
    constructor(data) {
        super('div', {'class': 'video-player'}, data);

        this._innerHTML(videoPlayer(this.getData()));

        this.getElement().querySelector('.video').addEventListener('ended', this._hide.bind(this), false);
    }

    _hide() {
        this.getElement().style.opacity = 0;
        this.getElement().style.maxHeight = '0px';
        setTimeout(this.hide.bind(this), 700);
    }
}
