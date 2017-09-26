import Menu from '../../components/Menu/Menu';
import Description from '../../components/Description/Description';
import TopComponent from '../../components/TopComponent/TopComponent';
import UserService from '../../services/UserService/UserService';

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
    method: 'get',
    buttons: [
        {
            name: 'logout',
            text: 'Выйти',
            url: '/'
        }
    ]
};

export default class Main extends TopComponent {
    constructor() {
        super('div');
    }

    show() {
        this.build();
        this._components.forEach(element => element.show());
    }

    hide() {
        if (!this._components)
            this.build();
        this._components.forEach(element => element.hide());
    }

    build() {
        if (UserService.isLoggedIn()) {
            logged.login = UserService.getLogin();
            this.setData(logged);
        }
        else {
            this.setData(unlogged);
        }
        this._components = [new Description(this.getData()), new Menu(this.getData())];
        this._components.forEach(element => element.renderTo('content'));
    }
}
