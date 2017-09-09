import signUp from './registration.xml';

export default class Registration {

    init() {
        const main = document.getElementById('main');
        main.innerHTML = signUp({ title: 'Наша' });

        const inp = main.getElementsByClassName('reginput');

        Object.keys(inp).forEach(el => {
            inp[el].addEventListener('focus', () => {
                inp[el].classList.remove('input-error');
            }, false);
        });

        main.getElementsByClassName('registrationSubmit')[0].addEventListener('click', () => {
            let valid = true;
            Object.keys(inp).forEach(el => {
                if (inp[el].value === '') {
                    inp[el].classList.add('input-error');
                    valid = false;
                } else {
                    inp[el].classList.remove('input-error');
                }
            });

            if (valid) {
                main.forms['registration-form'].submit();
            }
        });
    }
}
