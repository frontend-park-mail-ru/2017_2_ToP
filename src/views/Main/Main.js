import Menu from '../../components/Menu/Menu';
import TopComponent from '../../components/TopComponent/TopComponent';

const data = {
    buttons: [
        {
            text: 'Авторизация',
            url: '/signin'
        },
        {
            text: 'Регистрация',
            url: '/signup'
        }
    ]
};

export default class Main extends TopComponent {
    constructor() {
        super('div', {'class': 'form-box'}, data);
    }

    build() {
        this.main = [ new Menu(this.getData()) ];
        this.main.forEach(element => element.renderTo('content'));
        return this.main;
    }
}