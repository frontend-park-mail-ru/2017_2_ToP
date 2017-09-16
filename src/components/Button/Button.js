import TopComponent from '../TopComponent/TopComponent';

export default class Button extends TopComponent {
    constructor(text, url = null) {
        super('button');
        this.getElement().innerHTML = text;
        if (url) {
            this.getElement().setAttribute('data-url', url);
        }
    }
}
