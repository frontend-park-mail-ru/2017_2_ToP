import TopComponent from '../TopComponent/TopComponent';
import table from './Table.xml';

import './Table.scss';
import Button from '../Button/Button';

export default class Table extends TopComponent {
    constructor(data) {
        super('div', {class: 'table'}, data);
        this._build();
    }

    _build() {
        this._innerHTML(table(this.getData()));
    }
}
