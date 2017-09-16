import Menu from '../../components/Menu/Menu';

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

export default class Main extends Menu {
    constructor() {
        super(data);
    }

    init() {
        this.renderTo('content');
    }
}
