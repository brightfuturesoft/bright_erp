import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('fetch', event => {
    console.log('Fetch event for ', event.request.url);
});
