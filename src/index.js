import Registration from './views/registration/registration';

import Router from './modules/router/router';


const main = document.getElementById('main');

// background
main.style.background = `url(static/img/backgrounds/${Math.floor(Math.random() * 3)}.jpg) no-repeat center fixed`;
main.style.backgroundSize = 'cover';

const signUp = new Registration();

const router = new Router();

router.add('/signup', new Registration());
router.start();
