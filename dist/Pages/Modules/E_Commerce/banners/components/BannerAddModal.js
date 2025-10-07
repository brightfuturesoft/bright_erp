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
const BannerAddModal = ({
    isOpen,
    setIsOpen,
    handleAddSave,
    error_message,
    set_error_message,
    editingBanner,
}) => {
    const [form] = Form.useForm();
    useEffect(() => {
        if (isOpen) {
            form.resetFields();
            if (editingBanner) {
                form.setFieldsValue({
                    title: editingBanner.title || '',
                    status: editingBanner.status || 'Active',
                    redirect_url: editingBanner.redirect_url || '',
                    image: editingBanner.image_url
                        ? [
                              {
                                  uid: '-1',
                                  name: 'banner.png',
                                  status: 'done',
                                  url: editingBanner.image_url,
                              },
                          ]
                        : [],
                });
            }
        }
    }, [isOpen, editingBanner, form]);
    return _jsx(Modal, {
        title: editingBanner ? 'Edit Banner' : 'Add Banner',
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
                    label: 'Banner Image',
                    valuePropName: 'fileList',
                    getValueFromEvent: e =>
                        Array.isArray(e) ? e : e?.fileList,
                    rules: [
                        {
                            required: true,
                            message: 'Please upload a banner image!',
                        },
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
                    name: 'title',
                    label: 'Title',
                    children: _jsx(Input, {
                        placeholder: 'Enter banner title (optional)',
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
                            { value: 'Draft', label: 'Draft' },
                        ],
                    }),
                }),
                _jsx(Form.Item, {
                    name: 'redirect_url',
                    label: 'Redirect URL',
                    rules: [
                        { type: 'url', message: 'Please enter a valid URL!' },
                    ],
                    children: _jsx(Input, {
                        placeholder: 'Enter banner redirect URL (optional)',
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
export default BannerAddModal;
