import TopComponent from '../TopComponent/TopComponent';
import Button from '../Button/Button';
import UserService from '../../services/UserService/UserService';

export default class Menu extends TopComponent {
    constructor(data) {
        super('div', {'class': 'menu'}, data);
    }

    render() {
        this.getData().buttons.forEach(el => {
            const button = new Button(el.text, el.url);
            this.append(button.render());
        });
        this._logout();
        return this.getElement();
    }

    _logout() {
        const main = this.getElement();
        console.log(this.getElement());

        main.getElementsByClassName('button')[0].addEventListener('click', () => {
            if (this.getData().method === 'get') {
                UserService.logout()
                    .then(response => {
                        window.router.go('/');
                    })
                    .catch(response => {
                        response.json().then(json => {
                            console.log(`${response.status}: ${response.statusText}\n${json.message}`);
                        });
                    });
            }
        });
    }
}
