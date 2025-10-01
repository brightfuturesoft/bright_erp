export interface BlogCategoryType {
    _id: string;
    name: string;
    description?: string;
    slug: string;
    image: string;
    status: 'Active' | 'Inactive';
    createdAt?: string;
    updatedAt?: string;
}
