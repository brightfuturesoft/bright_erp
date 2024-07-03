// EditCategoryModal.tsx
import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

interface EditCategoryModalProps {
    visible: boolean;
    onCancel: () => void;
    initialValues: {
        parentCategory: string;
        categoryName: string;
        categoryPosition: string;
        categoryImage: string;
    };
    onFinish: (values: any) => void;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
    visible,
    onCancel,
    initialValues,
    onFinish,
}) => {
    return (
        <Modal
            title="Edit Category"
            visible={visible}
            onCancel={onCancel}
            footer={null}
        >
            <Form
                initialValues={initialValues}
                onFinish={onFinish}
            >
                <Form.Item label="Parent Category" name="parentCategory">
                    <Input />
                </Form.Item>
                <Form.Item label="Category Name" name="categoryName">
                    <Input />
                </Form.Item>
                <Form.Item label="Category Position" name="categoryPosition">
                    <Input />
                </Form.Item>
                <Form.Item label="Category Image" name="categoryImage">
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditCategoryModal;
