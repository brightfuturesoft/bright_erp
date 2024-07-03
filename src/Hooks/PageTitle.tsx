// PageTitle.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTitleProps {
    title: string;
    description: string;
    image: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, description, image }) => {
    const location = useLocation();
    const currentUrl = `https://hikmahholdingsltd.com${location.pathname}`;

    useEffect(() => {
        document.title = title;

        const metaTags = [
            { name: 'description', content: description },
            { property: 'og:title', content: title },
            { property: 'og:description', content: description },
            { property: 'og:image', content: image },
            { property: 'og:url', content: currentUrl },
            { property: 'og:type', content: 'website' },
            { property: 'twitter:card', content: 'summary_large_image' },
            { property: 'twitter:title', content: title },
            { property: 'twitter:description', content: description },
            { property: 'twitter:image', content: image },
            { rel: 'canonical', href: currentUrl },
            { rel: 'icon', href: image, type: 'image/svg+xml' }, // Favicon link
            { rel: 'icon', sizes: '192x192', href: image }, // Icon for Android devices
            { rel: 'apple-touch-icon', sizes: '180x180', href: image }, // Apple touch icon
            // Other icon sizes for different devices can be added as needed
        ];

        metaTags.forEach(tag => {
            let element: HTMLMetaElement | HTMLLinkElement | null =
                document.querySelector(
                    `meta[name='${tag.name}'], 
                 meta[property='${tag.property}'], 
                 link[rel='${tag.rel}']`
                );

            if (element) {
                if ('content' in element && tag.content) {
                    element.content = tag.content;
                } else if ('href' in element && tag.href) {
                    element.href = tag.href;
                }
            } else {
                if (tag.name) {
                    element = document.createElement('meta');
                    element.name = tag.name;
                    element.content = tag.content!;
                } else if (tag.property) {
                    element = document.createElement('meta');
                    element.setAttribute('property', tag.property);
                    element.content = tag.content!;
                } else if (tag.rel) {
                    element = document.createElement('link');
                    element.rel = tag.rel;
                    element.href = tag.href!;
                }
                document.head.appendChild(element);
            }
        });
    }, [title, description, image, currentUrl]);

    return null;
};

export default PageTitle;
