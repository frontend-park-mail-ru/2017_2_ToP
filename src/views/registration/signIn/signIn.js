import signIn from './signIn.xml';

export default class Login {

    init() {
        const main = document.getElementById('main');
        main.innerHTML = signIn({ title: 'Наша' });

        const inp = main.getElementsByClassName('loginput');

        Object.keys(inp).forEach(el => {
            inp[el].addEventListener('focus', () => {
                inp[el].classList.remove('input-error');
            }, false);
        });

        main.getElementsByClassName('loginSubmit')[0].addEventListener('click', () => {
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
