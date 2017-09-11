import UnLogged from '../UnLogged/unLogged.xml';
import Form from '../../components/Form/form.xml';

export default class Main {

    init() {
        const main = document.getElementsByClassName('main')[0];
        main.innerHTML = UnLogged({ title: 'Наша' });
        main.getElementsByClassName('form-box')[0].innerHTML = this._createForm();
    }

    _createForm() {
        return Form({
            method: 'get',
            name: 'startForm',
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
        });
    }
}
