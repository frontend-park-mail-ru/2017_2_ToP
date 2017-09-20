import form from './Form.xml';
import TopComponent from '../TopComponent/TopComponent';
import Transport from '../../modules/Transport/Transport';
import Validation from '../../modules/Validator/index';

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

    _isValid() {
        for (let error of Object.values(this.errors)) {
            if (error) {
                return false;
            }
        }

        return true;
    }

    validation(input, submit) {
        const main = this.getElement();
        const errors = main.getElementsByClassName('error');
        const formElements = [...main.getElementsByClassName(input)];

        this._resetErrors(formElements);

        main.getElementsByClassName(submit)[0].addEventListener('click', () => {
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
    }

    _submit() {
        const form = document.forms[this.getData().name];
        // const url = form.action;
        const url = this.getData().name;
        const fields = form.elements;

        const data = Object.assign(...Object.values(fields)
            .map(field => {
                return {
                    [field.name]: field.value
                };
            }));

        if (this.getData().method === 'post') {
            Transport.post(url, data, (xhr, res) => {
                if (xhr !== null) {
                    alert(`${xhr.status}: ${xhr.statusText}\n${res.message}`);
                } else {
                    alert(`login: ${res.login}\nemail: ${res.email}`);
                }
            });
        }
    };
}
