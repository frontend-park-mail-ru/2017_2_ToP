import Main from './views/registration/Main/main';
import SignUp from './views/registration/signUp/signUp';
import SignIn from './views/registration/signIn/signIn';

import Router from './modules/router/router';


const main = document.getElementById('main');

// background
main.style.background = `url(static/img/backgrounds/${Math.floor(Math.random() * 3)}.jpg) no-repeat center fixed`;
main.style.backgroundSize = 'cover';

const router = new Router();

router.add('', new Main());
router.add('/signup', new SignUp());
router.add('/signin', new SignIn());
router.start();
