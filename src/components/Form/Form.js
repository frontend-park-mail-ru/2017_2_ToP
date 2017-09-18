import form from './Form.xml';
import TopComponent from '../TopComponent/TopComponent';

export default class FormView extends TopComponent {
    constructor(data) {
        super('div', { 'class': 'form-box' }, data);
    }

    render() {
        this._innerHTML(form(this.getData()));
        return this.getElement();
    }

    _passwordValidation(input, error) {
        let valid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(input);
        if (!valid) {
            if (input.length > 20)
                error.innerHTML = 'Пароль должен быть меньше 20 символов!';
            else if (input.length < 6)
                error.innerHTML = 'Пароль должен быть от 6 символов!';
            else
                error.innerHTML = 'Пароль должен содержать буквы разных регистров и как минимум 1 цифру!';
        }
        return valid;
    }

    _repeatPasswordValidation(input, error) {
        const password = document.forms[this.getData().name].elements.password.value;
        let valid = password === input;
        if(!valid) {
            error.innerHTML = 'Пароли не совпадают!';
        }
        return valid;
    }

    _loginValidation(input, error) {
        let valid = /^[a-z0-9_-]{3,15}$/.test(input);
        if (!valid) {
            if (input.length < 3)
                error.innerHTML = 'Логин должен быть от 3 символов!';
            else if (input.length > 15)
                error.innerHTML = 'Логин должен быть до 15 символов!';
            else
                error.innerHTML = 'Логин должен быть только из цифр и нижних букв английского алфавита!';
        }
        return valid;
    }

    _emailValidation(input, error) {
        let valid = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test(input);
        if (!valid) {
            error.innerHTML = 'Введите корректный email!';
        }
        return valid;
    }

    validation(input, submit, formName) {
        const main = this.getElement();
        const errors = main.getElementsByClassName('error');

        [...main.getElementsByClassName(input)].forEach(element => {
            element.addEventListener('focus', () => {
                element.classList.remove('input-error');
            }, false);
        });

        main.getElementsByClassName(submit)[0].addEventListener('click', () => {
            let formValid = true;
            let valid = true;
            let i = 0;

            [...main.getElementsByClassName(input)].forEach(element => {
                const error = errors[i];
                if (element.value === '') {
                    error.innerHTML = 'Пожалуйста, введите данные!';
                    formValid = false;
                }
                else {
                    switch(element.name) {
                        case 'login':
                            formValid = this._loginValidation(element.value, error);
                            break;
                        case 'email':
                            formValid = this._emailValidation(element.value, error);
                            break;
                        case 'password':
                            formValid = this._passwordValidation(element.value, error);
                            break;
                        case 'repeat-password':
                            formValid = this._repeatPasswordValidation(element.value, error);
                            break;
                    }
                }

                if (!formValid) {
                    element.classList.add('input-error');
                    error.classList.add('active');
                    valid = false;
                }
                else {
                    element.classList.remove('input-error');
                    error.classList.remove('active');
                    error.innerHTML = '';
                }
                i++;
            });

            if (valid) {
                document.forms[formName].submit();
            }
        });
    }
}
