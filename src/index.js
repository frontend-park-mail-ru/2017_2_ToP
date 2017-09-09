import signUp from './views/registration/signUp/signUp';
import signIn from './views/registration/signIn/signIn';

import Router from './modules/router/router';


const main = document.getElementById('main');

// background
main.style.background = `url(static/img/backgrounds/${Math.floor(Math.random() * 3)}.jpg) no-repeat center fixed`;
main.style.backgroundSize = 'cover';

const router = new Router();

router.add('/signup', new signUp());
router.add('/signin', new signIn());
router.start();
