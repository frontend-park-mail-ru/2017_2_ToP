import Main from './views/Main/Main';
import SignUp from './views/SignUp/SignUp';
import SignIn from './views/SignIn/SignIn';

import BackgroundKostyl from './components/Background/Background';
import CreateTopRouter from './modules/CreateTopRouter/CreateTopRouter';

// header, description, footer
const background = new BackgroundKostyl();
background.createBackground();

const componentsRoutes = [
    {
        path: '',
        component: Main
    },
    {
        path: '/signup',
        component: SignUp
    },
    {
        path: '/signin',
        component: SignIn
    }
];

const router = CreateTopRouter('main', componentsRoutes, {});

window.addEventListener('click', event => {
    const url = event.target.getAttribute('data-url');
    if (!url || url === '') {
        return;
    }
    router.go(url);
});
