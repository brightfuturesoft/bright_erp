export interface BlogType {
    _id?: string;
    title: string;
    category: string;
    message: string;
    content: string;
    status: 'Active' | 'Inactive';
    image: string;
    description?: string;
    created_By?: string;
    workspace_id?: string;
    createdAt: string;
}
