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

    init() {
        this.createMenu(data);
        this.renderTo('content');
    }
}
