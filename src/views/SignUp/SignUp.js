import Form from '../../components/Form/Form';
import TopComponent from '../../components/TopComponent/TopComponent';
import UserService from '../../services/UserService/UserService';
import router from '../../modules/Router/Router';

const data = {
    title: 'Регистрация',
    icon: 'fa fa-pencil',
    method: 'post',
    name: 'signup',
    fields: [
        {
            type: 'text',
            name: 'login',
            placeholder: 'Логин...',
            class: 'reginput'
        },
        {
            type: 'email',
            name: 'email',
            placeholder: 'Email...',
            class: 'reginput'
        },
        {
            type: 'password',
            name: 'password',
            placeholder: 'Пароль...',
            class: 'reginput'
        },
        {
            type: 'password',
            name: 'repeatPassword',
            placeholder: 'Повторите пароль...',
            class: 'reginput'
        }
    ],
    buttons: [
        {
            class: 'registrationSubmit',
            name: 'submitButton',
            text: 'Зарегистрироваться!'
        }
    ],
    back: {}
};

export default class SignUp extends TopComponent {
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
