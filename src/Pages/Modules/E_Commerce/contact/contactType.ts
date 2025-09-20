export interface ContactType {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    message: string;
    status: 'Pending' | 'Resolved' | 'Closed';
    created_at: string;
    workspace_id: string;
}
