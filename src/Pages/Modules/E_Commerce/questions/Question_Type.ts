export interface FaqType {
    _id?: string;
    question: string;
    answer: string;
    status: 'Active' | 'Inactive';
    createdBy?: string;
    workspace_id?: string;
    createdAt?: string;
    updatedAt?: string;
}
