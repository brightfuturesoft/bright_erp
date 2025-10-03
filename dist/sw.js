if (!self.define) {
    let e,
        s = {};
    const i = (i, n) => (
        (i = new URL(i + '.js', n).href),
        s[i] ||
            new Promise(s => {
                if ('document' in self) {
                    const e = document.createElement('script');
                    ((e.src = i), (e.onload = s), document.head.appendChild(e));
                } else ((e = i), importScripts(i), s());
            }).then(() => {
                let e = s[i];
                if (!e)
                    throw new Error(`Module ${i} didn’t register its module`);
                return e;
            })
    );
    self.define = (n, r) => {
        const t =
            e ||
            ('document' in self ? document.currentScript.src : '') ||
            location.href;
        if (s[t]) return;
        let l = {};
        const o = e => i(e, t),
            u = { module: { uri: t }, exports: l, require: o };
        s[t] = Promise.all(n.map(e => u[e] || o(e))).then(e => (r(...e), l));
    };
}
define(['./workbox-5ffe50d4'], function (e) {
    'use strict';
    (self.skipWaiting(),
        e.clientsClaim(),
        e.precacheAndRoute(
            [
                { url: 'assets/index-CAcJVLE9.js', revision: null },
                { url: 'assets/index-DjlZuAED.css', revision: null },
                { url: 'assets/index.es-ETvFnXlt.js', revision: null },
                { url: 'assets/purify.es-C_uT9hQ1.js', revision: null },
                {
                    url: 'index.html',
                    revision: 'a9a16cd69594b763856286f238a4d71a',
                },
                {
                    url: 'registerSW.js',
                    revision: '1872c500de691dce40960bb85481de07',
                },
                {
                    url: 'pwa-192x192.png',
                    revision: '176d422ed9b13b0a545cd027100024aa',
                },
                {
                    url: 'pwa-512x512.png',
                    revision: 'fa8e1863f4f383114f8ab7099cab96a6',
                },
                {
                    url: 'manifest.webmanifest',
                    revision: '32235109bbc2365d299977da16811001',
                },
            ],
            {}
        ),
        e.cleanupOutdatedCaches(),
        e.registerRoute(
            new e.NavigationRoute(e.createHandlerBoundToURL('index.html'))
        ));
});
