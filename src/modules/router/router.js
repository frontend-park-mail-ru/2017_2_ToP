
export default class Router {
    go(path) {
        window.history.pushState({}, '', path);
    }
}
