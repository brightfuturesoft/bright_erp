interface DataType {
    key: string;
    orderNumber: string;
    date: string;
    quotationNumber: string;
    customer: string;
    subTotal: string;
    totalTax: string;
    grandTotal: string;
    orderStatus: string;
    deliveryStatus: string;
    invoiceStatus: string;
}

export type { DataType };

export interface OrderDetailsType {
    _id: string;
    id: string;
    order_number: string;
    order_type: string;
    order_status: string;
    total_amount: number;
    discount: number;
    shipping_charge: number;
    tax_amount: number;
    delete: boolean;
    workspace_id: string;
    workspace_name: string;
    user_id: string;
    updated_by: string;
    createAt: string;
    created_at: string;
    updatedAt: string;
    updated_at: string;

    delivery_address: {
        full_name: string;
        phone_number: string;
        street: string;
        city: string;
        state: string;
        postal_code?: string;
        country?: string;
    };

    payment: {
        method: string; // e.g. "cod" | "bkash" | "nagad"
        transaction_id: string;
        status: string; // e.g. "pending" | "paid"
    };

    promo: {
        used: boolean;
        promo_id: string | null;
        discount_amount: number;
    };

    products: {
        product_id?: string;
        name?: string;
        quantity?: number;
        price?: number;
        subtotal?: number;
    }[];

    tracking: {
        status?: string;
        date?: string;
        note?: string;
    }[];
}

export const deliveryZones = [
    'Dhaka',
    'Chattogram',
    'Khulna',
    'Barishal',
    'Sylhet',
    'Rajshahi',
    'Rangpur',
    'Mymensingh',
];
