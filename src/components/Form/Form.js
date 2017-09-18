import form from './Form.xml';
import TopComponent from '../TopComponent/TopComponent';
import Transport from '../../modules/Transport/Transport';

export default class FormView extends TopComponent {
    constructor(data) {
        super('div', {'class': 'form-box'}, data);
    }

    render() {
        this._innerHTML(form(this.getData()));
        return this.getElement();
    }

    validation(input, submit) {
        const main = this.getElement();
        [...main.getElementsByClassName(input)].forEach(element => {
            element.addEventListener('focus', () => {
                element.classList.remove('input-error');
            }, false);
        });

        main.getElementsByClassName(submit)[0].addEventListener('click', () => {
            let valid = true;
            [...main.getElementsByClassName(input)].forEach(element => {
                if (element.value === '') {
                    element.classList.add('input-error');
                    valid = false;
                } else {
                    element.classList.remove('input-error');
                }
            });

            if (valid) {
                // document.forms[this.getData().name].submit();
                this._submit();
            }
        });
    }

    _submit() {
        const form = document.forms[this.getData().name];
        const url = form.action;
        const fields = form.elements;

        const data = Object.assign(...Object.values(fields)
            .map(field => {
                return {
                    [field.name]: field.value
                };
            }));

        if (this.getData().method === 'post') {
            Transport.Post(url, data, () => {
                Transport.Get('/me', (one, res) => {
                    alert(`email: ${res.email}\npassword: ${res.password}`);
                });
            });
        }
    }
}
