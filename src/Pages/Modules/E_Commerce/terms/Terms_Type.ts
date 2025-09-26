export type TermType = {
    _id?: string;
    title: string;
    description: string;
    status: 'Active' | 'Inactive';
    workspace_id: string;
    created_by?: string;
};
