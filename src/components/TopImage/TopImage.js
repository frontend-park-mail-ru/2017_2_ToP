import TopComponent from '../TopComponent/TopComponent';
import Theming from '../../modules/Theming/Theming';

import './TopImage.scss';

export default class TopImage extends TopComponent {
    constructor(data) {
        super('div', {'class': 'image'}, data);
    }

    render() {
        this.image = new Image();
        this.image.src = this.getData().src;

        if (this.getData().theming) {
            this._initTheming();
        }

        this.image.addEventListener('load', () => {
            this.append(this.image);
            setTimeout(() => {
                this.getElement().style.maxHeight = `${this.image.height || 500}px`;
                this.image.style.maxWidth = '95%';
            }, 500);
        });

        return this.getElement();
    }

    _initTheming() {
        this.theming = new Theming();

        this.image.style.width = '50px';
        this.image.style.height = '50px';

        this.getElement().style.height = '50px';
        this.getElement().style.width = '50px';

        this.getElement().addEventListener('click', () => {
            this.theming.changeTheme();
        });
    }
}
