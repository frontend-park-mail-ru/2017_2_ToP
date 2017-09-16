import Main from './views/Main/Main';
import SignUp from './views/SignUp/SignUp';
import SignIn from './views/SignIn/SignIn';

import Router from './modules/Router/Router';

import BackgroundKostyl from './components/Background/Background';

const main = document.getElementsByClassName('main')[0];

// header, description, footer
const background = new BackgroundKostyl();
background.createBackground();

const router = new Router();

router
    .use('', Main)
    .use('/signup', SignUp)
    .use('/signin', SignIn)
    .start();


window.addEventListener('click', event => {
    const url = event.target.getAttribute('data-url');
    if (!url || url === '') {
        return;
    }
    router.go(url);
});