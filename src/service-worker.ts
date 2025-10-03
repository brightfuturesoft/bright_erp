/// <reference lib="webworker" />

import { precacheAndRoute } from 'workbox-precaching';

declare const self: ServiceWorkerGlobalScope & {
    __WB_MANIFEST: Array<any>;
};

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('fetch', (event: FetchEvent) => {
    console.log('Fetch event for ', event.request.url);
});
