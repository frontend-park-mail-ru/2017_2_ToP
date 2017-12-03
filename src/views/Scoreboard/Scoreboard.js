import TopComponent from '../../components/TopComponent/TopComponent';
import Table from '../../components/Table/Table';

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
        super('div');
    }

    show() {
        if (this._components) {
            this._components.forEach(element => element.show());
        } else {
            this.build();
        }
    }

    hide() {
        if (this._components) {
            this._components.forEach(element => element.hide());
        }
    }

    rerender() {
        if (this._components) {
            this._components.forEach(element => element.remove());
        }
        this.build();
    }

    build() {
        this._components = [
            new Table(TMP_DATA)
        ];
        this._components.forEach(element => element.renderTo('content'));
    }
}
