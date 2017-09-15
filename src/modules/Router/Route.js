export default class Route {
    constructor(path, view) {
        this._path = path;
        this._viewType = view;
        this._view = null;
    }

    createView() {
        if (!this._view) {
            this._view = new this._viewType();
            this._view.init();
        } else {
            this._view.show();
        }
    }

    getView() {
        return this._view;
    }

    isPath(path) {
        return this._path === path;
    }
}
