import TopComponent from '../TopComponent/TopComponent';

import './Loading.scss';

class Loading extends TopComponent {
    constructor() {
        if (Loading.__instance) {
            return Loading.__instance;
        }

        super('div', {class: 'loading'});
        this.build();

        Loading.__instance = this;
    }

    build() {
        const loading = new TopComponent('div', {class: 'loading__element'});
        const text = new TopComponent('div', {class: 'loading__text'});
        text.setText('Загрузка');

        this.append(loading.getElement());
        this.append(text.getElement());
    }
}

const loading = new Loading();

export default loading;
