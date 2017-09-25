import Form from '../../components/Form/Form';
import TopComponent from '../../components/TopComponent/TopComponent';
import UserService from '../../services/UserService/UserService';

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

    build() {
        UserService.getData()
            .then(userdata => {
                window.router.go('/');
            })
            .catch(response => {
                if (response.status === 401) {
                    return [new Form(this.getData())];
                }
            });
    }
}

