import UnLogged from '../UnLogged/unLogged.xml';
import Form from '../../components/Form/form.xml';

export default class Registration {

    init() {
        const main = document.getElementsByClassName('main')[0];
        main.innerHTML = UnLogged();
        main.getElementsByClassName('form-box')[0].innerHTML = this._createForm();
        this._validation(main);
    }

    _validation(main) {
        [...main.getElementsByClassName('reginput')].forEach(element => {
            element.addEventListener('focus', () => {
                element.classList.remove('input-error');
            }, false);
        });

        main.getElementsByClassName('registrationSubmit')[0].addEventListener('click', () => {
            let valid = true;
            [...main.getElementsByClassName('reginput')].forEach(element => {
                if (element.value === '') {
                    element.classList.add('input-error');
                    valid = false;
                } else {
                    element.classList.remove('input-error');
                }
            });

            if (valid) {
                document.forms.registrationForm.submit();
            }
        });
    }

    _createForm() {
        return Form({
            title: 'Регистрация',
            icon: 'fa fa-pencil',
            method: 'post',
            name: 'registrationForm',
            fields: [
                {
                    type: 'text',
                    name: 'form-username',
                    placeholder: 'Логин...',
                    class: 'reginput'
                },
                {
                    type: 'text',
                    name: 'form-email',
                    placeholder: 'Email...',
                    class: 'reginput'
                },
                {
                    type: 'password',
                    name: 'form-password',
                    placeholder: 'Пароль...',
                    class: 'reginput'
                },
                {
                    type: 'password',
                    name: 'form-repeat-password',
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
        });
    }
}
