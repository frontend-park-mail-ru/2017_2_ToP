import Form from '../../components/Form/form';
import TopComponent from '../../components/TopComponent/topComponent';

export default class SignUp extends TopComponent {

    constructor() {
        super();
        this._form = new Form();
    }

    init() {
        this._createForm();
        this._validation();
        document.getElementsByClassName('form-box')[0].appendChild(this.render());
    }

    _validation() {
        const main = this.getElement();
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
        const data = {
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
        };

        this._form.init(data);

        this.getElement().appendChild(this._form.render());
    }
}
