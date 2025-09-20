export interface TestimonialType {
    _id: string;
    name: string;
    comment: string;
    image?: string;
    status: 'Active' | 'Inactive';
    createdBy: string;
    workspace_id: string;
    createdAt?: string;
    updatedAt?: string;
}
