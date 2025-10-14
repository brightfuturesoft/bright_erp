import React from 'react';
import { Form, Input, Checkbox, Typography } from 'antd';

const { Text } = Typography;

interface SaleableFieldsProps {
    itemType: string;
    is_saleable: boolean;
    set_is_saleable: React.Dispatch<React.SetStateAction<boolean>>;
}

const SaleableFields: React.FC<SaleableFieldsProps> = ({
    itemType,
    is_saleable,
    set_is_saleable,
}) => {
    return (
        <>
            {/* Saleable Checkbox */}
            <Form.Item className="mb-0">
                <Checkbox
                    checked={is_saleable}
                    onChange={e => set_is_saleable(e.target.checked)}
                >
                    <Text
                        strong
                        className="text-xl dark:text-white text-black"
                    >
                        Saleable
                    </Text>
                </Checkbox>
            </Form.Item>

            {/* Saleable Fields */}
            {is_saleable && (
                <div className="flex items-center gap-3 my-4">
                    {itemType === 'product' && (
                        <Form.Item
                            label="Item Weight"
                            name="item_weight"
                            className="flex-1 mb-0"
                        >
                            <Input placeholder="Enter Item Weight" />
                        </Form.Item>
                    )}

                    <Form.Item
                        label="Selling VAT(%)"
                        name="selling_vat"
                        className="flex-1 mb-0"
                    >
                        <Input
                            type="number"
                            placeholder="Please Enter Selling VAT (%)"
                            min={0}
                            max={100}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Selling Discount(%)"
                        name="selling_discount"
                        className="flex-1 mb-0"
                    >
                        <Input
                            type="number"
                            placeholder="Please Enter Discount (%)"
                            min={0}
                            max={100}
                        />
                    </Form.Item>
                </div>
            )}
        </>
    );
};

export default SaleableFields;
