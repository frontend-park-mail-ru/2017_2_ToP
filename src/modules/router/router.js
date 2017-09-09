
export default class Router {
    constructor() {
        this.routes = [];
    }

    use(path, view) {
        this.routes[path] = view;

        return this;
    }

    start() {
        window.onpopstate = () => {
            this.onRoute();
        };

        this.onRoute();
    }

    onRoute() {
        Object.keys(this.routes).forEach(_path => {
            let currentPath = window.location.pathname.toString().toLowerCase();

            if (currentPath[currentPath.length - 1] === '/') {
                currentPath = currentPath.slice(0, -1);
            }

            if (_path === currentPath) {
                this.routes[_path].init();
            }
        });
    }

    go(path) {
        window.history.pushState({}, '', path);
        this.onRoute();
    }
}
