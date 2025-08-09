const tableData = [
    {
        key: '420050',
        order_info: {
            orderNumber: 'ORDO00000431',
            last_payment_date: '2022-01-24',
            due_amount: 50.0,
            last_invoice: 'invO00000430',
        },
        customer: {
            name: 'John Doe 1',
            phone: '1234567891',
        },
        returnAmount: 50.0,
        status: 'Approved',
    },
    {
        key: '420051',
        order_info: {
            orderNumber: 'ORDO00000432',
            last_payment_date: '2022-01-25',
            due_amount: 50.0,
            last_invoice: 'invO00000431',
        },
        customer: {
            name: 'John Doe 2',
            phone: '1234567892',
        },
        returnAmount: 50.0,
        status: 'Approved',
    },
    {
        key: '420052',
        order_info: {
            orderNumber: 'ORDO00000433',
            last_payment_date: '2022-01-26',
            due_amount: 50.0,
            last_invoice: 'invO00000432',
        },
        customer: {
            name: 'John Doe 3',
            phone: '1234567893',
        },
        returnAmount: 50.0,
        status: 'Approved',
    },
    {
        key: '420053',
        order_info: {
            orderNumber: 'ORDO00000434',
            last_payment_date: '2022-01-27',
            due_amount: 50.0,
            last_invoice: 'invO00000433',
        },
        customer: {
            name: 'John Doe 4',
            phone: '1234567894',
        },
        returnAmount: 50.0,
        status: 'Approved',
    },
    {
        key: '420054',
        order_info: {
            orderNumber: 'ORDO00000435',
            last_payment_date: '2022-01-28',
            due_amount: 50.0,
            last_invoice: 'invO00000434',
        },
        customer: {
            name: 'John Doe 5',
            phone: '1234567895',
        },
        returnAmount: 50.0,
        status: 'Approved',
    },
    {
        key: '420055',
        order_info: {
            orderNumber: 'ORDO00000436',
            last_payment_date: '2022-01-29',
            due_amount: 50.0,
            last_invoice: 'invO00000435',
        },
        customer: {
            name: 'John Doe 6',
            phone: '1234567896',
        },
        returnAmount: 50.0,
        status: 'Approved',
    },
    {
        key: '420056',
        order_info: {
            orderNumber: 'ORDO00000437',
            last_payment_date: '2022-01-23',
            due_amount: 50.0,
            last_invoice: 'invO00000436',
        },
        customer: {
            name: 'John Doe 7',
            phone: '1234567897',
        },
        returnAmount: 50.0,
        status: 'Approved',
    },
    {
        key: '420057',
        order_info: {
            orderNumber: 'ORDO00000438',
            last_payment_date: '2022-01-24',
            due_amount: 50.0,
            last_invoice: 'invO00000437',
        },
        customer: {
            name: 'John Doe 8',
            phone: '1234567898',
        },
        returnAmount: 50.0,
        status: 'Approved',
    },
    {
        key: '420058',
        order_info: {
            orderNumber: 'ORDO00000439',
            last_payment_date: '2022-01-25',
            due_amount: 50.0,
            last_invoice: 'invO00000438',
        },
        customer: {
            name: 'John Doe 9',
            phone: '1234567899',
        },
        returnAmount: 50.0,
        status: 'Approved',
    },
    {
        key: '420059',
        order_info: {
            orderNumber: 'ORDO00000440',
            last_payment_date: '2022-01-26',
            due_amount: 50.0,
            last_invoice: 'invO00000439',
        },
        customer: {
            name: 'John Doe 10',
            phone: '1234567800',
        },
        returnAmount: 50.0,
        status: 'Approved',
    },
    {
        key: '420060',
        order_info: {
            orderNumber: 'ORDO00000441',
            last_payment_date: '2022-01-27',
            due_amount: 50.0,
            last_invoice: 'invO00000440',
        },
        customer: {
            name: 'John Doe 11',
            phone: '1234567801',
        },
        returnAmount: 50.0,
        status: 'Approved',
    },
    {
        key: '420061',
        order_info: {
            orderNumber: 'ORDO00000442',
            last_payment_date: '2022-01-28',
            due_amount: 50.0,
            last_invoice: 'invO00000441',
        },
        customer: {
            name: 'John Doe 12',
            phone: '1234567802',
        },
        returnAmount: 50.0,
        status: 'Approved',
    },
    {
        key: '420062',
        order_info: {
            orderNumber: 'ORDO00000443',
            last_payment_date: '2022-01-29',
            due_amount: 50.0,
            last_invoice: 'invO00000442',
        },
        customer: {
            name: 'John Doe 13',
            phone: '1234567803',
        },
        returnAmount: 50.0,
        status: 'Approved',
    },
    {
        key: '420063',
        order_info: {
            orderNumber: 'ORDO00000444',
            last_payment_date: '2022-01-23',
            due_amount: 50.0,
            last_invoice: 'invO00000443',
        },
        customer: {
            name: 'John Doe 14',
            phone: '1234567804',
        },
        returnAmount: 50.0,
        status: 'Approved',
    },
    {
        key: '420064',
        order_info: {
            orderNumber: 'ORDO00000445',
            last_payment_date: '2022-01-24',
            due_amount: 50.0,
            last_invoice: 'invO00000444',
        },
        customer: {
            name: 'John Doe 15',
            phone: '1234567805',
        },
        returnAmount: 50.0,
        status: 'Approved',
    },
    {
        key: '420065',
        order_info: {
            orderNumber: 'ORDO00000446',
            last_payment_date: '2022-01-25',
            due_amount: 50.0,
            last_invoice: 'invO00000445',
        },
        customer: {
            name: 'John Doe 16',
            phone: '1234567806',
        },
        returnAmount: 50.0,
        status: 'Approved',
    },
    {
        key: '420066',
        order_info: {
            orderNumber: 'ORDO00000447',
            last_payment_date: '2022-01-26',
            due_amount: 50.0,
            last_invoice: 'invO00000446',
        },
        customer: {
            name: 'John Doe 17',
            phone: '1234567807',
        },
        returnAmount: 50.0,
        status: 'Approved',
    },
    {
        key: '420067',
        order_info: {
            orderNumber: 'ORDO00000448',
            last_payment_date: '2022-01-27',
            due_amount: 50.0,
            last_invoice: 'invO00000447',
        },
        customer: {
            name: 'John Doe 18',
            phone: '1234567808',
        },
        returnAmount: 50.0,
        status: 'Approved',
    },
    {
        key: '420068',
        order_info: {
            orderNumber: 'ORDO00000449',
            last_payment_date: '2022-01-28',
            due_amount: 50.0,
            last_invoice: 'invO00000448',
        },
        customer: {
            name: 'John Doe 19',
            phone: '1234567809',
        },
        returnAmount: 50.0,
        status: 'Approved',
    },
    {
        key: '420069',
        order_info: {
            orderNumber: 'ORDO00000450',
            last_payment_date: '2022-01-29',
            due_amount: 50.0,
            last_invoice: 'invO00000449',
        },
        customer: {
            name: 'John Doe 20',
            phone: '1234567810',
        },
        returnAmount: 50.0,
        status: 'Approved',
    },
];

export { tableData };
