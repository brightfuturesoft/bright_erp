import { Button, Form, Input, Select, Modal } from 'antd';
import React, { useState } from 'react';
import GoldOfSoldTable from './ForeignTable';
import DiscountTable from './DiscountTable';
import LossTable from './IncomeTable';
import PaymentProcessingFeeTable from './OtherIncomeTable';
import PayrollExpense from './PayrollExpense';
import UncategorizedExpense from './UncategorizedExpense';
import GainOnTable from './ForeignTable';
import ForeignTable from './ForeignTable';
import IncomeTable from './IncomeTable';
import OtherIncomeTable from './OtherIncomeTable';

const { TextArea } = Input;

const Income: React.FC = () => {

    const data = {
        "discountTable": {
            "label": "Discount",
            "data": [{
                "label": "discountTable",
                "category": "Discount",
                "amount": 5000,
                "ac_name": "Ferdaos",
                "description": "this is a description",
                "status": true,
                "date": "2020-01-01"
            },
            {
                "label": "discountTable",
                "category": "Discount",
                "amount": 2500,
                "ac_name": "Akbar",
                "description": "second entry",
                "status": true,
                "date": "2020-02-01"
            },
            {
                "label": "discountTable",
                "category": "Discount",
                "amount": 3200,
                "ac_name": "Latif",
                "description": "third entry",
                "status": false,
                "date": "2020-03-01"
            },
            {
                "label": "discountTable",
                "category": "Discount",
                "amount": 4100,
                "ac_name": "Nadia",
                "description": "fourth entry",
                "status": true,
                "date": "2020-04-01"
            },
            {
                "label": "discountTable",
                "category": "Discount",
                "amount": 2800,
                "ac_name": "Omar",
                "description": "fifth entry",
                "status": false,
                "date": "2020-05-01"
            },
            {
                "label": "discountTable",
                "category": "Discount",
                "amount": 3600,
                "ac_name": "Rahim",
                "description": "sixth entry",
                "status": true,
                "date": "2020-06-01"
            }
            ]
        },
        "foreignTable": {
            "label": "Foreign",
            "data": [{
                "label": "foreignTable",
                "category": "Foreign",
                "amount": 2800,
                "ac_name": "Omar",
                "description": "fifth entry",
                "status": false,
                "date": "2020-05-01"
            }]
        },
        "incomeTable": {
            "label": "Income",
            "data": [{
                "label": "incomeTable",
                "category": "Income",
                "amount": 2800,
                "ac_name": "Omar",
                "description": "fifth entry",
                "status": false,
                "date": "2020-05-01"
            }]
        },
        "otherIncomeTable": {
            "label": "Other Income",
            "data": [{
                "label": "otherIncomeTable",
                "category": "Other Income",
                "amount": 2800,
                "ac_name": "Omar",
                "description": "fifth entry",
                "status": false,
                "date": "2020-05-01"
            }]
        },
        "uncategorizedIncomeTable": {
            "label": "Uncategorized Income",
            "data": [{
                "label": "uncategorizedIncomeTable",
                "category": "Uncategorized Income",
                "amount": 2800,
                "ac_name": "Omar",
                "description": "fifth entry",
                "status": false,
                "date": "2020-05-01"
            }]
        }
    }





    return (
        <div className='md:w-full w-[92vw]'>
            <DiscountTable data={data?.discountTable} />
            <br />
            <ForeignTable data={data?.foreignTable} />
            <br />
            <IncomeTable data={data?.incomeTable} />
            <br />
            <OtherIncomeTable data={data?.otherIncomeTable} />
            <br />
            <UncategorizedExpense data={data?.uncategorizedIncomeTable} />
        </div>
    );
};

export default Income;
