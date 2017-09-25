export default class Route {
    constructor(path, view) {
        this._path = path;
        this._viewType = view;
        this._view = null;
    }

    createView() {
        if (!this._view) {
            this._view = this._viewType.makeBuild();
        } else {
            this._view.forEach(element => element.show());
        }
    }

    getView() {
        return this._view;
    }

    isThisPath(path) {
        return this._path === path;
    }
}
