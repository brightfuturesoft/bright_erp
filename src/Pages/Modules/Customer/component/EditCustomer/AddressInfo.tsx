import { Input, Form, Select, Checkbox, Button } from 'antd';
import { User } from 'lucide-react';
import React, { useState } from 'react';

const AddressInfo = ({ form }) => {
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

    return (
        <div>
            <div className="my-3">
                {addresses.map(address => (
                    <div
                        key={address.id}
                        className="address-section mb-4 dark:bg-light-dark border-t py-2 dark:border-gray-700 border p-4"
                    >
                        <div className="md:flex items-center justify-between w-full gap-2">
                            <div className="flex items-center gap-2">
                                <Form.Item
                                    name={[
                                        'addresses',
                                        address.id,
                                        'billing_address',
                                    ]}
                                    valuePropName="checked"
                                >
                                    <Checkbox>Billing Address</Checkbox>
                                </Form.Item>
                                <Form.Item
                                    name={[
                                        'addresses',
                                        address.id,
                                        'shipping_address',
                                    ]}
                                    valuePropName="checked"
                                >
                                    <Checkbox>Shipping Address</Checkbox>
                                </Form.Item>
                            </div>
                            <Button
                                size="small"
                                type="primary"
                                danger
                                onClick={() => removeAddress(address.id)}
                            >
                                Remove Address
                            </Button>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            <Form.Item
                                name={['addresses', address.id, 'address']}
                                label="Address"
                                rules={[{ required: true }]}
                            >
                                <Input placeholder="Mymenshingh" />
                            </Form.Item>
                            <Form.Item
                                name={['addresses', address.id, 'address_type']}
                                label="Address Type"
                            >
                                <Select
                                    className="custom-select !w-full"
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="Search to Select"
                                    optionFilterProp="label"
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '')
                                            .toLowerCase()
                                            .localeCompare(
                                                (
                                                    optionB?.label ?? ''
                                                ).toLowerCase()
                                            )
                                    }
                                    options={[
                                        { value: '1', label: 'Not Identified' },
                                        { value: '2', label: 'Closed' },
                                        { value: '3', label: 'Communicated' },
                                        { value: '4', label: 'Identified' },
                                        { value: '5', label: 'Resolved' },
                                        { value: '6', label: 'Cancelled' },
                                    ]}
                                />
                            </Form.Item>
                            <Form.Item
                                name={['addresses', address.id, 'country']}
                                label="Country"
                            >
                                <Select
                                    className="custom-select !w-full"
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="Search to Select"
                                    optionFilterProp="label"
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '')
                                            .toLowerCase()
                                            .localeCompare(
                                                (
                                                    optionB?.label ?? ''
                                                ).toLowerCase()
                                            )
                                    }
                                    options={[
                                        { value: '1', label: 'Not Identified' },
                                        { value: '2', label: 'Closed' },
                                        { value: '3', label: 'Communicated' },
                                        { value: '4', label: 'Identified' },
                                        { value: '5', label: 'Resolved' },
                                        { value: '6', label: 'Cancelled' },
                                    ]}
                                />
                            </Form.Item>

                            <Form.Item
                                name={[
                                    'addresses',
                                    address.id,
                                    'state_division',
                                ]}
                                label="State/Division"
                            >
                                <Select
                                    className="custom-select !w-full"
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="Search to Select"
                                    optionFilterProp="label"
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '')
                                            .toLowerCase()
                                            .localeCompare(
                                                (
                                                    optionB?.label ?? ''
                                                ).toLowerCase()
                                            )
                                    }
                                    options={[
                                        { value: '1', label: 'Not Identified' },
                                        { value: '2', label: 'Closed' },
                                        { value: '3', label: 'Communicated' },
                                        { value: '4', label: 'Identified' },
                                        { value: '5', label: 'Resolved' },
                                        { value: '6', label: 'Cancelled' },
                                    ]}
                                />
                            </Form.Item>

                            <Form.Item
                                name={['addresses', address.id, 'district']}
                                label="District"
                            >
                                <Select
                                    className="custom-select !w-full"
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="Search to Select"
                                    optionFilterProp="label"
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '')
                                            .toLowerCase()
                                            .localeCompare(
                                                (
                                                    optionB?.label ?? ''
                                                ).toLowerCase()
                                            )
                                    }
                                    options={[
                                        { value: '1', label: 'Not Identified' },
                                        { value: '2', label: 'Closed' },
                                        { value: '3', label: 'Communicated' },
                                        { value: '4', label: 'Identified' },
                                        { value: '5', label: 'Resolved' },
                                        { value: '6', label: 'Cancelled' },
                                    ]}
                                />
                            </Form.Item>

                            <Form.Item
                                name={['addresses', address.id, 'thana']}
                                label="Thana"
                            >
                                <Select
                                    className="custom-select !w-full"
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="Search to Select"
                                    optionFilterProp="label"
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '')
                                            .toLowerCase()
                                            .localeCompare(
                                                (
                                                    optionB?.label ?? ''
                                                ).toLowerCase()
                                            )
                                    }
                                    options={[
                                        { value: '1', label: 'Not Identified' },
                                        { value: '2', label: 'Closed' },
                                        { value: '3', label: 'Communicated' },
                                        { value: '4', label: 'Identified' },
                                        { value: '5', label: 'Resolved' },
                                        { value: '6', label: 'Cancelled' },
                                    ]}
                                />
                            </Form.Item>
                        </div>

                        <h3 className="text-lg font-semibold mt-3">
                            Contact{' '}
                            <span className="text-danger">
                                ({address?.contacts.length})
                            </span>
                        </h3>
                        <div className="custom-border-top py-2 mt-2">
                            {address.contacts.map((contact, i) => (
                                <div
                                    key={contact.id}
                                    className="dark:bg-gray-800 custom-border mt-3 p-2 relative"
                                >
                                    <div className="flex items-center justify-between">
                                        <h1 className="text-primary font-semibold">
                                            Contact {i + 1}
                                        </h1>
                                        <Button
                                            size={'small'}
                                            type="primary"
                                            ghost
                                            danger
                                            onClick={() =>
                                                removeContact(
                                                    address.id,
                                                    contact.id
                                                )
                                            }
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                    <div className="mt-5 grid md:grid-cols-3 grid-cols-1 gap-2">
                                        <Form.Item
                                            name={[
                                                'addresses',
                                                address.id,
                                                'contacts',
                                                contact.id,
                                                'name',
                                            ]}
                                            label="Name"
                                            rules={[{ required: true }]}
                                        >
                                            <Input placeholder="nahid" />
                                        </Form.Item>
                                        <Form.Item
                                            name={[
                                                'addresses',
                                                address.id,
                                                'contacts',
                                                contact.id,
                                                'phone',
                                            ]}
                                            label="Phone Number"
                                        >
                                            <Input placeholder="+88017123456" />
                                        </Form.Item>
                                        <Form.Item
                                            name={[
                                                'addresses',
                                                address.id,
                                                'contacts',
                                                contact.id,
                                                'email',
                                            ]}
                                            label="Email"
                                        >
                                            <Input placeholder="nahid@example.com" />
                                        </Form.Item>
                                    </div>
                                </div>
                            ))}
                            <Button
                                icon={<User size={18} />}
                                size="small"
                                className="bg-warning px-2 h-[30px] text-white mt-3"
                                onClick={() => addContact(address.id)}
                            >
                                Add Contact
                            </Button>
                        </div>
                    </div>
                ))}
                <Button
                    type="primary"
                    onClick={addAddress}
                >
                    Add Address
                </Button>
            </div>
        </div>
    );
};

export default AddressInfo;
