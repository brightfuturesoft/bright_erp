'use client';

import React, { useEffect, useContext } from 'react';
import { Modal, Form, Upload, Input, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Erp_context } from '@/provider/ErpContext';
import { PromotionType } from '../Promotions_Type';
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

interface PromotionModalProps {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
    handleAddSave: (values: any) => void;
    error_message: string;
    set_error_message: (val: string) => void;
    editingPromotion?: PromotionType | null;
    isDarkMode?: boolean;
}

const PromotionModal: React.FC<PromotionModalProps> = ({
    isOpen,
    setIsOpen,
    handleAddSave,
    error_message,
    set_error_message,
    editingPromotion,
    isDarkMode = false,
}) => {
    const { user } = useContext(Erp_context);
    const [form] = Form.useForm();

    useEffect(() => {
        if (isOpen) {
            form.resetFields();
            if (editingPromotion) {
                form.setFieldsValue({
                    title: editingPromotion.title || '',
                    description: editingPromotion.description || '',
                    button_text: editingPromotion.button_text || '',
                    status: editingPromotion.status || 'Active',
                    url: editingPromotion.url || '',
                    image: editingPromotion.image
                        ? [
                              {
                                  uid: '-1',
                                  name: 'promo.png',
                                  status: 'done',
                                  url: editingPromotion.image,
                              },
                          ]
                        : [],
                });
            } else {
                form.setFieldsValue({ status: 'Active' });
            }
        }
    }, [isOpen, editingPromotion, form]);

    return (
        <Modal
            title={editingPromotion ? 'Edit Promotion' : 'Add Promotion'}
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
                {/* Promotion Image */}
                <Form.Item
                    name="image"
                    label="Promotion Image"
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
                    label="Promotion Title"
                    rules={[
                        { required: true, message: 'Please enter a title!' },
                    ]}
                >
                    <Input placeholder="Enter promotion title" />
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
                    <Input placeholder="Enter button text" />
                </Form.Item>

                <Form.Item
                    name="url"
                    label="URL"
                    rules={[
                        {
                            required: false,
                            type: 'url',
                            message: 'Please enter a valid URL!',
                        },
                    ]}
                >
                    <Input placeholder="Enter promotion URL (optional)" />
                </Form.Item>

                {/* Status */}
                <Form.Item
                    name="status"
                    label="Status"
                    rules={[
                        { required: true, message: 'Please select status!' },
                    ]}
                >
                    <Select placeholder="Select status">
                        <Select.Option value="Active">Active</Select.Option>
                        <Select.Option value="Inactive">Inactive</Select.Option>
                    </Select>
                </Form.Item>

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

export default PromotionModal;
