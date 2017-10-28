import Menu from '../../components/Menu/Menu';
import TopImage from '../../components/TopImage/TopImage';
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
            name: 'singleplayer',
            text: 'Одиночная игра',
            url: '/singleplayer'
        },
        {
            name: 'multiplayer',
            text: 'Многопользовательская игра',
            url: '/multiplayer'
        },
        {
            name: 'about',
            text: 'Об игре',
            url: '/about'
        },
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

    rerender() {
        if (this._components) {
            this._components.forEach(element => element.remove());
        }
        this.build();
    }

    build() {
        if (UserService.isLoggedIn()) {
            logged.login = UserService.getLogin();
            this.setData(logged);
        } else {
            this.setData(unlogged);
        }
        this._components = [
            new Description(this.getData()),
            new Menu(this.getData()),
            new TopImage({
                theming: true,
                src: `../static/img/icons/pumpkin.png`
            })
        ];
        this._components.forEach(element => element.renderTo('content'));
    }
}
