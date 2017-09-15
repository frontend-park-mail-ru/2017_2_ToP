import Form from '../../components/Form/form';

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
        this.renderTo('mycol');
    }
}
