import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Modal, Input } from 'antd';
const Add_customer_modal = ({
    is_customer_modal_visible,
    set_is_customer_modal_visible,
    save_new_customer,
    newCustomer,
    setNewCustomer,
}) =>
    _jsx(Modal, {
        title: 'Add Customer',
        open: is_customer_modal_visible,
        onOk: save_new_customer,
        onCancel: () => set_is_customer_modal_visible(false),
        okText: 'Save',
        cancelText: 'Cancel',
        className: 'dark:bg-gray-800 dark:text-white rounded',
        bodyStyle: { backgroundColor: 'inherit' },
        children: _jsxs('div', {
            className: 'space-y-3',
            children: [
                _jsxs('div', {
                    children: [
                        _jsx('label', {
                            className:
                                'block text-sm text-gray-700 dark:text-gray-300 mb-1',
                            children: 'Name *',
                        }),
                        _jsx(Input, {
                            placeholder: 'Customer name',
                            value: newCustomer.name,
                            onChange: e =>
                                setNewCustomer(c => ({
                                    ...c,
                                    name: e.target.value,
                                })),
                            required: true,
                            className:
                                'dark:bg-gray-700 dark:text-white dark:border-gray-600',
                        }),
                    ],
                }),
                _jsxs('div', {
                    children: [
                        _jsx('label', {
                            className:
                                'block text-sm text-gray-700 dark:text-gray-300 mb-1',
                            children: 'Phone *',
                        }),
                        _jsx(Input, {
                            placeholder: 'Phone number',
                            value: newCustomer.phone,
                            required: true,
                            onChange: e =>
                                setNewCustomer(c => ({
                                    ...c,
                                    phone: e.target.value,
                                })),
                            className:
                                'dark:bg-gray-700 dark:text-white dark:border-gray-600',
                        }),
                    ],
                }),
                _jsxs('div', {
                    children: [
                        _jsx('label', {
                            className:
                                'block text-sm text-gray-700 dark:text-gray-300 mb-1',
                            children: 'Email',
                        }),
                        _jsx(Input, {
                            type: 'email',
                            placeholder: 'Email address',
                            value: newCustomer.email,
                            onChange: e =>
                                setNewCustomer(c => ({
                                    ...c,
                                    email: e.target.value,
                                })),
                            className:
                                'dark:bg-gray-700 dark:text-white dark:border-gray-600',
                        }),
                    ],
                }),
                _jsxs('div', {
                    children: [
                        _jsx('label', {
                            className:
                                'block text-sm text-gray-700 dark:text-gray-300 mb-1',
                            children: 'Address',
                        }),
                        _jsx(Input.TextArea, {
                            rows: 3,
                            placeholder: 'Address',
                            value: newCustomer.address,
                            onChange: e =>
                                setNewCustomer(c => ({
                                    ...c,
                                    address: e.target.value,
                                })),
                            className:
                                'dark:bg-gray-700 dark:text-white dark:border-gray-600',
                        }),
                    ],
                }),
            ],
        }),
    });
export default Add_customer_modal;
