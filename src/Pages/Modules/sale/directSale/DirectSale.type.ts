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
