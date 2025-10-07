export interface PosCustomer {
    _id: string;
    name: string;
    phone: string;
    email: string;
    address?: string;
    customer_type: 'pos';
    workspace_id: string;
}

export interface EcommerceCustomer {
    _id: string;
    full_name: string;
    email: string;
    phone_number: string;
    user_type: 'ecommerce';
    profile_picture?: string;
    workspace_id: string;
    created_at: string;
    updated_at: string;
    birthday?: {
        day: string;
        month: string;
        year: string;
    };
    gender?: string;
}

export type Customer = {
    key: string;
    name: string;
    email: string;
    phone: string;
    customerType: 'POS' | 'Ecommerce';
    customerSince?: string;
    customerCode: string;
    customerStatus?: 'Active' | 'Inactive';
    raw: PosCustomer | EcommerceCustomer;
};
