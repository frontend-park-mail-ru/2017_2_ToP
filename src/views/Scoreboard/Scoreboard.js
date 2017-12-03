import TopComponent from '../../components/TopComponent/TopComponent';
import Table from '../../components/Table/Table';
import BackButton from '../../components/BackButton/BackButton';

import './Scoreboard.scss';

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
    }

    rerender() {
        if (this._components) {
            this._components.forEach(element => element.remove());
        }
        this.build();
    }

    build() {
        this._components = [
            new Table(TMP_DATA),
            new BackButton()
        ];
        this._components.forEach(element => this.append(element.render()));
        this.renderTo('content');
    }
}
