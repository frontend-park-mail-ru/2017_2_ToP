const METHODS = {
    GET: 'GET',
    POST: 'POST'
};

const REQ_HEADER = {
    HEADER: 'Content-Type',
    VALUE: 'application/json; charset=utf8'
};

export default class Transport {
    static get(url, callback) {
        return Transport._send(url, METHODS.GET, {}, callback);
    }

    static post(url, body, callback) {
        return Transport._send(url, METHODS.POST, body, callback);
    }

    static _send(url, method, body = {}, callback) {
        url = `http://apoj.herokuapp.com/${url}`;
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.withCredentials = true;

        xhr.addEventListener('readystatechange', Transport._readystatechange.bind(null, xhr, callback), false);

        if (body) {
            xhr.setRequestHeader(REQ_HEADER.HEADER, REQ_HEADER.VALUE);
        }

        xhr.send(JSON.stringify(body));
    }

    static _readystatechange(xhr, callback) {
        if (xhr.readyState !== XMLHttpRequest.DONE) {
            return;
        }

        const response = JSON.parse(xhr.responseText);

        if (+xhr.status >= 400) {
            return callback(xhr, response);
        }

        callback(null, response);
    }
}
