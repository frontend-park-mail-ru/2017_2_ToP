/**
 * Класс роута
 * @module Route
 */
export default class Route {
    /**
     * @param {string} path - путь
     * @param {TopComponent} view - вьюшка
     * @constructor
     */
    constructor(path, view) {
        this._path = path;
        this._view = null;
        this._viewType = view;
    }

    /**
     * Отрисовывает вьюшку
     */
    createView() {
        if (!this._view) {
            this._view = new this._viewType();
            this._view.build();
        } else {
            this._view.show();
        }
    }

    /**
     * Возвращает вьюшку
     * @return {TopComponent}
     */
    getView() {
        return this._view;
    }

    /**
     * Проверяет равен ли путь роута === path
     * @param path - сравниваемый путь
     * @return {boolean}
     */
    isThisPath(path) {
        return this._path === path;
    }
}
