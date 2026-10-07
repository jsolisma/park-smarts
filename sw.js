/* Park Smarts offline cache.
   Every file is stored on the device at install, so the app opens with no connection.
   When online, each launch also asks the server for changes, so an update shows up on the next launch. */
const VERSION = 'park-smarts-v2';
const FILES = ['./', 'index.html', 'manifest.webmanifest', 'icon.svg', 'icon-180.png', 'icon-512.png'];

// Install: store every file. 'reload' asks the server directly, so a stale browser-cached copy is never stored.
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION)
    .then(c => c.addAll(FILES.map(f => new Request(f, { cache: 'reload' }))))
    .then(() => self.skipWaiting()));
});

// Activate: remove caches left by earlier versions and take over any open page.
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// Fetch: answer from the stored copy straight away (this is what works offline), and in the
// background check the server for a newer copy to store for next time.
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  const key = url.origin + url.pathname;
  const refresh = fetch(key, { cache: 'no-cache' })
    .then(res => (res.ok && !res.redirected) ? caches.open(VERSION).then(c => c.put(key, res)) : null)
    .catch(() => null);   // offline: keep what is stored
  e.waitUntil(refresh);
  e.respondWith(caches.match(key).then(hit => hit || fetch(e.request)));
});
