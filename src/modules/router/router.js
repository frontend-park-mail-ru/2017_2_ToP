export default class Router {
    constructor() {
        this.routes = new Map();
    }

    use(path, view) {
        this.routes.set(path, view);

        return this;
    }

    start() {
        window.onpopstate = () => {
            this.onRoute();
        };

        this.onRoute();
    }

    onRoute() {
        let currentPath = window.location.pathname.toString().toLowerCase();

        if (currentPath[currentPath.length - 1] === '/') {
            currentPath = currentPath.slice(0, -1);
        }

        const route = this.routes.get(currentPath);

        if (!route) {
            return;
        }

        route.init();
    }

    go(path) {
        window.history.pushState({}, '', path);
        this.onRoute();
    }
}
