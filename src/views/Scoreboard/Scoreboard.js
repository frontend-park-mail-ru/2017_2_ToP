import TopComponent from '../../components/TopComponent/TopComponent';
import Table from '../../components/Table/Table';
import BackButton from '../../components/BackButton/BackButton';

import './Scoreboard.scss';
import Button from '../../components/Button/Button';

const TMP_DATA = {
    head: [
        'User',
        'Singleplayer',
        'Multiplayer'
    ],
    body: [
        ['test', 1000, 1000],
        ['test2', 500, 500],
        ['test3', 300, 300]
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
        this.table = new Table(TMP_DATA, 'content__scoreboard__table');
        this._buildMoreButton();

        this._components = [
            this.table,
            this.moreButton,
            new BackButton()
        ];
        this._components.forEach(element => this.append(element.render()));
        this.renderTo('content');
    }

    _rerenderMoreButton() {
        const _table = this.table.getElement();
        this.moreButton.getElement().setAttribute('class', _table.rows.length % 2 ? 'button-more_odd' : 'button-more_even');
    }

    _initButton() {
        this.moreButton = new Button({text: '. . .'});
        this.moreButton.getElement().addMultiEvents('click touchend', () => {
            this.table.addRow(TMP_DATA.body);
            this._rerenderMoreButton();
        });
    }

    _buildMoreButton() {
        if (!this.isFull) {
            if (!this.moreButton) {
                this._initButton();
            }
            this._rerenderMoreButton();
        }
    }
}
