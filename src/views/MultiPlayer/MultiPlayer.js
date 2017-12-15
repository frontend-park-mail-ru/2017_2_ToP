import TopComponent from '../../components/TopComponent/TopComponent';

import UserService from '../../services/UserService/UserService';
import router from '../../modules/Router/Router';
import GameManager from '../../game/GameManager/GameManager';
import loading from '../../components/Loading/Loading';

import {MULTIPLAYER} from '../../constants/Game';

export default class MultiPlayer extends TopComponent {
    constructor() {
        super('div', {class: 'content__game'});
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

        this.renderTo('content');
        this._gameManager = new GameManager(MULTIPLAYER);
    }
}
