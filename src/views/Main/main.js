import Form from '../../components/Form/form';
import TopComponent from '../../components/TopComponent/topComponent';

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

export default class Main extends Form {

    init() {
        this.createForm(data);
        document.getElementsByClassName('mycol')[0].appendChild(this.render());
    }
}
