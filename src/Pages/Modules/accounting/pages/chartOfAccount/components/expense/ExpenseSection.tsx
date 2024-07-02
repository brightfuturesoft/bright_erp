import { Button, Form, Input, Select, Modal } from 'antd';
import React, { useState } from 'react';
import LossTable from './Loss_Table';
import PaymentProcessingFeeTable from './Payment_Processing_Table';
import PayrollExpense from './Payroll_Expense';
import UncategorizedExpense from './Uncategorized_Expense';
import Gold_of_sold_table from './Gold_of_sold_table';
import Discount_Table from './Discount_Table';
import Loss_Table from './Loss_Table';
import Payment_Processing_Table from './Payment_Processing_Table';
import Payroll_Expense from './Payroll_Expense';
import Uncategorized_Expense from './Uncategorized_Expense';

const { TextArea } = Input;

const ExpenseSection: React.FC = () => {

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
        <div className='md:w-full w-[92vw]'>

            <Gold_of_sold_table data={data} />
            <br />
            <Discount_Table data={data?.discountTable} />
            <br />
            <Loss_Table data={data?.operatingExpenseTable} />
            <br />
            <Payment_Processing_Table data={data?.paymentProcessingFeeTable} />
            <br />
            <Payroll_Expense data={data?.payrollExpense} />
            <br />
            <Uncategorized_Expense data={data?.uncategorizedExpense} />
        </div>
    );
};

export default ExpenseSection;
