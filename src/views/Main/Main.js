import Menu from '../../components/Menu/Menu';
import TopComponent from '../../components/TopComponent/TopComponent';
import UserService from '../../services/UserService';

const unlogged = {
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

const logged = {
    buttons: [
        {
            text: 'Выйти',
            url: '/'
        }
    ]
};

export default class Main extends TopComponent {
    constructor() {
        console.log(UserService.isLoggedIn());
        if (UserService.isLoggedIn()) {
            super('div', {}, logged);
        }
        else {
            super('div', {}, unlogged);
        }
    }

    build() {
        console.log(UserService.isLoggedIn());

        if (UserService.isLoggedIn()) {
            this.setData(logged);
        }
        else {
            this.setData(unlogged);
        }
        return [new Menu(this.getData())];
    }
}
