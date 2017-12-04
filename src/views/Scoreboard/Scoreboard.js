import TopComponent from '../../components/TopComponent/TopComponent';
import Table from '../../components/Table/Table';
import BackButton from '../../components/BackButton/BackButton';

import './Scoreboard.scss';
import Button from '../../components/Button/Button';

const TMP_DATA = {
    head: [
        '#',
        'Имя',
        'Одиночная игра',
        'Многопользовательская'
    ],
    body: [
        ['1', 'test', 1000, 1000],
        ['2', 'test2', 500, 500],
        ['3', 'test3', 300, 300]
    ]
};


export default class Scoreboard extends TopComponent {
    constructor() {
        super('div', {class: 'content__scoreboard'});
        this.isFull = false;
        this.moreButton = null;
    }

    rerender() {
        if (this._components) {
            this._components.forEach(element => element.remove());
        }
        this.build();
    }

    build() {
        this.table = new Table(TMP_DATA);
        this._buildMoreButton();

        this._components = [
            this.table,
            new BackButton()
        ];
        this._components.forEach(element => this.append(element.render()));
        this.renderTo('content');
    }

    _buildMoreButton() {
        if (!this.isFull) {
            const _table = this.table.getElement().querySelector('table');
            if (!this.moreButton) {
                this._initButton();
            }
            this.moreButton.getElement().setAttribute('class', _table.rows.length % 2 ? 'button-more_odd' : 'button-more_even');

            this.table.append(this.moreButton.getElement());
        }
    }

    _initButton() {
        this.moreButton = new Button({text: '. . .'});
        this.moreButton.getElement().addEventListener('click', () => {
            console.log('Тут будет получение дынных');
        });
    }
}
