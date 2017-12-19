this.addEventListener('install', event => {
    console.log('Service worker установлен');
    event.waitUntil(caches.open('APOJ_CACHE')
        .then(cache => {
            // загружаем в наш cache необходимые файлы
            return cache.addAll([
                '/',
                '/built/main.css',
                '/built/main.js',

                '/static/music/badtrip.mp3',
                '/static/music/Владимирский централ.mp3',

                '/static/img/results/1.png',
                '/static/img/results/2.png',
                '/static/img/results/3.png',
                '/static/img/results/4.png',
                '/static/img/results/5.png',

                'static/img/icons/icon.ico',

                '/static/video/win.mp4'
            ]);
        })
        .catch(error => {
            console.log(error);
        }));
});

this.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request)
        .then(cachedResponse => {

            // выдаём кэш, если он есть
            if (cachedResponse) {
                return cachedResponse;
            }

            // иначе запрашиваем из сети как обычно
            return fetch(event.request);
        }));
});
