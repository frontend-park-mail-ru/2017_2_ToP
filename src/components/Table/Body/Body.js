import TopComponent from '../../TopComponent/TopComponent';
import Row from './Row/Row';

export default class TBody extends TopComponent {
    constructor(data, className = '') {
        super('tbody', className ? {class: className} : {}, data);
        this.rows = [];
        this._build();
    }

    addRow(rowData) {
        const row = new Row([this.rows.length + 1, ...rowData]);
        this.rows.push(row);
        this.append(row.render());
    }

    _build() {
        this.getData().forEach(rowData => {
            this.addRow(rowData);
        });
    }
}
