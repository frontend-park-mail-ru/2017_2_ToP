export default class Route {
    constructor(path, view) {
        this._path = path;
        this._viewType = view;
        this._view = null;
    }

    createView() {
        if (!this._view) {
            this._view = this._viewType.build();
        } else {
            this._view.forEach(element => element.show());
        }
    }

    getView() {
        return this._view;
    }

    isPath(path) {
        return this._path === path;
    }
}
