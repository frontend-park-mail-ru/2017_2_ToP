import Main from './views/Main/Main';
import SignUp from './views/SignUp/SignUp';
import SignIn from './views/SignIn/SignIn';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import TopComponent from './components/TopComponent/TopComponent';

import CreateTopRouter from './modules/CreateTopRouter/CreateTopRouter';

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

const header = new Header();
const footer = new Footer();
const content = new TopComponent('div', { 'class': 'content' });

const router = CreateTopRouter('main', componentsRoutes, [ header, content, footer ]);

window.addEventListener('click', event => {
    const url = event.target.getAttribute('data-url');
    if (!url || url === '') {
        return;
    }
    router.go(url);
});
