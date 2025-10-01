export interface BannerType {
    _id: string;
    image_url: string;
    title?: string;
    status: 'Active' | 'Inactive' | 'Draft';
    redirect_url?: string;
    workspace_id: string;
}
