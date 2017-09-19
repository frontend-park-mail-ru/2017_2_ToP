import Form from '../../components/Form/Form';

const data = {
    title: 'Регистрация',
    icon: 'fa fa-pencil',
    method: 'post',
    name: 'registrationForm',
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
            name: 'repeat-password',
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

export default class SignUp extends Form {
    constructor() {
        super(data);
    }

    init() {
        this.renderTo('content');
        this.validation('reginput', 'registrationSubmit', 'registrationForm');
    }
}
