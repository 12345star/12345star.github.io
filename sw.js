const dataCacheName = 'KRIPTON-data';
const cacheName = 'KRIPTON-v2'; // 👈 versión del caché, cámbiala cuando actualices archivos
const filesToCache = [
  '/',                // página principal
  '/index.html',      // HTML base
  '/img/icon.png',    // ícono
  '/img/home-img.webp',
  '/img/portfolio2.webp',
  '/img/photo-profile.webp',
  '/img/icon.ico',
  '/img/img-contact.svg',
  '/css/styles.css'   // estilos
];

// INSTALL: se ejecuta la primera vez que se instala el SW
self.addEventListener('install', event => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache); // guarda los archivos iniciales
    })
  );
});

// ACTIVATE: se ejecuta cuando el SW toma control
self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          // elimina cachés viejos que no coincidan con la versión actual
          if (key !== cacheName && key !== dataCacheName) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim(); // fuerza al SW a controlar las páginas abiertas
});

// FETCH: intercepta todas las peticiones de la página
self.addEventListener('fetch', event => {
  console.log('[Service Worker] Fetch', event.request.url);

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // Hacemos la petición a la red en segundo plano
      const fetchPromise = fetch(event.request).then(networkResponse => {
        // Verificamos que la respuesta sea válida
        if (networkResponse && networkResponse.status === 200) {
          // 👇 Clonamos la respuesta porque se va a usar en dos lugares:
          // 1. Guardar en caché
          // 2. Devolver al navegador
          const responseToCache = networkResponse.clone();

          caches.open(cacheName).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse; // devolvemos la respuesta original al navegador
      });

      // Si hay algo en caché, lo devuelve rápido; si no, espera la red
      return cachedResponse || fetchPromise;
    })
  );
});

