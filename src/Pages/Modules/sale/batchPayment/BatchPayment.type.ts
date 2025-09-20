interface DataType {
    key: string;
    batchNumber: string;
    date: string;
    customer: string;
    payment_method: string;
    transactionId: string;
    paidAmount: number;
    discountAmount: number;
    totalAmount: number;
}

export type { DataType };
