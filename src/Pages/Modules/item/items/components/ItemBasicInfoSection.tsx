import React from 'react';
import { Form, FormInstance, Input, Radio } from 'antd';

interface ItemBasicInfoSectionProps {
    form?: FormInstance<any>;
    itemType: 'product' | 'service';
    setItemType: React.Dispatch<React.SetStateAction<'product' | 'service'>>;
    handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ItemBasicInfoSection: React.FC<ItemBasicInfoSectionProps> = ({
    form,
    itemType,
    setItemType,
    handleNameChange,
}) => {
    return (
        <>
            {/* Item Type */}
            <Form.Item
                label="Item Type"
                name="item_type"
                className="mb-2"
                required
            >
                <Radio.Group
                    onChange={e => setItemType(e.target.value)}
                    value={itemType}
                >
                    <Radio value="service">Service</Radio>
                    <Radio value="product">Product</Radio>
                </Radio.Group>
            </Form.Item>

            {/* Item Name */}
            <Form.Item
                label="Item Name"
                name="item_name"
                rules={[
                    {
                        required: true,
                        message: 'Item Name is required',
                    },
                ]}
                className="mb-2"
            >
                <Input
                    onChange={handleNameChange}
                    placeholder="Enter item name"
                    className="focus:border-[1px] p-2 border focus:border-blue-600 rounded w-full h-[42px] dark:text-white"
                />
            </Form.Item>
        </>
    );
};

export default ItemBasicInfoSection;
