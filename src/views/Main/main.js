import mainPage from './main.xml';

export default class Main {

    init() {
        const main = document.getElementsByClassName('main')[0];
        main.innerHTML = mainPage({ title: 'Наша' });
    }
}
