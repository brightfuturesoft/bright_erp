import { Button, Form, Input, Select, Modal } from 'antd';
import React, { useState } from 'react';
import GoldOfSoldTable from './GoldOfSoldTable';
import DiscountTable from './DiscountTable';
import LossTable from './LossTable';
import PaymentProcessingFeeTable from './PaymentProcessingTable';
import PayrollExpense from './PayrollExpense';
import UncategorizedExpense from './UncategorizedExpense';

const { TextArea } = Input;

const Expense: React.FC = () => {

    const data = {
        "_id": 1,
        "label": "expense",
        "title": "Cost of Good",
        "costTable": {
            "label": "Cost",
            "data": [{
                "amount": 5000,
                "ac_name": "Ferdaos",
                "description": "this is a description",
                "status": true,
                "date": "2020-01-01",
                "category": "Cost"
            },
            {
                "amount": 2500,
                "ac_name": "Akbar",
                "description": "second entry",
                "status": true,
                "date": "2020-02-01",
                "category": "Cost"
            },
            {
                "amount": 3200,
                "ac_name": "Latif",
                "description": "third entry",
                "status": false,
                "date": "2020-03-01",
                "category": "Cost"
            },
            {
                "amount": 4100,
                "ac_name": "Nadia",
                "description": "fourth entry",
                "status": true,
                "date": "2020-04-01",
                "category": "Cost"
            },
            {
                "amount": 2800,
                "ac_name": "Omar",
                "description": "fifth entry",
                "status": false,
                "date": "2020-05-01",
                "category": "Cost"
            },
            {
                "amount": 3600,
                "ac_name": "Rahim",
                "description": "sixth entry",
                "status": true,
                "date": "2020-06-01",
                "category": "Cost"
            }
            ]
        },

        "discountTable": {
            "label": 'Discount',
            "data": [{
                "amount": 2800,
                "ac_name": "Omar",
                "description": "fifth entry",
                "status": false,
                "date": "2020-05-01",
                "category": "Discount"
            },
            {
                "amount": 3600,
                "ac_name": "Rahim",
                "description": "sixth entry",
                "status": true,
                "date": "2020-06-01",
                "category": "Discount"
            }
            ],
            "forexTable": {
                "label": 'Forex',
                "data": [{
                    "amount": 2800,
                    "ac_name": "Omar",
                    "description": "fifth entry",
                    "status": false,
                    "date": "2020-05-01",
                    "category": "Forex"
                }]
            }
        },

        "operatingExpenseTable": {
            "label": "Operating Expense",
            "data": [
                {
                    "amount": 1500,
                    "ac_name": "Saima",
                    "description": "seventh entry",
                    "status": true,
                    "date": "2020-07-01",
                    "category": "Operating Expense"
                },
                {
                    "amount": 1800,
                    "ac_name": "Jamal",
                    "description": "eighth entry",
                    "status": true,
                    "date": "2020-08-01",
                    "category": "Operating Expense"
                },
                {
                    "amount": 2100,
                    "ac_name": "Fatima",
                    "description": "ninth entry",
                    "status": false,
                    "date": "2020-09-01",
                    "category": "Operating Expense"
                },
                {
                    "amount": 2400,
                    "ac_name": "Hassan",
                    "description": "tenth entry",
                    "status": true,
                    "date": "2020-10-01",
                    "category": "Operating Expense"
                }
            ]
        },

        "paymentProcessingFeeTable": {
            "label": "Payment Processing Fee",
            "data": [
                {
                    "amount": 2800,
                    "ac_name": "Omar",
                    "description": "fifth entry",
                    "status": false,
                    "date": "2020-05-01",
                    "category": "Payment Processing Fee"
                }
            ]
        },

        "payrollExpense": {
            "label": "Payroll Expense",
            "data": [{
                "amount": 2800,
                "ac_name": "Omar",
                "description": "fifth entry",
                "status": false,
                "date": "2020-05-01",
                "category": "Payroll Expense"
            }]
        },

        "uncategorizedExpense": {
            "label": "Uncategorized Expense",
            "data": [{
                "amount": 2800,
                "ac_name": "Omar",
                "description": "fifth entry",
                "status": false,
                "date": "2020-05-01",
                "category": "Uncategorized Expense"
            }]
        }
    }





    return (
        <>
            <GoldOfSoldTable data={data} />
            <br />
            <DiscountTable data={data?.discountTable} />
            <br />
            <LossTable data={data?.operatingExpenseTable} />
            <br />
            <PaymentProcessingFeeTable data={data?.paymentProcessingFeeTable} />
            <br />
            <PayrollExpense data={data?.payrollExpense} />
            <br />
            <UncategorizedExpense data={data?.uncategorizedExpense} />
        </>
    );
};

export default Expense;
