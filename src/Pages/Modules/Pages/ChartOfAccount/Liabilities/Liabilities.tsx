import React from 'react';
import RetainedEarningsTable from './CustomerPaymentTable';
import CreditCardTable from './CreditCardTable';
import CustomerPaymentTable from './CustomerPaymentTable';
import DueTable from './DueTable';
import LoanTable from './LoanTable';
import OtherShortTermTable from './OtherShortTermTable';
import SalesTexes from './SalesTexes';

const Liabilities: React.FC = () => {

    const data = {
        "_id": 1,
        "title": "Credit Card",
        "creditCardTable": {
            "label": "Credit Card",
            "data": [{
                "amount": 5000,
                "ac_name": "Ferdaos",
                "description": "this is a description",
                "status": false,
                "date": "2020-01-01",
                "category": "credit card"
            },
            {
                "amount": 2500,
                "ac_name": "Akbar",
                "description": "second entry",
                "status": true,
                "date": "2020-02-01",
                "category": "credit card"
            },
            {
                "amount": 3200,
                "ac_name": "Latif",
                "description": "third entry",
                "status": false,
                "date": "2020-03-01",
                "category": "credit card"
            },
            {
                "amount": 4100,
                "ac_name": "Nadia",
                "description": "fourth entry",
                "status": true,
                "date": "2020-04-01",
                "category": "credit card"
            },
            {
                "amount": 2800,
                "ac_name": "Omar",
                "description": "fifth entry",
                "status": false,
                "date": "2020-05-01",
                "category": "credit card"
            },
            {
                "amount": 3600,
                "ac_name": "Rahim",
                "description": "sixth entry",
                "status": true,
                "date": "2020-06-01",
                "category": "credit card"
            }
            ]
        },
        "customerPaymentTable": {
            "label": "Customer Prepayments and Customer Credits",
            "data": [{
                "amount": 2800,
                "ac_name": "Omar",
                "description": "fifth entry",
                "status": false,
                "date": "2020-05-01",
                "category": "customer payment"
            },
            {
                "amount": 3600,
                "ac_name": "Rahim",
                "description": "sixth entry",
                "status": true,
                "date": "2020-06-01",
                "category": "customer payment"
            }
            ]
        },
        "dueTable": {
            "label": "Due For Payroll",
            "data": [{
                "amount": 2800,
                "ac_name": "Omar",
                "description": "fifth entry",
                "status": false,
                "date": "2020-05-01",
                "category": "due"
            }]
        },
        "loanTable": {
            "label": "Loan and Line of Credit",
            "data": [{
                "amount": 1500,
                "ac_name": "Saima",
                "description": "seventh entry",
                "status": true,
                "date": "2020-07-01",
                "category": "loan"
            },
            {
                "amount": 1800,
                "ac_name": "Jamal",
                "description": "eighth entry",
                "status": true,
                "date": "2020-08-01",
                "category": "loan"
            },
            {
                "amount": 2100,
                "ac_name": "Fatima",
                "description": "ninth entry",
                "status": false,
                "date": "2020-09-01",
                "category": "loan"
            },
            {
                "amount": 2400,
                "ac_name": "Hassan",
                "description": "tenth entry",
                "status": true,
                "date": "2020-10-01",
                "category": "loan"
            }
            ]
        },
        "otherShortTermTable": {
            "label": "Other Short-Term Liability",
            "data": [{
                "amount": 2800,
                "ac_name": "Omar",
                "description": "fifth entry",
                "status": false,
                "date": "2020-05-01",
                "category": "other short term"
            }]
        },
        "SalesTaxes": {
            "label": "Sales Taxes",
            "data": [{
                "amount": 2800,
                "ac_name": "Omar",
                "description": "fifth entry",
                "status": false,
                "date": "2020-05-01",
                "category": "sales taxes"
            }]
        }
    }

    return (
        <div className='md:w-full w-[92vw]'>
            <CreditCardTable data={data?.creditCardTable} />
            <br />
            <CustomerPaymentTable data={data?.customerPaymentTable} />
            <br />
            <DueTable data={data?.dueTable} />
            <br />
            <LoanTable data={data?.loanTable} />
            <br />
            <OtherShortTermTable data={data?.otherShortTermTable} />
            <br />
            <SalesTexes data={data?.SalesTaxes} />

        </div>
    );
};

export default Liabilities;
