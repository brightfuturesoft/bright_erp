'use client';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useEffect, useState, useContext } from 'react';
import { Modal, Form, Upload, Input, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Erp_context } from '@/provider/ErpContext';
import { useQuery } from '@tanstack/react-query';
import JoditEditor from 'jodit-react';
const getBase64 = file =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });
const handlePreview = async file => {
    let src;
    if (typeof file.url === 'string') src = file.url;
    else if (file.thumbUrl) src = file.thumbUrl;
    else if (file.originFileObj) src = await getBase64(file.originFileObj);
    if (!src) return;
    const img = new Image();
    img.src = src;
    const win = window.open('');
    win?.document.write(img.outerHTML);
};
const BlogModal = ({
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
    const [categories, setCategories] = useState([]);
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
    return _jsx(Modal, {
        title: editingBlog ? 'Edit Blog' : 'Add Blog',
        open: isOpen,
        onCancel: () => setIsOpen(false),
        onOk: () => form.validateFields().then(values => handleAddSave(values)),
        destroyOnClose: true,
        width: 900,
        children: _jsxs(Form, {
            form: form,
            layout: 'vertical',
            onChange: () => set_error_message(''),
            children: [
                _jsx(Form.Item, {
                    name: 'image',
                    label: 'Blog Image',
                    valuePropName: 'fileList',
                    getValueFromEvent: e =>
                        Array.isArray(e) ? e : e?.fileList,
                    rules: [
                        { required: true, message: 'Please upload an image!' },
                    ],
                    children: _jsx(Upload, {
                        listType: 'picture-card',
                        beforeUpload: () => false,
                        maxCount: 1,
                        accept: 'image/*',
                        onPreview: handlePreview,
                        className: 'dark-upload',
                        children: _jsxs('div', {
                            className: 'dark-upload-btn',
                            children: [
                                _jsx(UploadOutlined, {}),
                                _jsx('div', {
                                    style: { marginTop: 8 },
                                    children: 'Upload',
                                }),
                            ],
                        }),
                    }),
                }),
                _jsx(Form.Item, {
                    name: 'title',
                    label: 'Blog Title',
                    rules: [
                        { required: true, message: 'Please enter a title!' },
                    ],
                    children: _jsx(Input, {
                        placeholder: 'Enter blog title',
                        className: 'dark-input',
                    }),
                }),
                _jsx(Form.Item, {
                    name: 'category',
                    label: 'Category',
                    rules: [
                        {
                            required: true,
                            message: 'Please select a category!',
                        },
                    ],
                    children: _jsx(Select, {
                        placeholder: 'Select category',
                        options: categories.map(cat => ({
                            value: cat.name,
                            label: cat.name,
                        })),
                        className: 'dark-select',
                    }),
                }),
                _jsx(Form.Item, {
                    name: 'status',
                    label: 'Status',
                    rules: [
                        { required: true, message: 'Please select status!' },
                    ],
                    children: _jsx(Select, {
                        placeholder: 'Select status',
                        options: [
                            { value: 'Active', label: 'Active' },
                            { value: 'Inactive', label: 'Inactive' },
                        ],
                        className: 'dark-select',
                    }),
                }),
                _jsx(Form.Item, {
                    name: 'description',
                    label: 'Description',
                    children: _jsx(Input.TextArea, {
                        placeholder: 'Enter blog description (optional)',
                        className: 'dark-input',
                    }),
                }),
                _jsx(Form.Item, {
                    name: 'content',
                    label: 'Content',
                    rules: [
                        { required: true, message: 'Please enter content!' },
                    ],
                    children: _jsx(JoditEditor, {
                        value: form.getFieldValue('message') || '',
                        onChange: val => form.setFieldsValue({ message: val }),
                        config: {
                            readonly: false,
                            height: 300,
                            theme: isDarkMode ? 'dark' : 'default',
                        },
                        className: 'jodit-editor',
                    }),
                }),
                error_message &&
                    _jsx('p', {
                        style: { color: 'red' },
                        children: error_message,
                    }),
            ],
        }),
    });
};
export default BlogModal;
