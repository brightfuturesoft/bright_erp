export interface CouponType {
    _id?: string;
    code: string;
    name: string;
    type: 'fixed' | 'percentage';
    price: number;
    usageLimitPerUser: number;
    userLimit: number;
    startDateTime: string;
    endDateTime: string;
    status: 'Active' | 'Inactive';
    workspace_id: string;
}
