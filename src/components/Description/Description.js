import description from './Description.xml';
import TopComponent from '../TopComponent/TopComponent';

export default class Description extends TopComponent {
    constructor(data) {
        super('div', { 'class': 'description' }, data);

        this.getElement().innerHTML = description(this.getData());
    }
}
