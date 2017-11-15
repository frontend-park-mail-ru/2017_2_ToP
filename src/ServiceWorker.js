this.addEventListener('install', event => {
    console.log('Service worker установлен');
    event.waitUntil(caches.open('MY_CACHE')
        .then(cache => {
            // загружаем в наш cache необходимые файлы
            return cache.addAll([
                '/',
                '/built/main.css',
                '/built/main.js',

                '/built/halloween.css',
                '/built/halloween.js',

                '/static/img/icons/pumpkin.png',
                '/static/img/results/1.png',
                '/static/img/results/2.png',
                '/static/img/results/3.png',
                '/static/img/results/4.png',
                '/static/img/results/5.png',

                '/static/video/win.mp4'
            ]);
        }));
});

this.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request)
        .then(cachedResponse => {
            return cachedResponse || fetch(event.request.clone())
                .then(response => {
                    const responseClone = response.clone();

                    caches.open('MY_CACHE')
                        .then(cache => {
                            cache.put(event.request, responseClone)
                                .catch(err => {});
                        });

                    return response;
                });
        }));
});
