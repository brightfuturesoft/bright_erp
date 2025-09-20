'use client';

import React, { useContext, useEffect, useRef } from 'react';
import { Modal, Form, Input, Select, Upload } from 'antd';
import { Erp_context } from '@/provider/ErpContext';
import { SEOType } from '../General_Seo_type';
import { UploadOutlined } from '@ant-design/icons';

// Convert File to Base64
const getBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
    });

// Preview image in new tab
const handlePreview = async (file: any) => {
    let src: string | undefined;
    if (typeof file.url === 'string') src = file.url;
    else if (file.originFileObj) src = await getBase64(file.originFileObj);

    if (!src) return;
    const img = new Image();
    img.src = src;
    const win = window.open('');
    win?.document.write(img.outerHTML);
};

interface SEOModalProps {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
    handleSave: (values: SEOType) => void;
    errorMessage: string;
    setErrorMessage: (val: string) => void;
    editingSEO?: SEOType | null;
    isDarkMode?: boolean;
}

const SEOModal: React.FC<SEOModalProps> = ({
    isOpen,
    setIsOpen,
    handleSave,
    errorMessage,
    setErrorMessage,
    editingSEO,
    isDarkMode = false,
}) => {
    const { user } = useContext(Erp_context);
    const [form] = Form.useForm();

    useEffect(() => {
        if (isOpen) {
            form.resetFields();
            form.setFieldsValue({
                pageTitle: editingSEO?.pageTitle || '',
                metaDescription: editingSEO?.metaDescription || '',
                metaKeywords: editingSEO?.metaKeywords || '',
                slug: editingSEO?.slug || '',
                ogTitle: editingSEO?.ogTitle || '',
                ogDescription: editingSEO?.ogDescription || '',
                ogImage: editingSEO?.ogImage
                    ? [
                          {
                              uid: '-1',
                              name: 'og-image.png',
                              status: 'done',
                              url: editingSEO.ogImage,
                          },
                      ]
                    : [],
                canonicalUrl: editingSEO?.canonicalUrl || '',
                metaRobots: editingSEO?.metaRobots || 'index, follow',
                status: editingSEO?.status || 'Active',
            });
        }
    }, [isOpen, editingSEO, form]);

    return (
        <Modal
            title={editingSEO ? 'Edit SEO' : 'Add SEO'}
            open={isOpen}
            onCancel={() => setIsOpen(false)}
            onOk={() =>
                form.validateFields().then(values => handleSave(values))
            }
            destroyOnClose
            className={isDarkMode ? 'dark' : ''}
            width={900}
        >
            <Form
                form={form}
                layout="vertical"
                onChange={() => setErrorMessage('')}
            >
                {/* Page Title */}
                <Form.Item
                    name="pageTitle"
                    label="Page Title"
                    rules={[{ required: true, message: 'Enter page title!' }]}
                >
                    <Input placeholder="Enter page title" />
                </Form.Item>

                {/* Meta Description */}
                <Form.Item
                    name="metaDescription"
                    label="Meta Description"
                    rules={[
                        { required: true, message: 'Enter meta description!' },
                    ]}
                >
                    <Input.TextArea
                        placeholder="Enter meta description"
                        rows={3}
                        className="dark:bg-gray-800 dark:text-white dark:placeholder-white"
                    />
                </Form.Item>

                {/* Meta Keywords */}
                <Form.Item
                    name="metaKeywords"
                    label="Meta Keywords"
                >
                    <Input placeholder="Enter meta keywords (comma separated)" />
                </Form.Item>

                {/* Slug */}
                <Form.Item
                    name="slug"
                    label="Slug / URL"
                    rules={[{ required: true, message: 'Enter slug!' }]}
                >
                    <Input placeholder="Enter slug, e.g., /products/iphone-15" />
                </Form.Item>

                {/* OG Title */}
                <Form.Item
                    name="ogTitle"
                    label="OG Title"
                >
                    <Input placeholder="Enter OG title for social sharing" />
                </Form.Item>

                {/* OG Description */}
                <Form.Item
                    name="ogDescription"
                    label="OG Description"
                >
                    <Input.TextArea
                        placeholder="Enter OG description"
                        rows={3}
                        className="dark:bg-gray-800 dark:text-white dark:placeholder-white"
                    />
                </Form.Item>

                {/* OG Image */}
                <Form.Item
                    name="ogImage"
                    label="OG Image"
                    valuePropName="fileList"
                    getValueFromEvent={e =>
                        Array.isArray(e) ? e : (e?.fileList ?? [])
                    }
                    rules={[{ required: true, message: 'Upload OG image!' }]}
                >
                    <Upload
                        listType="picture-card"
                        beforeUpload={() => false}
                        maxCount={1}
                        onPreview={handlePreview}
                    >
                        <div className="dark:bg-gray-800 dark:text-white dark:placeholder-white">
                            <UploadOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>

                {/* Canonical URL */}
                <Form.Item
                    name="canonicalUrl"
                    label="Canonical URL"
                >
                    <Input placeholder="Enter canonical URL if any" />
                </Form.Item>

                {/* Meta Robots */}
                <Form.Item
                    name="metaRobots"
                    label="Meta Robots"
                >
                    <Select
                        options={[
                            { value: 'index, follow', label: 'Index, Follow' },
                            {
                                value: 'noindex, nofollow',
                                label: 'NoIndex, NoFollow',
                            },
                        ]}
                    />
                </Form.Item>

                {/* Status */}
                <Form.Item
                    name="status"
                    label="Status"
                    rules={[{ required: true, message: 'Select status!' }]}
                >
                    <Select
                        options={[
                            { value: 'Active', label: 'Active' },
                            { value: 'Inactive', label: 'Inactive' },
                        ]}
                    />
                </Form.Item>

                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </Form>
        </Modal>
    );
};

export default SEOModal;
