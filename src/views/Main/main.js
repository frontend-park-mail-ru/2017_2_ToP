import Menu from '../../components/Menu/menu';

const data = {
    method: 'get',
    name: 'startForm',
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
        this.renderTo('mycol');
    }
}
