import Main from './views/registration/Main/main';
import SignUp from './views/registration/signUp/signUp';
import SignIn from './views/registration/signIn/signIn';

import Router from './modules/router/router';


const main = document.getElementsByClassName('main')[0];

// background
main.style.background = `url(static/img/backgrounds/${Math.floor(Math.random() * 3)}.jpg) no-repeat center fixed`;
main.style.backgroundSize = 'cover';

const router = new Router();

router
    .use('', new Main(router))
    .use('/signup', new SignUp())
    .use('/signin', new SignIn())
    .start();
