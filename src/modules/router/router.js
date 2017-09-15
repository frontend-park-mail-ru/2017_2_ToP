import Route from './route';

export default class Router {
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
        window.onpopstate = () => {
            this._onRoute();
        };

        this._onRoute();
    }

    getRoute(path) {
        return this.routes.find(route => route.isPath(path));
    }

    _onRoute() {
        const route = this.getRoute(this.getPath());

        if (!route) {
            return;
        }

        this.hideAll();
        route.createView();
    }

    getPath() {
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
                console.log(route);
                route.getView().hide();
            }
        });
    }
}
