import Main from './views/Main/Main';
import SignUp from './views/SignUp/SignUp';
import SignIn from './views/SignIn/SignIn';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import TopComponent from './components/TopComponent/TopComponent';

import CreateTopRouter from './modules/CreateTopRouter/CreateTopRouter';

const router = CreateTopRouter('main', [
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
], [ new Header(), new TopComponent('div', { 'class': 'content' }), new Footer() ]);

router.start();
