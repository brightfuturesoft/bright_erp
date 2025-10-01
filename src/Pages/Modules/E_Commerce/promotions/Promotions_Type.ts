export interface PromotionType {
    _id?: string;
    title: string;
    description: string;
    button_text: string;
    image: string;
    createdBy: string;
    status: 'Active' | 'Inactive';
    workspace_id: string;
    url: string;
}
