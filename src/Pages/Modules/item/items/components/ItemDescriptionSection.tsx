import React from 'react';
import { Form, Input } from 'antd';
import JoditEditor from 'jodit-react';

const { TextArea } = Input;

interface ItemDescriptionSectionProps {
    form: any;
    isDarkMode: boolean;
}

const ItemDescriptionSection: React.FC<ItemDescriptionSectionProps> = ({
    form,
    isDarkMode,
}) => {
    return (
        <>
            {/* Short Description */}
            <Form.Item
                label="Short Description"
                name="item_description"
            >
                <TextArea
                    className="text-black dark:text-white"
                    placeholder="Write a short description about this item..."
                    rows={2}
                />
            </Form.Item>

            {/* Long Description */}
            <Form.Item
                label="Long Description"
                name="item_long_description"
            >
                <JoditEditor
                    config={{
                        readonly: false,
                        height: 300,
                        theme: isDarkMode ? 'dark' : 'default',
                    }}
                    className="jodit-editor"
                    value={form.getFieldValue('item_long_description') || ''}
                    onChange={val =>
                        form.setFieldsValue({ item_long_description: val })
                    }
                />
            </Form.Item>
        </>
    );
};

export default ItemDescriptionSection;
