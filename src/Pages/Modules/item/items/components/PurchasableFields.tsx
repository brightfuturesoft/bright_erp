import React from 'react';
import { Form, Input, Select, Checkbox, Typography } from 'antd';

const { Text } = Typography;

interface PurchasableFieldsProps {
    itemType: string;
    is_purchasable: boolean;
    set_is_purchasable: React.Dispatch<React.SetStateAction<boolean>>;
    expenseData: any[];
}

const PurchasableFields: React.FC<PurchasableFieldsProps> = ({
    itemType,
    is_purchasable,
    set_is_purchasable,
    expenseData,
}) => {
    return (
        <>
            {/* Purchasable Checkbox */}
            {itemType === 'product' && (
                <Form.Item
                    name="is_purchasable"
                    valuePropName="checked"
                    className="mb-0"
                >
                    <Checkbox
                        onChange={() => set_is_purchasable(!is_purchasable)}
                    >
                        <Text
                            strong
                            className="text-xl dark:text-white text-black"
                        >
                            Purchasable
                        </Text>
                    </Checkbox>
                </Form.Item>
            )}

            {/* Purchasable Fields */}
            {is_purchasable && (
                <div className="flex items-center gap-3 my-4">
                    {itemType === 'product' && (
                        <>
                            {/* Purchasing Price */}
                            <Form.Item
                                label="Purchasing Price"
                                name="purchasing_price"
                                className="flex-1 mb-0"
                            >
                                <Input
                                    type="number"
                                    placeholder="Please enter Purchasing Price"
                                    min={0}
                                    className="custom-placeholder"
                                />
                            </Form.Item>

                            {/* Purchasing Account */}
                            <Form.Item
                                label="Purchasing Account"
                                name="purchasing_account"
                                className="flex-1 mb-0"
                            >
                                <Select
                                    allowClear
                                    placeholder="Select Purchasing Account"
                                    labelInValue
                                    className="custom-placeholder"
                                    options={
                                        Array.isArray(expenseData)
                                            ? expenseData.map((b: any) => ({
                                                  label: b.ac_name,
                                                  value: b._id,
                                              }))
                                            : []
                                    }
                                />
                            </Form.Item>

                            {/* Purchasing VAT */}
                            <Form.Item
                                label="Purchasing VAT(%)"
                                name="purchasing_vat"
                                className="flex-1 mb-0"
                            >
                                <Input
                                    type="number"
                                    placeholder="Please enter Purchasing VAT (%)"
                                    min={0}
                                    max={100}
                                    className="custom-placeholder"
                                />
                            </Form.Item>
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default PurchasableFields;
