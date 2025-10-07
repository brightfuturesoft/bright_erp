const tableData = [
    {
        refundId: 'RFD-20240720001',
        date: '2025-07-20',
        customer: {
            customerId: 'CUST-1023',
            name: 'Md. Rahim',
            phone: '017XXXXXXXX',
        },
        invoice: {
            invoiceId: 'INV-92384',
            paidAmount: 15000,
            refundAmount: 2500,
            remainingAmount: 12500,
        },
        method: 'Cash',
        reason: 'Product Return',
        note: 'Customer returned defective item',
        status: 'Completed',
        approvedBy: {
            userId: 'USER-005',
            name: 'Accounts Admin',
        },
        createdAt: '2025-07-20T12:45:00Z',
        updatedAt: '2025-07-20T13:00:00Z',
        history: [
            {
                event: 'Initiated',
                by: 'User1',
                time: '2025-07-20T12:45:00Z',
            },
            {
                event: 'Approved',
                by: 'Accounts Admin',
                time: '2025-07-20T12:58:00Z',
            },
            {
                event: 'Completed',
                by: 'System',
                time: '2025-07-20T13:00:00Z',
            },
        ],
    },
    {
        refundId: 'RFD-20240720002',
        date: '2025-07-19',
        customer: {
            customerId: 'CUST-1024',
            name: 'Al-Amin Corp.',
            phone: '018XXXXXXXX',
        },
        invoice: {
            invoiceId: 'INV-92385',
            paidAmount: 8000,
            refundAmount: 8000,
            remainingAmount: 0,
        },
        method: 'bKash',
        reason: 'Overpayment',
        note: 'Customer paid twice by mistake',
        status: 'Pending',
        approvedBy: null,
        createdAt: '2025-07-19T10:30:00Z',
        updatedAt: null,
        history: [
            {
                event: 'Initiated',
                by: 'User2',
                time: '2025-07-19T10:30:00Z',
            },
        ],
    },
];
export { tableData };
