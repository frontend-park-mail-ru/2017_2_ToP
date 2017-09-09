
export default class Router {
    constructor() {
        this.routes = [];
    }

    add(path, view) {
        this.routes[path] = view;
    }

    start() {
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
    }
}
