import UnLogged from '../UnLogged/unLogged.xml';
import Form from '../../components/Form/form.xml';

export default class Login {

    init() {
        const main = document.getElementsByClassName('main')[0];
        main.innerHTML = UnLogged({title: 'Наша'});
        main.getElementsByClassName('form-box')[0].innerHTML = this._createForm();
        this._validation(main);
    }

    _validation(main) {
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

    _createForm() {
        return Form({
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
        });
    }
}

