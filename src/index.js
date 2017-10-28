import Main from './views/Main/Main';
import SinglePlayer from './views/SinglePlayer/SinglePlayer';
import SignUp from './views/SignUp/SignUp';
import SignIn from './views/SignIn/SignIn';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Loading from './components/Loading/Loading';
import TopComponent from './components/TopComponent/TopComponent';


import CreateTopRouter from './modules/CreateTopRouter/CreateTopRouter';

CreateTopRouter('main', [
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
    },
    {
        path: '/singleplayer',
        component: SinglePlayer
    }
], [new Header(), Loading, new TopComponent('div', {'class': 'content'}), new Footer()]);