export default function ServiceWorkerRegister() {
    if (navigator.serviceWorker !== undefined) {
        navigator.serviceWorker.register('/ServiceWorker.js', {scope: '/'})
            .then(registration => {
                // Registration was successful
                console.log('SW registration OK:', registration);
            })
            .catch(err => {
                // registration failed :(
                console.log('SW registration FAIL:', err);
            });
    }
}
