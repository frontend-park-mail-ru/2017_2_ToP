import Form from '../../components/Form/Form';
import TopComponent from '../../components/TopComponent/TopComponent';
import UserService from '../../services/UserService/UserService';
import BackButton from '../../components/BackButton/BackButton';
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
            text: 'Зарегистрироваться!'
        }
    ]
};

export default class SignUp extends TopComponent {
    constructor() {
        super('div', {}, data);
    }

    show() {
        if (UserService.isLoggedIn()) {
            router.go('/');
        } else {
            this._components.forEach(element => element.show());
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
