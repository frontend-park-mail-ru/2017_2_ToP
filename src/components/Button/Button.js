import TopComponent from '../TopComponent/TopComponent';

export default class Button extends TopComponent {
    constructor(text, url = null) {
        super('div', {'class': 'button', 'data-url': url});
        this.setText(text);
    }
}
