export interface CustomSectionType {
    _id?: string;
    title: string;
    description?: string;
    button_text: string;
    url: string;
    image: string;
    status: 'Active' | 'Inactive';
    createdBy?: string;
    workspace_id?: string;
}
