export interface NewsletterType {
    _id: string;
    email: string;
    status: 'Active' | 'Inactive';
    workspace_id: string;
    createdAt: string;
    updatedAt: string;
    createdBy?: string;
}

// Filters type
export interface NewsletterFilterType {
    email?: string;
    status?: string;
}

// Modal form values type
export interface NewsletterFormValues {
    email: string;
    status: 'Active' | 'Inactive';
}
