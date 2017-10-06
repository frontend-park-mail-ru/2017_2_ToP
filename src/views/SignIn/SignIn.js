import Form from '../../components/Form/Form';
import TopComponent from '../../components/TopComponent/TopComponent';
import UserService from '../../services/UserService/UserService';
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
    ],
    back: {}
};

export default class SignIn extends TopComponent {
    constructor() {
        super('div', {}, data);
    }

    show() {
        if (UserService.isLoggedIn()) {
            router.go('/');
            return;
        }

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

    build() {
        if (UserService.isLoggedIn()) {
            router.go('/');
        } else {
            this._components = [new Form(this.getData())];
            this._components.forEach(element => element.renderTo('content'));
        }
    }
}

