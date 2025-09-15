export interface Category {
    _id: string;
    name: string;
    image: string;
    itemCount: number;
}

export interface HeldOrder {
    order_number: String;
    user_id: string;
    workspace_id: string;
    order_type: String;
    products: any[];
    delivery_address: any;
    shipping_charge: Number;
    tax_amount: Number;
    discount: Number;
    total_amount: Number;
    promo: any;
    payment: any;
    order_status: string;
    tracking: any;
    created_at: Date;
    updated_at: Date;
    cashier_name: string;
}

export interface Customer {
    id: string;
    name: string;
    phone?: string;
    email?: string;
    address?: string;
    customer_type?: string;
}

export interface OrderData {
    order_number: String;
    user_id: string;
    workspace_id: string;
    order_type: String;
    products: any[];
    delivery_address: any;
    shipping_charge: Number;
    tax_amount: Number;
    discount: Number;
    total_amount: Number;
    promo: any;
    payment: any;
    order_status: string;
    tracking: any;
    created_at: Date;
    updated_at: Date;
    cashier_name: string;
}
