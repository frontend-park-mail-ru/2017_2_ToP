const METHODS = {
    GET: 'GET',
    POST: 'POST'
};

const REQ_HEADER = {
    HEADER: 'Content-Type',
    VALUE: 'application/json; charset=utf-8'
};

const BACK_URL = 'https://apoj.herokuapp.com';

/**
 * Модуль, предоставляющий методы для выполнения HTTP-запросов
 * @module Transport
 */
export default class Transport {
    /**
     * Выполняет GET запрос по указанному адресу
     * @param {string} url - адрес запроса
     * @return {Promise}
     */
    static get(url) {
        return Transport._send(url, METHODS.GET);
    }

    /**
     * Выполняет POST запрос по указанному адресу
     * @param {string} url - адрес запроса
     * @param {*} body - тело запроса
     * @return {Promise}
     */
    static post(url, body) {
        return Transport._send(url, METHODS.POST, body);
    }

    /**
     * Выполняет запрос по указанному адресу
     * @param {string} url - адрес запроса
     * @param {string} _method - метод запроса
     * @param {*} [body={}] - тело запроса (объект)
     * @return {Promise}
     */
    static _send(url, _method, body = {}) {
        const options = {
            method: _method,
            mode: 'cors',
            credentials: 'include'
        };

        if (_method === METHODS.POST) {
            const _headers = new Headers();
            _headers.append(REQ_HEADER.HEADER, REQ_HEADER.VALUE);

            options.body = JSON.stringify(body);
            options.headers = _headers;
        }

        return fetch(BACK_URL + url, options)
            .then(response => {
                if (response.status >= 400) {
                    throw response;
                }

                return response.json();
            });
    }
}
