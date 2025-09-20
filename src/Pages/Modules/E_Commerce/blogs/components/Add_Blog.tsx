'use client';

import React, { useEffect, useState, useContext } from 'react';
import { Modal, Form, Upload, Input, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Erp_context } from '@/provider/ErpContext';
import { useQuery } from '@tanstack/react-query';
import uploadImage from '@/helpers/hooks/uploadImage';
import { BlogCategoryType } from '../../blog_category/Blog_Category_Type';
import JoditEditor from 'jodit-react';

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

interface BlogType {
    _id?: string;
    title: string;
    category: string;
    content: string;
    image: string;
    description?: string;
    status: string;
}

interface BlogModalProps {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
    handleAddSave: (values: any) => void;
    error_message: string;
    set_error_message: (val: string) => void;
    editingBlog?: BlogType | null;
    isDarkMode?: boolean; // dark mode prop
}

const BlogModal: React.FC<BlogModalProps> = ({
    isOpen,
    setIsOpen,
    handleAddSave,
    error_message,
    set_error_message,
    editingBlog,
    isDarkMode = false,
}) => {
    const { user } = useContext(Erp_context);
    const [form] = Form.useForm();
    const [categories, setCategories] = useState<BlogCategoryType[]>([]);

    const { refetch } = useQuery({
        queryKey: ['blogCategories'],
        queryFn: async () => {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}ecommerce/blog-category/get-blog-categories`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                }
            );
            const data = await res.json();
            setCategories(data.data || []);
            return data.data;
        },
    });

    useEffect(() => {
        if (isOpen) {
            form.resetFields();
            refetch(); // fetch latest categories
            if (editingBlog) {
                form.setFieldsValue({
                    title: editingBlog.title || '',
                    category: editingBlog.category || '',
                    description: editingBlog.description || '',
                    content: editingBlog.content || '',
                    status: editingBlog.status || '',
                    image: editingBlog.image
                        ? [
                              {
                                  uid: '-1',
                                  name: 'blog.png',
                                  status: 'done',
                                  url: editingBlog.image,
                              },
                          ]
                        : [],
                });
            }
        }
    }, [isOpen, editingBlog, form, refetch]);

    // Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat praesentium quibusdam, recusandae voluptates alias eum illo incidunt sint est ipsum laudantium, doloribus, nulla ipsa facere delectus? Numquam quidem minima sunt.

    return (
        <Modal
            title={editingBlog ? 'Edit Blog' : 'Add Blog'}
            open={isOpen}
            onCancel={() => setIsOpen(false)}
            onOk={() =>
                form.validateFields().then(values => handleAddSave(values))
            }
            destroyOnClose
            width={900}
        >
            <Form
                form={form}
                layout="vertical"
                onChange={() => set_error_message('')}
            >
                {/* Blog Image */}
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
                    label="Blog Title"
                    rules={[
                        { required: true, message: 'Please enter a title!' },
                    ]}
                >
                    <Input
                        placeholder="Enter blog title"
                        className="dark-input"
                    />
                </Form.Item>

                {/* Category */}
                <Form.Item
                    name="category"
                    label="Category"
                    rules={[
                        {
                            required: true,
                            message: 'Please select a category!',
                        },
                    ]}
                >
                    <Select
                        placeholder="Select category"
                        options={categories.map(cat => ({
                            value: cat.name,
                            label: cat.name,
                        }))}
                        className="dark-select"
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
                        options={[
                            { value: 'Active', label: 'Active' },
                            { value: 'Inactive', label: 'Inactive' },
                        ]}
                        className="dark-select"
                    />
                </Form.Item>

                {/* Description */}
                <Form.Item
                    name="description"
                    label="Description"
                >
                    <Input.TextArea
                        placeholder="Enter blog description (optional)"
                        className="dark-input"
                    />
                </Form.Item>

                {/* Content / Rich Text */}
                <Form.Item
                    name="content"
                    label="Content"
                    rules={[
                        { required: true, message: 'Please enter content!' },
                    ]}
                >
                    <JoditEditor
                        value={form.getFieldValue('message') || ''}
                        onChange={val => form.setFieldsValue({ message: val })}
                        config={{
                            readonly: false,
                            height: 300,
                            theme: isDarkMode ? 'dark' : 'default',
                        }}
                        className="jodit-editor"
                    />
                </Form.Item>

                {error_message && (
                    <p style={{ color: 'red' }}>{error_message}</p>
                )}
            </Form>
        </Modal>
    );
};

export default BlogModal;
