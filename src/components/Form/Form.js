import form from './Form.xml';
import TopComponent from '../TopComponent/TopComponent';
import Transport from '../../modules/Transport/Transport';
import UserService from '../../services/UserService/UserService';
import Validation from '../../modules/Validator/index';
import router from '../../modules/Router/Router';

import './Form.scss';

export default class FormView extends TopComponent {
    constructor(data) {
        super('div', {'class': 'form-box'}, data);

        this.errors = {};
    }

    render() {
        this._innerHTML(form(this.getData()));
        this._validation();
        return this.getElement();
    }

    _errorOutput(formElements, errorsElements) {
        formElements.forEach(element => {
            if (this.errors[element.name]) {
                errorsElements[element.name].innerHTML = this.errors[element.name];
                element.classList.add('input-error');
                errorsElements[element.name].classList.add('active');
            } else {
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

    _isValid() {
        let valid = true;
        Object.values(this.errors).forEach(error => {
            if (error) {
                valid = false;
            }
        });
        return valid;
    }

    _validation() {
        const main = this.getElement();
        const errors = main.getElementsByClassName('error');
        const formElements = [...main.getElementsByClassName(this.getData().fields[0].class)];
        const submitButton = main.getElementsByClassName(this.getData().buttons[0].class)[0];

        this._resetErrors(formElements);

        submitButton.addEventListener('click', () => {
            const values = {};

            formElements.forEach(element => {
                values[element.name] = element;
            });

            this.errors = Validation(values, this.errors);
            this._errorOutput(formElements, errors);

            if (this._isValid()) {
                this._submit();
            }
        });

        formElements.forEach(element => {
            element.addEventListener('blur', () => {
                const values = {};
                values[element.name] = element;

                if (element.name === 'repeatPassword') {
                    values.password = formElements.find(element => element.name === 'password');
                }

                this.errors = Validation(values, this.errors);
                this._errorOutput([element], errors);
            });
        });
    }

    _submit() {
        const form = document.forms[this.getData().name];
        const url = `/${this.getData().name}`;
        const fields = form.elements;

        const data = Object.assign(...Object.values(fields)
            .map(field => {
                return {
                    [field.name]: field.value
                };
            }));

        if (this.getData().method === 'post') {
            Transport.post(url, data)
                .then(response => {
                    console.log(`login: ${response.login}\nemail: ${response.email}`);

                    UserService.user = response;
                })
                .then(() => {
                    router.getRoute('').getView().rerender();
                    router.go('/');
                })
                .catch(response => {
                    response.json().then(json => {
                        console.log(`${response.status}: ${response.statusText}\n${json.message}`);
                    });
                });
        }

    }
}
