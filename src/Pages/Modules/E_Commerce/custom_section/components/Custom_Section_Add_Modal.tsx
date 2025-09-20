'use client';

import React, { useEffect, useContext } from 'react';
import { Modal, Form, Upload, Input, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Erp_context } from '@/provider/ErpContext';
import { CustomSectionType } from '../Custom_Section_Type';

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

interface CustomSectionModalProps {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
    handleAddSave: (values: any) => void;
    error_message: string;
    set_error_message: (val: string) => void;
    editingSection?: CustomSectionType | null;
    isDarkMode?: boolean;
}

const CustomSectionModal: React.FC<CustomSectionModalProps> = ({
    isOpen,
    setIsOpen,
    handleAddSave,
    error_message,
    set_error_message,
    editingSection,
    isDarkMode = false,
}) => {
    const { user } = useContext(Erp_context);
    const [form] = Form.useForm();

    useEffect(() => {
        if (isOpen) {
            form.resetFields();
            if (editingSection) {
                form.setFieldsValue({
                    title: editingSection.title || '',
                    description: editingSection.description || '',
                    button_text: editingSection.button_text || '',
                    url: editingSection.url || '',
                    status: editingSection.status || 'Active',
                    image: editingSection.image
                        ? [
                              {
                                  uid: '-1',
                                  name: 'section.png',
                                  status: 'done',
                                  url: editingSection.image,
                              },
                          ]
                        : [],
                });
            } else {
                form.setFieldsValue({ status: 'Active' });
            }
        }
    }, [isOpen, editingSection, form]);

    return (
        <Modal
            title={editingSection ? 'Edit Section' : 'Add Section'}
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
                {/* Section Image */}
                <Form.Item
                    name="image"
                    label="Section Image"
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
                    label="Section Title"
                    rules={[
                        { required: true, message: 'Please enter a title!' },
                    ]}
                >
                    <Input
                        placeholder="Enter section title"
                        className="dark-input"
                    />
                </Form.Item>

                {/* Button Text */}
                <Form.Item
                    name="button_text"
                    label="Button Text"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter button text!',
                        },
                    ]}
                >
                    <Input
                        placeholder="Enter button text"
                        className="dark-input"
                    />
                </Form.Item>

                {/* URL */}
                <Form.Item
                    name="url"
                    label="Section URL"
                    rules={[{ required: true, message: 'Please enter a URL!' }]}
                >
                    <Input
                        placeholder="Enter section URL"
                        className="dark-input"
                    />
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
                        placeholder="Select status"
                        className="dark-input"
                    >
                        <Select.Option value="Active">Active</Select.Option>
                        <Select.Option value="Inactive">Inactive</Select.Option>
                    </Select>
                </Form.Item>

                {/* Description */}
                <Form.Item
                    name="description"
                    label="Description"
                >
                    <Input.TextArea
                        placeholder="Enter description (optional)"
                        className="dark-input"
                    />
                </Form.Item>

                {error_message && (
                    <p style={{ color: 'red' }}>{error_message}</p>
                )}
            </Form>
        </Modal>
    );
};

export default CustomSectionModal;
