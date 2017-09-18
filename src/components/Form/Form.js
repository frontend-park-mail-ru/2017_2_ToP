import form from './Form.xml';
import TopComponent from '../TopComponent/TopComponent';

export default class FormView extends TopComponent {
    constructor(data) {
        super('div', {'class': 'form-box'}, data);
        this.errors = {};
    }

    render() {
        this._innerHTML(form(this.getData()));
        return this.getElement();
    }

    _errorOutput(formElements, errorsElements) {
        formElements.forEach(element => {
            if (this.errors[element.name]) {
                errorsElements[element.name].innerHTML = this.errors[element.name];
                element.classList.add('input-error');
                errorsElements[element.name].classList.add('active');
            }
            else {
                element.classList.remove('input-error');
                errorsElements[element.name].classList.remove('active');
                errorsElements[element.name].innerHTML = '';
            }
        });
    }

    _resetErrors(formElements) {
        this.errors = {};
        formElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.classList.remove('input-error');
            }, false);
        });
    }

    _passwordValidation(input) {
        let valid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(input);
        if (!valid) {
            if (input.length > 20) {
                this.errors.password = 'Пароль должен быть меньше 20 символов!';
            }
            else if (input.length < 6) {
                this.errors.password = 'Пароль должен быть от 6 символов!';
            }
            else {
                this.errors.password = 'Пароль должен содержать буквы разных регистров и как минимум 1 цифру!';
            }
        }
        else {
            this.errors.password = '';
        }
        return valid;
    }

    _repeatPasswordValidation(input) {
        const password = document.forms[this.getData().name].elements.password.value;
        let valid = password === input;
        if (!valid) {
            this.errors.repeatPassword = 'Пароли не совпадают!';
        }
        else {
            this.errors.repeatPassword = '';
        }
        return valid;
    }

    _loginValidation(input) {
        let valid = /^[a-z0-9_-]{3,15}$/.test(input);
        if (!valid) {
            if (input.length < 3) {
                this.errors.login = 'Логин должен быть от 3 символов!';
            }
            else if (input.length > 15) {
                this.errors.login = 'Логин должен быть до 15 символов!';
            }
            else {
                this.errors.login = 'Логин должен быть только из цифр и нижних букв английского алфавита!';
            }
        }
        else {
            this.errors.login = '';
        }
        return valid;
    }

    _emailValidation(input) {
        let valid = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test(input);
        if (!valid) {
            this.errors.email = 'Введите корректный email!';
        }
        else {
            this.errors.email = '';
        }
        return valid;
    }

    _basicValidation(element) {
        let valid = !(element.value === '');
        if (!valid) {
            this.errors[element.name] = 'Пожалуйста, введите данные!';
        }
        else {
            this.errors[element.name] = '';
        }
        return valid;
    }

    _isValid() {
        for (let error of Object.values(this.errors)) {
            if (error) {
                return false;
            }
        }

        return true;
    }

    validation(input, submit, formName) {
        const main = this.getElement();
        const errors = main.getElementsByClassName('error');
        const formElements = [...main.getElementsByClassName(input)];

        this._resetErrors(formElements);

        main.getElementsByClassName(submit)[0].addEventListener('click', () => {
            formElements.forEach(element => {
                let formValid = this._basicValidation(element);

                if (formValid) {
                    switch (element.name) {
                        case 'login':
                            this._loginValidation(element.value);
                            break;
                        case 'email':
                            this._emailValidation(element.value);
                            break;
                        case 'password':
                            this._passwordValidation(element.value);
                            break;
                        case 'repeat-password':
                            this._repeatPasswordValidation(element.value);
                            break;
                    }
                }
            });

            this._errorOutput(formElements, errors);

            if (this._isValid()) {
                document.forms[formName].submit();
            }
        });
    }
}
