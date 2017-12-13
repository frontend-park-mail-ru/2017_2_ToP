import TopComponent from '../../TopComponent/TopComponent';
import head from './Head.xml';

export default class THead extends TopComponent {
    constructor(data, className = '') {
        super('thead', className ? {class: className} : {}, data);
        this._build();
    }

    _build() {
        this._innerHTML(head(this.getData()));
    }
}
