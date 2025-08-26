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

export default function Category_add_modal({
    isOpen,
    setIsOpen,
    addParentCategory,
    setAddParentCategory,
    handleAddSave,
    error_message,
    set_error_message,
    user,
}: any) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (isOpen) form.resetFields();
    }, [isOpen]);

    return (
        <Modal
            title={addParentCategory ? 'Add Subcategory' : 'Add Category'}
            open={isOpen}
            onCancel={() => {
                setIsOpen(false);
                setAddParentCategory(null);
            }}
            onOk={() => {
                form.validateFields().then(values => {
                    handleAddSave(values);
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
                        Array.isArray(e) ? e : e?.fileList
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
                    label="Code"
                    shouldUpdate={(prev, curr) => prev.name !== curr.name}
                >
                    {({ getFieldValue, setFieldsValue }) => {
                        const nameValue = getFieldValue('name') || '';
                        const codeValue = nameValue
                            .toLowerCase()
                            .replace(/\s/g, '_');
                        setTimeout(() => {
                            setFieldsValue({ code: codeValue });
                        }, 0);
                        return (
                            <Form.Item
                                name="code"
                                noStyle
                            >
                                <Input
                                    className="dark:text-white text-black"
                                    value={codeValue}
                                />
                            </Form.Item>
                        );
                    }}
                </Form.Item>
                <Form.Item
                    name="status"
                    label="Status"
                    initialValue="draft"
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
                    <Input.TextArea />
                </Form.Item>
                {error_message && (
                    <p style={{ color: 'red' }}>{error_message}</p>
                )}
            </Form>
        </Modal>
    );
}
