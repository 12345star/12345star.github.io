const dataCacheName = 'KRIPTON-data';
const cacheName = 'KRIPTON';
const filesToCache = [
  '/',
  '/index.html',
  '/img/icon.png',
  '/img/home-img.webp',
  '/img/portfolio2.webp',
  '/img/photo-profile.webp',
  '/img/icon.ico',
  '/img/img-contact.svg',
  '/css/styles.css'
];

//install the sw
self.addEventListener('install', function (e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});


self.addEventListener('activate', function (e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});


self.addEventListener('fetch', function (e) {
  console.log('[Service Worker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request);
    })
  );
});