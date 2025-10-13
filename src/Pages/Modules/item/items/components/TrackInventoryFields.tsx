import React from 'react';
import { Form, Input, Checkbox, Typography } from 'antd';

const { Text } = Typography;

interface TrackInventoryFieldsProps {
    itemType: string;
    is_track_inventory: boolean;
    set_is_track_inventory: React.Dispatch<React.SetStateAction<boolean>>;
    is_serialized: boolean;
    set_is_serialized: React.Dispatch<React.SetStateAction<boolean>>;
    is_manage_batch: boolean;
    set_is_manage_batch: React.Dispatch<React.SetStateAction<boolean>>;
}

const TrackInventoryFields: React.FC<TrackInventoryFieldsProps> = ({
    itemType,
    is_track_inventory,
    set_is_track_inventory,
    is_serialized,
    set_is_serialized,
    is_manage_batch,
    set_is_manage_batch,
}) => {
    return (
        <>
            {/* Track Inventory Checkbox */}
            {itemType === 'product' && (
                <Form.Item
                    name="is_track_inventory"
                    valuePropName="checked"
                    className="mb-0"
                >
                    <Checkbox
                        onChange={() =>
                            set_is_track_inventory(!is_track_inventory)
                        }
                    >
                        <Text
                            strong
                            className="text-xl dark:text-white text-black"
                        >
                            Track Inventory
                        </Text>
                    </Checkbox>
                </Form.Item>
            )}

            {/* Inventory Details */}
            {is_track_inventory && (
                <div className="flex items-center gap-3 my-4">
                    <Form.Item
                        label="Stock Quantity"
                        name="stock_quantites"
                        className="flex-1 mb-0"
                    >
                        <Input placeholder="Enter Stock Quantity" />
                    </Form.Item>

                    <Form.Item
                        label="Low stock Quantity"
                        name="low_stock"
                        className="flex-1 mb-0"
                    >
                        <Input placeholder="Enter Low stock point" />
                    </Form.Item>

                    <Form.Item
                        name="is_serialized"
                        valuePropName="checked"
                        className="flex-1 mb-0"
                    >
                        <Checkbox
                            checked={is_serialized}
                            onChange={e => set_is_serialized(e.target.checked)}
                        >
                            Serialized Item
                        </Checkbox>
                    </Form.Item>

                    <Form.Item
                        name="is_manage_batch"
                        valuePropName="checked"
                        className="flex-1 mb-0"
                    >
                        <Checkbox
                            checked={is_manage_batch}
                            onChange={e =>
                                set_is_manage_batch(e.target.checked)
                            }
                        >
                            Manage Batch
                        </Checkbox>
                    </Form.Item>
                </div>
            )}
        </>
    );
};

export default TrackInventoryFields;
