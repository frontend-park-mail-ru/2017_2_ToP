import signUp from './signUp.xml';

export default class Registration {

    init() {
        const main = document.getElementById('main');
        main.innerHTML = signUp({ title: 'Наша' });

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
                main.forms['registration-form'].submit();
            }
        });
    }
}
