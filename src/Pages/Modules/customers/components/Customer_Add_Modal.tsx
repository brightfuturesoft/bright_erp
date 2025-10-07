import React, { useState, useEffect } from 'react';
import { Modal, Input, Select, DatePicker } from 'antd';
import dayjs from 'dayjs';

const { Option } = Select;

interface Props {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    handleAddSave: (values: any) => void;
    initialValues?: any; // ✨ Edit er jonno existing data
}

const CustomerAddModal: React.FC<Props> = ({
    isOpen,
    setIsOpen,
    handleAddSave,
    initialValues = {}, // default empty for add
}) => {
    const [customerType, setCustomerType] = useState<'ecommerce' | 'pos' | ''>(
        ''
    );
    const [formData, setFormData] = useState<any>({});

    useEffect(() => {
        if (initialValues) {
            setFormData(initialValues);
            if (initialValues.customer_type)
                setCustomerType(initialValues.customer_type);
        }
    }, [initialValues]);

    const handleChange = (name: string, value: any) => {
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        handleAddSave(formData);
        setCustomerType('');
        setFormData({});
    };

    // --- Ecommerce Fields ---
    const ecommerceFields = (
        <>
            <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
                    Full Name
                </label>
                <Input
                    placeholder="Enter full name"
                    value={formData.full_name || ''}
                    onChange={e => handleChange('full_name', e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
                    Email
                </label>
                <Input
                    placeholder="Enter email"
                    value={formData.email || ''}
                    onChange={e => handleChange('email', e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
                    Phone Number
                </label>
                <Input
                    placeholder="Enter phone number"
                    value={formData.phone_number || ''}
                    onChange={e => handleChange('phone_number', e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
                    Gender
                </label>
                <Select
                    placeholder="Select gender"
                    value={formData.gender || ''}
                    onChange={val => handleChange('gender', val)}
                    className="w-full"
                >
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                </Select>
            </div>
            <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
                    Status
                </label>
                <Select
                    placeholder="Select Status"
                    value={formData.status || 'Active'}
                    onChange={val => handleChange('status', val)}
                    className="w-full"
                >
                    <Option value="Active">Active</Option>
                    <Option value="Inactive">Inactive</Option>
                </Select>
            </div>
            <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
                    Birthday
                </label>
                <DatePicker
                    placeholder="Select birthday"
                    className="w-full bg-gray-700 text-white border-gray-600 rounded"
                    popupClassName="bg-gray-800 text-white border border-gray-600 rounded shadow-lg"
                    value={formData.birthday ? dayjs(formData.birthday) : null}
                    onChange={date =>
                        handleChange(
                            'birthday',
                            date ? date.format('YYYY-MM-DD') : ''
                        )
                    }
                />
            </div>
        </>
    );

    // --- POS Fields ---
    const posFields = (
        <>
            <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
                    Customer Name
                </label>
                <Input
                    placeholder="Enter customer name"
                    value={formData.name || ''}
                    onChange={e => handleChange('name', e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
                    Phone
                </label>
                <Input
                    placeholder="Enter phone"
                    value={formData.phone || ''}
                    onChange={e => handleChange('phone', e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
                    Email
                </label>
                <Input
                    placeholder="Enter email"
                    value={formData.email || ''}
                    onChange={e => handleChange('email', e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
                    Address
                </label>
                <Input.TextArea
                    placeholder="Enter address"
                    value={formData.address || ''}
                    onChange={e => handleChange('address', e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
                    Status
                </label>
                <Select
                    placeholder="Select Status"
                    value={formData.status || 'Active'}
                    onChange={val => handleChange('status', val)}
                    className="w-full"
                >
                    <Option value="Active">Active</Option>
                    <Option value="Inactive">Inactive</Option>
                </Select>
            </div>
        </>
    );

    return (
        <Modal
            title={initialValues?.key ? 'Edit Customer' : 'Add Customer'}
            open={isOpen}
            onCancel={() => setIsOpen(false)}
            onOk={handleSubmit}
            okText="Save"
            centered
        >
            {/* Customer Type Field */}
            <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
                    Select Customer Type
                </label>
                <Select
                    placeholder="Select Customer Type"
                    value={customerType}
                    onChange={val => {
                        setCustomerType(val);
                        setFormData({ ...formData, customer_type: val });
                    }}
                    className="w-full"
                >
                    <Option value="ecommerce">Ecommerce</Option>
                    <Option value="pos">POS</Option>
                </Select>
            </div>

            {customerType === 'ecommerce' && ecommerceFields}
            {customerType === 'pos' && posFields}
        </Modal>
    );
};

export default CustomerAddModal;
