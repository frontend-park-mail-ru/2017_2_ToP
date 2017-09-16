import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import TopComponent from '../TopComponent/TopComponent';


export default class Background {
    createBackground() {
        this._createHeader();
        this._createContent();
        this._createFooter();
    }

    _createHeader() {
        const header = new Header();
        header.renderTo('main');
    }

    _createContent() {
        const content = new TopComponent('div', 'content');
        content.renderTo('main');
    }

    _createFooter() {
        const footer = new Footer();
        footer.renderTo('main');
    }
}
