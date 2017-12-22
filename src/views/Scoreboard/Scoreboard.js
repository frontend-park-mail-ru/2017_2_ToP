import TopComponent from '../../components/TopComponent/TopComponent';
import Table from '../../components/Table/Table';
import BackButton from '../../components/BackButton/BackButton';
import Transport from '../../modules/Transport/Transport';

import './Scoreboard.scss';
import Button from '../../components/Button/Button';

import {COUNT_PER_REQUEST, TABLE_DATA} from '../../game/Constants/Scoreboard';

export default class Scoreboard extends TopComponent {
    constructor() {
        super('div', {class: 'content__scoreboard'});
        this.isFull = false;
        this.moreButton = null;
        this.count = 0;
    }

    rerender() {
        if (this._components) {
            this._components.forEach(element => element.remove());
        }
        this.build();
    }

    build() {
        this.table = new Table(TABLE_DATA, 'content__scoreboard__table');
        this._buildMoreButton();
        this.addRows();

        this._components = [
            this.table,
            this.moreButton,
            new BackButton()
        ];
        this._components.forEach(element => this.append(element.render()));
        this.renderTo('content');
    }

    async getRows() {
        const rows = [];
        const result = await Transport.get(`/stop?limit=${COUNT_PER_REQUEST}&since=${this.count}`);
        result.forEach(({login, sscore, mscore}) => {
            rows.push([login, sscore, mscore]);
        });

        this.count += rows.length;
        return rows;
    }

    async addRows() {
        const rows = await this.getRows();
        if (rows.length === 0) {
            this._deleteMoreButton();
            return;
        }
        this.table.addRow(rows);
        this._rerenderMoreButton();
    }

    _rerenderMoreButton() {
        const _table = this.table.getElement();
        this.moreButton.getElement().setAttribute('class', _table.rows.length % 2 ? 'button-more_odd' : 'button-more_even');
    }

    _initButton() {
        this.moreButton = new Button({text: '. . .'});
        this.moreButton.getElement().addMultiEvents('click touchend', () => {
            this.addRows();
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

    _deleteMoreButton() {
        this.moreButton.remove();
    }
}
