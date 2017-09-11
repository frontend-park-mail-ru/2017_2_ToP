import Main from './views/Main/main';
import SignUp from './views/SignUp/signUp';
import SignIn from './views/SignIn/signIn';

import Router from './modules/router/router';

const main = document.getElementsByClassName('main')[0];

// background
main.style.background = `url(static/img/backgrounds/${Math.floor(Math.random() * 3)}.jpg) no-repeat center fixed`;
main.style.backgroundSize = 'cover';

const router = new Router();

router
    .use('', Main)
    .use('/signup', SignUp)
    .use('/signin', SignIn)
    .start();

window.addEventListener('click', event => {
    const element = event.target;
    if (!element.getAttribute('data-url')) {
        return;
    }
    router.go(element.getAttribute('data-url'));
});
