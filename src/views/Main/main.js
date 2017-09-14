import Form from '../../components/Form/form';
import TopComponent from '../../components/TopComponent/topComponent';

export default class Main extends TopComponent {

    constructor() {
        super();
        this._menu = new Form();
    }

    init() {
        this._createForm();
        document.getElementsByClassName('form-box')[0].appendChild(this.render());
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

        this._menu.init(data);

        this.getElement().appendChild(this._menu.render());
    }
}
