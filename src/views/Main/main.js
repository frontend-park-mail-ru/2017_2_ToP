import UnLogged from '../UnLogged/unLogged.xml';
import Form from '../../components/Form/form.xml';
import TopComponent from '../../components/TopComponent/topComponent';

export default class Main extends TopComponent {

    init() {
        this._createBackground();
        this._createForm();
        document.getElementsByClassName('main')[0].appendChild(this.render());
    }

    _createForm() {
        const data = {
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
        };

        this.getElement().getElementsByClassName('form-box')[0].innerHTML = Form(data);
    }

    _createBackground() {
        this.getElement().innerHTML = UnLogged();
    }
}
