import Route from './Route';

class Router {
    constructor() {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];

        Router.__instance = this;
    }

    use(path, view) {
        const route = new Route(path, view);
        this.routes.push(route);

        return this;
    }

    start() {
        window.addEventListener('popstate', () => this._onRoute());

        this._onRoute();
    }

    getRoute(path) {
        return this.routes.find(route => route.isThisPath(path));
    }

    static getPath() {
        const currentPath = window.location.pathname.toString().toLowerCase();

        return currentPath[currentPath.length - 1] === '/' ? currentPath.slice(0, -1) : currentPath;
    }

    go(path) {
        window.history.pushState({}, '', path);
        this._onRoute();
    }

    // temp func
    hideAll() {
        this.routes.forEach(route => {
            if (route.getView()) {
                route.getView().hide();//.forEach(element => element.hide());
            }
        });
    }

    connectRouting(objectListener) {
        objectListener.addEventListener('click', event => {
            const url = event.target.getAttribute('data-url');

            if (!url || url === '') {
                return;
            }
            this.go(url);
        });
    }

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