export interface ReviewType {
    _id: string;
    reviewText: string;
    rating: number;
    images: string[];
    workspace_id: string;
    product_id: string;
    created_By?: string;
    created_at: string;
    updated_at?: string;
    status?: 'Active' | 'Inactive';
}
