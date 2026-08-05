const CACHE_NAME = "yonas-alpha-031-structured";

const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./version.json",
  "./data/config.json",
  "./assets/css/app.css",
  "./assets/js/app.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", event => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  const isNavigation = request.mode === "navigate";
  const needsFreshCopy =
    url.pathname.endsWith("/index.html") ||
    url.pathname.endsWith("/version.json") ||
    url.pathname.endsWith("/manifest.json") ||
    url.pathname.endsWith("/data/config.json");

  if (isNavigation || needsFreshCopy) {
    event.respondWith(networkFirst(request));
    return;
  }

  event.respondWith(staleWhileRevalidate(request));
});

async function networkFirst(request) {
  try {
    const response = await fetch(request, { cache: "no-store" });
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, response.clone());
    return response;
  } catch {
    return (await caches.match(request)) || caches.match("./index.html");
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  const network = fetch(request)
    .then(response => {
      if (response?.ok) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => cached);

  return cached || network;
}
