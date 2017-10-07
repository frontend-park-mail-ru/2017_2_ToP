import TopComponent from '../TopComponent/TopComponent';
import Button from '../Button/Button';
import UserService from '../../services/UserService/UserService';
import router from '../../modules/Router/Router';

import './Menu.scss';

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
        const logoutButton = main.querySelector('[data-url="/"]');
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                UserService.logout()
                    .then(() => {
                        router.getRoute('').getView().rerender();
                        router.go('/');
                    })
                    .catch(response => {
                        response.json().then(json => {
                            console.log(`${response.status}: ${response.statusText}\n${json.message}`);
                        });
                    });
            });
        }
    }
}
