import Main from './views/Main/Main';
import SignUp from './views/SignUp/SignUp';
import SignIn from './views/SignIn/SignIn';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import TopComponent from './components/TopComponent/TopComponent';

import CreateTopRouter from './modules/CreateTopRouter/CreateTopRouter';

import UserService from './services/UserService/UserService';

const router = CreateTopRouter('main', [
    {
        path: '',
        component: new Main()
    },
    {
        path: '/signup',
        component: new SignUp()
    },
    {
        path: '/signin',
        component: new SignIn()
    }
], [new Header(), new TopComponent('div', {'class': 'content'}), new Footer()]);

UserService.getData()
    .then(userdata => {
        // авторизирован. userdata - {id, login, email}
    })
    .catch(response => {
        // 400+
        if (response.status === 401) {
            // unLogged
        } else {
            // хз
        }
    });

router.start();
window.router = router;
