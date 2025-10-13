import React, { useEffect } from 'react';
import { Form, Input, FormInstance } from 'antd';

interface ItemExtraInfoSectionProps {
    itemType: 'product' | 'service';
    form?: FormInstance<any>;
}

const ItemExtraInfoSection: React.FC<ItemExtraInfoSectionProps> = ({
    itemType,
    form,
}) => {
    useEffect(() => {
        if (!form) return;

        const handlingPrice = form.getFieldValue('handaling_price');
        const videoUrl = form.getFieldValue('video_url');

        if (handlingPrice !== undefined)
            form.setFieldsValue({ handaling_price: handlingPrice });
        if (videoUrl !== undefined)
            form.setFieldsValue({ video_url: videoUrl });
    }, [form]);

    return (
        <div className="flex flex-col gap-3">
            {itemType === 'product' && (
                <Form.Item
                    label="Handling Price"
                    name="handaling_price"
                    className="flex-1 mb-0"
                >
                    <Input
                        type="number"
                        placeholder="Please Enter Handling Price"
                        min={0}
                    />
                </Form.Item>
            )}
            <Form.Item
                label="Video URL"
                name="video_url"
                className="flex-1 mb-0"
            >
                <Input
                    type="text"
                    placeholder="Enter Your Video URL"
                />
            </Form.Item>
        </div>
    );
};

export default ItemExtraInfoSection;
