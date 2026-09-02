/* BIRD service worker — v1 scaffold.
   No caching yet: this exists so BIRD satisfies PWA installability and so
   there is a registered worker to extend once real offline behavior (or
   push, or background sync) is needed. It intentionally does not call
   respondWith, so every request still goes straight to the network exactly
   as if this file did not exist — it cannot make the marketing site or BIRD
   behave differently or serve anything stale. */
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
