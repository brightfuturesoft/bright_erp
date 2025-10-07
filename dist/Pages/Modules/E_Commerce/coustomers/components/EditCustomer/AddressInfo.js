import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Input, Form, Select, Checkbox, Button } from 'antd';
import { User } from 'lucide-react';
import { useState } from 'react';
const Address_Info = () => {
    const [addresses, setAddresses] = useState([
        { id: 0, contacts: [{ id: 0 }] },
    ]);
    const addAddress = () => {
        setAddresses([
            ...addresses,
            { id: addresses.length, contacts: [{ id: 0 }] },
        ]);
    };
    const removeAddress = id => {
        setAddresses(addresses.filter(address => address.id !== id));
    };
    const addContact = addressId => {
        setAddresses(
            addresses.map(address => {
                if (address.id === addressId) {
                    return {
                        ...address,
                        contacts: [
                            ...address.contacts,
                            { id: address.contacts.length },
                        ],
                    };
                }
                return address;
            })
        );
    };
    const removeContact = (addressId, contactId) => {
        setAddresses(
            addresses.map(address => {
                if (address.id === addressId) {
                    return {
                        ...address,
                        contacts: address.contacts.filter(
                            contact => contact.id !== contactId
                        ),
                    };
                }
                return address;
            })
        );
    };
    return _jsx('div', {
        children: _jsxs('div', {
            className: 'my-3',
            children: [
                addresses.map(address =>
                    _jsxs(
                        'div',
                        {
                            className:
                                'address-section mb-4 dark:bg-light-dark border-t py-2 dark:border-gray-700 border p-4',
                            children: [
                                _jsxs('div', {
                                    className:
                                        'md:flex items-center justify-between w-full gap-2',
                                    children: [
                                        _jsxs('div', {
                                            className:
                                                'flex items-center gap-2',
                                            children: [
                                                _jsx(Form.Item, {
                                                    name: [
                                                        'addresses',
                                                        address.id,
                                                        'billing_address',
                                                    ],
                                                    valuePropName: 'checked',
                                                    children: _jsx(Checkbox, {
                                                        children:
                                                            'Billing Address',
                                                    }),
                                                }),
                                                _jsx(Form.Item, {
                                                    name: [
                                                        'addresses',
                                                        address.id,
                                                        'shipping_address',
                                                    ],
                                                    valuePropName: 'checked',
                                                    children: _jsx(Checkbox, {
                                                        children:
                                                            'Shipping Address',
                                                    }),
                                                }),
                                            ],
                                        }),
                                        _jsx(Button, {
                                            size: 'small',
                                            type: 'primary',
                                            danger: true,
                                            onClick: () =>
                                                removeAddress(address.id),
                                            children: 'Remove Address',
                                        }),
                                    ],
                                }),
                                _jsxs('div', {
                                    className: 'grid grid-cols-3 gap-3',
                                    children: [
                                        _jsx(Form.Item, {
                                            name: [
                                                'addresses',
                                                address.id,
                                                'address',
                                            ],
                                            label: 'Address',
                                            rules: [{ required: true }],
                                            children: _jsx(Input, {
                                                placeholder: 'Mymenshingh',
                                            }),
                                        }),
                                        _jsx(Form.Item, {
                                            name: [
                                                'addresses',
                                                address.id,
                                                'address_type',
                                            ],
                                            label: 'Address Type',
                                            children: _jsx(Select, {
                                                className:
                                                    'custom-select !w-full',
                                                showSearch: true,
                                                style: { width: 200 },
                                                placeholder: 'Search to Select',
                                                optionFilterProp: 'label',
                                                filterSort: (
                                                    optionA,
                                                    optionB
                                                ) =>
                                                    (optionA?.label ?? '')
                                                        .toLowerCase()
                                                        .localeCompare(
                                                            (
                                                                optionB?.label ??
                                                                ''
                                                            ).toLowerCase()
                                                        ),
                                                options: [
                                                    {
                                                        value: '1',
                                                        label: 'Not Identified',
                                                    },
                                                    {
                                                        value: '2',
                                                        label: 'Closed',
                                                    },
                                                    {
                                                        value: '3',
                                                        label: 'Communicated',
                                                    },
                                                    {
                                                        value: '4',
                                                        label: 'Identified',
                                                    },
                                                    {
                                                        value: '5',
                                                        label: 'Resolved',
                                                    },
                                                    {
                                                        value: '6',
                                                        label: 'Cancelled',
                                                    },
                                                ],
                                            }),
                                        }),
                                        _jsx(Form.Item, {
                                            name: [
                                                'addresses',
                                                address.id,
                                                'country',
                                            ],
                                            label: 'Country',
                                            children: _jsx(Select, {
                                                className:
                                                    'custom-select !w-full',
                                                showSearch: true,
                                                style: { width: 200 },
                                                placeholder: 'Search to Select',
                                                optionFilterProp: 'label',
                                                filterSort: (
                                                    optionA,
                                                    optionB
                                                ) =>
                                                    (optionA?.label ?? '')
                                                        .toLowerCase()
                                                        .localeCompare(
                                                            (
                                                                optionB?.label ??
                                                                ''
                                                            ).toLowerCase()
                                                        ),
                                                options: [
                                                    {
                                                        value: '1',
                                                        label: 'Not Identified',
                                                    },
                                                    {
                                                        value: '2',
                                                        label: 'Closed',
                                                    },
                                                    {
                                                        value: '3',
                                                        label: 'Communicated',
                                                    },
                                                    {
                                                        value: '4',
                                                        label: 'Identified',
                                                    },
                                                    {
                                                        value: '5',
                                                        label: 'Resolved',
                                                    },
                                                    {
                                                        value: '6',
                                                        label: 'Cancelled',
                                                    },
                                                ],
                                            }),
                                        }),
                                        _jsx(Form.Item, {
                                            name: [
                                                'addresses',
                                                address.id,
                                                'state_division',
                                            ],
                                            label: 'State/Division',
                                            children: _jsx(Select, {
                                                className:
                                                    'custom-select !w-full',
                                                showSearch: true,
                                                style: { width: 200 },
                                                placeholder: 'Search to Select',
                                                optionFilterProp: 'label',
                                                filterSort: (
                                                    optionA,
                                                    optionB
                                                ) =>
                                                    (optionA?.label ?? '')
                                                        .toLowerCase()
                                                        .localeCompare(
                                                            (
                                                                optionB?.label ??
                                                                ''
                                                            ).toLowerCase()
                                                        ),
                                                options: [
                                                    {
                                                        value: '1',
                                                        label: 'Not Identified',
                                                    },
                                                    {
                                                        value: '2',
                                                        label: 'Closed',
                                                    },
                                                    {
                                                        value: '3',
                                                        label: 'Communicated',
                                                    },
                                                    {
                                                        value: '4',
                                                        label: 'Identified',
                                                    },
                                                    {
                                                        value: '5',
                                                        label: 'Resolved',
                                                    },
                                                    {
                                                        value: '6',
                                                        label: 'Cancelled',
                                                    },
                                                ],
                                            }),
                                        }),
                                        _jsx(Form.Item, {
                                            name: [
                                                'addresses',
                                                address.id,
                                                'district',
                                            ],
                                            label: 'District',
                                            children: _jsx(Select, {
                                                className:
                                                    'custom-select !w-full',
                                                showSearch: true,
                                                style: { width: 200 },
                                                placeholder: 'Search to Select',
                                                optionFilterProp: 'label',
                                                filterSort: (
                                                    optionA,
                                                    optionB
                                                ) =>
                                                    (optionA?.label ?? '')
                                                        .toLowerCase()
                                                        .localeCompare(
                                                            (
                                                                optionB?.label ??
                                                                ''
                                                            ).toLowerCase()
                                                        ),
                                                options: [
                                                    {
                                                        value: '1',
                                                        label: 'Not Identified',
                                                    },
                                                    {
                                                        value: '2',
                                                        label: 'Closed',
                                                    },
                                                    {
                                                        value: '3',
                                                        label: 'Communicated',
                                                    },
                                                    {
                                                        value: '4',
                                                        label: 'Identified',
                                                    },
                                                    {
                                                        value: '5',
                                                        label: 'Resolved',
                                                    },
                                                    {
                                                        value: '6',
                                                        label: 'Cancelled',
                                                    },
                                                ],
                                            }),
                                        }),
                                        _jsx(Form.Item, {
                                            name: [
                                                'addresses',
                                                address.id,
                                                'thana',
                                            ],
                                            label: 'Thana',
                                            children: _jsx(Select, {
                                                className:
                                                    'custom-select !w-full',
                                                showSearch: true,
                                                style: { width: 200 },
                                                placeholder: 'Search to Select',
                                                optionFilterProp: 'label',
                                                filterSort: (
                                                    optionA,
                                                    optionB
                                                ) =>
                                                    (optionA?.label ?? '')
                                                        .toLowerCase()
                                                        .localeCompare(
                                                            (
                                                                optionB?.label ??
                                                                ''
                                                            ).toLowerCase()
                                                        ),
                                                options: [
                                                    {
                                                        value: '1',
                                                        label: 'Not Identified',
                                                    },
                                                    {
                                                        value: '2',
                                                        label: 'Closed',
                                                    },
                                                    {
                                                        value: '3',
                                                        label: 'Communicated',
                                                    },
                                                    {
                                                        value: '4',
                                                        label: 'Identified',
                                                    },
                                                    {
                                                        value: '5',
                                                        label: 'Resolved',
                                                    },
                                                    {
                                                        value: '6',
                                                        label: 'Cancelled',
                                                    },
                                                ],
                                            }),
                                        }),
                                    ],
                                }),
                                _jsxs('h3', {
                                    className: 'text-lg font-semibold mt-3',
                                    children: [
                                        'Contact',
                                        ' ',
                                        _jsxs('span', {
                                            className: 'text-danger',
                                            children: [
                                                '(',
                                                address.contacts.length,
                                                ')',
                                            ],
                                        }),
                                    ],
                                }),
                                _jsxs('div', {
                                    className: 'custom-border-top py-2 mt-2',
                                    children: [
                                        address.contacts.map((contact, i) =>
                                            _jsxs(
                                                'div',
                                                {
                                                    className:
                                                        'dark:bg-gray-800 custom-border mt-3 p-2 relative',
                                                    children: [
                                                        _jsxs('div', {
                                                            className:
                                                                'flex items-center justify-between',
                                                            children: [
                                                                _jsxs('h1', {
                                                                    className:
                                                                        'text-primary font-semibold',
                                                                    children: [
                                                                        'Contact ',
                                                                        i + 1,
                                                                    ],
                                                                }),
                                                                _jsx(Button, {
                                                                    size: 'small',
                                                                    type: 'primary',
                                                                    ghost: true,
                                                                    danger: true,
                                                                    onClick:
                                                                        () =>
                                                                            removeContact(
                                                                                address.id,
                                                                                contact.id
                                                                            ),
                                                                    children:
                                                                        'Remove',
                                                                }),
                                                            ],
                                                        }),
                                                        _jsxs('div', {
                                                            className:
                                                                'mt-5 grid md:grid-cols-3 grid-cols-1 gap-2',
                                                            children: [
                                                                _jsx(
                                                                    Form.Item,
                                                                    {
                                                                        name: [
                                                                            'addresses',
                                                                            address.id,
                                                                            'contacts',
                                                                            contact.id,
                                                                            'name',
                                                                        ],
                                                                        label: 'Name',
                                                                        rules: [
                                                                            {
                                                                                required: true,
                                                                            },
                                                                        ],
                                                                        children:
                                                                            _jsx(
                                                                                Input,
                                                                                {
                                                                                    placeholder:
                                                                                        'nahid',
                                                                                }
                                                                            ),
                                                                    }
                                                                ),
                                                                _jsx(
                                                                    Form.Item,
                                                                    {
                                                                        name: [
                                                                            'addresses',
                                                                            address.id,
                                                                            'contacts',
                                                                            contact.id,
                                                                            'phone',
                                                                        ],
                                                                        label: 'Phone Number',
                                                                        children:
                                                                            _jsx(
                                                                                Input,
                                                                                {
                                                                                    placeholder:
                                                                                        '+88017123456',
                                                                                }
                                                                            ),
                                                                    }
                                                                ),
                                                                _jsx(
                                                                    Form.Item,
                                                                    {
                                                                        name: [
                                                                            'addresses',
                                                                            address.id,
                                                                            'contacts',
                                                                            contact.id,
                                                                            'email',
                                                                        ],
                                                                        label: 'Email',
                                                                        children:
                                                                            _jsx(
                                                                                Input,
                                                                                {
                                                                                    placeholder:
                                                                                        'nahid@example.com',
                                                                                }
                                                                            ),
                                                                    }
                                                                ),
                                                            ],
                                                        }),
                                                    ],
                                                },
                                                contact.id
                                            )
                                        ),
                                        _jsx(Button, {
                                            icon: _jsx(User, { size: 18 }),
                                            size: 'small',
                                            className:
                                                'bg-warning px-2 h-[30px] text-white mt-3',
                                            onClick: () =>
                                                addContact(address.id),
                                            children: 'Add Contact',
                                        }),
                                    ],
                                }),
                            ],
                        },
                        address.id
                    )
                ),
                _jsx(Button, {
                    type: 'primary',
                    onClick: addAddress,
                    children: 'Add Address',
                }),
            ],
        }),
    });
};
export default Address_Info;
