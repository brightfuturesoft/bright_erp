import React, { useEffect } from 'react';
import { Modal, Form, Upload, Input, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const getBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
    });

const handlePreview = async (file: any) => {
    let src: string | undefined;
    if (typeof file.url === 'string') {
        src = file.url;
    } else if (file.thumbUrl) {
        src = file.thumbUrl;
    } else if (file.originFileObj) {
        src = await getBase64(file.originFileObj as File);
    }
    if (!src) return;
    const img = new Image();
    img.src = src;
    const win = window.open('');
    win?.document.write(img.outerHTML);
};

export default function Category_edit_modal({
    isOpen,
    setIsOpen,
    editingCategory,
    setEditingCategory,
    handleEditSave,
    error_message,
    set_error_message,
}: any) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (editingCategory && isOpen) {
            const imageUrl =
                typeof editingCategory.image === 'string'
                    ? editingCategory.image
                    : (editingCategory.image as any)?.url || '';
            const initialFileList = imageUrl
                ? [
                      {
                          uid: '-1',
                          name: 'current-image.png',
                          status: 'done',
                          url: imageUrl,
                      },
                  ]
                : [];
            form.setFieldsValue({
                ...editingCategory,
                image: initialFileList,
            });
        } else {
            form.resetFields();
        }
    }, [editingCategory, isOpen]);

    return (
        <Modal
            title="Edit Category"
            open={isOpen}
            onCancel={() => {
                setIsOpen(false);
                setEditingCategory(null);
            }}
            onOk={() => {
                form.validateFields().then(values => {
                    handleEditSave(values);
                });
            }}
            destroyOnClose
        >
            <Form
                form={form}
                onChange={() => set_error_message('')}
                layout="vertical"
            >
                <Form.Item
                    name="image"
                    label="Upload Image"
                    valuePropName="fileList"
                    getValueFromEvent={e =>
                        Array.isArray(e) ? e : e && e.fileList
                    }
                    rules={[
                        { required: true, message: 'Please upload an image!' },
                    ]}
                >
                    <Upload
                        listType="picture-card"
                        beforeUpload={() => false}
                        maxCount={1}
                        accept="image/*"
                        onPreview={handlePreview}
                        previewFile={async file => getBase64(file as File)}
                        onChange={() => set_error_message('')}
                    >
                        <div className="dark:text-white text-black">
                            <UploadOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="code"
                    label="Code"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="status"
                    label="Status"
                    rules={[{ required: true }]}
                >
                    <Select
                        options={[
                            { value: 'active', label: 'Active' },
                            { value: 'inactive', label: 'Inactive' },
                            { value: 'draft', label: 'Draft' },
                        ]}
                    />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                >
                    <Input.TextArea className="dark:text-white text-black" />
                </Form.Item>
                {error_message && (
                    <p style={{ color: 'red' }}>{error_message}</p>
                )}
            </Form>
        </Modal>
    );
}
