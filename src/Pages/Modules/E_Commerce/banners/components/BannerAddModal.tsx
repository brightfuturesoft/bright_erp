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

export default function BannerAddModal({
    isOpen,
    setIsOpen,
    handleAddSave,
    error_message,
    set_error_message,
    editingBanner, // ✅ pass editingBanner from parent
}: any) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (isOpen) {
            form.resetFields();
            // If editing, pre-fill the form
            if (editingBanner) {
                form.setFieldsValue({
                    title: editingBanner.title || '',
                    status: editingBanner.status || 'Active',
                    redirect_url: editingBanner.redirect_url || '',
                    image: editingBanner.image_url
                        ? [
                              {
                                  uid: '-1',
                                  name: 'banner.png',
                                  status: 'done',
                                  url: editingBanner.image_url,
                              },
                          ]
                        : [],
                });
            }
        }
    }, [isOpen, editingBanner, form]);

    return (
        <Modal
            title={editingBanner ? 'Edit Banner' : 'Add Banner'}
            open={isOpen}
            onCancel={() => setIsOpen(false)}
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
                {/* Upload Image */}
                <Form.Item
                    name="image"
                    label="Banner Image"
                    valuePropName="fileList"
                    getValueFromEvent={e =>
                        Array.isArray(e) ? e : e?.fileList
                    }
                    rules={[
                        {
                            required: true,
                            message: 'Please upload a banner image!',
                        },
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

                {/* Title */}
                <Form.Item
                    name="title"
                    label="Title"
                >
                    <Input placeholder="Enter banner title (optional)" />
                </Form.Item>

                {/* Status */}
                <Form.Item
                    name="status"
                    label="Status"
                    rules={[
                        { required: true, message: 'Please select status!' },
                    ]}
                >
                    <Select
                        options={[
                            { value: 'Active', label: 'Active' },
                            { value: 'Inactive', label: 'Inactive' },
                            { value: 'Draft', label: 'Draft' },
                        ]}
                    />
                </Form.Item>

                {/* Redirect URL */}
                <Form.Item
                    name="redirect_url"
                    label="Redirect URL"
                    rules={[
                        { type: 'url', message: 'Please enter a valid URL!' },
                    ]}
                >
                    <Input placeholder="Enter banner redirect URL (optional)" />
                </Form.Item>

                {/* Error message */}
                {error_message && (
                    <p style={{ color: 'red' }}>{error_message}</p>
                )}
            </Form>
        </Modal>
    );
}
