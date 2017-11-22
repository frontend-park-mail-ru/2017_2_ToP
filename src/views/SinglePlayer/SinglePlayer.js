import TopComponent from '../../components/TopComponent/TopComponent';

import UserService from '../../services/UserService/UserService';
import router from '../../modules/Router/Router';
import GameManager from '../../game/GameManager/GameManager';
import loading from '../../components/Loading/Loading';

const preGameData = {
    buttons: [
        {
            text: 'Продолжить',
            url: ''
        },
        {
            text: 'Начать новую',
            url: ''
        }
    ]
};

export default class SinglePlayer extends TopComponent {
    constructor() {
        super('div', {}, preGameData);
    }

    show() {
        if (!(UserService.isLoggedIn())) {
            router.go('/');
            return;
        }

        if (this._gameManager) {
            this._gameManager.show();
        } else {
            this.build();
        }
    }

    hide() {
        loading.hide();
        if (this._gameManager) {
            this._gameManager.hide();
        }
    }

    build() {
        if (!(UserService.isLoggedIn())) {
            router.go('/');
            return null;
        }

        this._gameManager = new GameManager('singleplayer');
    }
}
