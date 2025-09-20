export interface AchievementType {
    _id?: string;
    title: string;
    image: string;
    workspace_id: string;
    createdBy: string;
    link: string;
    status: 'Active' | 'Inactive';
}
