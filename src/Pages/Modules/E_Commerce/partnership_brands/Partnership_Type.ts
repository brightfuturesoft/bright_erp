export type BrandType = {
    _id?: string;
    title: string;
    description: string;
    image?: string;
    url: string;
    cta?: string;
    status: 'Active' | 'Inactive';
    workspace_id: string;
    created_By?: string;
};
