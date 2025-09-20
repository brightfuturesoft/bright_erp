export interface SEOType {
    _id?: string;
    pageTitle: string;
    metaDescription: string;
    metaKeywords?: string;
    slug: string;
    ogTitle?: string;
    ogImage?: string;
    ogDescription?: string;
    canonicalUrl?: string;
    metaRobots?: 'index, follow' | 'noindex, nofollow';
    status: 'Active' | 'Inactive';
}
