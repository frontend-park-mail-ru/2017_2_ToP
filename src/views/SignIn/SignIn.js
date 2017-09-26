import Form from '../../components/Form/Form';
import TopComponent from '../../components/TopComponent/TopComponent';
import UserService from '../../services/UserService/UserService';
import BackButton from '../../components/BackButton/BackButton';
import router from '../../modules/Router/Router';

const data = {
    title: 'Авторизация',
    icon: 'fa fa-lock',
    method: 'post',
    name: 'signin',
    fields: [
        {
            type: 'text',
            name: 'login',
            placeholder: 'Логин...',
            class: 'loginput'
        },
        {
            type: 'password',
            name: 'password',
            placeholder: 'Пароль...',
            class: 'loginput'
        }
    ],
    buttons: [
        {
            class: 'loginSubmit',
            text: 'Войти!'
        }
    ]
};

export default class SignIn extends TopComponent {
    constructor() {
        super('div', {}, data);
    }

    show() {
        if (UserService.isLoggedIn()) {
            router.go('/');
        }
        else {
            if (!this._components) {
                this.build();
            } else {
                this._components.forEach(element => element.show());
            }
        }
    }

    hide() {
        if (this._components) {
            this._components.forEach(element => element.hide());
        }
    }

    build() {
        if (UserService.isLoggedIn()) {
            router.go('/');
        } else {
            this._components = [new Form(this.getData()), new BackButton()];
            this._components.forEach(element => element.renderTo('content'));

        }
    }
}

