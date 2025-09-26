'use client';
import React from 'react';

interface PreviewIframeProps {
    refProp: React.RefObject<HTMLIFrameElement>;
    mode: string;
    sizes: Record<string, string>;
    domain: string;
}

const PreviewIframe: React.FC<PreviewIframeProps> = ({
    refProp,
    mode,
    sizes,
    domain,
}) => (
    <div className="border rounded-lg shadow-lg overflow-hidden bg-white dark:bg-gray-800 dark:border-gray-700">
        <iframe
            ref={refProp}
            src={`https://${domain}`}
            title="Preview"
            className={`${sizes[mode]} border-0`}
        />
    </div>
);

export default PreviewIframe;
