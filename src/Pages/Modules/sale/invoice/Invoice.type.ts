interface DataType {
    key: string;
    invoiceNumber: string;
    date: string;
    orderNumber: string;
    customer: string;
    total: number;
    amountPaid: number;
    dueAmount: number;
    status: string;
}

export type { DataType };
