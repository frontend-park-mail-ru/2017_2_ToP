import UnLogged from '../UnLogged/unLogged.xml';
import Form from '../../components/Form/form.xml';
import TopComponent from '../../components/TopComponent/topComponent';

export default class Main extends TopComponent {

    init() {
        const main = document.getElementsByClassName('main')[0];
        this.getElement().innerHTML = UnLogged();
        this.getElement().getElementsByClassName('form-box')[0].innerHTML = this._createForm();
        main.appendChild(this.render());
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
