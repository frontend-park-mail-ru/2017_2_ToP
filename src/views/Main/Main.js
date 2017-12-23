import Menu from '../../components/Menu/Menu';
import Footer from '../../components/Footer/Footer';
import TopComponent from '../../components/TopComponent/TopComponent';
import UserService from '../../services/UserService/UserService';

const unlogged = {
    buttons: [
        {
            text: 'Играть',
            class: 'button-main',
            url: '/singleplayer'
        },
        {
            text: 'Об игре',
            class: 'button-main',
            url: '/about'
        },
        {
            text: 'Войти',
            class: 'button-second',
            url: '/signin'
        },
        {
            text: 'Регистрация',
            class: 'button-second',
            url: '/signup'
        }
    ]
};

const logged = {
    method: 'get',
    buttons: [
        {
            name: 'multiplayer',
            text: 'Играть',
            class: 'button-main',
            url: '/multiplayer'
        },
        {
            name: 'singleplayer',
            text: 'Тренировка',
            class: 'button-main',
            url: '/singleplayer'
        },
        {
            name: 'settings',
            text: 'Профиль',
            class: 'button-second',
            url: '/settings'
        },
        {
            name: 'scoreboard',
            text: 'Таблица лидеров',
            class: 'button-second',
            url: '/scoreboard'
        },
        {
            name: 'logout',
            text: 'Выйти',
            class: 'button-second',
            url: '/'
        }
    ]
};

export default class Main extends TopComponent {
    constructor() {
        super('div', {class: 'content__main'});
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
            new Menu(this.getData()),
            new Footer()
        ];
        this._components.forEach(element => this.append(element.render()));
        this.renderTo('content');
    }
}
