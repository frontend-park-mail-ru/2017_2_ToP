import TopComponent from '../../components/TopComponent/TopComponent';
import BackButton from '../../components/BackButton/BackButton';
import RecordingPage from '../../components/RecordingPage/RecordingPage';


export default class SinglePlayer extends TopComponent {
    constructor(data) {
        super('div', {}, data);
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

    build() {
        this._components = [
            new RecordingPage(this.getData()),
            new BackButton(this.getData())
        ];
        this._components.forEach(element => element.renderTo('content'));
    }
}