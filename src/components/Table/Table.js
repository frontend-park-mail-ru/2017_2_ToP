import TopComponent from '../TopComponent/TopComponent';

import THead from './Head/Head';
import TBody from './Body/Body';

export default class Table extends TopComponent {
    constructor(data, className = '') {
        super('table', className ? {class: className} : {}, data);
        this._build();
    }

    addRow(rows) {
        rows.forEach(rowData => {
            this.body.addRow(rowData);
        });
    }

    _build() {
        this.head = new THead(this.getData().head);
        this.body = new TBody(this.getData().body);
        this.append(this.head.render());
        this.append(this.body.render());
    }
}
