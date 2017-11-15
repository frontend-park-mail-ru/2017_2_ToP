this.addEventListener('install', event => {
    console.log('Service worker установлен');
    event.waitUntil(caches.open('MY_CACHE')
        .then(cache => {
            // загружаем в наш cache необходимые файлы
            return cache.addAll(['/index.html']);
        }));
});
