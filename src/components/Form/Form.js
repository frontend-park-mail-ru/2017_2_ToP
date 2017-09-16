import form from './Form.xml';
import TopComponent from '../TopComponent/TopComponent';

export default class FormView extends TopComponent {
    constructor() {
        super('div', { 'class': 'form-box' });
    }

    createForm(data) {
        this.getElement().innerHTML = form(data);
    }
}
