export default class Transport {
    static get(url, callback) {
        return Transport._send(url, 'GET', {}, callback);
    }

    static post(url, body, callback) {
        return Transport._send(url, 'POST', body, callback);
    }

    static _send(url, method, body = {}, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.withCredentials = true;

        xhr.addEventListener('readystatechange', Transport._readystatechange.bind(this, xhr, callback), false);

        if (body) {
            xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8');
        }

        xhr.send(JSON.stringify(body));
    }

    static _readystatechange(xhr, callback) {
        console.log(xhr);
        if (xhr.readyState !== XMLHttpRequest.DONE) {
            return;
        }

        if (+xhr.status >= 400) {
            return callback(xhr, null);
        }

        const response = JSON.parse(xhr.responseText);
        callback(null, response);
    }
}
