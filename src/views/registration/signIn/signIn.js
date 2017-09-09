import signIn from './signIn.xml';

export default class Login {

    init() {
        const main = document.getElementsByClassName('main')[0];
        main.innerHTML = signIn({ title: 'Наша' });

        [...main.getElementsByClassName('loginput')].forEach(element => {
            element.addEventListener('focus', () => {
                element.classList.remove('input-error');
            }, false);
        });

        main.getElementsByClassName('loginSubmit')[0].addEventListener('click', () => {
            let valid = true;
            [...main.getElementsByClassName('loginput')].forEach(element => {
                if (element.value === '') {
                    element.classList.add('input-error');
                    valid = false;
                } else {
                    element.classList.remove('input-error');
                }
            });

            if (valid) {
                document.forms.loginForm.submit();
            }
        });
    }
}
