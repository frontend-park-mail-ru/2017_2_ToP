import TopComponent from '../../components/TopComponent/TopComponent';

import UserService from '../../services/UserService/UserService';
import router from '../../modules/Router/Router';
import GameManager from '../../game/GameManager/GameManager';
import loading from '../../components/Loading/Loading';

import './Game.scss';
import {SINGLEPLAYER} from '../../constants/Game';

export default class SinglePlayer extends TopComponent {
    constructor() {
        super('div', {class: 'game'});
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

        this._gameManager = new GameManager(SINGLEPLAYER);
    }
}
