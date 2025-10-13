import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import { UnitDropdown } from './UnitDropdown';

interface SkuUnitSectionProps {
    form?: any;
    sku: string;
    setSku: React.Dispatch<React.SetStateAction<string>>;
    itemType: 'product' | 'service';
}

const SkuUnitSection: React.FC<SkuUnitSectionProps> = ({
    form,
    sku,
    setSku,
    itemType,
}) => {
    if (!form) return;
    useEffect(() => {
        const formSku = form.getFieldValue('sku');
        if (formSku) setSku(formSku);
    }, [form]);

    return (
        <div className="flex items-center gap-3">
            <Form.Item
                label="SKU"
                name="sku"
                className="flex-1 mb-0 dark:text-white"
            >
                <Input
                    value={sku}
                    placeholder="Enter SKU"
                    onChange={e => {
                        setSku(e.target.value);
                        form.setFieldsValue({ sku: e.target.value });
                    }}
                />
            </Form.Item>
            {itemType === 'product' && (
                <Form.Item
                    label="Unit"
                    name="unit"
                    className="flex-1 mb-0"
                    rules={[
                        {
                            required: true,
                            message: 'Please select a unit!',
                        },
                    ]}
                >
                    <UnitDropdown />
                </Form.Item>
            )}
        </div>
    );
};

export default SkuUnitSection;
