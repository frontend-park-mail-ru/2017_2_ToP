import mainPage from './main.xml';

export default class Main {

    constructor(router) {
        this._router = router;
    }

    init() {
        const main = document.getElementsByClassName('main')[0];
        main.innerHTML = mainPage({ title: 'Наша' });

        [...main.getElementsByTagName('button')].forEach(element => {
            element.addEventListener('click', () => {
                this._router.go(element.getAttribute('data-url'));
            });
        });
    }
}
