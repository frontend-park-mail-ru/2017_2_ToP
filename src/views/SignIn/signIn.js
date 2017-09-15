import Form from '../../components/Form/form';

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
        this._validation();
        this.renderTo('mycol');
    }

    _validation() {
        const main = this.getElement();
        [...main.getElementsByClassName('loginput')].forEach(element => {
            element.addEventListener('focus', () => {
                element.classList.remove('input-error');
            }, false);
        });

        main.getElementsByClassName('loginSubmit')[0].addEventListener('click', () => {
            let valid = true;
            [...main.getElementsByClassName('loginput')].forEach(element => {
                if (element.value === '') {
                    element.classList.add('input-error');
                    valid = false;
                } else {
                    element.classList.remove('input-error');
                }
            });

            if (valid) {
                document.forms.loginForm.submit();
            }
        });
    }
}

