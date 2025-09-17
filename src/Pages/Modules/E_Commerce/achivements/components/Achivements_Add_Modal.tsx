'use client';

import React, { useEffect } from 'react';
import { Modal, Form, Upload, Input, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { AchievementType } from '../Achivement_Type';

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

interface AchievementModalProps {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
    handleAddSave: (values: any) => void;
    error_message: string;
    set_error_message: (val: string) => void;
    editingAchievement?: AchievementType | null;
}

const AchievementModal: React.FC<AchievementModalProps> = ({
    isOpen,
    setIsOpen,
    handleAddSave,
    error_message,
    set_error_message,
    editingAchievement,
}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (isOpen) {
            form.resetFields();
            if (editingAchievement) {
                form.setFieldsValue({
                    title: editingAchievement.title || '',
                    link: editingAchievement.link || '',
                    status: editingAchievement.status || 'Active',
                    image: editingAchievement.image
                        ? [
                              {
                                  uid: '-1',
                                  name: 'achievement.png',
                                  status: 'done',
                                  url: editingAchievement.image,
                              },
                          ]
                        : [],
                });
            }
        }
    }, [isOpen, editingAchievement, form]);

    return (
        <Modal
            title={editingAchievement ? 'Edit Achievement' : 'Add Achievement'}
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
                    label="Achievement Image"
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
                    name="title"
                    label="Title"
                    rules={[{ required: true, message: 'Please enter title!' }]}
                >
                    <Input placeholder="Enter achievement title" />
                </Form.Item>

                <Form.Item
                    name="link"
                    label="Link"
                >
                    <Input placeholder="Enter related link (optional)" />
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

export default AchievementModal;
