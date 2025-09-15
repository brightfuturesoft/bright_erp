interface DataType {
    key: string;
    payment_number: string;
    invoice_number: string;
    invoice_date: string;
    date: string;
    customer: string;
    payment_method: string;
    transactionId: string;
    paidAmount: number;
    discountAmount: number;
    totalAmount: number;
}

export type { DataType };
