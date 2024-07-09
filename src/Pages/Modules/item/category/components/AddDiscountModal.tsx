import React, { useState } from 'react';
import { Modal, Select, Button } from 'antd';

interface AddDiscountProps {
    visible: boolean;
    onCancel: () => void;
    onOk: (discountType: string) => void;
}

const AddDiscountModal: React.FC<AddDiscountProps> = ({
    visible,
    onCancel,
    onOk,
}) => {
    const [selectedType, setSelectedType] = useState<string>(''); // State for selected discount type

    const discountOptions = ['Percentage', 'Fixed Amount']; // Options for the select dropdown

    const handleOk = () => {
        onOk(selectedType);
        setSelectedType(''); // Clear selected type after submitting
    };

    return (
        <Modal
            title="Add Discount"
            visible={visible}
            onCancel={onCancel}
            footer={[
                <Button
                    key="cancel"
                    onClick={onCancel}
                >
                    Cancel
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={handleOk}
                    disabled={!selectedType}
                >
                    Add Discount
                </Button>,
            ]}
        >
            <Select
                style={{ width: '100%' }}
                placeholder="Select discount type"
                value={selectedType}
                onChange={(value: string) => setSelectedType(value)}
            >
                {discountOptions.map(option => (
                    <Select.Option
                        key={option}
                        value={option}
                    >
                        {option}
                    </Select.Option>
                ))}
            </Select>
        </Modal>
    );
};

export default AddDiscountModal;
