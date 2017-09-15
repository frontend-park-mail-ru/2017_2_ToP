import form from './form.xml';
import TopComponent from '../TopComponent/topComponent';

export default class FormView extends TopComponent {
    constructor() {
        super('div', 'form-box');
    }

    createForm(data) {
        this.getElement().innerHTML = form(data);
    }
}
