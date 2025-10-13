interface DataType {
    key: string;
    orderNumber: string;
    saleDate: string;
    customer: string;
    subTotal: string;
    totalTax: string;
    totalDiscount: string;
    grandTotal: string;
    status: boolean;
}

export type { DataType };

interface Totals {
    items: {
        subtotal: number;
        discount_amount: number;
        vat_amount: number;
        total: number;
        price: number;
        quantity: number;
        discount: number;
        vat: number;
    }[];
    subtotal: number;
    global_discount: any;
    adjustment: any;
    grand_total: number;
    paid_amount: number;
    due_amount: number;
}

export interface DirectSalePayload extends Totals {
    customer?: {
        id: string;
        name: string;
        phone: string;
        email: string;
    };
    sales_person?: {
        id: string;
        name: string;
        role: string;
        phone: string;
    };
    attachments?: any[];
}

export interface ItemType {
    _id?: string;
    key: string;
    item_name: string;
    item_type: string;
    brand: string;
    color: string;
    size: string;
    manufacture: string;
    category: string;
    unit: string;
    quantity: number;
    price: number;
    discount: number;
    vat: number;
    stock: number;
    subtotal: number;
    discount_amount: number;
    vat_amount: number;
    total: number;
}

export interface SaleDataType {
    _id?: string;
    items: ItemType[];
    subtotal: number;
    total_discount: number;
    total_vat: number;
    grand_total: number;
    adjustment: { amount: number; value: number };
    global_discount: { amount: string; value: string };
    paid_amount: number;
    due_amount: number;
    customer: { id: string; name: string; phone: string; email: string };
    sales_person: { id: string; name: string; role: string; phone: string };
    order_number: string;
    order_status: string;
    createAt: string;
}

export interface SaleRowType {
    _id: string;
    order_number: string;
    order_status: string;
    subtotal: number;
    total_discount: number;
    total_vat: number;
    grand_total: number;
    paid_amount: number;
    due_amount: number;
    customer_name: string;
    customer_phone: string;
    customer_email: string;
    sales_person: string;
    created_at: string;
    items: {
        item_name: string;
        brand: string;
        category: string;
        quantity: number;
        price: number;
        subtotal: number;
        discount: number;
        vat: number;
        total: number;
    }[];
}
