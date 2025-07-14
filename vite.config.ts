import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: [
                'favicon.ico',
                'apple-touch-icon.png',
                'masked-icon.svg',
            ],
            manifest: {
                name: 'Bright ERP',
                short_name: 'ERP',
                description: 'this is a full customizable erp system.',
                theme_color: '#ffffff',
                icons: [
                    {
                        src: 'pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: 'pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                    {
                        src: 'pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable',
                    },
                ],
            },
        }),
    ],
    server: {
        hmr: {
            overlay: true,
        },
    },
    resolve: {
        alias: {
            '@': '/src',
            '@modules': '/src/Pages/Modules',
            '@alert': '/src/helpers/erp_alert/Erp_Alert.jsx',
            '@post_api': '/src/helpers/post/use_post_api.ts',
            '@helpers': '/src/helpers/',
        },
    },
});
