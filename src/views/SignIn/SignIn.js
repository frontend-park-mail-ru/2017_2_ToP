import Form from '../../components/Form/Form';

const data = {
    title: 'Авторизация',
    icon: 'fa fa-lock',
    method: 'post',
    name: 'loginForm',
    fields: [
        {
            type: 'text',
            name: 'form-username',
            placeholder: 'Логин...',
            class: 'loginput'
        },
        {
            type: 'password',
            name: 'form-password',
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

export default class SignIn extends Form {
    init() {
        this.createForm(data);
        this.validation('loginput', 'loginSubmit', 'loginForm');
        this.renderTo('content');
    }
}

