'use client';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useEffect, useContext } from 'react';
import { Modal, Form, Upload, Input, Select } from 'antd';
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
const PromotionModal = ({
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
    return _jsx(Modal, {
        title: editingPromotion ? 'Edit Promotion' : 'Add Promotion',
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
                    label: 'Promotion Image',
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
                    label: 'Promotion Title',
                    rules: [
                        { required: true, message: 'Please enter a title!' },
                    ],
                    children: _jsx(Input, {
                        placeholder: 'Enter promotion title',
                    }),
                }),
                _jsx(Form.Item, {
                    name: 'button_text',
                    label: 'Button Text',
                    rules: [
                        {
                            required: true,
                            message: 'Please enter button text!',
                        },
                    ],
                    children: _jsx(Input, { placeholder: 'Enter button text' }),
                }),
                _jsx(Form.Item, {
                    name: 'url',
                    label: 'URL',
                    rules: [
                        {
                            required: false,
                            type: 'url',
                            message: 'Please enter a valid URL!',
                        },
                    ],
                    children: _jsx(Input, {
                        placeholder: 'Enter promotion URL (optional)',
                    }),
                }),
                _jsx(Form.Item, {
                    name: 'status',
                    label: 'Status',
                    rules: [
                        { required: true, message: 'Please select status!' },
                    ],
                    children: _jsxs(Select, {
                        placeholder: 'Select status',
                        children: [
                            _jsx(Select.Option, {
                                value: 'Active',
                                children: 'Active',
                            }),
                            _jsx(Select.Option, {
                                value: 'Inactive',
                                children: 'Inactive',
                            }),
                        ],
                    }),
                }),
                _jsx(Form.Item, {
                    name: 'description',
                    label: 'Description',
                    children: _jsx(Input.TextArea, {
                        placeholder: 'Enter description (optional)',
                        className: 'dark-input',
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
export default PromotionModal;
