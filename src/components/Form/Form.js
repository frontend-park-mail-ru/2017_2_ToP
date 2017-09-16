import form from './Form.xml';
import TopComponent from '../TopComponent/TopComponent';

export default class FormView extends TopComponent {
    constructor() {
        super('div', { 'class': 'form-box' });
    }

    createForm(data) {
        this.getElement().innerHTML = form(data);
    }

    validation(input, submit, formName) {
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
                document.forms.formName.submit();
            }
        });
    }
}
