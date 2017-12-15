import TopComponent from '../TopComponent/TopComponent';

export default class Button extends TopComponent {
    constructor({text, url = '', class: className = 'button'}) {
        super('div', {class: className, 'data-url': url});
        this.setText(text);
    }
}
