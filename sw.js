// 메뉴 서비스 워커. 사이트 전체(/)를 범위로 등록해 설치 앱이 모든 게임을 같은 전체 화면 창에서 열게 한다.
// 다루는 것은 메뉴 파일뿐이다(네트워크 우선, 실패하면 캐시). 게임 요청은 건드리지 않아 게임 업데이트가 바로 보인다.
const CACHE = 'hub-v2';
const OWN = ['/', '/index.html', '/style.css', '/games.js', '/flags.js', '/manifest.webmanifest', '/manifest.en.webmanifest', '/manifest.ja.webmanifest'];
const OWN_DIRS = ['/shots/', '/icons/'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(OWN)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()),
  );
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;
  const mine = OWN.includes(url.pathname) || OWN_DIRS.some((d) => url.pathname.startsWith(d));
  if (!mine) return; // 게임 파일은 브라우저 기본 동작(또는 게임 자체 서비스 워커)에 맡긴다
  e.respondWith(
    fetch(req)
      .then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req).then((r) => r || caches.match('/'))),
  );
});
