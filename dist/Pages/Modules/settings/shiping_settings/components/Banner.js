import { jsx as _jsx } from 'react/jsx-runtime';
export const Banner = () =>
    _jsx('div', {
        className:
            'relative w-full h-32 sm:h-48 rounded-xl overflow-hidden shadow-lg mb-6 dark:shadow-none',
        children: _jsx('img', {
            src: 'https://merchant.zatiqeasy.com/assets/rx-zatiq-banner.jpeg',
            alt: 'Delivery Service Promotion',
            className: 'w-full h-full object-cover',
        }),
    });
