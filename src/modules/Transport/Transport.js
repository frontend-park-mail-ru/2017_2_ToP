const METHODS = {
    GET: 'GET',
    POST: 'POST'
};

const REQ_HEADER = {
    HEADER: 'Content-Type',
    VALUE: 'application/json; charset=utf8'
};

const BACK_URL = 'https://apoj.herokuapp.com/';

export default class Transport {
    static get(url) {
        return Transport._send(url, METHODS.GET);
    }

    static post(url, body) {
        return Transport._send(url, METHODS.POST, body);
    }

    static _send(url, _method, body = {}) {
        url = BACK_URL + url;

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

        return fetch(url, options)
            .then(function (response) {
                if (response.status >= 400) {
                    throw response;
                }

                return response.json();
            });
    }
}
