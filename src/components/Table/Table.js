import TopComponent from '../TopComponent/TopComponent';
import table from './Table.xml';

import './Table.scss';

export default class Table extends TopComponent {
    constructor(data) {
        super('div', {class: 'table'}, data);
    }

    render() {
        this._innerHTML(table(this.getData()));

        return this.getElement();
    }
}
