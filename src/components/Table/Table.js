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
        const _table = this.getElement().querySelector('table');
        this.moreButton = new Button({
            text: '. . .',
            class: _table.rows.length % 2 ? 'button-more_odd' : 'button-more_even'
        });
        this.append(this.moreButton.getElement());

        this._initButton();
    }

    _initButton() {
        this.moreButton.getElement().addEventListener('click', () => {
            console.log('Тут будет получение дынных');
        });
    }
}
