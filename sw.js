
const CACHE_NAME = "protocolar-cache-v2"; // cambia el número al actualizar
const FILES_TO_CACHE = [
  "/ProtocolarPDF/",          // index
  "/ProtocolarPDF/icono.jpg", // ícono
  "/ProtocolarPDF/manifest.json"
];

// Instalación: guarda archivos
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting(); // fuerza instalación inmediata
});

// Activación: limpia cachés viejas
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim(); // toma control de las páginas abiertas
});

// Fetch: responde desde caché o red
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});