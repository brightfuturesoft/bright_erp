export type SocialLinkType = {
    _id?: string;
    facebook_url?: string;
    instagram_url?: string;
    youtube_url?: string;
    whatsapp_url?: string;
    twitter_url?: string;
    linkedin_url?: string;
    status: 'Active' | 'Inactive';
    workspace_id: string;
    created_By?: string;
};
