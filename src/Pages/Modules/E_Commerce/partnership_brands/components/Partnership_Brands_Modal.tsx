'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { Modal, Form, Input, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Erp_context } from '@/provider/ErpContext';
import JoditEditor from 'jodit-react';
import uploadImage from '@/helpers/hooks/uploadImage';

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

interface BrandType {
    _id?: string;
    title: string;
    description: string;
    image?: string;
    cta?: string;
    url?: string;
    status: 'Active' | 'Inactive';
}

interface BrandModalProps {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
    handleAddSave: (values: any) => void;
    error_message: string;
    set_error_message: (val: string) => void;
    editingBrand?: BrandType | null;
    isDarkMode?: boolean;
}

const BrandModal: React.FC<BrandModalProps> = ({
    isOpen,
    setIsOpen,
    handleAddSave,
    error_message,
    set_error_message,
    editingBrand,
    isDarkMode = false,
}) => {
    const { user } = useContext(Erp_context);
    const [form] = Form.useForm();
    const editor = useRef(null);
    const [fileList, setFileList] = useState<any[]>([]);

    useEffect(() => {
        if (isOpen) {
            form.resetFields();
            setFileList([]);
            if (editingBrand) {
                form.setFieldsValue({
                    title: editingBrand.title || '',
                    description: editingBrand.description || '',
                    cta: editingBrand.cta || '',
                    url: editingBrand.url || '',
                    status: editingBrand.status || 'Active',
                    image: editingBrand.image
                        ? [
                              {
                                  uid: '-1',
                                  name: 'image.png',
                                  status: 'done',
                                  url: editingBrand.image,
                              },
                          ]
                        : [],
                });
                if (editingBrand.image) {
                    setFileList([
                        {
                            uid: '-1',
                            name: 'image.png',
                            status: 'done',
                            url: editingBrand.image,
                        },
                    ]);
                }
            }
        }
    }, [isOpen, editingBrand, form]);

    return (
        <Modal
            title={editingBrand ? 'Edit Brand' : 'Add Brand'}
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
                {/* Image */}

                <Form.Item
                    name="image"
                    label="Blog Image"
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
                        className="dark-upload"
                    >
                        <div className="dark-upload-btn">
                            <UploadOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>

                {/* Title */}
                <Form.Item
                    name="title"
                    label="Brand Title"
                    rules={[{ required: true, message: 'Enter brand title!' }]}
                >
                    <Input placeholder="Enter brand title" />
                </Form.Item>

                {/* Description */}
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: 'Enter description!' }]}
                >
                    <Input.TextArea
                        placeholder="Enter description"
                        rows={6}
                        value={form.getFieldValue('description') || ''}
                        onChange={e =>
                            form.setFieldsValue({ description: e.target.value })
                        }
                        className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded-md p-2 placeholder-gray-400 dark:placeholder-gray-300"
                    />
                </Form.Item>

                {/* CTA */}
                <Form.Item
                    name="cta"
                    label="CTA (Button)"
                >
                    <Input placeholder="Enter CTA text" />
                </Form.Item>

                {/* URL */}
                <Form.Item
                    name="url"
                    label="Link"
                >
                    <Input placeholder="Enter link" />
                </Form.Item>

                {/* Status */}
                <Form.Item
                    name="status"
                    label="Status"
                    rules={[{ required: true, message: 'Select status!' }]}
                >
                    <Select
                        placeholder="Select status"
                        options={[
                            { value: 'Active', label: 'Active' },
                            { value: 'Inactive', label: 'Inactive' },
                        ]}
                    />
                </Form.Item>

                {error_message && (
                    <p style={{ color: 'red' }}>{error_message}</p>
                )}
            </Form>
        </Modal>
    );
};

export default BrandModal;
