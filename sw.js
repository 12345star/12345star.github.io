const dataCacheName = 'KRIPTON-data';
const cacheName = 'KRIPTON-v6'; // 👈 cambia la versión cuando actualices archivos

// Install: guarda los archivos iniciales
self.addEventListener('install', event => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll([
        '/',
        '/index.html',
        '/img/icon.png',
        '/img/home-img.webp',
        '/img/portfolio2.webp',
        '/img/photo-profile.webp',
        '/img/icon.ico',
        '/img/img-contact.svg',
        '/css/styles.css'
      ]);
    })
  );
});

// Activate: elimina cualquier caché viejo que empiece con "KRIPTON"
self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          // 👇 Si el nombre empieza con "KRIPTON" pero no es el actual, se borra
          if (key.startsWith('KRIPTON') && key !== cacheName && key !== dataCacheName) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim(); // fuerza al SW a controlar las páginas abiertas
});

// Fetch: estrategia Stale-While-Revalidate
self.addEventListener('fetch', event => {
  console.log('[Service Worker] Fetch', event.request.url);
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      const fetchPromise = fetch(event.request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          // 👇 Clonamos la respuesta para poder usarla en caché y devolverla
          const responseToCache = networkResponse.clone();
          caches.open(cacheName).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      });
      return cachedResponse || fetchPromise;
    })
  );
});


