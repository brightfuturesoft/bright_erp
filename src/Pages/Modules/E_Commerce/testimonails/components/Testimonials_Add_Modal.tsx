'use client';

import React, { useEffect } from 'react';
import { Modal, Form, Upload, Input, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { TestimonialType } from '../Testimonails_Type';

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

interface TestimonialModalProps {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
    handleAddSave: (values: any) => void;
    error_message: string;
    set_error_message: (val: string) => void;
    editingTestimonial?: TestimonialType | null;
}

const TestimonialModal: React.FC<TestimonialModalProps> = ({
    isOpen,
    setIsOpen,
    handleAddSave,
    error_message,
    set_error_message,
    editingTestimonial,
}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (isOpen) {
            form.resetFields();
            if (editingTestimonial) {
                form.setFieldsValue({
                    name: editingTestimonial.name || '',
                    comment: editingTestimonial.comment || '',
                    status: editingTestimonial.status || 'Active',
                    image: editingTestimonial.image
                        ? [
                              {
                                  uid: '-1',
                                  name: 'testimonial.png',
                                  status: 'done',
                                  url: editingTestimonial.image,
                              },
                          ]
                        : [],
                });
            }
        }
    }, [isOpen, editingTestimonial, form]);

    return (
        <Modal
            title={editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}
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
                    label="Image"
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
                    >
                        <div>
                            <UploadOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>

                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Please enter name!' }]}
                >
                    <Input placeholder="Enter customer name" />
                </Form.Item>

                <Form.Item
                    name="comment"
                    label="Comment"
                    rules={[
                        { required: true, message: 'Please enter comment!' },
                    ]}
                >
                    <Input.TextArea
                        placeholder="Enter testimonial comment"
                        className="bg-gray-800 text-white placeholder-gray-400 border-gray-700 focus:border-blue-500 focus:ring-blue-500"
                        rows={4}
                    />
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

export default TestimonialModal;
