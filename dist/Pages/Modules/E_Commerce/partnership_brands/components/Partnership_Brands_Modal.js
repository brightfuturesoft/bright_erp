'use client';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useContext, useEffect, useRef, useState } from 'react';
import { Modal, Form, Input, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Erp_context } from '@/provider/ErpContext';
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
const BrandModal = ({
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
    const [fileList, setFileList] = useState([]);
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
    return _jsx(Modal, {
        title: editingBrand ? 'Edit Brand' : 'Add Brand',
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
                    label: 'Brand Title',
                    rules: [{ required: true, message: 'Enter brand title!' }],
                    children: _jsx(Input, { placeholder: 'Enter brand title' }),
                }),
                _jsx(Form.Item, {
                    name: 'description',
                    label: 'Description',
                    rules: [{ required: true, message: 'Enter description!' }],
                    children: _jsx(Input.TextArea, {
                        placeholder: 'Enter description',
                        rows: 6,
                        value: form.getFieldValue('description') || '',
                        onChange: e =>
                            form.setFieldsValue({
                                description: e.target.value,
                            }),
                        className:
                            'bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded-md p-2 placeholder-gray-400 dark:placeholder-gray-300',
                    }),
                }),
                _jsx(Form.Item, {
                    name: 'cta',
                    label: 'CTA (Button)',
                    children: _jsx(Input, { placeholder: 'Enter CTA text' }),
                }),
                _jsx(Form.Item, {
                    name: 'url',
                    label: 'Link',
                    children: _jsx(Input, { placeholder: 'Enter link' }),
                }),
                _jsx(Form.Item, {
                    name: 'status',
                    label: 'Status',
                    rules: [{ required: true, message: 'Select status!' }],
                    children: _jsx(Select, {
                        placeholder: 'Select status',
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
export default BrandModal;
