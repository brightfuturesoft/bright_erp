import React, { useEffect } from 'react';
import { Form, Select } from 'antd';

interface AttributeSelectProps {
    attributes: any[];
    form?: any;
    existingAttributes?: string[];
}

const AttributeSelect: React.FC<AttributeSelectProps> = ({
    attributes,
    form,
    existingAttributes = [],
}) => {
    useEffect(() => {
        if (existingAttributes.length && form) {
            form.setFieldsValue({ attribute_sets: existingAttributes });
        }
    }, [existingAttributes, form]);

    return (
        <Form.Item
            label="Attribute"
            name="attribute_sets"
            className="flex-1 mb-0"
        >
            <Select
                mode="multiple"
                allowClear
                placeholder="Select Attribute"
                labelInValue={false}
                className="custom-placeholder"
                dropdownClassName="custom-placeholder-dropdown"
                options={
                    Array.isArray(attributes)
                        ? attributes.map((m: any) => ({
                              label: m.attribute_set,
                              value: m.attribute_set,
                              key: m._id,
                          }))
                        : []
                }
                tagRender={props => {
                    const { label, closable, onClose } = props;
                    return (
                        <span className="inline-flex items-center px-2 py-1 bg-gray-700 text-white rounded mr-1 mb-1">
                            {label}
                            {closable && (
                                <span
                                    onClick={onClose}
                                    className="ml-1 cursor-pointer text-white"
                                >
                                    ×
                                </span>
                            )}
                        </span>
                    );
                }}
            />
        </Form.Item>
    );
};

export default AttributeSelect;
