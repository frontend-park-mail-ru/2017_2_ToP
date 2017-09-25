import TopComponent from '../TopComponent/TopComponent';

export default class BackButton extends TopComponent {
    constructor() {
        super('div', {class: 'backButton', 'data-url': '/'});
        this.setText('На главную');
    }

    show() {
        this.getElement().style.display = 'inline';
    }
}
