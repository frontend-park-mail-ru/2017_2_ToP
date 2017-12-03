import TopComponent from '../TopComponent/TopComponent';
import table from './Table.xml';

import './Table.scss';
import Button from '../Button/Button';

export default class Table extends TopComponent {
    constructor(data) {
        super('div', {class: 'table'}, data);
    }

    render() {
        this._innerHTML(table(this.getData()));
        const _table = this.getElement().querySelector('table');
        this.moreButton = new Button({
            text: '. . .',
            class: _table.rows.length % 2 ? 'button-more_odd' : 'button-more_even'
        });
        this.append(this.moreButton.getElement());

        return this.getElement();
    }
}
