export default class Route {
    constructor(path, view) {
        this._path = path;
        this._viewType = view;
        this._view = view;
    }

    createView() {
        if (!this._view) {
            this._view.makeBuild(); //= this._viewType.makeBuild();
        } else {
            this._view.show(); //.forEach(element => element.show());
        }
    }

    getView() {
        return this._view;
    }

    isThisPath(path) {
        return this._path === path;
    }
}
