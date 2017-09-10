import Route from './route';

export default class Router {
    constructor() {
        this.routes = [];
    }

    use(path, view) {
        const route = new Route(path, view);
        this.routes.push(route);

        return this;
    }

    start() {
        window.onpopstate = () => {
            this.onRoute();
        };

        this.onRoute();
    }

    getRoute(path) {
        return this.routes.find(route => route.isPath(path));
    }

    onRoute() {
        const route = this.getRoute(this.getPath());

        if (!route) {
            return;
        }

        route.createView();
    }

    getPath() {
        const currentPath = window.location.pathname.toString().toLowerCase();

        return currentPath[currentPath.length - 1] === '/' ? currentPath.slice(0, -1) : currentPath;
    }

    go(path) {
        window.history.pushState({}, '', path);
        this.onRoute();
    }
}
