'use client';
import { jsx as _jsx } from 'react/jsx-runtime';
const PreviewIframe = ({ refProp, mode, sizes, domain }) =>
    _jsx('div', {
        className:
            'border rounded-lg shadow-lg overflow-hidden bg-white dark:bg-gray-800 dark:border-gray-700',
        children: _jsx('iframe', {
            ref: refProp,
            src: `https://${domain}`,
            title: 'Preview',
            className: `${sizes[mode]} border-0`,
        }),
    });
export default PreviewIframe;
