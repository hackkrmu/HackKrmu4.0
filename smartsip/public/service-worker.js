self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("smart-sipp-cache").then((cache) => {
      return cache.addAll(["/", "/manifest.json"]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
self.addEventListener("push", (event) => {
    const data = event.data ? event.data.json() : {};
    self.registration.showNotification(data.title || "SmartSipp", {
      body: data.body || "It's time to drink water!",
      icon: "/icons/icon-192x192.png",
    });
  });
  