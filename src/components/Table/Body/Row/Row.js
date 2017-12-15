import TopComponent from '../../../TopComponent/TopComponent';
import cells from './Row.xml';

export default class TRow extends TopComponent {
    constructor(data, className = '') {
        super('tr', className ? {class: className} : {}, data);
        this._build();
    }

    _build() {
        this._innerHTML(cells(this.getData()));
    }
}
