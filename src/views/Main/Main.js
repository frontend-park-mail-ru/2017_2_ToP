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
        super('div', {}, data);
    }

    build() {
        return [new Menu(this.getData())];
    }
}
