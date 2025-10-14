import React from 'react';
import { Form } from 'antd';
import CategoryTreeSelect from './CategoryTreeSelect';

interface CategorySelectSectionProps {
    form: any;
    allCategories: any[];
    categoryValue: string[];
    setCategoryValue: React.Dispatch<React.SetStateAction<string[]>>;
}

const CategorySelectSection: React.FC<CategorySelectSectionProps> = ({
    form,
    allCategories,
    categoryValue,
    setCategoryValue,
}) => {
    return (
        <Form.Item
            label="Categories"
            name="categories"
            rules={[
                {
                    required: true,
                    message: 'Please select at least one category',
                },
            ]}
            className="mb-2"
        >
            <CategoryTreeSelect
                categories={allCategories}
                value={categoryValue}
                onChange={val => setCategoryValue(val)}
            />
        </Form.Item>
    );
};

export default CategorySelectSection;
