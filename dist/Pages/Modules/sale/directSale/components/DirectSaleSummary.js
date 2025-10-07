import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Form, Input, Select } from 'antd';
import { useEffect } from 'react';
import { calculateTotals } from './calculateTotals';
const DirectSaleSummary = ({ form }) => {
    useEffect(() => {
        form?.onValuesChange?.((changedValues, allValues) => {
            const totals = calculateTotals(allValues);
            form.setFieldsValue(totals);
        });
    }, [form]);
    return _jsxs('div', {
        className:
            'p-4 border rounded shadow-sm space-y-3 dark:border-gray-700 dark:bg-gray-800',
        children: [
            _jsx('h3', {
                className: 'text-lg font-semibold dark:text-white',
                children: 'Summary',
            }),
            _jsx(Form.Item, {
                label: 'Subtotal',
                name: 'subtotal',
                children: _jsx(Input, {
                    disabled: true,
                    className: 'dark-input h-10',
                }),
            }),
            _jsx(Form.Item, {
                label: 'Discount',
                children: _jsx(Input.Group, {
                    compact: true,
                    children: _jsxs('div', {
                        className: 'flex w-full',
                        children: [
                            _jsx(Form.Item, {
                                name: ['global_discount', 'value'],
                                noStyle: true,
                                children: _jsx(Input, {
                                    type: 'number',
                                    min: 0,
                                    max: 100,
                                    className:
                                        'dark:dark-input flex-1 h-10 rounded-l-md border-r-0',
                                    placeholder: 'Amount',
                                }),
                            }),
                            _jsx(Form.Item, {
                                name: ['global_discount', 'type'],
                                noStyle: true,
                                children: _jsx(Select, {
                                    className:
                                        'dark:dark-select h-10 w-28 rounded-r-md border-l-0',
                                    options: [
                                        {
                                            label: 'Percentage',
                                            value: 'percentage',
                                        },
                                        { label: 'Fixed', value: 'fixed' },
                                    ],
                                    defaultValue: 'percentage',
                                }),
                            }),
                        ],
                    }),
                }),
            }),
            _jsx(Form.Item, {
                label: 'Adjustment Amount',
                children: _jsx(Input.Group, {
                    compact: true,
                    children: _jsxs('div', {
                        className: 'flex w-full',
                        children: [
                            _jsx(Form.Item, {
                                name: ['adjustment', 'value'],
                                getValueFromEvent: e => Number(e.target.value),
                                noStyle: true,
                                children: _jsx(Input, {
                                    type: 'number',
                                    className:
                                        'dark:dark-input flex-1 h-10 rounded-l-md border-r-0',
                                    placeholder: 'Amount',
                                }),
                            }),
                            _jsx(Form.Item, {
                                name: ['adjustment', 'operator'],
                                noStyle: true,
                                children: _jsx(Select, {
                                    className:
                                        'dark:dark-select h-10 w-24 rounded-r-md border-l-0',
                                    options: [
                                        { label: '-', value: 'minus' },
                                        { label: '+', value: 'plus' },
                                    ],
                                    defaultValue: 'minus',
                                }),
                            }),
                        ],
                    }),
                }),
            }),
            _jsx(Form.Item, {
                label: 'Grand Total',
                name: 'grand_total',
                children: _jsx(Input, {
                    type: 'number',
                    disabled: true,
                    className: 'dark-input h-10',
                }),
            }),
            _jsx(Form.Item, {
                label: 'Payment Method',
                name: 'payment_method',
                children: _jsx(Select, {
                    placeholder: 'Select Method',
                    className: 'dark:dark-select h-10',
                    options: [
                        { label: 'Cash', value: 'cash' },
                        { label: 'Bank Transfer', value: 'bank' },
                        { label: 'Card', value: 'card' },
                    ],
                }),
            }),
            _jsx(Form.Item, {
                label: 'Paid Amount',
                name: 'paid_amount',
                children: _jsx(Input, {
                    type: 'number',
                    className: 'dark:dark-input h-10',
                }),
            }),
            _jsx(Form.Item, {
                label: 'Due Amount',
                name: 'due_amount',
                children: _jsx(Input, {
                    disabled: true,
                    className: 'dark-input h-10',
                }),
            }),
        ],
    });
};
export default DirectSaleSummary;
