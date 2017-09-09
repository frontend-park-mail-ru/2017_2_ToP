import mainPage from './main.xml';

export default class Main {

    init() {
        const main = document.getElementById('main');
        main.innerHTML = mainPage({ title: 'Наша' });
    }
}
