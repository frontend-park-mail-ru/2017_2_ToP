export default class Transport {
    static Get(url, callback) {
        return this._send(url, 'GET', {}, callback);
    }

    static Post(url, body, callback) {
        return this._send(url, 'POST', body, callback);
    }

    static _send(url, method, body = {}, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.withCredentials = true;
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8');

        xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState !== 4) {
                return;
            }

            if (+xhr.status >= 400) {
                return callback(xhr, null);
            }

            const response = JSON.parse(xhr.responseText);
            callback(null, response);
        });

        xhr.send(JSON.stringify(body));
    }
}
