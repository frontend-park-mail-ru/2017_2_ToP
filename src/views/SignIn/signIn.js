import UnLogged from '../UnLogged/unLogged.xml';
import Form from '../../components/Form/form.xml';
import TopComponent from '../../components/TopComponent/topComponent';

export default class SignIn extends TopComponent {

    init() {
        this._createBackground();
        this._createForm();
        this._validation();
        document.getElementsByClassName('main')[0].appendChild(this.render());
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

    _createBackground() {
        this.getElement().innerHTML = UnLogged();
    }

    _createForm() {
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

        this.getElement().getElementsByClassName('form-box')[0].innerHTML = Form(data);
    }
}

