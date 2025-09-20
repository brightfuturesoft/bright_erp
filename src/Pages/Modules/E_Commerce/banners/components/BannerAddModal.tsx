'use client';

import React, { useEffect } from 'react';
import { Modal, Form, Upload, Input, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { BannerType } from '../BannerTypes';

const getBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
    });

const handlePreview = async (file: any) => {
    let src: string | undefined;
    if (typeof file.url === 'string') src = file.url;
    else if (file.thumbUrl) src = file.thumbUrl;
    else if (file.originFileObj)
        src = await getBase64(file.originFileObj as File);

    if (!src) return;
    const img = new Image();
    img.src = src;
    const win = window.open('');
    win?.document.write(img.outerHTML);
};

interface BannerAddModalProps {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
    handleAddSave: (values: any) => void;
    error_message: string;
    set_error_message: (val: string) => void;
    editingBanner?: BannerType | null;
}

const BannerAddModal: React.FC<BannerAddModalProps> = ({
    isOpen,
    setIsOpen,
    handleAddSave,
    error_message,
    set_error_message,
    editingBanner,
}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (isOpen) {
            form.resetFields();
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
            onOk={() =>
                form.validateFields().then(values => handleAddSave(values))
            }
            destroyOnClose
        >
            <Form
                form={form}
                layout="vertical"
                onChange={() => set_error_message('')}
            >
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
                    >
                        <div>
                            <UploadOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>

                <Form.Item
                    name="title"
                    label="Title"
                >
                    <Input placeholder="Enter banner title (optional)" />
                </Form.Item>

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

                <Form.Item
                    name="redirect_url"
                    label="Redirect URL"
                    rules={[
                        { type: 'url', message: 'Please enter a valid URL!' },
                    ]}
                >
                    <Input placeholder="Enter banner redirect URL (optional)" />
                </Form.Item>

                {error_message && (
                    <p style={{ color: 'red' }}>{error_message}</p>
                )}
            </Form>
        </Modal>
    );
};

export default BannerAddModal;
