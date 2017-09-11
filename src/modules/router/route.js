export default class Route {
    constructor(path, view) {
        this._path = path;
        this._viewType = view;
        this._view = null;
    }

    createView() {
        this._view = new this._viewType();
        this._view.init();
    }

    isPath(path) {
        return this._path === path;
    }
}
