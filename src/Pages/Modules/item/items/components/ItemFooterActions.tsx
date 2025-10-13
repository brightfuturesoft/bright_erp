import React from 'react';
import { Form, Checkbox, Button } from 'antd';

interface ItemFooterActionsProps {
    itemType: string;
}

const ItemFooterActions: React.FC<ItemFooterActionsProps> = ({ itemType }) => {
    return (
        <>
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <Form.Item
                    name="is_returnable"
                    valuePropName="checked"
                    className="flex-1 mb-0"
                >
                    <Checkbox>Returnable Item</Checkbox>
                </Form.Item>

                <Form.Item
                    name="availeablein_pos"
                    valuePropName="checked"
                    className="flex-1 mb-0"
                >
                    <Checkbox>Available in POS</Checkbox>
                </Form.Item>

                {itemType === 'product' && (
                    <Form.Item
                        name="availeablein_ecommerce"
                        valuePropName="checked"
                        className="flex-1 mb-0"
                    >
                        <Checkbox>Available in E-commerce</Checkbox>
                    </Form.Item>
                )}
            </div>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                >
                    Save Item
                </Button>
            </Form.Item>
        </>
    );
};

export default ItemFooterActions;
