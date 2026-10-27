const CACHE='my-anime-library-shell-v4';
const FILES=['./','./index.html','./manifest.json','./icons/icon.svg','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(resp=>{
  const copy=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return resp;
 }).catch(()=>caches.match('./index.html'))));
});