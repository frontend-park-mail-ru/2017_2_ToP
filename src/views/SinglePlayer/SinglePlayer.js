import TopComponent from '../../components/TopComponent/TopComponent';

import UserService from '../../services/UserService/UserService';
import router from '../../modules/Router/Router';
import GameManager from '../../game/GameManager/GameManager';
import loading from '../../components/Loading/Loading';

import './Game.scss';

const preGameData = {
    buttons: [
        {
            text: 'Продолжить',
            url: '',
            class: 'button-main'
        },
        {
            text: 'Начать новую',
            url: '',
            class: 'button-main'
        }
    ]
};

export default class SinglePlayer extends TopComponent {
    constructor() {
        super('div', {class: 'game'}, preGameData);
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
            return;
        }

        this._gameManager = new GameManager('singleplayer');
    }
}
