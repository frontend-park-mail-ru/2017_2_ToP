import Main from './views/Main/Main';
import SignUp from './views/SignUp/SignUp';
import SignIn from './views/SignIn/SignIn';
import Scoreboard from './views/Scoreboard/Scoreboard';
import SinglePlayer from './views/SinglePlayer/SinglePlayer';
import MultiPlayer from './views/MultiPlayer/MultiPlayer';

import Header from './components/Header/Header';
import Loading from './components/Loading/Loading';
import TopComponent from './components/TopComponent/TopComponent';

import RouterRegister from './modules/RouterRegister/RouterRegister';
import MultiEventsRegister from './modules/MultiEvents/MultiEvents';
import ServiceWorkerRegister from './services/ServiceWorker/ServiceWorker';

ServiceWorkerRegister();
MultiEventsRegister();

RouterRegister('main', [
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
    },
    {
        path: '/multiplayer',
        component: MultiPlayer
    },
    {
        path: '/scoreboard',
        component: Scoreboard
    }
], [new Header(), Loading, new TopComponent('div', {class: 'content'})]);
