import Menu from '../../components/Menu/Menu';
import TopComponent from '../../components/TopComponent/TopComponent';
import UserService from '../../services/UserService/UserService';

const unlogged = {
    buttons: [
        {
            text: 'Авторизация',
            url: '/signin'
        },
        {
            text: 'Регистрация',
            url: '/signup'
        }
    ]
};

const logged = {
    user: {

    },
    buttons: [
        {
            text: 'Выйти',
            url: '/'
        }
    ]
};

export default class Main extends TopComponent {
    constructor() {
        let data = {};
        UserService.getData()
            .then(userdata => {
                console.log(userdata);
                logged.user.username = userdata.login;
                data = logged;
            })
            .catch(response => {
            if (response.status === 401) {
                data = unlogged;
            }
        });
        super('div', {}, data);
    }

    build() {
        UserService.getData()
            .then(userdata => {
                logged.user.username = userdata.login;
                this.setData(logged);
            })
            .catch(response => {
                if (response.status === 401) {
                    this.setData(unlogged);
                }
            });
        return [new Menu(this.getData())];
    }
}
