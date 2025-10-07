'use client';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useEffect } from 'react';
import { Modal, Form, Upload, Input, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
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
const BlogCategoryModal = ({
    isOpen,
    setIsOpen,
    handleAddSave,
    error_message,
    set_error_message,
    editingCategory,
}) => {
    const [form] = Form.useForm();
    useEffect(() => {
        if (isOpen) {
            form.resetFields();
            if (editingCategory) {
                form.setFieldsValue({
                    name: editingCategory.name || '',
                    description: editingCategory.description || '',
                    status: editingCategory.status || 'Active',
                    image: editingCategory.image
                        ? [
                              {
                                  uid: '-1',
                                  name: 'category.png',
                                  status: 'done',
                                  url: editingCategory.image,
                              },
                          ]
                        : [],
                });
            }
        }
    }, [isOpen, editingCategory, form]);
    return _jsx(Modal, {
        title: editingCategory ? 'Edit Blog Category' : 'Add Blog Category',
        open: isOpen,
        onCancel: () => setIsOpen(false),
        onOk: () => form.validateFields().then(values => handleAddSave(values)),
        destroyOnClose: true,
        children: _jsxs(Form, {
            form: form,
            layout: 'vertical',
            onChange: () => set_error_message(''),
            children: [
                _jsx(Form.Item, {
                    name: 'image',
                    label: 'Category Image',
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
                        children: _jsxs('div', {
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
                    name: 'name',
                    label: 'Category Name',
                    rules: [
                        { required: true, message: 'Please enter a name!' },
                    ],
                    children: _jsx(Input, {
                        placeholder: 'Enter category name',
                    }),
                }),
                _jsx(Form.Item, {
                    name: 'description',
                    label: 'Description',
                    children: _jsx(Input.TextArea, {
                        placeholder: 'Enter category description (optional)',
                    }),
                }),
                _jsx(Form.Item, {
                    name: 'status',
                    label: 'Status',
                    rules: [
                        { required: true, message: 'Please select status!' },
                    ],
                    children: _jsx(Select, {
                        options: [
                            { value: 'Active', label: 'Active' },
                            { value: 'Inactive', label: 'Inactive' },
                        ],
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
export default BlogCategoryModal;
