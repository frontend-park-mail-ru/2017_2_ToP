import Route from './Route';

/**
 * Класс роутера
 * @module Router
 */
class Router {
    /**
     * @constructor
     * @return {Router|*}
     */
    constructor() {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];

        Router.__instance = this;
    }

    /**
     * Устанавливает вьюшку для path
     * @param {string} path - путь
     * @param {TopComponent} view
     * @return {Router}
     */
    use(path, view) {
        const route = new Route(path, view);
        this.routes.push(route);

        return this;
    }

    /**
     * Начинает работу роутеров
     */
    start() {
        window.addEventListener('popstate', () => this._onRoute());

        this._onRoute();
    }

    /**
     * Находит роут для путя
     * @param {string} path
     * @return {Route}
     */
    getRoute(path) {
        return this.routes.find(route => route.isThisPath(path));
    }

    /**
     * Возвращает текущий path
     * @return {string}
     */
    static getPath() {
        const currentPath = window.location.pathname.toString().toLowerCase();

        return currentPath[currentPath.length - 1] === '/' ? currentPath.slice(0, -1) : currentPath;
    }

    /**
     * Осуществляет переключение вьюшки без перезагрузки страницы
     * @param path
     */
    go(path) {
        window.history.pushState({}, '', path);
        this._onRoute();
    }

    /**
     * Прячет все вьюшки
     */
    hideAll() {
        this.routes.forEach(route => {
            if (route.getView()) {
                route.getView().hide();
            }
        });
    }

    /**
     * Создает события перехода по нажатию на элемент
     * @param {EventTarget} objectListener
     */
    connectRouting(objectListener) {
        objectListener.addEventListener('click', event => {
            const url = event.target.getAttribute('data-url');

            if (!url || url === '') {
                return;
            }
            this.go(url);
        });
    }

    /**
     * Осуществляет переключение вьюшки по текущему пути
     * @private
     */
    _onRoute() {
        const route = this.getRoute(Router.getPath());

        if (!route) {
            return;
        }

        this.hideAll();
        route.createView();
    }
}

const router = new Router();

export default router;
