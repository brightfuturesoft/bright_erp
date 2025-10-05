import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Form, Input, Select, Button, Spin, message, DatePicker } from 'antd';
import { useContext, useState } from 'react';
import { Erp_context } from '@/provider/ErpContext';
import { useNavigate } from 'react-router-dom';
import DirectSaleItems from './DirectSaleItems';
import DirectSaleSummary from './DirectSaleSummary';
import SingleImageUpload from './SingleImageUpload';
import { calculateTotals } from './calculateTotals';
import uploadImage from '@/helpers/hooks/uploadImage';
const { TextArea } = Input;
const AddDirectSale = () => {
    const { user } = useContext(Erp_context);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const onFinish = async values => {
        console.log('values', values);
        try {
            setLoading(true);
            const savedTotals =
                JSON.parse(
                    localStorage.getItem('directSaleTotals') || 'null'
                ) || calculateTotals(values);
            let attachment = '';
            const fileObj = values.attachments?.[0]?.originFileObj;
            if (fileObj) {
                attachment = await uploadImage(fileObj);
            }
            const payload = {
                ...savedTotals,
                customer: {
                    id: values.customer,
                    name: user?.name,
                    phone: user?.phone || '',
                    email: user?.email || '',
                },
                sales_person: {
                    id: values.sales_person,
                    name: user?.name,
                    role: user?.role || 'Sales',
                    phone: user?.phone || '',
                },
                attachments: attachment,
            };
            // 4️⃣ API request
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}sale/direct_sale/create-direct-sale`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                    body: JSON.stringify(payload),
                }
            );
            const data = await res.json();
            if (res.ok) {
                message.success('Direct Sale created successfully!');
                form.resetFields();
                setUploadedFiles([]);
                localStorage.removeItem('directSaleTotals');
                navigate(-1);
            } else {
                message.error(data.message || 'Something went wrong!');
            }
        } catch (err) {
            console.error(err);
            message.error('Error creating direct sale!');
        } finally {
            setLoading(false);
        }
    };
    return _jsx(Spin, {
        spinning: loading,
        children: _jsxs(Form, {
            form: form,
            layout: 'vertical',
            onFinish: onFinish,
            onValuesChange: () => {
                const items = form.getFieldValue('items') || [];
                const global_discount =
                    form.getFieldValue('global_discount') || {};
                const adjustment = form.getFieldValue('adjustment') || {};
                const paid_amount = form.getFieldValue('paid_amount') || 0;
                const totals = calculateTotals({
                    items,
                    global_discount,
                    adjustment,
                    paid_amount,
                });
                form.setFieldsValue({
                    items: totals.items.map((item, index) => ({
                        ...item,
                        key: item.key || index.toString(),
                    })),
                    subtotal: totals.subtotal,
                    total_discount: totals.total_discount,
                    total_vat: totals.total_vat,
                    global_discount: totals.global_discount,
                    adjustment: totals.adjustment,
                    grand_total: totals.grand_total,
                    paid_amount: totals.paid_amount,
                    due_amount: totals.due_amount,
                });
            },
            children: [
                _jsx('h1', {
                    className: 'text-xl dark:text-white my-5 font-semibold',
                    children: 'Add Direct Sale',
                }),
                _jsxs('div', {
                    className: 'grid grid-cols-4 gap-6',
                    children: [
                        _jsxs('div', {
                            className: 'col-span-2 space-y-4',
                            children: [
                                _jsx(Form.Item, {
                                    label: 'Direct Sale Number',
                                    name: 'sale_number',
                                    children: _jsx(Input, {
                                        disabled: true,
                                        placeholder: 'Auto Generated',
                                    }),
                                }),
                                _jsx(Form.Item, {
                                    label: 'Sale Date',
                                    name: 'sale_date',
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Sale Date is required',
                                        },
                                    ],
                                    children: _jsx(DatePicker, {
                                        className:
                                            'w-full bg-white text-black dark:bg-gray-800 dark:text-white border dark:border-gray-700 rounded',
                                        popupClassName:
                                            'dark:bg-gray-900 dark:text-white',
                                    }),
                                }),
                                _jsx(Form.Item, {
                                    label: 'Customer',
                                    name: 'customer',
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Customer is required',
                                        },
                                    ],
                                    children: _jsx(Select, {
                                        placeholder: 'Select Customer',
                                        value: user?._id,
                                        options: [
                                            {
                                                label: user?.name,
                                                value: user?._id,
                                            },
                                        ],
                                    }),
                                }),
                                _jsx(Form.Item, {
                                    label: 'Sales Person',
                                    name: 'sales_person',
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Sales Person is required',
                                        },
                                    ],
                                    children: _jsx(Select, {
                                        placeholder: 'Select User',
                                        value: user?._id,
                                        options: [
                                            {
                                                label: user?.name,
                                                value: user?._id,
                                            },
                                        ],
                                    }),
                                }),
                                _jsx(Form.Item, {
                                    label: 'Description',
                                    name: 'description',
                                    children: _jsx(TextArea, {
                                        rows: 3,
                                        placeholder: 'Description',
                                        className: 'dark-placeholder',
                                    }),
                                }),
                            ],
                        }),
                        _jsxs('div', {
                            className: 'col-span-1 space-y-4 w-[500px] ml-20',
                            children: [
                                _jsx('p', {
                                    className:
                                        'font-semibold dark:text-white my-2',
                                    children: 'Upload File',
                                }),
                                _jsx(SingleImageUpload, {
                                    uploadedFiles: uploadedFiles,
                                    setUploadedFiles: setUploadedFiles,
                                }),
                            ],
                        }),
                    ],
                }),
                _jsx(DirectSaleItems, { form: form }),
                _jsxs('div', {
                    className: 'w-full flex flex-col lg:flex-row gap-20',
                    children: [
                        _jsx('div', {
                            className: 'flex-1 my-10',
                            children: _jsx(Form.Item, {
                                label: 'Notes/Terms',
                                name: 'notes',
                                children: _jsx(TextArea, {
                                    rows: 6,
                                    placeholder: 'Enter notes or terms',
                                    className:
                                        'dark-placeholder w-full h-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white',
                                }),
                            }),
                        }),
                        _jsx('div', {
                            className: 'w-full lg:w-[500px] pb-20',
                            children: _jsx(DirectSaleSummary, { form: form }),
                        }),
                    ],
                }),
                _jsxs('div', {
                    className:
                        'fixed bottom-0 left-0 w-full bg-white dark:bg-gray-800 py-4 px-5 flex justify-end gap-3 shadow-md z-50 border-t dark:border-gray-700',
                    children: [
                        _jsx(Button, {
                            onClick: () => navigate(-1),
                            children: 'Cancel',
                        }),
                        _jsx(Button, {
                            type: 'primary',
                            htmlType: 'submit',
                            children: 'Save',
                        }),
                    ],
                }),
            ],
        }),
    });
};
export default AddDirectSale;
