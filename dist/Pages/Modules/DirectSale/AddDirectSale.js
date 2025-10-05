import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { Upload, Button, DatePicker, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import CommonBtn from '../../../Hooks/CommonBtn';
const AddDirectSale = () => {
    const [file, setFile] = useState(null);
    const [selectedPerson, setSelectedPerson] = useState('');
    const [selectCustomer, setSelecetCustomer] = useState('');
    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        if (file) {
            formData.append('photo', file);
        }
        formData.append('salePerson', selectedPerson);
        formData.append('customer', selectCustomer);
        const data = Object.fromEntries(formData.entries());
        console.log(data);
        // Submit form data to backend or perform any other action
    };
    const handleSelectChange = value => {
        setSelectedPerson(value);
    };
    const handleSelectCustomer = value => {
        setSelecetCustomer(value);
    };
    const handleChange = ({ fileList }) => {
        if (fileList.length > 0) {
            setFile(fileList[0].originFileObj);
        } else {
            setFile(null);
        }
    };
    return _jsx('div', {
        className: 'mx-auto py-6',
        children: _jsxs('form', {
            className:
                'bg-gray-100 dark:bg-light-dark shadow-md mx-auto p-6 rounded max-w-7xl text-dark dark:text-light',
            onSubmit: handleSubmit,
            children: [
                _jsx('h2', {
                    className: 'mb-4 text-xl',
                    children: 'Add Sale Item',
                }),
                _jsxs('div', {
                    className: 'space-y-4',
                    children: [
                        _jsxs('div', {
                            className:
                                'md:gap-4 grid grid-cols-1 md:grid-cols-2',
                            children: [
                                _jsxs('div', {
                                    children: [
                                        _jsx('label', {
                                            htmlFor: 'sale_no',
                                            className: 'block mb-1',
                                            children:
                                                'Sale No (auto generate):',
                                        }),
                                        _jsx('input', {
                                            readOnly: true,
                                            value: 203847,
                                            type: 'text',
                                            id: 'sale_no',
                                            name: 'sale_no',
                                            className:
                                                'border-gray-700 bg-transparent px-3 py-2 border rounded w-full dark:text-light',
                                        }),
                                    ],
                                }),
                                _jsxs('div', {
                                    className:
                                        'relative pt-2 md:pt-0 pb-7 md:pb-0 upload-box',
                                    children: [
                                        _jsx('label', {
                                            htmlFor: 'photo',
                                            className: 'block mb-1',
                                            children: 'Photo:',
                                        }),
                                        _jsx(Upload, {
                                            beforeUpload: () => false,
                                            onChange: handleChange,
                                            listType: 'picture',
                                            maxCount: 1,
                                            children: _jsx(Button, {
                                                icon: _jsx(UploadOutlined, {}),
                                                children: 'Upload (Max: 1)',
                                            }),
                                        }),
                                    ],
                                }),
                            ],
                        }),
                        _jsxs('div', {
                            className: 'mb-4 pt-2 pb-7',
                            children: [
                                _jsx('label', {
                                    htmlFor: 'sale_date',
                                    className: 'block mb-1',
                                    children: 'Sale Date:',
                                }),
                                _jsx(DatePicker, {
                                    id: 'sale_date',
                                    name: 'sale_date',
                                    className:
                                        'border-gray-700 hover:border-gray-700 focus-within:border-gray-200 bg-transparent hover:!bg-transparent focus-within:bg-transparent px-3 py-2 border rounded w-full dark:!text-light',
                                    format: 'YYYY-MM-DD',
                                    placeholder: '',
                                }),
                            ],
                        }),
                    ],
                }),
                _jsxs('div', {
                    className: 'mb-4',
                    children: [
                        _jsx('label', {
                            htmlFor: 'phone',
                            className: 'block mb-1',
                            children: 'Phone:',
                        }),
                        _jsx('input', {
                            type: 'text',
                            id: 'phone',
                            name: 'phone',
                            className:
                                'border-gray-700 bg-transparent px-3 py-2 border rounded w-full dark:text-light',
                        }),
                    ],
                }),
                _jsxs('div', {
                    className: 'flex items-center gap-3 w-full',
                    children: [
                        _jsxs('div', {
                            className: 'relative mb-4 w-full select-box',
                            children: [
                                _jsx('label', {
                                    htmlFor: 'selectPerson',
                                    className: 'block mb-1',
                                    children: 'Customers',
                                }),
                                _jsx(Select, {
                                    defaultValue: 'jack',
                                    style: { width: 200 },
                                    onChange: handleSelectCustomer,
                                    options: [
                                        { value: 'jack', label: 'Jack' },
                                        { value: 'lucy', label: 'Lucy' },
                                        {
                                            value: 'Yiminghe',
                                            label: 'Yiminghe',
                                        },
                                        {
                                            value: 'disabled',
                                            label: 'Disabled',
                                            disabled: true,
                                        },
                                    ],
                                }),
                            ],
                        }),
                        _jsxs('div', {
                            className: 'relative mb-4 w-full select-box',
                            children: [
                                _jsx('label', {
                                    htmlFor: 'selectPerson',
                                    className: 'block mb-1',
                                    children: 'Select Person',
                                }),
                                _jsx(Select, {
                                    defaultValue: 'jack',
                                    style: { width: 200 },
                                    onChange: handleSelectChange,
                                    options: [
                                        { value: 'jack', label: 'Jack' },
                                        { value: 'lucy', label: 'Lucy' },
                                        {
                                            value: 'Yiminghe',
                                            label: 'Yiminghe',
                                        },
                                        {
                                            value: 'disabled',
                                            label: 'Disabled',
                                            disabled: true,
                                        },
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),
                _jsxs('div', {
                    className: 'mt-2 mb-4',
                    children: [
                        _jsx('label', {
                            htmlFor: 'description',
                            className: 'block mb-1',
                            children: 'Description',
                        }),
                        _jsx('textarea', {
                            id: 'description',
                            name: 'description',
                            className:
                                'border-gray-700 bg-transparent px-3 py-2 border rounded w-full h-[160px] dark:text-light',
                        }),
                    ],
                }),
                _jsx(CommonBtn, {
                    back: true,
                    type: 'submit',
                    children: 'Submit',
                }),
            ],
        }),
    });
};
export default AddDirectSale;
