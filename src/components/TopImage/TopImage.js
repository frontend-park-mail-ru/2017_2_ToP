import TopComponent from '../TopComponent/TopComponent';

import './TopImage.scss';

export default class TopImage extends TopComponent {
    constructor(data) {
        super('div', { 'class': 'image' }, data);
    }

    render() {
        this.image = new Image();
        this.image.src = this.getData().src;

        this.image.addEventListener('load', () => {
            this.append(this.image);
        });

        return this.getElement();
    }
}
