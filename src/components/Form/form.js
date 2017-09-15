import form from './form.xml';
import TopComponent from '../TopComponent/topComponent';

export default class FormView extends TopComponent {
    init(data) {
        this.getElement().innerHTML = form(data);
    }
}
